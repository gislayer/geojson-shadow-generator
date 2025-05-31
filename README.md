# GeoJSON Shadow Generator

A powerful tool to simulate shadow geometries from 2D building footprints (as GeoJSON) using sun position (via direct angles or date-time). Supports elevation-based shadow generation and handles `Polygon` and `MultiPolygon` types.

![npm](https://img.shields.io/npm/v/geojson-shadow-generator?color=green)
![license](https://img.shields.io/npm/l/geojson-shadow-generator)

## 📦 Installation

```bash
npm install geojson-shadow-generator
````

or with yarn:

```bash
yarn add geojson-shadow-generator
```

## ✨ Features

* Calculates shadow geometries based on:

  * Direct sun azimuth/elevation angles.
  * Automatic sun position using date-time and GeoJSON center.
* Validates input GeoJSON (`Feature` or `FeatureCollection`).
* Supports `Polygon` and `MultiPolygon` geometry types.
* Uses `@turf` and `suncalc` libraries under the hood.
* Returns output as a valid GeoJSON `FeatureCollection` or `Feature`.

---

## 🚀 Usage

### Import

```js
const GeoJSONShadowGenerator = require('geojson-shadow-generator');
```

### Example

```js
const geojson = require('./yourGeoJSON.json');

const generator = new GeoJSONShadowGenerator(geojson, 'elevation');

// Using direct sun angles
const shadows1 = generator.getShadowGeometries({
  type: 'direct',
  sunAzimuth: 135,        // degrees from north, clockwise
  sunElevation: 30        // degrees above horizon
});

// Using date-time and automatic sun position
const shadows2 = generator.getShadowGeometries({
  type: 'datetime',
  date: '2025-06-01T10:00:00Z'
});
```

---

## 🔧 Constructor

```ts
new GeoJSONShadowGenerator(geojson: FeatureCollection | Feature, elevationPropertyName?: string)
```

| Parameter               | Type      | Required | Description                                                                                     |
| ----------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------- |
| `geojson`               | `GeoJSON` | ✅        | Input Feature or FeatureCollection with `Polygon` or `MultiPolygon` geometries.                 |
| `elevationPropertyName` | `string`  | ❌        | Property name in feature `properties` that holds the elevation value. Default is `'elevation'`. |

---

## ⚙️ getShadowGeometries(options)

Generates shadow geometries.

### Options

| Key            | Type                       | Required                          | Description                                                              |
| -------------- | -------------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| `type`         | `'direct'` \| `'datetime'` | ❌                                 | Type of shadow calculation. Default: `'direct'`.                         |
| `sunAzimuth`   | `number`                   | Required if `type === 'direct'`   | Azimuth angle (degrees from north, clockwise).                           |
| `sunElevation` | `number`                   | Required if `type === 'direct'`   | Sun elevation angle (degrees above horizon).                             |
| `date`         | `string` (ISO format)      | Required if `type === 'datetime'` | ISO date-time string used to calculate sun position from GeoJSON center. |

---

## 📄 GeoJSON Requirements

* Input must be a valid **GeoJSON Feature** or **FeatureCollection**.
* Geometry type must be **Polygon** or **MultiPolygon**.
* Each feature must have a numeric `elevation` property (or custom property if set via constructor).

Example of a valid feature:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [27.09, 38.45],
        [27.10, 38.45],
        [27.10, 38.46],
        [27.09, 38.46],
        [27.09, 38.45]
      ]
    ]
  },
  "properties": {
    "elevation": 50
  }
}
```

---

## 🧠 Behind the Scenes

* Uses `suncalc` to compute sun azimuth and elevation from date and latitude/longitude.
* Projects coordinates to EPSG:3857 to perform shadow translation in meters.
* Offsets geometry using the solar vector and elevation.
* Combines the original and translated geometries to form shadows.
* Uses Turf's `convex`, `difference`, and `union` functions.

---

## 🧪 Testing

Example test case:

```js
const test = new GeoJSONShadowGenerator(geojson, 'elevation');

const result1 = test.getShadowGeometries({
  type: 'datetime',
  date: '2025-05-31T14:30:00'
});

const result2 = test.getShadowGeometries({
  type: 'direct',
  sunAzimuth: 50,
  sunElevation: 45
});
```

---

## 📤 Output

The returned result is a GeoJSON `FeatureCollection` that represents the **shadow geometries** of the input features.

---

## 📦 Dependencies

This package uses the following libraries:

* [`@turf/union`](https://www.npmjs.com/package/@turf/union)
* [`@turf/difference`](https://www.npmjs.com/package/@turf/difference)
* [`@turf/center`](https://www.npmjs.com/package/@turf/center)
* [`@turf/convex`](https://www.npmjs.com/package/@turf/convex)
* [`@turf/helpers`](https://www.npmjs.com/package/@turf/helpers)
* [`geojson-validation`](https://www.npmjs.com/package/geojson-validation)
* [`proj4`](https://www.npmjs.com/package/proj4)
* [`suncalc`](https://www.npmjs.com/package/suncalc)

---

## 🛡️ License

MIT © 2025 - Your Name

---

## 💡 Tip

You can visualize the shadow outputs using:

* [geojson.io](http://geojson.io/)
* [Kepler.gl](https://kepler.gl/)
* Or web map libraries like Leaflet, Mapbox GL, or OpenLayers.
