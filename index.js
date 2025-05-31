const gjv = require("geojson-validation");
const {union} = require('@turf/union');
const proj4 = require('proj4');
const {point, polygon} = require('@turf/helpers');
const {convex} = require('@turf/convex');
const {difference} = require('@turf/difference');
const {center} = require('@turf/center');
const SunCalc = require('suncalc');

class GeoJSONShadowGenerator {
  constructor(geojson, elevationPropertyName='elevation') {
    this.geojson = geojson;
    this.propName = elevationPropertyName;
    this.sunAzimuth = 0;
    this.sunElevation = 0;
    this.type = 'direct';
    this.projWGS84 = 'EPSG:4326';
    this.projMercator = 'EPSG:3857';
    proj4.defs(this.projMercator, 
      '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs'
    );
  }

  getShadowGeometries(options) {
    if (!this.geojson || !this.propName) {
      throw new Error('GeoJSON and elevationPropertyName are required');
    }
    this.type = options.type==undefined?'direct': options.type === 'datetime' ? 'datetime' : 'direct';
    
    this.GeoJSONValidation();
    this.getSunPosition(options);
    return this.generateShadowGeometries();
  }

  getSunAngles(date, coordinate){
    const position = SunCalc.getPosition(date, coordinate[1], coordinate[0]);
    return {
      azimuth: position.azimuth * 180 / Math.PI,
      elevation: position.altitude * 180 / Math.PI
    };
  }

  getSunPosition(options) {
    if (!options) {
      throw new Error('Options parameter is required');
    }

    if (this.type === 'direct') {
      this.sunAzimuth = options.sunAzimuth ?? 90;
      this.sunElevation = options.sunElevation ?? 45;
    } else {
      const c = center(this.geojson);
      const date = new Date(options.date);
      const sunAngles = this.getSunAngles(date, [c.geometry.coordinates[0], c.geometry.coordinates[1]]);
      this.sunAzimuth = sunAngles.azimuth;
      this.sunElevation = sunAngles.elevation;
    }
  }
  
  GeoJSONValidation() {
    if (!gjv.valid(this.geojson)) {
      throw new Error('GeoJSON is not valid');
    }

    if (!gjv.isFeatureCollection(this.geojson) && !gjv.isFeature(this.geojson)) {
      throw new Error('GeoJSON type must be FeatureCollection or Feature');
    }

    const features = gjv.isFeatureCollection(this.geojson) ? this.geojson.features : [this.geojson];

    for (const feature of features) {
      if (!gjv.isPolygon(feature.geometry) && !gjv.isMultiPolygon(feature.geometry)) {
        throw new Error('Geometry type must be Polygon or MultiPolygon');
      }
    }

    if (gjv.isFeature(this.geojson)) {
      this.geojson = {
        type: 'FeatureCollection',
        features: [this.geojson]
      }
    }
  }

  generateShadowGeometries() {
    const azimuthRad = (this.sunAzimuth + 90) * Math.PI / 180;
    const elevationRad = this.sunElevation * Math.PI / 180;
    const sunVec = [
      Math.cos(elevationRad) * Math.cos(azimuthRad), 
      Math.cos(elevationRad) * Math.sin(azimuthRad),
      Math.sin(elevationRad)
    ];
    const shadowFeatures = [];

    for (const feature of this.geojson.features) {
      const elevation = feature.properties?.[this.propName];
      if (!elevation || elevation <= 0) continue;

      const t = elevation / sunVec[2];
      const offsetX = sunVec[0] * t;
      const offsetY = sunVec[1] * t;
      const geom = feature.geometry;

      if (geom.type === 'Polygon') {
        const shifted = this.offsetCoords(geom.coordinates, offsetX, offsetY);
        const combined = this.createUnion(geom.coordinates, shifted);
        if (combined) {
          var polygon = {type:'Feature', geometry: {type:'Polygon', coordinates: geom.coordinates}};
          var diff = difference({type: 'FeatureCollection', features: [combined, polygon]});
          diff.properties = feature.properties;
          shadowFeatures.push(diff);
        }
      } else if (geom.type === 'MultiPolygon') {
        for (let i = 0; i < geom.coordinates.length; i++) {
          const originalCoords = geom.coordinates[i];
          const shifted = this.offsetCoords(originalCoords, offsetX, offsetY);
          const combined = this.createUnion(originalCoords, shifted);
          if (combined) {
            shadowFeatures.push({
              ...combined,
              properties: feature.properties
            });
          }
        }
      }
    }

    var fc = {type: 'FeatureCollection', features: shadowFeatures};
    if(shadowFeatures.length>1){
      var u = union(fc);
      return u;
    }else{
      return fc;
    }
  }

  offsetCoords(coords, offsetX, offsetY){
    return coords.map(ring => {
      const mercatorRing = ring.map(([lon, lat]) => proj4(this.projWGS84, this.projMercator, [lon, lat]));
      const shiftedRing = mercatorRing.map(([x, y]) => [x - offsetX, y - offsetY]);
      return shiftedRing.map(([x, y]) => proj4(this.projMercator, this.projWGS84, [x, y]));
    });
  }

  createUnion(originalCoords, shiftedCoords){
    try {
      var points = originalCoords.map(ring => ring.map(p => point(p)));
      var points2 = shiftedCoords.map(ring => ring.map(p => point(p)));
      var allPoints = points[0].concat(points2[0]);
      var featureCollection = {type: 'FeatureCollection', features: allPoints};
      const poly2 = convex(featureCollection);
      return poly2;
    } catch (err) {
      console.warn("Union failed", err);
      return null;
    }
  };
}

module.exports = GeoJSONShadowGenerator;
