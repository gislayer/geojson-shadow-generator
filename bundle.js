(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/geojson-validation/index.js
  var require_geojson_validation = __commonJS({
    "node_modules/geojson-validation/index.js"(exports) {
      var definitions = {};
      function isFunction(object) {
        return typeof object === "function";
      }
      function isObject(object) {
        return object === Object(object);
      }
      function _done(trace, message) {
        let valid = false;
        if (typeof message === "string") {
          message = [message];
        } else if (Object.prototype.toString.call(message) === "[object Array]") {
          if (message.length === 0) {
            valid = true;
          }
        } else {
          valid = true;
        }
        if (trace) {
          return message;
        } else {
          return valid;
        }
      }
      function _customDefinitions(type, object) {
        let errors;
        if (isFunction(definitions[type])) {
          try {
            errors = definitions[type](object);
          } catch (e) {
            errors = ["Problem with custom definition for " + type + ": " + e];
          }
          if (typeof result === "string") {
            errors = [errors];
          }
          if (Object.prototype.toString.call(errors) === "[object Array]") {
            return errors;
          }
        }
        return [];
      }
      exports.define = (type, definition) => {
        if (type in allTypes && isFunction(definition)) {
          definitions[type] = definition;
          return true;
        } else {
          return false;
        }
      };
      exports.isPosition = (position, trace = false) => {
        let errors = [];
        if (Array.isArray(position)) {
          if (position.length <= 1) {
            errors.push("Position must be at least two elements");
          }
          position.forEach((pos, index) => {
            if (typeof pos !== "number") {
              errors.push("Position must only contain numbers. Item " + pos + " at index " + index + " is invalid.");
            }
          });
        } else {
          errors.push("Position must be an array");
        }
        errors = errors.concat(_customDefinitions("Position", position));
        return _done(trace, errors);
      };
      exports.isGeoJSONObject = exports.valid = (geoJSONObject, trace = false) => {
        if (!isObject(geoJSONObject)) {
          return _done(trace, ["must be a JSON Object"]);
        } else {
          let errors = [];
          if ("type" in geoJSONObject) {
            if (nonGeoTypes[geoJSONObject.type]) {
              return nonGeoTypes[geoJSONObject.type](geoJSONObject, trace);
            } else if (geoTypes[geoJSONObject.type]) {
              return geoTypes[geoJSONObject.type](geoJSONObject, trace);
            } else {
              errors.push('type must be one of: "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection", "Feature", or "FeatureCollection"');
            }
          } else {
            errors.push('must have a member with the name "type"');
          }
          errors = errors.concat(_customDefinitions("GeoJSONObject", geoJSONObject));
          return _done(trace, errors);
        }
      };
      exports.isGeometryObject = (geometryObject, trace = false) => {
        if (!isObject(geometryObject)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("type" in geometryObject) {
          if (geoTypes[geometryObject.type]) {
            return geoTypes[geometryObject.type](geometryObject, trace);
          } else {
            errors.push('type must be one of: "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon" or "GeometryCollection"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        errors = errors.concat(_customDefinitions("GeometryObject", geometryObject));
        return _done(trace, errors);
      };
      exports.isPoint = (point, trace = false) => {
        if (!isObject(point)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in point) {
          const t = exports.isBbox(point.bbox, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        }
        if ("type" in point) {
          if (point.type !== "Point") {
            errors.push('type must be "Point"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if ("coordinates" in point) {
          const t = exports.isPosition(point.coordinates, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        } else {
          errors.push('must have a member with the name "coordinates"');
        }
        errors = errors.concat(_customDefinitions("Point", point));
        return _done(trace, errors);
      };
      exports.isMultiPointCoor = (coordinates, trace = false) => {
        let errors = [];
        if (Array.isArray(coordinates)) {
          coordinates.forEach((val, index) => {
            const t = exports.isPosition(val, true);
            if (t.length) {
              t[0] = "at " + index + ": ".concat(t[0]);
              errors = errors.concat(t);
            }
          });
        } else {
          errors.push("coordinates must be an array");
        }
        return _done(trace, errors);
      };
      exports.isMultiPoint = (multiPoint, trace = false) => {
        if (!isObject(multiPoint)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in multiPoint) {
          const t = exports.isBbox(multiPoint.bbox, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        }
        if ("type" in multiPoint) {
          if (multiPoint.type !== "MultiPoint") {
            errors.push('type must be "MultiPoint"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if ("coordinates" in multiPoint) {
          const t = exports.isMultiPointCoor(multiPoint.coordinates, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        } else {
          errors.push('must have a member with the name "coordinates"');
        }
        errors = errors.concat(_customDefinitions("MultiPoint", multiPoint));
        return _done(trace, errors);
      };
      exports.isLineStringCoor = (coordinates, trace = false) => {
        let errors = [];
        if (Array.isArray(coordinates)) {
          if (coordinates.length > 1) {
            coordinates.forEach((val, index) => {
              const t = exports.isPosition(val, true);
              if (t.length) {
                t[0] = "at " + index + ": ".concat(t[0]);
                errors = errors.concat(t);
              }
            });
          } else {
            errors.push("coordinates must have at least two elements");
          }
        } else {
          errors.push("coordinates must be an array");
        }
        return _done(trace, errors);
      };
      exports.isLineString = (lineString, trace = false) => {
        if (!isObject(lineString)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in lineString) {
          const t = exports.isBbox(lineString.bbox, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        }
        if ("type" in lineString) {
          if (lineString.type !== "LineString") {
            errors.push('type must be "LineString"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if ("coordinates" in lineString) {
          const t = exports.isLineStringCoor(lineString.coordinates, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        } else {
          errors.push('must have a member with the name "coordinates"');
        }
        errors = errors.concat(_customDefinitions("LineString", lineString));
        return _done(trace, errors);
      };
      exports.isMultiLineStringCoor = (coordinates, trace = false) => {
        let errors = [];
        if (Array.isArray(coordinates)) {
          coordinates.forEach((val, index) => {
            const t = exports.isLineStringCoor(val, true);
            if (t.length) {
              t[0] = "at " + index + ": ".concat(t[0]);
              errors = errors.concat(t);
            }
          });
        } else {
          errors.push("coordinates must be an array");
        }
        return _done(trace, errors);
      };
      exports.isMultiLineString = (multilineString, trace = false) => {
        if (!isObject(multilineString)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in multilineString) {
          const t = exports.isBbox(multilineString.bbox, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        }
        if ("type" in multilineString) {
          if (multilineString.type !== "MultiLineString") {
            errors.push('type must be "MultiLineString"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if ("coordinates" in multilineString) {
          const t = exports.isMultiLineStringCoor(multilineString.coordinates, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        } else {
          errors.push('must have a member with the name "coordinates"');
        }
        errors = errors.concat(_customDefinitions("MultiPoint", multilineString));
        return _done(trace, errors);
      };
      function _linearRingCoor(coordinates, trace) {
        let errors = [];
        if (Array.isArray(coordinates)) {
          coordinates.forEach((val, index) => {
            const t = exports.isPosition(val, true);
            if (t.length) {
              t[0] = "at " + index + ": ".concat(t[0]);
              errors = errors.concat(t);
            }
          });
          if (coordinates[0].toString() !== coordinates[coordinates.length - 1].toString()) {
            errors.push("The first and last positions must be equivalent");
          }
          if (coordinates.length < 4) {
            errors.push("coordinates must have at least four positions");
          }
        } else {
          errors.push("coordinates must be an array");
        }
        return _done(trace, errors);
      }
      exports.isPolygonCoor = (coordinates, trace = false) => {
        let errors = [];
        if (Array.isArray(coordinates)) {
          coordinates.forEach((val, index) => {
            const t = _linearRingCoor(val, true);
            if (t.length) {
              t[0] = "at " + index + ": ".concat(t[0]);
              errors = errors.concat(t);
            }
          });
        } else {
          errors.push("coordinates must be an array");
        }
        return _done(trace, errors);
      };
      exports.isPolygon = (polygon, trace = false) => {
        if (!isObject(polygon)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in polygon) {
          const t = exports.isBbox(polygon.bbox, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        }
        if ("type" in polygon) {
          if (polygon.type !== "Polygon") {
            errors.push('type must be "Polygon"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if ("coordinates" in polygon) {
          const t = exports.isPolygonCoor(polygon.coordinates, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        } else {
          errors.push('must have a member with the name "coordinates"');
        }
        errors = errors.concat(_customDefinitions("Polygon", polygon));
        return _done(trace, errors);
      };
      exports.isMultiPolygonCoor = (coordinates, trace = false) => {
        let errors = [];
        if (Array.isArray(coordinates)) {
          coordinates.forEach((val, index) => {
            const t = exports.isPolygonCoor(val, true);
            if (t.length) {
              t[0] = "at " + index + ": ".concat(t[0]);
              errors = errors.concat(t);
            }
          });
        } else {
          errors.push("coordinates must be an array");
        }
        return _done(trace, errors);
      };
      exports.isMultiPolygon = (multiPolygon, trace = false) => {
        if (!isObject(multiPolygon)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in multiPolygon) {
          const t = exports.isBbox(multiPolygon.bbox, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        }
        if ("type" in multiPolygon) {
          if (multiPolygon.type !== "MultiPolygon") {
            errors.push('type must be "MultiPolygon"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if ("coordinates" in multiPolygon) {
          const t = exports.isMultiPolygonCoor(multiPolygon.coordinates, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        } else {
          errors.push('must have a member with the name "coordinates"');
        }
        errors = errors.concat(_customDefinitions("MultiPolygon", multiPolygon));
        return _done(trace, errors);
      };
      exports.isGeometryCollection = (geometryCollection, trace = false) => {
        if (!isObject(geometryCollection)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in geometryCollection) {
          const t = exports.isBbox(geometryCollection.bbox, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        }
        if ("type" in geometryCollection) {
          if (geometryCollection.type !== "GeometryCollection") {
            errors.push('type must be "GeometryCollection"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if ("geometries" in geometryCollection) {
          if (Array.isArray(geometryCollection.geometries)) {
            geometryCollection.geometries.forEach((val, index) => {
              const t = exports.isGeometryObject(val, true);
              if (t.length) {
                t[0] = "at " + index + ": ".concat(t[0]);
                errors = errors.concat(t);
              }
            });
          } else {
            errors.push('"geometries" must be an array');
          }
        } else {
          errors.push('must have a member with the name "geometries"');
        }
        errors = errors.concat(_customDefinitions("GeometryCollection", geometryCollection));
        return _done(trace, errors);
      };
      exports.isFeature = (feature, trace = false) => {
        if (!isObject(feature)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in feature) {
          const t = exports.isBbox(feature.bbox, true);
          if (t.length) {
            errors = errors.concat(t);
          }
        }
        if ("type" in feature) {
          if (feature.type !== "Feature") {
            errors.push('type must be "Feature"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if (!("properties" in feature)) {
          errors.push('must have a member with the name "properties"');
        }
        if ("geometry" in feature) {
          if (feature.geometry !== null) {
            const t = exports.isGeometryObject(feature.geometry, true);
            if (t.length) {
              errors = errors.concat(t);
            }
          }
        } else {
          errors.push('must have a member with the name "geometry"');
        }
        errors = errors.concat(_customDefinitions("Feature", feature));
        return _done(trace, errors);
      };
      exports.isFeatureCollection = (featureCollection, trace = false) => {
        if (!isObject(featureCollection)) {
          return _done(trace, ["must be a JSON Object"]);
        }
        let errors = [];
        if ("bbox" in featureCollection) {
          const t = exports.isBbox(featureCollection.bbox, true);
          if (t.length) {
            errors = t;
          }
        }
        if ("type" in featureCollection) {
          if (featureCollection.type !== "FeatureCollection") {
            errors.push('type must be "FeatureCollection"');
          }
        } else {
          errors.push('must have a member with the name "type"');
        }
        if ("features" in featureCollection) {
          if (Array.isArray(featureCollection.features)) {
            featureCollection.features.forEach((val, index) => {
              const t = exports.isFeature(val, true);
              if (t.length) {
                t[0] = "at " + index + ": ".concat(t[0]);
                errors = errors.concat(t);
              }
            });
          } else {
            errors.push('"Features" must be an array');
          }
        } else {
          errors.push('must have a member with the name "Features"');
        }
        errors = errors.concat(_customDefinitions("FeatureCollection", featureCollection));
        return _done(trace, errors);
      };
      exports.isBbox = (bbox, trace = false) => {
        let errors = [];
        if (Array.isArray(bbox)) {
          if (bbox.length % 2 !== 0) {
            errors.push("bbox, must be a 2*n array");
          }
        } else {
          errors.push("bbox must be an array");
        }
        errors = errors.concat(_customDefinitions("Bbox", bbox));
        return _done(trace, errors);
      };
      var nonGeoTypes = {
        "Feature": exports.isFeature,
        "FeatureCollection": exports.isFeatureCollection
      };
      var geoTypes = {
        "Point": exports.isPoint,
        "MultiPoint": exports.isMultiPoint,
        "LineString": exports.isLineString,
        "MultiLineString": exports.isMultiLineString,
        "Polygon": exports.isPolygon,
        "MultiPolygon": exports.isMultiPolygon,
        "GeometryCollection": exports.isGeometryCollection
      };
      var allTypes = {
        "Feature": exports.isFeature,
        "FeatureCollection": exports.isFeatureCollection,
        "Point": exports.isPoint,
        "MultiPoint": exports.isMultiPoint,
        "LineString": exports.isLineString,
        "MultiLineString": exports.isMultiLineString,
        "Polygon": exports.isPolygon,
        "MultiPolygon": exports.isMultiPolygon,
        "GeometryCollection": exports.isGeometryCollection,
        "Bbox": exports.isBbox,
        "Position": exports.isPosition,
        "GeoJSON": exports.isGeoJSONObject,
        "GeometryObject": exports.isGeometryObject
      };
      exports.allTypes = allTypes;
    }
  });

  // node_modules/bignumber.js/bignumber.js
  var require_bignumber = __commonJS({
    "node_modules/bignumber.js/bignumber.js"(exports, module) {
      (function(globalObject) {
        "use strict";
        var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
        function clone(configObject) {
          var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
            prefix: "",
            groupSize: 3,
            secondaryGroupSize: 0,
            groupSeparator: ",",
            decimalSeparator: ".",
            fractionGroupSize: 0,
            fractionGroupSeparator: "\xA0",
            // non-breaking space
            suffix: ""
          }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
          function BigNumber2(v, b) {
            var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
            if (!(x instanceof BigNumber2)) return new BigNumber2(v, b);
            if (b == null) {
              if (v && v._isBigNumber === true) {
                x.s = v.s;
                if (!v.c || v.e > MAX_EXP) {
                  x.c = x.e = null;
                } else if (v.e < MIN_EXP) {
                  x.c = [x.e = 0];
                } else {
                  x.e = v.e;
                  x.c = v.c.slice();
                }
                return;
              }
              if ((isNum = typeof v == "number") && v * 0 == 0) {
                x.s = 1 / v < 0 ? (v = -v, -1) : 1;
                if (v === ~~v) {
                  for (e = 0, i = v; i >= 10; i /= 10, e++) ;
                  if (e > MAX_EXP) {
                    x.c = x.e = null;
                  } else {
                    x.e = e;
                    x.c = [v];
                  }
                  return;
                }
                str = String(v);
              } else {
                if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
                x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
              }
              if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
              if ((i = str.search(/e/i)) > 0) {
                if (e < 0) e = i;
                e += +str.slice(i + 1);
                str = str.substring(0, i);
              } else if (e < 0) {
                e = str.length;
              }
            } else {
              intCheck(b, 2, ALPHABET.length, "Base");
              if (b == 10 && alphabetHasNormalDecimalDigits) {
                x = new BigNumber2(v);
                return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
              }
              str = String(v);
              if (isNum = typeof v == "number") {
                if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
                x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
                if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                  throw Error(tooManyDigits + v);
                }
              } else {
                x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
              }
              alphabet = ALPHABET.slice(0, b);
              e = i = 0;
              for (len = str.length; i < len; i++) {
                if (alphabet.indexOf(c = str.charAt(i)) < 0) {
                  if (c == ".") {
                    if (i > e) {
                      e = len;
                      continue;
                    }
                  } else if (!caseChanged) {
                    if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                      caseChanged = true;
                      i = -1;
                      e = 0;
                      continue;
                    }
                  }
                  return parseNumeric(x, String(v), isNum, b);
                }
              }
              isNum = false;
              str = convertBase(str, b, 10, x.s);
              if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
              else e = str.length;
            }
            for (i = 0; str.charCodeAt(i) === 48; i++) ;
            for (len = str.length; str.charCodeAt(--len) === 48; ) ;
            if (str = str.slice(i, ++len)) {
              len -= i;
              if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
                throw Error(tooManyDigits + x.s * v);
              }
              if ((e = e - i - 1) > MAX_EXP) {
                x.c = x.e = null;
              } else if (e < MIN_EXP) {
                x.c = [x.e = 0];
              } else {
                x.e = e;
                x.c = [];
                i = (e + 1) % LOG_BASE;
                if (e < 0) i += LOG_BASE;
                if (i < len) {
                  if (i) x.c.push(+str.slice(0, i));
                  for (len -= LOG_BASE; i < len; ) {
                    x.c.push(+str.slice(i, i += LOG_BASE));
                  }
                  i = LOG_BASE - (str = str.slice(i)).length;
                } else {
                  i -= len;
                }
                for (; i--; str += "0") ;
                x.c.push(+str);
              }
            } else {
              x.c = [x.e = 0];
            }
          }
          BigNumber2.clone = clone;
          BigNumber2.ROUND_UP = 0;
          BigNumber2.ROUND_DOWN = 1;
          BigNumber2.ROUND_CEIL = 2;
          BigNumber2.ROUND_FLOOR = 3;
          BigNumber2.ROUND_HALF_UP = 4;
          BigNumber2.ROUND_HALF_DOWN = 5;
          BigNumber2.ROUND_HALF_EVEN = 6;
          BigNumber2.ROUND_HALF_CEIL = 7;
          BigNumber2.ROUND_HALF_FLOOR = 8;
          BigNumber2.EUCLID = 9;
          BigNumber2.config = BigNumber2.set = function(obj) {
            var p, v;
            if (obj != null) {
              if (typeof obj == "object") {
                if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                  v = obj[p];
                  intCheck(v, 0, MAX, p);
                  DECIMAL_PLACES = v;
                }
                if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                  v = obj[p];
                  intCheck(v, 0, 8, p);
                  ROUNDING_MODE = v;
                }
                if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                  v = obj[p];
                  if (v && v.pop) {
                    intCheck(v[0], -MAX, 0, p);
                    intCheck(v[1], 0, MAX, p);
                    TO_EXP_NEG = v[0];
                    TO_EXP_POS = v[1];
                  } else {
                    intCheck(v, -MAX, MAX, p);
                    TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
                  }
                }
                if (obj.hasOwnProperty(p = "RANGE")) {
                  v = obj[p];
                  if (v && v.pop) {
                    intCheck(v[0], -MAX, -1, p);
                    intCheck(v[1], 1, MAX, p);
                    MIN_EXP = v[0];
                    MAX_EXP = v[1];
                  } else {
                    intCheck(v, -MAX, MAX, p);
                    if (v) {
                      MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                    } else {
                      throw Error(bignumberError + p + " cannot be zero: " + v);
                    }
                  }
                }
                if (obj.hasOwnProperty(p = "CRYPTO")) {
                  v = obj[p];
                  if (v === !!v) {
                    if (v) {
                      if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                        CRYPTO = v;
                      } else {
                        CRYPTO = !v;
                        throw Error(bignumberError + "crypto unavailable");
                      }
                    } else {
                      CRYPTO = v;
                    }
                  } else {
                    throw Error(bignumberError + p + " not true or false: " + v);
                  }
                }
                if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                  v = obj[p];
                  intCheck(v, 0, 9, p);
                  MODULO_MODE = v;
                }
                if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                  v = obj[p];
                  intCheck(v, 0, MAX, p);
                  POW_PRECISION = v;
                }
                if (obj.hasOwnProperty(p = "FORMAT")) {
                  v = obj[p];
                  if (typeof v == "object") FORMAT = v;
                  else throw Error(bignumberError + p + " not an object: " + v);
                }
                if (obj.hasOwnProperty(p = "ALPHABET")) {
                  v = obj[p];
                  if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                    alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
                    ALPHABET = v;
                  } else {
                    throw Error(bignumberError + p + " invalid: " + v);
                  }
                }
              } else {
                throw Error(bignumberError + "Object expected: " + obj);
              }
            }
            return {
              DECIMAL_PLACES,
              ROUNDING_MODE,
              EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
              RANGE: [MIN_EXP, MAX_EXP],
              CRYPTO,
              MODULO_MODE,
              POW_PRECISION,
              FORMAT,
              ALPHABET
            };
          };
          BigNumber2.isBigNumber = function(v) {
            if (!v || v._isBigNumber !== true) return false;
            if (!BigNumber2.DEBUG) return true;
            var i, n, c = v.c, e = v.e, s = v.s;
            out: if ({}.toString.call(c) == "[object Array]") {
              if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
                if (c[0] === 0) {
                  if (e === 0 && c.length === 1) return true;
                  break out;
                }
                i = (e + 1) % LOG_BASE;
                if (i < 1) i += LOG_BASE;
                if (String(c[0]).length == i) {
                  for (i = 0; i < c.length; i++) {
                    n = c[i];
                    if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
                  }
                  if (n !== 0) return true;
                }
              }
            } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
              return true;
            }
            throw Error(bignumberError + "Invalid BigNumber: " + v);
          };
          BigNumber2.maximum = BigNumber2.max = function() {
            return maxOrMin(arguments, -1);
          };
          BigNumber2.minimum = BigNumber2.min = function() {
            return maxOrMin(arguments, 1);
          };
          BigNumber2.random = function() {
            var pow2_53 = 9007199254740992;
            var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
              return mathfloor(Math.random() * pow2_53);
            } : function() {
              return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
            };
            return function(dp) {
              var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
              if (dp == null) dp = DECIMAL_PLACES;
              else intCheck(dp, 0, MAX);
              k = mathceil(dp / LOG_BASE);
              if (CRYPTO) {
                if (crypto.getRandomValues) {
                  a = crypto.getRandomValues(new Uint32Array(k *= 2));
                  for (; i < k; ) {
                    v = a[i] * 131072 + (a[i + 1] >>> 11);
                    if (v >= 9e15) {
                      b = crypto.getRandomValues(new Uint32Array(2));
                      a[i] = b[0];
                      a[i + 1] = b[1];
                    } else {
                      c.push(v % 1e14);
                      i += 2;
                    }
                  }
                  i = k / 2;
                } else if (crypto.randomBytes) {
                  a = crypto.randomBytes(k *= 7);
                  for (; i < k; ) {
                    v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                    if (v >= 9e15) {
                      crypto.randomBytes(7).copy(a, i);
                    } else {
                      c.push(v % 1e14);
                      i += 7;
                    }
                  }
                  i = k / 7;
                } else {
                  CRYPTO = false;
                  throw Error(bignumberError + "crypto unavailable");
                }
              }
              if (!CRYPTO) {
                for (; i < k; ) {
                  v = random53bitInt();
                  if (v < 9e15) c[i++] = v % 1e14;
                }
              }
              k = c[--i];
              dp %= LOG_BASE;
              if (k && dp) {
                v = POWS_TEN[LOG_BASE - dp];
                c[i] = mathfloor(k / v) * v;
              }
              for (; c[i] === 0; c.pop(), i--) ;
              if (i < 0) {
                c = [e = 0];
              } else {
                for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) ;
                for (i = 1, v = c[0]; v >= 10; v /= 10, i++) ;
                if (i < LOG_BASE) e -= LOG_BASE - i;
              }
              rand.e = e;
              rand.c = c;
              return rand;
            };
          }();
          BigNumber2.sum = function() {
            var i = 1, args = arguments, sum = new BigNumber2(args[0]);
            for (; i < args.length; ) sum = sum.plus(args[i++]);
            return sum;
          };
          convertBase = /* @__PURE__ */ function() {
            var decimal = "0123456789";
            function toBaseOut(str, baseIn, baseOut, alphabet) {
              var j, arr = [0], arrL, i = 0, len = str.length;
              for (; i < len; ) {
                for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
                arr[0] += alphabet.indexOf(str.charAt(i++));
                for (j = 0; j < arr.length; j++) {
                  if (arr[j] > baseOut - 1) {
                    if (arr[j + 1] == null) arr[j + 1] = 0;
                    arr[j + 1] += arr[j] / baseOut | 0;
                    arr[j] %= baseOut;
                  }
                }
              }
              return arr.reverse();
            }
            return function(str, baseIn, baseOut, sign, callerIsToString) {
              var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
              if (i >= 0) {
                k = POW_PRECISION;
                POW_PRECISION = 0;
                str = str.replace(".", "");
                y = new BigNumber2(baseIn);
                x = y.pow(str.length - i);
                POW_PRECISION = k;
                y.c = toBaseOut(
                  toFixedPoint(coeffToString(x.c), x.e, "0"),
                  10,
                  baseOut,
                  decimal
                );
                y.e = y.c.length;
              }
              xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
              e = k = xc.length;
              for (; xc[--k] == 0; xc.pop()) ;
              if (!xc[0]) return alphabet.charAt(0);
              if (i < 0) {
                --e;
              } else {
                x.c = xc;
                x.e = e;
                x.s = sign;
                x = div(x, y, dp, rm, baseOut);
                xc = x.c;
                r = x.r;
                e = x.e;
              }
              d = e + dp + 1;
              i = xc[d];
              k = baseOut / 2;
              r = r || d < 0 || xc[d + 1] != null;
              r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
              if (d < 1 || !xc[0]) {
                str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
              } else {
                xc.length = d;
                if (r) {
                  for (--baseOut; ++xc[--d] > baseOut; ) {
                    xc[d] = 0;
                    if (!d) {
                      ++e;
                      xc = [1].concat(xc);
                    }
                  }
                }
                for (k = xc.length; !xc[--k]; ) ;
                for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++])) ;
                str = toFixedPoint(str, e, alphabet.charAt(0));
              }
              return str;
            };
          }();
          div = /* @__PURE__ */ function() {
            function multiply(x, k, base) {
              var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
              for (x = x.slice(); i--; ) {
                xlo = x[i] % SQRT_BASE;
                xhi = x[i] / SQRT_BASE | 0;
                m = khi * xlo + xhi * klo;
                temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
                carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
                x[i] = temp % base;
              }
              if (carry) x = [carry].concat(x);
              return x;
            }
            function compare2(a, b, aL, bL) {
              var i, cmp;
              if (aL != bL) {
                cmp = aL > bL ? 1 : -1;
              } else {
                for (i = cmp = 0; i < aL; i++) {
                  if (a[i] != b[i]) {
                    cmp = a[i] > b[i] ? 1 : -1;
                    break;
                  }
                }
              }
              return cmp;
            }
            function subtract(a, b, aL, base) {
              var i = 0;
              for (; aL--; ) {
                a[aL] -= i;
                i = a[aL] < b[aL] ? 1 : 0;
                a[aL] = i * base + a[aL] - b[aL];
              }
              for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
            }
            return function(x, y, dp, rm, base) {
              var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
              if (!xc || !xc[0] || !yc || !yc[0]) {
                return new BigNumber2(
                  // Return NaN if either NaN, or both Infinity or 0.
                  !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                    // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                    xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                  )
                );
              }
              q = new BigNumber2(s);
              qc = q.c = [];
              e = x.e - y.e;
              s = dp + e + 1;
              if (!base) {
                base = BASE;
                e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
                s = s / LOG_BASE | 0;
              }
              for (i = 0; yc[i] == (xc[i] || 0); i++) ;
              if (yc[i] > (xc[i] || 0)) e--;
              if (s < 0) {
                qc.push(1);
                more = true;
              } else {
                xL = xc.length;
                yL = yc.length;
                i = 0;
                s += 2;
                n = mathfloor(base / (yc[0] + 1));
                if (n > 1) {
                  yc = multiply(yc, n, base);
                  xc = multiply(xc, n, base);
                  yL = yc.length;
                  xL = xc.length;
                }
                xi = yL;
                rem = xc.slice(0, yL);
                remL = rem.length;
                for (; remL < yL; rem[remL++] = 0) ;
                yz = yc.slice();
                yz = [0].concat(yz);
                yc0 = yc[0];
                if (yc[1] >= base / 2) yc0++;
                do {
                  n = 0;
                  cmp = compare2(yc, rem, yL, remL);
                  if (cmp < 0) {
                    rem0 = rem[0];
                    if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                    n = mathfloor(rem0 / yc0);
                    if (n > 1) {
                      if (n >= base) n = base - 1;
                      prod = multiply(yc, n, base);
                      prodL = prod.length;
                      remL = rem.length;
                      while (compare2(prod, rem, prodL, remL) == 1) {
                        n--;
                        subtract(prod, yL < prodL ? yz : yc, prodL, base);
                        prodL = prod.length;
                        cmp = 1;
                      }
                    } else {
                      if (n == 0) {
                        cmp = n = 1;
                      }
                      prod = yc.slice();
                      prodL = prod.length;
                    }
                    if (prodL < remL) prod = [0].concat(prod);
                    subtract(rem, prod, remL, base);
                    remL = rem.length;
                    if (cmp == -1) {
                      while (compare2(yc, rem, yL, remL) < 1) {
                        n++;
                        subtract(rem, yL < remL ? yz : yc, remL, base);
                        remL = rem.length;
                      }
                    }
                  } else if (cmp === 0) {
                    n++;
                    rem = [0];
                  }
                  qc[i++] = n;
                  if (rem[0]) {
                    rem[remL++] = xc[xi] || 0;
                  } else {
                    rem = [xc[xi]];
                    remL = 1;
                  }
                } while ((xi++ < xL || rem[0] != null) && s--);
                more = rem[0] != null;
                if (!qc[0]) qc.splice(0, 1);
              }
              if (base == BASE) {
                for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
                round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
              } else {
                q.e = e;
                q.r = +more;
              }
              return q;
            };
          }();
          function format(n, i, rm, id) {
            var c0, e, ne, len, str;
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck(rm, 0, 8);
            if (!n.c) return n.toString();
            c0 = n.c[0];
            ne = n.e;
            if (i == null) {
              str = coeffToString(n.c);
              str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
            } else {
              n = round(new BigNumber2(n), i, rm);
              e = n.e;
              str = coeffToString(n.c);
              len = str.length;
              if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
                for (; len < i; str += "0", len++) ;
                str = toExponential(str, e);
              } else {
                i -= ne;
                str = toFixedPoint(str, e, "0");
                if (e + 1 > len) {
                  if (--i > 0) for (str += "."; i--; str += "0") ;
                } else {
                  i += e - len;
                  if (i > 0) {
                    if (e + 1 == len) str += ".";
                    for (; i--; str += "0") ;
                  }
                }
              }
            }
            return n.s < 0 && c0 ? "-" + str : str;
          }
          function maxOrMin(args, n) {
            var k, y, i = 1, x = new BigNumber2(args[0]);
            for (; i < args.length; i++) {
              y = new BigNumber2(args[i]);
              if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
                x = y;
              }
            }
            return x;
          }
          function normalise(n, c, e) {
            var i = 1, j = c.length;
            for (; !c[--j]; c.pop()) ;
            for (j = c[0]; j >= 10; j /= 10, i++) ;
            if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
              n.c = n.e = null;
            } else if (e < MIN_EXP) {
              n.c = [n.e = 0];
            } else {
              n.e = e;
              n.c = c;
            }
            return n;
          }
          parseNumeric = /* @__PURE__ */ function() {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
            return function(x, str, isNum, b) {
              var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
              if (isInfinityOrNaN.test(s)) {
                x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
              } else {
                if (!isNum) {
                  s = s.replace(basePrefix, function(m, p1, p2) {
                    base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                    return !b || b == base ? p1 : m;
                  });
                  if (b) {
                    base = b;
                    s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                  }
                  if (str != s) return new BigNumber2(s, base);
                }
                if (BigNumber2.DEBUG) {
                  throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
                }
                x.s = null;
              }
              x.c = x.e = null;
            };
          }();
          function round(x, sd, rm, r) {
            var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
            if (xc) {
              out: {
                for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) ;
                i = sd - d;
                if (i < 0) {
                  i += LOG_BASE;
                  j = sd;
                  n = xc[ni = 0];
                  rd = mathfloor(n / pows10[d - j - 1] % 10);
                } else {
                  ni = mathceil((i + 1) / LOG_BASE);
                  if (ni >= xc.length) {
                    if (r) {
                      for (; xc.length <= ni; xc.push(0)) ;
                      n = rd = 0;
                      d = 1;
                      i %= LOG_BASE;
                      j = i - LOG_BASE + 1;
                    } else {
                      break out;
                    }
                  } else {
                    n = k = xc[ni];
                    for (d = 1; k >= 10; k /= 10, d++) ;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + d;
                    rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
                  }
                }
                r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
                // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
                // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
                r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
                (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
                if (sd < 1 || !xc[0]) {
                  xc.length = 0;
                  if (r) {
                    sd -= x.e + 1;
                    xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                    x.e = -sd || 0;
                  } else {
                    xc[0] = x.e = 0;
                  }
                  return x;
                }
                if (i == 0) {
                  xc.length = ni;
                  k = 1;
                  ni--;
                } else {
                  xc.length = ni + 1;
                  k = pows10[LOG_BASE - i];
                  xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
                }
                if (r) {
                  for (; ; ) {
                    if (ni == 0) {
                      for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) ;
                      j = xc[0] += k;
                      for (k = 1; j >= 10; j /= 10, k++) ;
                      if (i != k) {
                        x.e++;
                        if (xc[0] == BASE) xc[0] = 1;
                      }
                      break;
                    } else {
                      xc[ni] += k;
                      if (xc[ni] != BASE) break;
                      xc[ni--] = 0;
                      k = 1;
                    }
                  }
                }
                for (i = xc.length; xc[--i] === 0; xc.pop()) ;
              }
              if (x.e > MAX_EXP) {
                x.c = x.e = null;
              } else if (x.e < MIN_EXP) {
                x.c = [x.e = 0];
              }
            }
            return x;
          }
          function valueOf(n) {
            var str, e = n.e;
            if (e === null) return n.toString();
            str = coeffToString(n.c);
            str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
            return n.s < 0 ? "-" + str : str;
          }
          P.absoluteValue = P.abs = function() {
            var x = new BigNumber2(this);
            if (x.s < 0) x.s = 1;
            return x;
          };
          P.comparedTo = function(y, b) {
            return compare(this, new BigNumber2(y, b));
          };
          P.decimalPlaces = P.dp = function(dp, rm) {
            var c, n, v, x = this;
            if (dp != null) {
              intCheck(dp, 0, MAX);
              if (rm == null) rm = ROUNDING_MODE;
              else intCheck(rm, 0, 8);
              return round(new BigNumber2(x), dp + x.e + 1, rm);
            }
            if (!(c = x.c)) return null;
            n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
            if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) ;
            if (n < 0) n = 0;
            return n;
          };
          P.dividedBy = P.div = function(y, b) {
            return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
          };
          P.dividedToIntegerBy = P.idiv = function(y, b) {
            return div(this, new BigNumber2(y, b), 0, 1);
          };
          P.exponentiatedBy = P.pow = function(n, m) {
            var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
            n = new BigNumber2(n);
            if (n.c && !n.isInteger()) {
              throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
            }
            if (m != null) m = new BigNumber2(m);
            nIsBig = n.e > 14;
            if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
              y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
              return m ? y.mod(m) : y;
            }
            nIsNeg = n.s < 0;
            if (m) {
              if (m.c ? !m.c[0] : !m.s) return new BigNumber2(NaN);
              isModExp = !nIsNeg && x.isInteger() && m.isInteger();
              if (isModExp) x = x.mod(m);
            } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
              k = x.s < 0 && isOdd(n) ? -0 : 0;
              if (x.e > -1) k = 1 / k;
              return new BigNumber2(nIsNeg ? 1 / k : k);
            } else if (POW_PRECISION) {
              k = mathceil(POW_PRECISION / LOG_BASE + 2);
            }
            if (nIsBig) {
              half = new BigNumber2(0.5);
              if (nIsNeg) n.s = 1;
              nIsOdd = isOdd(n);
            } else {
              i = Math.abs(+valueOf(n));
              nIsOdd = i % 2;
            }
            y = new BigNumber2(ONE);
            for (; ; ) {
              if (nIsOdd) {
                y = y.times(x);
                if (!y.c) break;
                if (k) {
                  if (y.c.length > k) y.c.length = k;
                } else if (isModExp) {
                  y = y.mod(m);
                }
              }
              if (i) {
                i = mathfloor(i / 2);
                if (i === 0) break;
                nIsOdd = i % 2;
              } else {
                n = n.times(half);
                round(n, n.e + 1, 1);
                if (n.e > 14) {
                  nIsOdd = isOdd(n);
                } else {
                  i = +valueOf(n);
                  if (i === 0) break;
                  nIsOdd = i % 2;
                }
              }
              x = x.times(x);
              if (k) {
                if (x.c && x.c.length > k) x.c.length = k;
              } else if (isModExp) {
                x = x.mod(m);
              }
            }
            if (isModExp) return y;
            if (nIsNeg) y = ONE.div(y);
            return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
          };
          P.integerValue = function(rm) {
            var n = new BigNumber2(this);
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck(rm, 0, 8);
            return round(n, n.e + 1, rm);
          };
          P.isEqualTo = P.eq = function(y, b) {
            return compare(this, new BigNumber2(y, b)) === 0;
          };
          P.isFinite = function() {
            return !!this.c;
          };
          P.isGreaterThan = P.gt = function(y, b) {
            return compare(this, new BigNumber2(y, b)) > 0;
          };
          P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
            return (b = compare(this, new BigNumber2(y, b))) === 1 || b === 0;
          };
          P.isInteger = function() {
            return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
          };
          P.isLessThan = P.lt = function(y, b) {
            return compare(this, new BigNumber2(y, b)) < 0;
          };
          P.isLessThanOrEqualTo = P.lte = function(y, b) {
            return (b = compare(this, new BigNumber2(y, b))) === -1 || b === 0;
          };
          P.isNaN = function() {
            return !this.s;
          };
          P.isNegative = function() {
            return this.s < 0;
          };
          P.isPositive = function() {
            return this.s > 0;
          };
          P.isZero = function() {
            return !!this.c && this.c[0] == 0;
          };
          P.minus = function(y, b) {
            var i, j, t, xLTy, x = this, a = x.s;
            y = new BigNumber2(y, b);
            b = y.s;
            if (!a || !b) return new BigNumber2(NaN);
            if (a != b) {
              y.s = -b;
              return x.plus(y);
            }
            var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
            if (!xe || !ye) {
              if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
              if (!xc[0] || !yc[0]) {
                return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
                  // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                  ROUNDING_MODE == 3 ? -0 : 0
                ));
              }
            }
            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();
            if (a = xe - ye) {
              if (xLTy = a < 0) {
                a = -a;
                t = xc;
              } else {
                ye = xe;
                t = yc;
              }
              t.reverse();
              for (b = a; b--; t.push(0)) ;
              t.reverse();
            } else {
              j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
              for (a = b = 0; b < j; b++) {
                if (xc[b] != yc[b]) {
                  xLTy = xc[b] < yc[b];
                  break;
                }
              }
            }
            if (xLTy) {
              t = xc;
              xc = yc;
              yc = t;
              y.s = -y.s;
            }
            b = (j = yc.length) - (i = xc.length);
            if (b > 0) for (; b--; xc[i++] = 0) ;
            b = BASE - 1;
            for (; j > a; ) {
              if (xc[--j] < yc[j]) {
                for (i = j; i && !xc[--i]; xc[i] = b) ;
                --xc[i];
                xc[j] += BASE;
              }
              xc[j] -= yc[j];
            }
            for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
            if (!xc[0]) {
              y.s = ROUNDING_MODE == 3 ? -1 : 1;
              y.c = [y.e = 0];
              return y;
            }
            return normalise(y, xc, ye);
          };
          P.modulo = P.mod = function(y, b) {
            var q, s, x = this;
            y = new BigNumber2(y, b);
            if (!x.c || !y.s || y.c && !y.c[0]) {
              return new BigNumber2(NaN);
            } else if (!y.c || x.c && !x.c[0]) {
              return new BigNumber2(x);
            }
            if (MODULO_MODE == 9) {
              s = y.s;
              y.s = 1;
              q = div(x, y, 0, 3);
              y.s = s;
              q.s *= s;
            } else {
              q = div(x, y, 0, MODULO_MODE);
            }
            y = x.minus(q.times(y));
            if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
            return y;
          };
          P.multipliedBy = P.times = function(y, b) {
            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
            if (!xc || !yc || !xc[0] || !yc[0]) {
              if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
                y.c = y.e = y.s = null;
              } else {
                y.s *= x.s;
                if (!xc || !yc) {
                  y.c = y.e = null;
                } else {
                  y.c = [0];
                  y.e = 0;
                }
              }
              return y;
            }
            e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
            y.s *= x.s;
            xcL = xc.length;
            ycL = yc.length;
            if (xcL < ycL) {
              zc = xc;
              xc = yc;
              yc = zc;
              i = xcL;
              xcL = ycL;
              ycL = i;
            }
            for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
            base = BASE;
            sqrtBase = SQRT_BASE;
            for (i = ycL; --i >= 0; ) {
              c = 0;
              ylo = yc[i] % sqrtBase;
              yhi = yc[i] / sqrtBase | 0;
              for (k = xcL, j = i + k; j > i; ) {
                xlo = xc[--k] % sqrtBase;
                xhi = xc[k] / sqrtBase | 0;
                m = yhi * xlo + xhi * ylo;
                xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
                c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
                zc[j--] = xlo % base;
              }
              zc[j] = c;
            }
            if (c) {
              ++e;
            } else {
              zc.splice(0, 1);
            }
            return normalise(y, zc, e);
          };
          P.negated = function() {
            var x = new BigNumber2(this);
            x.s = -x.s || null;
            return x;
          };
          P.plus = function(y, b) {
            var t, x = this, a = x.s;
            y = new BigNumber2(y, b);
            b = y.s;
            if (!a || !b) return new BigNumber2(NaN);
            if (a != b) {
              y.s = -b;
              return x.minus(y);
            }
            var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
            if (!xe || !ye) {
              if (!xc || !yc) return new BigNumber2(a / 0);
              if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
            }
            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();
            if (a = xe - ye) {
              if (a > 0) {
                ye = xe;
                t = yc;
              } else {
                a = -a;
                t = xc;
              }
              t.reverse();
              for (; a--; t.push(0)) ;
              t.reverse();
            }
            a = xc.length;
            b = yc.length;
            if (a - b < 0) {
              t = yc;
              yc = xc;
              xc = t;
              b = a;
            }
            for (a = 0; b; ) {
              a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
              xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
            }
            if (a) {
              xc = [a].concat(xc);
              ++ye;
            }
            return normalise(y, xc, ye);
          };
          P.precision = P.sd = function(sd, rm) {
            var c, n, v, x = this;
            if (sd != null && sd !== !!sd) {
              intCheck(sd, 1, MAX);
              if (rm == null) rm = ROUNDING_MODE;
              else intCheck(rm, 0, 8);
              return round(new BigNumber2(x), sd, rm);
            }
            if (!(c = x.c)) return null;
            v = c.length - 1;
            n = v * LOG_BASE + 1;
            if (v = c[v]) {
              for (; v % 10 == 0; v /= 10, n--) ;
              for (v = c[0]; v >= 10; v /= 10, n++) ;
            }
            if (sd && x.e + 1 > n) n = x.e + 1;
            return n;
          };
          P.shiftedBy = function(k) {
            intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
            return this.times("1e" + k);
          };
          P.squareRoot = P.sqrt = function() {
            var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
            if (s !== 1 || !c || !c[0]) {
              return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
            }
            s = Math.sqrt(+valueOf(x));
            if (s == 0 || s == 1 / 0) {
              n = coeffToString(c);
              if ((n.length + e) % 2 == 0) n += "0";
              s = Math.sqrt(+n);
              e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
              if (s == 1 / 0) {
                n = "5e" + e;
              } else {
                n = s.toExponential();
                n = n.slice(0, n.indexOf("e") + 1) + e;
              }
              r = new BigNumber2(n);
            } else {
              r = new BigNumber2(s + "");
            }
            if (r.c[0]) {
              e = r.e;
              s = e + dp;
              if (s < 3) s = 0;
              for (; ; ) {
                t = r;
                r = half.times(t.plus(div(x, t, dp, 1)));
                if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                  if (r.e < e) --s;
                  n = n.slice(s - 3, s + 1);
                  if (n == "9999" || !rep && n == "4999") {
                    if (!rep) {
                      round(t, t.e + DECIMAL_PLACES + 2, 0);
                      if (t.times(t).eq(x)) {
                        r = t;
                        break;
                      }
                    }
                    dp += 4;
                    s += 4;
                    rep = 1;
                  } else {
                    if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                      round(r, r.e + DECIMAL_PLACES + 2, 1);
                      m = !r.times(r).eq(x);
                    }
                    break;
                  }
                }
              }
            }
            return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
          };
          P.toExponential = function(dp, rm) {
            if (dp != null) {
              intCheck(dp, 0, MAX);
              dp++;
            }
            return format(this, dp, rm, 1);
          };
          P.toFixed = function(dp, rm) {
            if (dp != null) {
              intCheck(dp, 0, MAX);
              dp = dp + this.e + 1;
            }
            return format(this, dp, rm);
          };
          P.toFormat = function(dp, rm, format2) {
            var str, x = this;
            if (format2 == null) {
              if (dp != null && rm && typeof rm == "object") {
                format2 = rm;
                rm = null;
              } else if (dp && typeof dp == "object") {
                format2 = dp;
                dp = rm = null;
              } else {
                format2 = FORMAT;
              }
            } else if (typeof format2 != "object") {
              throw Error(bignumberError + "Argument not an object: " + format2);
            }
            str = x.toFixed(dp, rm);
            if (x.c) {
              var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
              if (g2) {
                i = g1;
                g1 = g2;
                g2 = i;
                len -= i;
              }
              if (g1 > 0 && len > 0) {
                i = len % g1 || g1;
                intPart = intDigits.substr(0, i);
                for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
                if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
                if (isNeg) intPart = "-" + intPart;
              }
              str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
                new RegExp("\\d{" + g2 + "}\\B", "g"),
                "$&" + (format2.fractionGroupSeparator || "")
              ) : fractionPart) : intPart;
            }
            return (format2.prefix || "") + str + (format2.suffix || "");
          };
          P.toFraction = function(md) {
            var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
            if (md != null) {
              n = new BigNumber2(md);
              if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
                throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
              }
            }
            if (!xc) return new BigNumber2(x);
            d = new BigNumber2(ONE);
            n1 = d0 = new BigNumber2(ONE);
            d1 = n0 = new BigNumber2(ONE);
            s = coeffToString(xc);
            e = d.e = s.length - x.e - 1;
            d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
            md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n = new BigNumber2(s);
            n0.c[0] = 0;
            for (; ; ) {
              q = div(n, d, 0, 1);
              d2 = d0.plus(q.times(d1));
              if (d2.comparedTo(md) == 1) break;
              d0 = d1;
              d1 = d2;
              n1 = n0.plus(q.times(d2 = n1));
              n0 = d2;
              d = n.minus(q.times(d2 = d));
              n = d2;
            }
            d2 = div(md.minus(d0), d1, 0, 1);
            n0 = n0.plus(d2.times(n1));
            d0 = d0.plus(d2.times(d1));
            n0.s = n1.s = x.s;
            e = e * 2;
            r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
              div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
            ) < 1 ? [n1, d1] : [n0, d0];
            MAX_EXP = exp;
            return r;
          };
          P.toNumber = function() {
            return +valueOf(this);
          };
          P.toPrecision = function(sd, rm) {
            if (sd != null) intCheck(sd, 1, MAX);
            return format(this, sd, rm, 2);
          };
          P.toString = function(b) {
            var str, n = this, s = n.s, e = n.e;
            if (e === null) {
              if (s) {
                str = "Infinity";
                if (s < 0) str = "-" + str;
              } else {
                str = "NaN";
              }
            } else {
              if (b == null) {
                str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
              } else if (b === 10 && alphabetHasNormalDecimalDigits) {
                n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
                str = toFixedPoint(coeffToString(n.c), n.e, "0");
              } else {
                intCheck(b, 2, ALPHABET.length, "Base");
                str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
              }
              if (s < 0 && n.c[0]) str = "-" + str;
            }
            return str;
          };
          P.valueOf = P.toJSON = function() {
            return valueOf(this);
          };
          P._isBigNumber = true;
          if (configObject != null) BigNumber2.set(configObject);
          return BigNumber2;
        }
        function bitFloor(n) {
          var i = n | 0;
          return n > 0 || n === i ? i : i - 1;
        }
        function coeffToString(a) {
          var s, z, i = 1, j = a.length, r = a[0] + "";
          for (; i < j; ) {
            s = a[i++] + "";
            z = LOG_BASE - s.length;
            for (; z--; s = "0" + s) ;
            r += s;
          }
          for (j = r.length; r.charCodeAt(--j) === 48; ) ;
          return r.slice(0, j + 1 || 1);
        }
        function compare(x, y) {
          var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
          if (!i || !j) return null;
          a = xc && !xc[0];
          b = yc && !yc[0];
          if (a || b) return a ? b ? 0 : -j : i;
          if (i != j) return i;
          a = i < 0;
          b = k == l;
          if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;
          if (!b) return k > l ^ a ? 1 : -1;
          j = (k = xc.length) < (l = yc.length) ? k : l;
          for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
          return k == l ? 0 : k > l ^ a ? 1 : -1;
        }
        function intCheck(n, min, max, name) {
          if (n < min || n > max || n !== mathfloor(n)) {
            throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
          }
        }
        function isOdd(n) {
          var k = n.c.length - 1;
          return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
        }
        function toExponential(str, e) {
          return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
        }
        function toFixedPoint(str, e, z) {
          var len, zs;
          if (e < 0) {
            for (zs = z + "."; ++e; zs += z) ;
            str = zs + str;
          } else {
            len = str.length;
            if (++e > len) {
              for (zs = z, e -= len; --e; zs += z) ;
              str += zs;
            } else if (e < len) {
              str = str.slice(0, e) + "." + str.slice(e);
            }
          }
          return str;
        }
        BigNumber = clone();
        BigNumber["default"] = BigNumber.BigNumber = BigNumber;
        if (typeof define == "function" && define.amd) {
          define(function() {
            return BigNumber;
          });
        } else if (typeof module != "undefined" && module.exports) {
          module.exports = BigNumber;
        } else {
          if (!globalObject) {
            globalObject = typeof self != "undefined" && self ? self : window;
          }
          globalObject.BigNumber = BigNumber;
        }
      })(exports);
    }
  });

  // node_modules/splaytree-ts/dist/cjs/index.cjs
  var require_cjs = __commonJS({
    "node_modules/splaytree-ts/dist/cjs/index.cjs"(exports, module) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var src_exports = {};
      __export(src_exports, {
        SplayTreeMap: () => SplayTreeMap,
        SplayTreeSet: () => SplayTreeSet
      });
      module.exports = __toCommonJS(src_exports);
      var SplayTreeNode = class {
        key;
        left = null;
        right = null;
        constructor(key) {
          this.key = key;
        }
      };
      var SplayTreeSetNode = class extends SplayTreeNode {
        constructor(key) {
          super(key);
        }
      };
      var SplayTreeMapNode = class _SplayTreeMapNode extends SplayTreeNode {
        value;
        constructor(key, value) {
          super(key);
          this.value = value;
        }
        replaceValue(value) {
          const node = new _SplayTreeMapNode(this.key, value);
          node.left = this.left;
          node.right = this.right;
          return node;
        }
      };
      var SplayTree = class {
        size = 0;
        modificationCount = 0;
        splayCount = 0;
        splay(key) {
          const root = this.root;
          if (root == null) {
            this.compare(key, key);
            return -1;
          }
          let right = null;
          let newTreeRight = null;
          let left = null;
          let newTreeLeft = null;
          let current = root;
          const compare = this.compare;
          let comp;
          while (true) {
            comp = compare(current.key, key);
            if (comp > 0) {
              let currentLeft = current.left;
              if (currentLeft == null) break;
              comp = compare(currentLeft.key, key);
              if (comp > 0) {
                current.left = currentLeft.right;
                currentLeft.right = current;
                current = currentLeft;
                currentLeft = current.left;
                if (currentLeft == null) break;
              }
              if (right == null) {
                newTreeRight = current;
              } else {
                right.left = current;
              }
              right = current;
              current = currentLeft;
            } else if (comp < 0) {
              let currentRight = current.right;
              if (currentRight == null) break;
              comp = compare(currentRight.key, key);
              if (comp < 0) {
                current.right = currentRight.left;
                currentRight.left = current;
                current = currentRight;
                currentRight = current.right;
                if (currentRight == null) break;
              }
              if (left == null) {
                newTreeLeft = current;
              } else {
                left.right = current;
              }
              left = current;
              current = currentRight;
            } else {
              break;
            }
          }
          if (left != null) {
            left.right = current.left;
            current.left = newTreeLeft;
          }
          if (right != null) {
            right.left = current.right;
            current.right = newTreeRight;
          }
          if (this.root !== current) {
            this.root = current;
            this.splayCount++;
          }
          return comp;
        }
        splayMin(node) {
          let current = node;
          let nextLeft = current.left;
          while (nextLeft != null) {
            const left = nextLeft;
            current.left = left.right;
            left.right = current;
            current = left;
            nextLeft = current.left;
          }
          return current;
        }
        splayMax(node) {
          let current = node;
          let nextRight = current.right;
          while (nextRight != null) {
            const right = nextRight;
            current.right = right.left;
            right.left = current;
            current = right;
            nextRight = current.right;
          }
          return current;
        }
        _delete(key) {
          if (this.root == null) return null;
          const comp = this.splay(key);
          if (comp != 0) return null;
          let root = this.root;
          const result2 = root;
          const left = root.left;
          this.size--;
          if (left == null) {
            this.root = root.right;
          } else {
            const right = root.right;
            root = this.splayMax(left);
            root.right = right;
            this.root = root;
          }
          this.modificationCount++;
          return result2;
        }
        addNewRoot(node, comp) {
          this.size++;
          this.modificationCount++;
          const root = this.root;
          if (root == null) {
            this.root = node;
            return;
          }
          if (comp < 0) {
            node.left = root;
            node.right = root.right;
            root.right = null;
          } else {
            node.right = root;
            node.left = root.left;
            root.left = null;
          }
          this.root = node;
        }
        _first() {
          const root = this.root;
          if (root == null) return null;
          this.root = this.splayMin(root);
          return this.root;
        }
        _last() {
          const root = this.root;
          if (root == null) return null;
          this.root = this.splayMax(root);
          return this.root;
        }
        clear() {
          this.root = null;
          this.size = 0;
          this.modificationCount++;
        }
        has(key) {
          return this.validKey(key) && this.splay(key) == 0;
        }
        defaultCompare() {
          return (a, b) => a < b ? -1 : a > b ? 1 : 0;
        }
        wrap() {
          return {
            getRoot: () => {
              return this.root;
            },
            setRoot: (root) => {
              this.root = root;
            },
            getSize: () => {
              return this.size;
            },
            getModificationCount: () => {
              return this.modificationCount;
            },
            getSplayCount: () => {
              return this.splayCount;
            },
            setSplayCount: (count) => {
              this.splayCount = count;
            },
            splay: (key) => {
              return this.splay(key);
            },
            has: (key) => {
              return this.has(key);
            }
          };
        }
      };
      var SplayTreeMap = class extends SplayTree {
        root = null;
        compare;
        validKey;
        constructor(compare, isValidKey) {
          super();
          this.compare = compare ?? this.defaultCompare();
          this.validKey = isValidKey ?? ((a) => a != null && a != void 0);
        }
        delete(key) {
          if (!this.validKey(key)) return false;
          return this._delete(key) != null;
        }
        forEach(f) {
          const nodes = new SplayTreeMapEntryIterableIterator(this.wrap());
          let result2;
          while (result2 = nodes.next(), !result2.done) {
            f(result2.value[1], result2.value[0], this);
          }
        }
        get(key) {
          if (!this.validKey(key)) return void 0;
          if (this.root != null) {
            const comp = this.splay(key);
            if (comp == 0) {
              return this.root.value;
            }
          }
          return void 0;
        }
        hasValue(value) {
          const initialSplayCount = this.splayCount;
          const visit = (node) => {
            while (node != null) {
              if (node.value == value) return true;
              if (initialSplayCount != this.splayCount) {
                throw "Concurrent modification during iteration.";
              }
              if (node.right != null && visit(node.right)) {
                return true;
              }
              node = node.left;
            }
            return false;
          };
          return visit(this.root);
        }
        set(key, value) {
          const comp = this.splay(key);
          if (comp == 0) {
            this.root = this.root.replaceValue(value);
            this.splayCount += 1;
            return this;
          }
          this.addNewRoot(new SplayTreeMapNode(key, value), comp);
          return this;
        }
        setAll(other) {
          other.forEach((value, key) => {
            this.set(key, value);
          });
        }
        setIfAbsent(key, ifAbsent) {
          let comp = this.splay(key);
          if (comp == 0) {
            return this.root.value;
          }
          const modificationCount = this.modificationCount;
          const splayCount = this.splayCount;
          const value = ifAbsent();
          if (modificationCount != this.modificationCount) {
            throw "Concurrent modification during iteration.";
          }
          if (splayCount != this.splayCount) {
            comp = this.splay(key);
          }
          this.addNewRoot(new SplayTreeMapNode(key, value), comp);
          return value;
        }
        isEmpty() {
          return this.root == null;
        }
        isNotEmpty() {
          return !this.isEmpty();
        }
        firstKey() {
          if (this.root == null) return null;
          return this._first().key;
        }
        lastKey() {
          if (this.root == null) return null;
          return this._last().key;
        }
        lastKeyBefore(key) {
          if (key == null) throw "Invalid arguments(s)";
          if (this.root == null) return null;
          const comp = this.splay(key);
          if (comp < 0) return this.root.key;
          let node = this.root.left;
          if (node == null) return null;
          let nodeRight = node.right;
          while (nodeRight != null) {
            node = nodeRight;
            nodeRight = node.right;
          }
          return node.key;
        }
        firstKeyAfter(key) {
          if (key == null) throw "Invalid arguments(s)";
          if (this.root == null) return null;
          const comp = this.splay(key);
          if (comp > 0) return this.root.key;
          let node = this.root.right;
          if (node == null) return null;
          let nodeLeft = node.left;
          while (nodeLeft != null) {
            node = nodeLeft;
            nodeLeft = node.left;
          }
          return node.key;
        }
        update(key, update, ifAbsent) {
          let comp = this.splay(key);
          if (comp == 0) {
            const modificationCount = this.modificationCount;
            const splayCount = this.splayCount;
            const newValue = update(this.root.value);
            if (modificationCount != this.modificationCount) {
              throw "Concurrent modification during iteration.";
            }
            if (splayCount != this.splayCount) {
              this.splay(key);
            }
            this.root = this.root.replaceValue(newValue);
            this.splayCount += 1;
            return newValue;
          }
          if (ifAbsent != null) {
            const modificationCount = this.modificationCount;
            const splayCount = this.splayCount;
            const newValue = ifAbsent();
            if (modificationCount != this.modificationCount) {
              throw "Concurrent modification during iteration.";
            }
            if (splayCount != this.splayCount) {
              comp = this.splay(key);
            }
            this.addNewRoot(new SplayTreeMapNode(key, newValue), comp);
            return newValue;
          }
          throw "Invalid argument (key): Key not in map.";
        }
        updateAll(update) {
          const root = this.root;
          if (root == null) return;
          const iterator = new SplayTreeMapEntryIterableIterator(this.wrap());
          let node;
          while (node = iterator.next(), !node.done) {
            const newValue = update(...node.value);
            iterator.replaceValue(newValue);
          }
        }
        keys() {
          return new SplayTreeKeyIterableIterator(this.wrap());
        }
        values() {
          return new SplayTreeValueIterableIterator(this.wrap());
        }
        entries() {
          return this[Symbol.iterator]();
        }
        [Symbol.iterator]() {
          return new SplayTreeMapEntryIterableIterator(this.wrap());
        }
        [Symbol.toStringTag] = "[object Map]";
      };
      var SplayTreeSet = class _SplayTreeSet extends SplayTree {
        root = null;
        compare;
        validKey;
        constructor(compare, isValidKey) {
          super();
          this.compare = compare ?? this.defaultCompare();
          this.validKey = isValidKey ?? ((v) => v != null && v != void 0);
        }
        delete(element) {
          if (!this.validKey(element)) return false;
          return this._delete(element) != null;
        }
        deleteAll(elements) {
          for (const element of elements) {
            this.delete(element);
          }
        }
        forEach(f) {
          const nodes = this[Symbol.iterator]();
          let result2;
          while (result2 = nodes.next(), !result2.done) {
            f(result2.value, result2.value, this);
          }
        }
        add(element) {
          const compare = this.splay(element);
          if (compare != 0) this.addNewRoot(new SplayTreeSetNode(element), compare);
          return this;
        }
        addAndReturn(element) {
          const compare = this.splay(element);
          if (compare != 0) this.addNewRoot(new SplayTreeSetNode(element), compare);
          return this.root.key;
        }
        addAll(elements) {
          for (const element of elements) {
            this.add(element);
          }
        }
        isEmpty() {
          return this.root == null;
        }
        isNotEmpty() {
          return this.root != null;
        }
        single() {
          if (this.size == 0) throw "Bad state: No element";
          if (this.size > 1) throw "Bad state: Too many element";
          return this.root.key;
        }
        first() {
          if (this.size == 0) throw "Bad state: No element";
          return this._first().key;
        }
        last() {
          if (this.size == 0) throw "Bad state: No element";
          return this._last().key;
        }
        lastBefore(element) {
          if (element == null) throw "Invalid arguments(s)";
          if (this.root == null) return null;
          const comp = this.splay(element);
          if (comp < 0) return this.root.key;
          let node = this.root.left;
          if (node == null) return null;
          let nodeRight = node.right;
          while (nodeRight != null) {
            node = nodeRight;
            nodeRight = node.right;
          }
          return node.key;
        }
        firstAfter(element) {
          if (element == null) throw "Invalid arguments(s)";
          if (this.root == null) return null;
          const comp = this.splay(element);
          if (comp > 0) return this.root.key;
          let node = this.root.right;
          if (node == null) return null;
          let nodeLeft = node.left;
          while (nodeLeft != null) {
            node = nodeLeft;
            nodeLeft = node.left;
          }
          return node.key;
        }
        retainAll(elements) {
          const retainSet = new _SplayTreeSet(this.compare, this.validKey);
          const modificationCount = this.modificationCount;
          for (const object of elements) {
            if (modificationCount != this.modificationCount) {
              throw "Concurrent modification during iteration.";
            }
            if (this.validKey(object) && this.splay(object) == 0) {
              retainSet.add(this.root.key);
            }
          }
          if (retainSet.size != this.size) {
            this.root = retainSet.root;
            this.size = retainSet.size;
            this.modificationCount++;
          }
        }
        lookup(object) {
          if (!this.validKey(object)) return null;
          const comp = this.splay(object);
          if (comp != 0) return null;
          return this.root.key;
        }
        intersection(other) {
          const result2 = new _SplayTreeSet(this.compare, this.validKey);
          for (const element of this) {
            if (other.has(element)) result2.add(element);
          }
          return result2;
        }
        difference(other) {
          const result2 = new _SplayTreeSet(this.compare, this.validKey);
          for (const element of this) {
            if (!other.has(element)) result2.add(element);
          }
          return result2;
        }
        union(other) {
          const u = this.clone();
          u.addAll(other);
          return u;
        }
        clone() {
          const set = new _SplayTreeSet(this.compare, this.validKey);
          set.size = this.size;
          set.root = this.copyNode(this.root);
          return set;
        }
        copyNode(node) {
          if (node == null) return null;
          function copyChildren(node2, dest) {
            let left;
            let right;
            do {
              left = node2.left;
              right = node2.right;
              if (left != null) {
                const newLeft = new SplayTreeSetNode(left.key);
                dest.left = newLeft;
                copyChildren(left, newLeft);
              }
              if (right != null) {
                const newRight = new SplayTreeSetNode(right.key);
                dest.right = newRight;
                node2 = right;
                dest = newRight;
              }
            } while (right != null);
          }
          const result2 = new SplayTreeSetNode(node.key);
          copyChildren(node, result2);
          return result2;
        }
        toSet() {
          return this.clone();
        }
        entries() {
          return new SplayTreeSetEntryIterableIterator(this.wrap());
        }
        keys() {
          return this[Symbol.iterator]();
        }
        values() {
          return this[Symbol.iterator]();
        }
        [Symbol.iterator]() {
          return new SplayTreeKeyIterableIterator(this.wrap());
        }
        [Symbol.toStringTag] = "[object Set]";
      };
      var SplayTreeIterableIterator = class {
        tree;
        path = new Array();
        modificationCount = null;
        splayCount;
        constructor(tree) {
          this.tree = tree;
          this.splayCount = tree.getSplayCount();
        }
        [Symbol.iterator]() {
          return this;
        }
        next() {
          if (this.moveNext()) return { done: false, value: this.current() };
          return { done: true, value: null };
        }
        current() {
          if (!this.path.length) return null;
          const node = this.path[this.path.length - 1];
          return this.getValue(node);
        }
        rebuildPath(key) {
          this.path.splice(0, this.path.length);
          this.tree.splay(key);
          this.path.push(this.tree.getRoot());
          this.splayCount = this.tree.getSplayCount();
        }
        findLeftMostDescendent(node) {
          while (node != null) {
            this.path.push(node);
            node = node.left;
          }
        }
        moveNext() {
          if (this.modificationCount != this.tree.getModificationCount()) {
            if (this.modificationCount == null) {
              this.modificationCount = this.tree.getModificationCount();
              let node2 = this.tree.getRoot();
              while (node2 != null) {
                this.path.push(node2);
                node2 = node2.left;
              }
              return this.path.length > 0;
            }
            throw "Concurrent modification during iteration.";
          }
          if (!this.path.length) return false;
          if (this.splayCount != this.tree.getSplayCount()) {
            this.rebuildPath(this.path[this.path.length - 1].key);
          }
          let node = this.path[this.path.length - 1];
          let next = node.right;
          if (next != null) {
            while (next != null) {
              this.path.push(next);
              next = next.left;
            }
            return true;
          }
          this.path.pop();
          while (this.path.length && this.path[this.path.length - 1].right === node) {
            node = this.path.pop();
          }
          return this.path.length > 0;
        }
      };
      var SplayTreeKeyIterableIterator = class extends SplayTreeIterableIterator {
        getValue(node) {
          return node.key;
        }
      };
      var SplayTreeSetEntryIterableIterator = class extends SplayTreeIterableIterator {
        getValue(node) {
          return [node.key, node.key];
        }
      };
      var SplayTreeValueIterableIterator = class extends SplayTreeIterableIterator {
        constructor(map) {
          super(map);
        }
        getValue(node) {
          return node.value;
        }
      };
      var SplayTreeMapEntryIterableIterator = class extends SplayTreeIterableIterator {
        constructor(map) {
          super(map);
        }
        getValue(node) {
          return [node.key, node.value];
        }
        replaceValue(value) {
          if (this.modificationCount != this.tree.getModificationCount()) {
            throw "Concurrent modification during iteration.";
          }
          if (this.splayCount != this.tree.getSplayCount()) {
            this.rebuildPath(this.path[this.path.length - 1].key);
          }
          const last = this.path.pop();
          const newLast = last.replaceValue(value);
          if (!this.path.length) {
            this.tree.setRoot(newLast);
          } else {
            const parent = this.path[this.path.length - 1];
            if (last === parent.left) {
              parent.left = newLast;
            } else {
              parent.right = newLast;
            }
          }
          this.path.push(newLast);
          const count = this.tree.getSplayCount() + 1;
          this.tree.setSplayCount(count);
          this.splayCount = count;
        }
      };
    }
  });

  // node_modules/polyclip-ts/dist/cjs/index.cjs
  var require_cjs2 = __commonJS({
    "node_modules/polyclip-ts/dist/cjs/index.cjs"(exports, module) {
      "use strict";
      var __create2 = Object.create;
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __getProtoOf2 = Object.getPrototypeOf;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var src_exports = {};
      __export(src_exports, {
        difference: () => difference,
        intersection: () => intersection2,
        setPrecision: () => setPrecision,
        union: () => union,
        xor: () => xor
      });
      module.exports = __toCommonJS(src_exports);
      var import_bignumber2 = __toESM2(require_bignumber(), 1);
      var constant_default = (x) => {
        return () => {
          return x;
        };
      };
      var compare_default = (eps) => {
        const almostEqual = eps ? (a, b) => b.minus(a).abs().isLessThanOrEqualTo(eps) : constant_default(false);
        return (a, b) => {
          if (almostEqual(a, b)) return 0;
          return a.comparedTo(b);
        };
      };
      function orient_default(eps) {
        const almostCollinear = eps ? (area2, ax, ay, cx, cy) => area2.exponentiatedBy(2).isLessThanOrEqualTo(
          cx.minus(ax).exponentiatedBy(2).plus(cy.minus(ay).exponentiatedBy(2)).times(eps)
        ) : constant_default(false);
        return (a, b, c) => {
          const ax = a.x, ay = a.y, cx = c.x, cy = c.y;
          const area2 = ay.minus(cy).times(b.x.minus(cx)).minus(ax.minus(cx).times(b.y.minus(cy)));
          if (almostCollinear(area2, ax, ay, cx, cy)) return 0;
          return area2.comparedTo(0);
        };
      }
      var import_bignumber = __toESM2(require_bignumber(), 1);
      var import_splaytree_ts = require_cjs();
      var identity_default = (x) => {
        return x;
      };
      var snap_default = (eps) => {
        if (eps) {
          const xTree = new import_splaytree_ts.SplayTreeSet(compare_default(eps));
          const yTree = new import_splaytree_ts.SplayTreeSet(compare_default(eps));
          const snapCoord = (coord, tree) => {
            return tree.addAndReturn(coord);
          };
          const snap = (v) => {
            return {
              x: snapCoord(v.x, xTree),
              y: snapCoord(v.y, yTree)
            };
          };
          snap({ x: new import_bignumber.default(0), y: new import_bignumber.default(0) });
          return snap;
        }
        return identity_default;
      };
      var set = (eps) => {
        return {
          set: (eps2) => {
            precision = set(eps2);
          },
          reset: () => set(eps),
          compare: compare_default(eps),
          snap: snap_default(eps),
          orient: orient_default(eps)
        };
      };
      var precision = set();
      var isInBbox = (bbox, point) => {
        return bbox.ll.x.isLessThanOrEqualTo(point.x) && point.x.isLessThanOrEqualTo(bbox.ur.x) && bbox.ll.y.isLessThanOrEqualTo(point.y) && point.y.isLessThanOrEqualTo(bbox.ur.y);
      };
      var getBboxOverlap = (b1, b2) => {
        if (b2.ur.x.isLessThan(b1.ll.x) || b1.ur.x.isLessThan(b2.ll.x) || b2.ur.y.isLessThan(b1.ll.y) || b1.ur.y.isLessThan(b2.ll.y))
          return null;
        const lowerX = b1.ll.x.isLessThan(b2.ll.x) ? b2.ll.x : b1.ll.x;
        const upperX = b1.ur.x.isLessThan(b2.ur.x) ? b1.ur.x : b2.ur.x;
        const lowerY = b1.ll.y.isLessThan(b2.ll.y) ? b2.ll.y : b1.ll.y;
        const upperY = b1.ur.y.isLessThan(b2.ur.y) ? b1.ur.y : b2.ur.y;
        return { ll: { x: lowerX, y: lowerY }, ur: { x: upperX, y: upperY } };
      };
      var import_splaytree_ts3 = require_cjs();
      var crossProduct = (a, b) => a.x.times(b.y).minus(a.y.times(b.x));
      var dotProduct = (a, b) => a.x.times(b.x).plus(a.y.times(b.y));
      var length = (v) => dotProduct(v, v).sqrt();
      var sineOfAngle = (pShared, pBase, pAngle) => {
        const vBase = { x: pBase.x.minus(pShared.x), y: pBase.y.minus(pShared.y) };
        const vAngle = { x: pAngle.x.minus(pShared.x), y: pAngle.y.minus(pShared.y) };
        return crossProduct(vAngle, vBase).div(length(vAngle)).div(length(vBase));
      };
      var cosineOfAngle = (pShared, pBase, pAngle) => {
        const vBase = { x: pBase.x.minus(pShared.x), y: pBase.y.minus(pShared.y) };
        const vAngle = { x: pAngle.x.minus(pShared.x), y: pAngle.y.minus(pShared.y) };
        return dotProduct(vAngle, vBase).div(length(vAngle)).div(length(vBase));
      };
      var horizontalIntersection = (pt, v, y) => {
        if (v.y.isZero()) return null;
        return { x: pt.x.plus(v.x.div(v.y).times(y.minus(pt.y))), y };
      };
      var verticalIntersection = (pt, v, x) => {
        if (v.x.isZero()) return null;
        return { x, y: pt.y.plus(v.y.div(v.x).times(x.minus(pt.x))) };
      };
      var intersection = (pt1, v1, pt2, v2) => {
        if (v1.x.isZero()) return verticalIntersection(pt2, v2, pt1.x);
        if (v2.x.isZero()) return verticalIntersection(pt1, v1, pt2.x);
        if (v1.y.isZero()) return horizontalIntersection(pt2, v2, pt1.y);
        if (v2.y.isZero()) return horizontalIntersection(pt1, v1, pt2.y);
        const kross = crossProduct(v1, v2);
        if (kross.isZero()) return null;
        const ve = { x: pt2.x.minus(pt1.x), y: pt2.y.minus(pt1.y) };
        const d1 = crossProduct(ve, v1).div(kross);
        const d2 = crossProduct(ve, v2).div(kross);
        const x1 = pt1.x.plus(d2.times(v1.x)), x2 = pt2.x.plus(d1.times(v2.x));
        const y1 = pt1.y.plus(d2.times(v1.y)), y2 = pt2.y.plus(d1.times(v2.y));
        const x = x1.plus(x2).div(2);
        const y = y1.plus(y2).div(2);
        return { x, y };
      };
      var SweepEvent = class _SweepEvent {
        point;
        isLeft;
        segment;
        otherSE;
        consumedBy;
        // for ordering sweep events in the sweep event queue
        static compare(a, b) {
          const ptCmp = _SweepEvent.comparePoints(a.point, b.point);
          if (ptCmp !== 0) return ptCmp;
          if (a.point !== b.point) a.link(b);
          if (a.isLeft !== b.isLeft) return a.isLeft ? 1 : -1;
          return Segment.compare(a.segment, b.segment);
        }
        // for ordering points in sweep line order
        static comparePoints(aPt, bPt) {
          if (aPt.x.isLessThan(bPt.x)) return -1;
          if (aPt.x.isGreaterThan(bPt.x)) return 1;
          if (aPt.y.isLessThan(bPt.y)) return -1;
          if (aPt.y.isGreaterThan(bPt.y)) return 1;
          return 0;
        }
        // Warning: 'point' input will be modified and re-used (for performance)
        constructor(point, isLeft) {
          if (point.events === void 0) point.events = [this];
          else point.events.push(this);
          this.point = point;
          this.isLeft = isLeft;
        }
        link(other) {
          if (other.point === this.point) {
            throw new Error("Tried to link already linked events");
          }
          const otherEvents = other.point.events;
          for (let i = 0, iMax = otherEvents.length; i < iMax; i++) {
            const evt = otherEvents[i];
            this.point.events.push(evt);
            evt.point = this.point;
          }
          this.checkForConsuming();
        }
        /* Do a pass over our linked events and check to see if any pair
         * of segments match, and should be consumed. */
        checkForConsuming() {
          const numEvents = this.point.events.length;
          for (let i = 0; i < numEvents; i++) {
            const evt1 = this.point.events[i];
            if (evt1.segment.consumedBy !== void 0) continue;
            for (let j = i + 1; j < numEvents; j++) {
              const evt2 = this.point.events[j];
              if (evt2.consumedBy !== void 0) continue;
              if (evt1.otherSE.point.events !== evt2.otherSE.point.events) continue;
              evt1.segment.consume(evt2.segment);
            }
          }
        }
        getAvailableLinkedEvents() {
          const events = [];
          for (let i = 0, iMax = this.point.events.length; i < iMax; i++) {
            const evt = this.point.events[i];
            if (evt !== this && !evt.segment.ringOut && evt.segment.isInResult()) {
              events.push(evt);
            }
          }
          return events;
        }
        /**
         * Returns a comparator function for sorting linked events that will
         * favor the event that will give us the smallest left-side angle.
         * All ring construction starts as low as possible heading to the right,
         * so by always turning left as sharp as possible we'll get polygons
         * without uncessary loops & holes.
         *
         * The comparator function has a compute cache such that it avoids
         * re-computing already-computed values.
         */
        getLeftmostComparator(baseEvent) {
          const cache = /* @__PURE__ */ new Map();
          const fillCache = (linkedEvent) => {
            const nextEvent = linkedEvent.otherSE;
            cache.set(linkedEvent, {
              sine: sineOfAngle(this.point, baseEvent.point, nextEvent.point),
              cosine: cosineOfAngle(this.point, baseEvent.point, nextEvent.point)
            });
          };
          return (a, b) => {
            if (!cache.has(a)) fillCache(a);
            if (!cache.has(b)) fillCache(b);
            const { sine: asine, cosine: acosine } = cache.get(a);
            const { sine: bsine, cosine: bcosine } = cache.get(b);
            if (asine.isGreaterThanOrEqualTo(0) && bsine.isGreaterThanOrEqualTo(0)) {
              if (acosine.isLessThan(bcosine)) return 1;
              if (acosine.isGreaterThan(bcosine)) return -1;
              return 0;
            }
            if (asine.isLessThan(0) && bsine.isLessThan(0)) {
              if (acosine.isLessThan(bcosine)) return -1;
              if (acosine.isGreaterThan(bcosine)) return 1;
              return 0;
            }
            if (bsine.isLessThan(asine)) return -1;
            if (bsine.isGreaterThan(asine)) return 1;
            return 0;
          };
        }
      };
      var RingOut = class _RingOut {
        events;
        poly;
        _isExteriorRing;
        _enclosingRing;
        /* Given the segments from the sweep line pass, compute & return a series
         * of closed rings from all the segments marked to be part of the result */
        static factory(allSegments) {
          const ringsOut = [];
          for (let i = 0, iMax = allSegments.length; i < iMax; i++) {
            const segment = allSegments[i];
            if (!segment.isInResult() || segment.ringOut) continue;
            let prevEvent = null;
            let event = segment.leftSE;
            let nextEvent = segment.rightSE;
            const events = [event];
            const startingPoint = event.point;
            const intersectionLEs = [];
            while (true) {
              prevEvent = event;
              event = nextEvent;
              events.push(event);
              if (event.point === startingPoint) break;
              while (true) {
                const availableLEs = event.getAvailableLinkedEvents();
                if (availableLEs.length === 0) {
                  const firstPt = events[0].point;
                  const lastPt = events[events.length - 1].point;
                  throw new Error(
                    `Unable to complete output ring starting at [${firstPt.x}, ${firstPt.y}]. Last matching segment found ends at [${lastPt.x}, ${lastPt.y}].`
                  );
                }
                if (availableLEs.length === 1) {
                  nextEvent = availableLEs[0].otherSE;
                  break;
                }
                let indexLE = null;
                for (let j = 0, jMax = intersectionLEs.length; j < jMax; j++) {
                  if (intersectionLEs[j].point === event.point) {
                    indexLE = j;
                    break;
                  }
                }
                if (indexLE !== null) {
                  const intersectionLE = intersectionLEs.splice(indexLE)[0];
                  const ringEvents = events.splice(intersectionLE.index);
                  ringEvents.unshift(ringEvents[0].otherSE);
                  ringsOut.push(new _RingOut(ringEvents.reverse()));
                  continue;
                }
                intersectionLEs.push({
                  index: events.length,
                  point: event.point
                });
                const comparator = event.getLeftmostComparator(prevEvent);
                nextEvent = availableLEs.sort(comparator)[0].otherSE;
                break;
              }
            }
            ringsOut.push(new _RingOut(events));
          }
          return ringsOut;
        }
        constructor(events) {
          this.events = events;
          for (let i = 0, iMax = events.length; i < iMax; i++) {
            events[i].segment.ringOut = this;
          }
          this.poly = null;
        }
        getGeom() {
          let prevPt = this.events[0].point;
          const points = [prevPt];
          for (let i = 1, iMax = this.events.length - 1; i < iMax; i++) {
            const pt2 = this.events[i].point;
            const nextPt2 = this.events[i + 1].point;
            if (precision.orient(pt2, prevPt, nextPt2) === 0) continue;
            points.push(pt2);
            prevPt = pt2;
          }
          if (points.length === 1) return null;
          const pt = points[0];
          const nextPt = points[1];
          if (precision.orient(pt, prevPt, nextPt) === 0) points.shift();
          points.push(points[0]);
          const step = this.isExteriorRing() ? 1 : -1;
          const iStart = this.isExteriorRing() ? 0 : points.length - 1;
          const iEnd = this.isExteriorRing() ? points.length : -1;
          const orderedPoints = [];
          for (let i = iStart; i != iEnd; i += step)
            orderedPoints.push([points[i].x.toNumber(), points[i].y.toNumber()]);
          return orderedPoints;
        }
        isExteriorRing() {
          if (this._isExteriorRing === void 0) {
            const enclosing = this.enclosingRing();
            this._isExteriorRing = enclosing ? !enclosing.isExteriorRing() : true;
          }
          return this._isExteriorRing;
        }
        enclosingRing() {
          if (this._enclosingRing === void 0) {
            this._enclosingRing = this._calcEnclosingRing();
          }
          return this._enclosingRing;
        }
        /* Returns the ring that encloses this one, if any */
        _calcEnclosingRing() {
          let leftMostEvt = this.events[0];
          for (let i = 1, iMax = this.events.length; i < iMax; i++) {
            const evt = this.events[i];
            if (SweepEvent.compare(leftMostEvt, evt) > 0) leftMostEvt = evt;
          }
          let prevSeg = leftMostEvt.segment.prevInResult();
          let prevPrevSeg = prevSeg ? prevSeg.prevInResult() : null;
          while (true) {
            if (!prevSeg) return null;
            if (!prevPrevSeg) return prevSeg.ringOut;
            if (prevPrevSeg.ringOut !== prevSeg.ringOut) {
              if (prevPrevSeg.ringOut?.enclosingRing() !== prevSeg.ringOut) {
                return prevSeg.ringOut;
              } else return prevSeg.ringOut?.enclosingRing();
            }
            prevSeg = prevPrevSeg.prevInResult();
            prevPrevSeg = prevSeg ? prevSeg.prevInResult() : null;
          }
        }
      };
      var PolyOut = class {
        exteriorRing;
        interiorRings;
        constructor(exteriorRing) {
          this.exteriorRing = exteriorRing;
          exteriorRing.poly = this;
          this.interiorRings = [];
        }
        addInterior(ring) {
          this.interiorRings.push(ring);
          ring.poly = this;
        }
        getGeom() {
          const geom0 = this.exteriorRing.getGeom();
          if (geom0 === null) return null;
          const geom = [geom0];
          for (let i = 0, iMax = this.interiorRings.length; i < iMax; i++) {
            const ringGeom = this.interiorRings[i].getGeom();
            if (ringGeom === null) continue;
            geom.push(ringGeom);
          }
          return geom;
        }
      };
      var MultiPolyOut = class {
        rings;
        polys;
        constructor(rings) {
          this.rings = rings;
          this.polys = this._composePolys(rings);
        }
        getGeom() {
          const geom = [];
          for (let i = 0, iMax = this.polys.length; i < iMax; i++) {
            const polyGeom = this.polys[i].getGeom();
            if (polyGeom === null) continue;
            geom.push(polyGeom);
          }
          return geom;
        }
        _composePolys(rings) {
          const polys = [];
          for (let i = 0, iMax = rings.length; i < iMax; i++) {
            const ring = rings[i];
            if (ring.poly) continue;
            if (ring.isExteriorRing()) polys.push(new PolyOut(ring));
            else {
              const enclosingRing = ring.enclosingRing();
              if (!enclosingRing?.poly) polys.push(new PolyOut(enclosingRing));
              enclosingRing?.poly?.addInterior(ring);
            }
          }
          return polys;
        }
      };
      var import_splaytree_ts2 = require_cjs();
      var SweepLine = class {
        queue;
        tree;
        segments;
        constructor(queue, comparator = Segment.compare) {
          this.queue = queue;
          this.tree = new import_splaytree_ts2.SplayTreeSet(comparator);
          this.segments = [];
        }
        process(event) {
          const segment = event.segment;
          const newEvents = [];
          if (event.consumedBy) {
            if (event.isLeft) this.queue.delete(event.otherSE);
            else this.tree.delete(segment);
            return newEvents;
          }
          if (event.isLeft) this.tree.add(segment);
          let prevSeg = segment;
          let nextSeg = segment;
          do {
            prevSeg = this.tree.lastBefore(prevSeg);
          } while (prevSeg != null && prevSeg.consumedBy != void 0);
          do {
            nextSeg = this.tree.firstAfter(nextSeg);
          } while (nextSeg != null && nextSeg.consumedBy != void 0);
          if (event.isLeft) {
            let prevMySplitter = null;
            if (prevSeg) {
              const prevInter = prevSeg.getIntersection(segment);
              if (prevInter !== null) {
                if (!segment.isAnEndpoint(prevInter)) prevMySplitter = prevInter;
                if (!prevSeg.isAnEndpoint(prevInter)) {
                  const newEventsFromSplit = this._splitSafely(prevSeg, prevInter);
                  for (let i = 0, iMax = newEventsFromSplit.length; i < iMax; i++) {
                    newEvents.push(newEventsFromSplit[i]);
                  }
                }
              }
            }
            let nextMySplitter = null;
            if (nextSeg) {
              const nextInter = nextSeg.getIntersection(segment);
              if (nextInter !== null) {
                if (!segment.isAnEndpoint(nextInter)) nextMySplitter = nextInter;
                if (!nextSeg.isAnEndpoint(nextInter)) {
                  const newEventsFromSplit = this._splitSafely(nextSeg, nextInter);
                  for (let i = 0, iMax = newEventsFromSplit.length; i < iMax; i++) {
                    newEvents.push(newEventsFromSplit[i]);
                  }
                }
              }
            }
            if (prevMySplitter !== null || nextMySplitter !== null) {
              let mySplitter = null;
              if (prevMySplitter === null) mySplitter = nextMySplitter;
              else if (nextMySplitter === null) mySplitter = prevMySplitter;
              else {
                const cmpSplitters = SweepEvent.comparePoints(
                  prevMySplitter,
                  nextMySplitter
                );
                mySplitter = cmpSplitters <= 0 ? prevMySplitter : nextMySplitter;
              }
              this.queue.delete(segment.rightSE);
              newEvents.push(segment.rightSE);
              const newEventsFromSplit = segment.split(mySplitter);
              for (let i = 0, iMax = newEventsFromSplit.length; i < iMax; i++) {
                newEvents.push(newEventsFromSplit[i]);
              }
            }
            if (newEvents.length > 0) {
              this.tree.delete(segment);
              newEvents.push(event);
            } else {
              this.segments.push(segment);
              segment.prev = prevSeg;
            }
          } else {
            if (prevSeg && nextSeg) {
              const inter = prevSeg.getIntersection(nextSeg);
              if (inter !== null) {
                if (!prevSeg.isAnEndpoint(inter)) {
                  const newEventsFromSplit = this._splitSafely(prevSeg, inter);
                  for (let i = 0, iMax = newEventsFromSplit.length; i < iMax; i++) {
                    newEvents.push(newEventsFromSplit[i]);
                  }
                }
                if (!nextSeg.isAnEndpoint(inter)) {
                  const newEventsFromSplit = this._splitSafely(nextSeg, inter);
                  for (let i = 0, iMax = newEventsFromSplit.length; i < iMax; i++) {
                    newEvents.push(newEventsFromSplit[i]);
                  }
                }
              }
            }
            this.tree.delete(segment);
          }
          return newEvents;
        }
        /* Safely split a segment that is currently in the datastructures
         * IE - a segment other than the one that is currently being processed. */
        _splitSafely(seg, pt) {
          this.tree.delete(seg);
          const rightSE = seg.rightSE;
          this.queue.delete(rightSE);
          const newEvents = seg.split(pt);
          newEvents.push(rightSE);
          if (seg.consumedBy === void 0) this.tree.add(seg);
          return newEvents;
        }
      };
      var Operation = class {
        type;
        numMultiPolys;
        run(type, geom, moreGeoms) {
          operation.type = type;
          const multipolys = [new MultiPolyIn(geom, true)];
          for (let i = 0, iMax = moreGeoms.length; i < iMax; i++) {
            multipolys.push(new MultiPolyIn(moreGeoms[i], false));
          }
          operation.numMultiPolys = multipolys.length;
          if (operation.type === "difference") {
            const subject = multipolys[0];
            let i = 1;
            while (i < multipolys.length) {
              if (getBboxOverlap(multipolys[i].bbox, subject.bbox) !== null) i++;
              else multipolys.splice(i, 1);
            }
          }
          if (operation.type === "intersection") {
            for (let i = 0, iMax = multipolys.length; i < iMax; i++) {
              const mpA = multipolys[i];
              for (let j = i + 1, jMax = multipolys.length; j < jMax; j++) {
                if (getBboxOverlap(mpA.bbox, multipolys[j].bbox) === null) return [];
              }
            }
          }
          const queue = new import_splaytree_ts3.SplayTreeSet(SweepEvent.compare);
          for (let i = 0, iMax = multipolys.length; i < iMax; i++) {
            const sweepEvents = multipolys[i].getSweepEvents();
            for (let j = 0, jMax = sweepEvents.length; j < jMax; j++) {
              queue.add(sweepEvents[j]);
            }
          }
          const sweepLine = new SweepLine(queue);
          let evt = null;
          if (queue.size != 0) {
            evt = queue.first();
            queue.delete(evt);
          }
          while (evt) {
            const newEvents = sweepLine.process(evt);
            for (let i = 0, iMax = newEvents.length; i < iMax; i++) {
              const evt2 = newEvents[i];
              if (evt2.consumedBy === void 0) queue.add(evt2);
            }
            if (queue.size != 0) {
              evt = queue.first();
              queue.delete(evt);
            } else {
              evt = null;
            }
          }
          precision.reset();
          const ringsOut = RingOut.factory(sweepLine.segments);
          const result2 = new MultiPolyOut(ringsOut);
          return result2.getGeom();
        }
      };
      var operation = new Operation();
      var operation_default = operation;
      var segmentId = 0;
      var Segment = class _Segment {
        id;
        leftSE;
        rightSE;
        rings;
        windings;
        ringOut;
        consumedBy;
        prev;
        _prevInResult;
        _beforeState;
        _afterState;
        _isInResult;
        /* This compare() function is for ordering segments in the sweep
         * line tree, and does so according to the following criteria:
         *
         * Consider the vertical line that lies an infinestimal step to the
         * right of the right-more of the two left endpoints of the input
         * segments. Imagine slowly moving a point up from negative infinity
         * in the increasing y direction. Which of the two segments will that
         * point intersect first? That segment comes 'before' the other one.
         *
         * If neither segment would be intersected by such a line, (if one
         * or more of the segments are vertical) then the line to be considered
         * is directly on the right-more of the two left inputs.
         */
        static compare(a, b) {
          const alx = a.leftSE.point.x;
          const blx = b.leftSE.point.x;
          const arx = a.rightSE.point.x;
          const brx = b.rightSE.point.x;
          if (brx.isLessThan(alx)) return 1;
          if (arx.isLessThan(blx)) return -1;
          const aly = a.leftSE.point.y;
          const bly = b.leftSE.point.y;
          const ary = a.rightSE.point.y;
          const bry = b.rightSE.point.y;
          if (alx.isLessThan(blx)) {
            if (bly.isLessThan(aly) && bly.isLessThan(ary)) return 1;
            if (bly.isGreaterThan(aly) && bly.isGreaterThan(ary)) return -1;
            const aCmpBLeft = a.comparePoint(b.leftSE.point);
            if (aCmpBLeft < 0) return 1;
            if (aCmpBLeft > 0) return -1;
            const bCmpARight = b.comparePoint(a.rightSE.point);
            if (bCmpARight !== 0) return bCmpARight;
            return -1;
          }
          if (alx.isGreaterThan(blx)) {
            if (aly.isLessThan(bly) && aly.isLessThan(bry)) return -1;
            if (aly.isGreaterThan(bly) && aly.isGreaterThan(bry)) return 1;
            const bCmpALeft = b.comparePoint(a.leftSE.point);
            if (bCmpALeft !== 0) return bCmpALeft;
            const aCmpBRight = a.comparePoint(b.rightSE.point);
            if (aCmpBRight < 0) return 1;
            if (aCmpBRight > 0) return -1;
            return 1;
          }
          if (aly.isLessThan(bly)) return -1;
          if (aly.isGreaterThan(bly)) return 1;
          if (arx.isLessThan(brx)) {
            const bCmpARight = b.comparePoint(a.rightSE.point);
            if (bCmpARight !== 0) return bCmpARight;
          }
          if (arx.isGreaterThan(brx)) {
            const aCmpBRight = a.comparePoint(b.rightSE.point);
            if (aCmpBRight < 0) return 1;
            if (aCmpBRight > 0) return -1;
          }
          if (!arx.eq(brx)) {
            const ay = ary.minus(aly);
            const ax = arx.minus(alx);
            const by = bry.minus(bly);
            const bx = brx.minus(blx);
            if (ay.isGreaterThan(ax) && by.isLessThan(bx)) return 1;
            if (ay.isLessThan(ax) && by.isGreaterThan(bx)) return -1;
          }
          if (arx.isGreaterThan(brx)) return 1;
          if (arx.isLessThan(brx)) return -1;
          if (ary.isLessThan(bry)) return -1;
          if (ary.isGreaterThan(bry)) return 1;
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        }
        /* Warning: a reference to ringWindings input will be stored,
         *  and possibly will be later modified */
        constructor(leftSE, rightSE, rings, windings) {
          this.id = ++segmentId;
          this.leftSE = leftSE;
          leftSE.segment = this;
          leftSE.otherSE = rightSE;
          this.rightSE = rightSE;
          rightSE.segment = this;
          rightSE.otherSE = leftSE;
          this.rings = rings;
          this.windings = windings;
        }
        static fromRing(pt1, pt2, ring) {
          let leftPt, rightPt, winding;
          const cmpPts = SweepEvent.comparePoints(pt1, pt2);
          if (cmpPts < 0) {
            leftPt = pt1;
            rightPt = pt2;
            winding = 1;
          } else if (cmpPts > 0) {
            leftPt = pt2;
            rightPt = pt1;
            winding = -1;
          } else
            throw new Error(
              `Tried to create degenerate segment at [${pt1.x}, ${pt1.y}]`
            );
          const leftSE = new SweepEvent(leftPt, true);
          const rightSE = new SweepEvent(rightPt, false);
          return new _Segment(leftSE, rightSE, [ring], [winding]);
        }
        /* When a segment is split, the rightSE is replaced with a new sweep event */
        replaceRightSE(newRightSE) {
          this.rightSE = newRightSE;
          this.rightSE.segment = this;
          this.rightSE.otherSE = this.leftSE;
          this.leftSE.otherSE = this.rightSE;
        }
        bbox() {
          const y1 = this.leftSE.point.y;
          const y2 = this.rightSE.point.y;
          return {
            ll: { x: this.leftSE.point.x, y: y1.isLessThan(y2) ? y1 : y2 },
            ur: { x: this.rightSE.point.x, y: y1.isGreaterThan(y2) ? y1 : y2 }
          };
        }
        /* A vector from the left point to the right */
        vector() {
          return {
            x: this.rightSE.point.x.minus(this.leftSE.point.x),
            y: this.rightSE.point.y.minus(this.leftSE.point.y)
          };
        }
        isAnEndpoint(pt) {
          return pt.x.eq(this.leftSE.point.x) && pt.y.eq(this.leftSE.point.y) || pt.x.eq(this.rightSE.point.x) && pt.y.eq(this.rightSE.point.y);
        }
        /* Compare this segment with a point.
         *
         * A point P is considered to be colinear to a segment if there
         * exists a distance D such that if we travel along the segment
         * from one * endpoint towards the other a distance D, we find
         * ourselves at point P.
         *
         * Return value indicates:
         *
         *   1: point lies above the segment (to the left of vertical)
         *   0: point is colinear to segment
         *  -1: point lies below the segment (to the right of vertical)
         */
        comparePoint(point) {
          return precision.orient(this.leftSE.point, point, this.rightSE.point);
        }
        /**
         * Given another segment, returns the first non-trivial intersection
         * between the two segments (in terms of sweep line ordering), if it exists.
         *
         * A 'non-trivial' intersection is one that will cause one or both of the
         * segments to be split(). As such, 'trivial' vs. 'non-trivial' intersection:
         *
         *   * endpoint of segA with endpoint of segB --> trivial
         *   * endpoint of segA with point along segB --> non-trivial
         *   * endpoint of segB with point along segA --> non-trivial
         *   * point along segA with point along segB --> non-trivial
         *
         * If no non-trivial intersection exists, return null
         * Else, return null.
         */
        getIntersection(other) {
          const tBbox = this.bbox();
          const oBbox = other.bbox();
          const bboxOverlap = getBboxOverlap(tBbox, oBbox);
          if (bboxOverlap === null) return null;
          const tlp = this.leftSE.point;
          const trp = this.rightSE.point;
          const olp = other.leftSE.point;
          const orp = other.rightSE.point;
          const touchesOtherLSE = isInBbox(tBbox, olp) && this.comparePoint(olp) === 0;
          const touchesThisLSE = isInBbox(oBbox, tlp) && other.comparePoint(tlp) === 0;
          const touchesOtherRSE = isInBbox(tBbox, orp) && this.comparePoint(orp) === 0;
          const touchesThisRSE = isInBbox(oBbox, trp) && other.comparePoint(trp) === 0;
          if (touchesThisLSE && touchesOtherLSE) {
            if (touchesThisRSE && !touchesOtherRSE) return trp;
            if (!touchesThisRSE && touchesOtherRSE) return orp;
            return null;
          }
          if (touchesThisLSE) {
            if (touchesOtherRSE) {
              if (tlp.x.eq(orp.x) && tlp.y.eq(orp.y)) return null;
            }
            return tlp;
          }
          if (touchesOtherLSE) {
            if (touchesThisRSE) {
              if (trp.x.eq(olp.x) && trp.y.eq(olp.y)) return null;
            }
            return olp;
          }
          if (touchesThisRSE && touchesOtherRSE) return null;
          if (touchesThisRSE) return trp;
          if (touchesOtherRSE) return orp;
          const pt = intersection(tlp, this.vector(), olp, other.vector());
          if (pt === null) return null;
          if (!isInBbox(bboxOverlap, pt)) return null;
          return precision.snap(pt);
        }
        /**
         * Split the given segment into multiple segments on the given points.
         *  * Each existing segment will retain its leftSE and a new rightSE will be
         *    generated for it.
         *  * A new segment will be generated which will adopt the original segment's
         *    rightSE, and a new leftSE will be generated for it.
         *  * If there are more than two points given to split on, new segments
         *    in the middle will be generated with new leftSE and rightSE's.
         *  * An array of the newly generated SweepEvents will be returned.
         *
         * Warning: input array of points is modified
         */
        split(point) {
          const newEvents = [];
          const alreadyLinked = point.events !== void 0;
          const newLeftSE = new SweepEvent(point, true);
          const newRightSE = new SweepEvent(point, false);
          const oldRightSE = this.rightSE;
          this.replaceRightSE(newRightSE);
          newEvents.push(newRightSE);
          newEvents.push(newLeftSE);
          const newSeg = new _Segment(
            newLeftSE,
            oldRightSE,
            this.rings.slice(),
            this.windings.slice()
          );
          if (SweepEvent.comparePoints(newSeg.leftSE.point, newSeg.rightSE.point) > 0) {
            newSeg.swapEvents();
          }
          if (SweepEvent.comparePoints(this.leftSE.point, this.rightSE.point) > 0) {
            this.swapEvents();
          }
          if (alreadyLinked) {
            newLeftSE.checkForConsuming();
            newRightSE.checkForConsuming();
          }
          return newEvents;
        }
        /* Swap which event is left and right */
        swapEvents() {
          const tmpEvt = this.rightSE;
          this.rightSE = this.leftSE;
          this.leftSE = tmpEvt;
          this.leftSE.isLeft = true;
          this.rightSE.isLeft = false;
          for (let i = 0, iMax = this.windings.length; i < iMax; i++) {
            this.windings[i] *= -1;
          }
        }
        /* Consume another segment. We take their rings under our wing
         * and mark them as consumed. Use for perfectly overlapping segments */
        consume(other) {
          let consumer = this;
          let consumee = other;
          while (consumer.consumedBy) consumer = consumer.consumedBy;
          while (consumee.consumedBy) consumee = consumee.consumedBy;
          const cmp = _Segment.compare(consumer, consumee);
          if (cmp === 0) return;
          if (cmp > 0) {
            const tmp = consumer;
            consumer = consumee;
            consumee = tmp;
          }
          if (consumer.prev === consumee) {
            const tmp = consumer;
            consumer = consumee;
            consumee = tmp;
          }
          for (let i = 0, iMax = consumee.rings.length; i < iMax; i++) {
            const ring = consumee.rings[i];
            const winding = consumee.windings[i];
            const index = consumer.rings.indexOf(ring);
            if (index === -1) {
              consumer.rings.push(ring);
              consumer.windings.push(winding);
            } else consumer.windings[index] += winding;
          }
          consumee.rings = null;
          consumee.windings = null;
          consumee.consumedBy = consumer;
          consumee.leftSE.consumedBy = consumer.leftSE;
          consumee.rightSE.consumedBy = consumer.rightSE;
        }
        /* The first segment previous segment chain that is in the result */
        prevInResult() {
          if (this._prevInResult !== void 0) return this._prevInResult;
          if (!this.prev) this._prevInResult = null;
          else if (this.prev.isInResult()) this._prevInResult = this.prev;
          else this._prevInResult = this.prev.prevInResult();
          return this._prevInResult;
        }
        beforeState() {
          if (this._beforeState !== void 0) return this._beforeState;
          if (!this.prev)
            this._beforeState = {
              rings: [],
              windings: [],
              multiPolys: []
            };
          else {
            const seg = this.prev.consumedBy || this.prev;
            this._beforeState = seg.afterState();
          }
          return this._beforeState;
        }
        afterState() {
          if (this._afterState !== void 0) return this._afterState;
          const beforeState = this.beforeState();
          this._afterState = {
            rings: beforeState.rings.slice(0),
            windings: beforeState.windings.slice(0),
            multiPolys: []
          };
          const ringsAfter = this._afterState.rings;
          const windingsAfter = this._afterState.windings;
          const mpsAfter = this._afterState.multiPolys;
          for (let i = 0, iMax = this.rings.length; i < iMax; i++) {
            const ring = this.rings[i];
            const winding = this.windings[i];
            const index = ringsAfter.indexOf(ring);
            if (index === -1) {
              ringsAfter.push(ring);
              windingsAfter.push(winding);
            } else windingsAfter[index] += winding;
          }
          const polysAfter = [];
          const polysExclude = [];
          for (let i = 0, iMax = ringsAfter.length; i < iMax; i++) {
            if (windingsAfter[i] === 0) continue;
            const ring = ringsAfter[i];
            const poly = ring.poly;
            if (polysExclude.indexOf(poly) !== -1) continue;
            if (ring.isExterior) polysAfter.push(poly);
            else {
              if (polysExclude.indexOf(poly) === -1) polysExclude.push(poly);
              const index = polysAfter.indexOf(ring.poly);
              if (index !== -1) polysAfter.splice(index, 1);
            }
          }
          for (let i = 0, iMax = polysAfter.length; i < iMax; i++) {
            const mp = polysAfter[i].multiPoly;
            if (mpsAfter.indexOf(mp) === -1) mpsAfter.push(mp);
          }
          return this._afterState;
        }
        /* Is this segment part of the final result? */
        isInResult() {
          if (this.consumedBy) return false;
          if (this._isInResult !== void 0) return this._isInResult;
          const mpsBefore = this.beforeState().multiPolys;
          const mpsAfter = this.afterState().multiPolys;
          switch (operation_default.type) {
            case "union": {
              const noBefores = mpsBefore.length === 0;
              const noAfters = mpsAfter.length === 0;
              this._isInResult = noBefores !== noAfters;
              break;
            }
            case "intersection": {
              let least;
              let most;
              if (mpsBefore.length < mpsAfter.length) {
                least = mpsBefore.length;
                most = mpsAfter.length;
              } else {
                least = mpsAfter.length;
                most = mpsBefore.length;
              }
              this._isInResult = most === operation_default.numMultiPolys && least < most;
              break;
            }
            case "xor": {
              const diff = Math.abs(mpsBefore.length - mpsAfter.length);
              this._isInResult = diff % 2 === 1;
              break;
            }
            case "difference": {
              const isJustSubject = (mps) => mps.length === 1 && mps[0].isSubject;
              this._isInResult = isJustSubject(mpsBefore) !== isJustSubject(mpsAfter);
              break;
            }
          }
          return this._isInResult;
        }
      };
      var RingIn = class {
        poly;
        isExterior;
        segments;
        bbox;
        constructor(geomRing, poly, isExterior) {
          if (!Array.isArray(geomRing) || geomRing.length === 0) {
            throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
          }
          this.poly = poly;
          this.isExterior = isExterior;
          this.segments = [];
          if (typeof geomRing[0][0] !== "number" || typeof geomRing[0][1] !== "number") {
            throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
          }
          const firstPoint = precision.snap({ x: new import_bignumber2.default(geomRing[0][0]), y: new import_bignumber2.default(geomRing[0][1]) });
          this.bbox = {
            ll: { x: firstPoint.x, y: firstPoint.y },
            ur: { x: firstPoint.x, y: firstPoint.y }
          };
          let prevPoint = firstPoint;
          for (let i = 1, iMax = geomRing.length; i < iMax; i++) {
            if (typeof geomRing[i][0] !== "number" || typeof geomRing[i][1] !== "number") {
              throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
            }
            const point = precision.snap({ x: new import_bignumber2.default(geomRing[i][0]), y: new import_bignumber2.default(geomRing[i][1]) });
            if (point.x.eq(prevPoint.x) && point.y.eq(prevPoint.y)) continue;
            this.segments.push(Segment.fromRing(prevPoint, point, this));
            if (point.x.isLessThan(this.bbox.ll.x)) this.bbox.ll.x = point.x;
            if (point.y.isLessThan(this.bbox.ll.y)) this.bbox.ll.y = point.y;
            if (point.x.isGreaterThan(this.bbox.ur.x)) this.bbox.ur.x = point.x;
            if (point.y.isGreaterThan(this.bbox.ur.y)) this.bbox.ur.y = point.y;
            prevPoint = point;
          }
          if (!firstPoint.x.eq(prevPoint.x) || !firstPoint.y.eq(prevPoint.y)) {
            this.segments.push(Segment.fromRing(prevPoint, firstPoint, this));
          }
        }
        getSweepEvents() {
          const sweepEvents = [];
          for (let i = 0, iMax = this.segments.length; i < iMax; i++) {
            const segment = this.segments[i];
            sweepEvents.push(segment.leftSE);
            sweepEvents.push(segment.rightSE);
          }
          return sweepEvents;
        }
      };
      var PolyIn = class {
        multiPoly;
        exteriorRing;
        interiorRings;
        bbox;
        constructor(geomPoly, multiPoly) {
          if (!Array.isArray(geomPoly)) {
            throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
          }
          this.exteriorRing = new RingIn(geomPoly[0], this, true);
          this.bbox = {
            ll: { x: this.exteriorRing.bbox.ll.x, y: this.exteriorRing.bbox.ll.y },
            ur: { x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y }
          };
          this.interiorRings = [];
          for (let i = 1, iMax = geomPoly.length; i < iMax; i++) {
            const ring = new RingIn(geomPoly[i], this, false);
            if (ring.bbox.ll.x.isLessThan(this.bbox.ll.x)) this.bbox.ll.x = ring.bbox.ll.x;
            if (ring.bbox.ll.y.isLessThan(this.bbox.ll.y)) this.bbox.ll.y = ring.bbox.ll.y;
            if (ring.bbox.ur.x.isGreaterThan(this.bbox.ur.x)) this.bbox.ur.x = ring.bbox.ur.x;
            if (ring.bbox.ur.y.isGreaterThan(this.bbox.ur.y)) this.bbox.ur.y = ring.bbox.ur.y;
            this.interiorRings.push(ring);
          }
          this.multiPoly = multiPoly;
        }
        getSweepEvents() {
          const sweepEvents = this.exteriorRing.getSweepEvents();
          for (let i = 0, iMax = this.interiorRings.length; i < iMax; i++) {
            const ringSweepEvents = this.interiorRings[i].getSweepEvents();
            for (let j = 0, jMax = ringSweepEvents.length; j < jMax; j++) {
              sweepEvents.push(ringSweepEvents[j]);
            }
          }
          return sweepEvents;
        }
      };
      var MultiPolyIn = class {
        isSubject;
        polys;
        bbox;
        constructor(geom, isSubject) {
          if (!Array.isArray(geom)) {
            throw new Error("Input geometry is not a valid Polygon or MultiPolygon");
          }
          try {
            if (typeof geom[0][0][0] === "number") geom = [geom];
          } catch (ex) {
          }
          this.polys = [];
          this.bbox = {
            ll: { x: new import_bignumber2.default(Number.POSITIVE_INFINITY), y: new import_bignumber2.default(Number.POSITIVE_INFINITY) },
            ur: { x: new import_bignumber2.default(Number.NEGATIVE_INFINITY), y: new import_bignumber2.default(Number.NEGATIVE_INFINITY) }
          };
          for (let i = 0, iMax = geom.length; i < iMax; i++) {
            const poly = new PolyIn(geom[i], this);
            if (poly.bbox.ll.x.isLessThan(this.bbox.ll.x)) this.bbox.ll.x = poly.bbox.ll.x;
            if (poly.bbox.ll.y.isLessThan(this.bbox.ll.y)) this.bbox.ll.y = poly.bbox.ll.y;
            if (poly.bbox.ur.x.isGreaterThan(this.bbox.ur.x)) this.bbox.ur.x = poly.bbox.ur.x;
            if (poly.bbox.ur.y.isGreaterThan(this.bbox.ur.y)) this.bbox.ur.y = poly.bbox.ur.y;
            this.polys.push(poly);
          }
          this.isSubject = isSubject;
        }
        getSweepEvents() {
          const sweepEvents = [];
          for (let i = 0, iMax = this.polys.length; i < iMax; i++) {
            const polySweepEvents = this.polys[i].getSweepEvents();
            for (let j = 0, jMax = polySweepEvents.length; j < jMax; j++) {
              sweepEvents.push(polySweepEvents[j]);
            }
          }
          return sweepEvents;
        }
      };
      var union = (geom, ...moreGeoms) => operation_default.run("union", geom, moreGeoms);
      var intersection2 = (geom, ...moreGeoms) => operation_default.run("intersection", geom, moreGeoms);
      var xor = (geom, ...moreGeoms) => operation_default.run("xor", geom, moreGeoms);
      var difference = (geom, ...moreGeoms) => operation_default.run("difference", geom, moreGeoms);
      var setPrecision = precision.set;
    }
  });

  // node_modules/@turf/helpers/dist/cjs/index.cjs
  var require_cjs3 = __commonJS({
    "node_modules/@turf/helpers/dist/cjs/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var earthRadius = 63710088e-1;
      var factors = {
        centimeters: earthRadius * 100,
        centimetres: earthRadius * 100,
        degrees: 360 / (2 * Math.PI),
        feet: earthRadius * 3.28084,
        inches: earthRadius * 39.37,
        kilometers: earthRadius / 1e3,
        kilometres: earthRadius / 1e3,
        meters: earthRadius,
        metres: earthRadius,
        miles: earthRadius / 1609.344,
        millimeters: earthRadius * 1e3,
        millimetres: earthRadius * 1e3,
        nauticalmiles: earthRadius / 1852,
        radians: 1,
        yards: earthRadius * 1.0936
      };
      var areaFactors = {
        acres: 247105e-9,
        centimeters: 1e4,
        centimetres: 1e4,
        feet: 10.763910417,
        hectares: 1e-4,
        inches: 1550.003100006,
        kilometers: 1e-6,
        kilometres: 1e-6,
        meters: 1,
        metres: 1,
        miles: 386e-9,
        nauticalmiles: 29155334959812285e-23,
        millimeters: 1e6,
        millimetres: 1e6,
        yards: 1.195990046
      };
      function feature(geom, properties, options = {}) {
        const feat = { type: "Feature" };
        if (options.id === 0 || options.id) {
          feat.id = options.id;
        }
        if (options.bbox) {
          feat.bbox = options.bbox;
        }
        feat.properties = properties || {};
        feat.geometry = geom;
        return feat;
      }
      function geometry(type, coordinates, _options = {}) {
        switch (type) {
          case "Point":
            return point(coordinates).geometry;
          case "LineString":
            return lineString(coordinates).geometry;
          case "Polygon":
            return polygon(coordinates).geometry;
          case "MultiPoint":
            return multiPoint(coordinates).geometry;
          case "MultiLineString":
            return multiLineString(coordinates).geometry;
          case "MultiPolygon":
            return multiPolygon(coordinates).geometry;
          default:
            throw new Error(type + " is invalid");
        }
      }
      function point(coordinates, properties, options = {}) {
        if (!coordinates) {
          throw new Error("coordinates is required");
        }
        if (!Array.isArray(coordinates)) {
          throw new Error("coordinates must be an Array");
        }
        if (coordinates.length < 2) {
          throw new Error("coordinates must be at least 2 numbers long");
        }
        if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
          throw new Error("coordinates must contain numbers");
        }
        const geom = {
          type: "Point",
          coordinates
        };
        return feature(geom, properties, options);
      }
      function points(coordinates, properties, options = {}) {
        return featureCollection(
          coordinates.map((coords) => {
            return point(coords, properties);
          }),
          options
        );
      }
      function polygon(coordinates, properties, options = {}) {
        for (const ring of coordinates) {
          if (ring.length < 4) {
            throw new Error(
              "Each LinearRing of a Polygon must have 4 or more Positions."
            );
          }
          if (ring[ring.length - 1].length !== ring[0].length) {
            throw new Error("First and last Position are not equivalent.");
          }
          for (let j = 0; j < ring[ring.length - 1].length; j++) {
            if (ring[ring.length - 1][j] !== ring[0][j]) {
              throw new Error("First and last Position are not equivalent.");
            }
          }
        }
        const geom = {
          type: "Polygon",
          coordinates
        };
        return feature(geom, properties, options);
      }
      function polygons(coordinates, properties, options = {}) {
        return featureCollection(
          coordinates.map((coords) => {
            return polygon(coords, properties);
          }),
          options
        );
      }
      function lineString(coordinates, properties, options = {}) {
        if (coordinates.length < 2) {
          throw new Error("coordinates must be an array of two or more positions");
        }
        const geom = {
          type: "LineString",
          coordinates
        };
        return feature(geom, properties, options);
      }
      function lineStrings(coordinates, properties, options = {}) {
        return featureCollection(
          coordinates.map((coords) => {
            return lineString(coords, properties);
          }),
          options
        );
      }
      function featureCollection(features, options = {}) {
        const fc = { type: "FeatureCollection" };
        if (options.id) {
          fc.id = options.id;
        }
        if (options.bbox) {
          fc.bbox = options.bbox;
        }
        fc.features = features;
        return fc;
      }
      function multiLineString(coordinates, properties, options = {}) {
        const geom = {
          type: "MultiLineString",
          coordinates
        };
        return feature(geom, properties, options);
      }
      function multiPoint(coordinates, properties, options = {}) {
        const geom = {
          type: "MultiPoint",
          coordinates
        };
        return feature(geom, properties, options);
      }
      function multiPolygon(coordinates, properties, options = {}) {
        const geom = {
          type: "MultiPolygon",
          coordinates
        };
        return feature(geom, properties, options);
      }
      function geometryCollection(geometries, properties, options = {}) {
        const geom = {
          type: "GeometryCollection",
          geometries
        };
        return feature(geom, properties, options);
      }
      function round(num, precision = 0) {
        if (precision && !(precision >= 0)) {
          throw new Error("precision must be a positive number");
        }
        const multiplier = Math.pow(10, precision || 0);
        return Math.round(num * multiplier) / multiplier;
      }
      function radiansToLength(radians, units = "kilometers") {
        const factor = factors[units];
        if (!factor) {
          throw new Error(units + " units is invalid");
        }
        return radians * factor;
      }
      function lengthToRadians(distance, units = "kilometers") {
        const factor = factors[units];
        if (!factor) {
          throw new Error(units + " units is invalid");
        }
        return distance / factor;
      }
      function lengthToDegrees(distance, units) {
        return radiansToDegrees(lengthToRadians(distance, units));
      }
      function bearingToAzimuth(bearing) {
        let angle = bearing % 360;
        if (angle < 0) {
          angle += 360;
        }
        return angle;
      }
      function azimuthToBearing(angle) {
        angle = angle % 360;
        if (angle > 180) {
          return angle - 360;
        } else if (angle < -180) {
          return angle + 360;
        }
        return angle;
      }
      function radiansToDegrees(radians) {
        const normalisedRadians = radians % (2 * Math.PI);
        return normalisedRadians * 180 / Math.PI;
      }
      function degreesToRadians(degrees) {
        const normalisedDegrees = degrees % 360;
        return normalisedDegrees * Math.PI / 180;
      }
      function convertLength(length, originalUnit = "kilometers", finalUnit = "kilometers") {
        if (!(length >= 0)) {
          throw new Error("length must be a positive number");
        }
        return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
      }
      function convertArea(area, originalUnit = "meters", finalUnit = "kilometers") {
        if (!(area >= 0)) {
          throw new Error("area must be a positive number");
        }
        const startFactor = areaFactors[originalUnit];
        if (!startFactor) {
          throw new Error("invalid original units");
        }
        const finalFactor = areaFactors[finalUnit];
        if (!finalFactor) {
          throw new Error("invalid final units");
        }
        return area / startFactor * finalFactor;
      }
      function isNumber(num) {
        return !isNaN(num) && num !== null && !Array.isArray(num);
      }
      function isObject(input) {
        return input !== null && typeof input === "object" && !Array.isArray(input);
      }
      function validateBBox(bbox) {
        if (!bbox) {
          throw new Error("bbox is required");
        }
        if (!Array.isArray(bbox)) {
          throw new Error("bbox must be an Array");
        }
        if (bbox.length !== 4 && bbox.length !== 6) {
          throw new Error("bbox must be an Array of 4 or 6 numbers");
        }
        bbox.forEach((num) => {
          if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
          }
        });
      }
      function validateId(id) {
        if (!id) {
          throw new Error("id is required");
        }
        if (["string", "number"].indexOf(typeof id) === -1) {
          throw new Error("id must be a number or a string");
        }
      }
      exports.areaFactors = areaFactors;
      exports.azimuthToBearing = azimuthToBearing;
      exports.bearingToAzimuth = bearingToAzimuth;
      exports.convertArea = convertArea;
      exports.convertLength = convertLength;
      exports.degreesToRadians = degreesToRadians;
      exports.earthRadius = earthRadius;
      exports.factors = factors;
      exports.feature = feature;
      exports.featureCollection = featureCollection;
      exports.geometry = geometry;
      exports.geometryCollection = geometryCollection;
      exports.isNumber = isNumber;
      exports.isObject = isObject;
      exports.lengthToDegrees = lengthToDegrees;
      exports.lengthToRadians = lengthToRadians;
      exports.lineString = lineString;
      exports.lineStrings = lineStrings;
      exports.multiLineString = multiLineString;
      exports.multiPoint = multiPoint;
      exports.multiPolygon = multiPolygon;
      exports.point = point;
      exports.points = points;
      exports.polygon = polygon;
      exports.polygons = polygons;
      exports.radiansToDegrees = radiansToDegrees;
      exports.radiansToLength = radiansToLength;
      exports.round = round;
      exports.validateBBox = validateBBox;
      exports.validateId = validateId;
    }
  });

  // node_modules/@turf/meta/dist/cjs/index.cjs
  var require_cjs4 = __commonJS({
    "node_modules/@turf/meta/dist/cjs/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _helpers = require_cjs3();
      function coordEach(geojson, callback, excludeWrapCoord) {
        if (geojson === null) return;
        var j, k, l, geometry, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
        for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
          geometryMaybeCollection = isFeatureCollection ? geojson.features[featureIndex].geometry : isFeature ? geojson.geometry : geojson;
          isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
          stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
          for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
            var multiFeatureIndex = 0;
            var geometryIndex = 0;
            geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
            if (geometry === null) continue;
            coords = geometry.coordinates;
            var geomType = geometry.type;
            wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
            switch (geomType) {
              case null:
                break;
              case "Point":
                if (callback(
                  coords,
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false)
                  return false;
                coordIndex++;
                multiFeatureIndex++;
                break;
              case "LineString":
              case "MultiPoint":
                for (j = 0; j < coords.length; j++) {
                  if (callback(
                    coords[j],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false)
                    return false;
                  coordIndex++;
                  if (geomType === "MultiPoint") multiFeatureIndex++;
                }
                if (geomType === "LineString") multiFeatureIndex++;
                break;
              case "Polygon":
              case "MultiLineString":
                for (j = 0; j < coords.length; j++) {
                  for (k = 0; k < coords[j].length - wrapShrink; k++) {
                    if (callback(
                      coords[j][k],
                      coordIndex,
                      featureIndex,
                      multiFeatureIndex,
                      geometryIndex
                    ) === false)
                      return false;
                    coordIndex++;
                  }
                  if (geomType === "MultiLineString") multiFeatureIndex++;
                  if (geomType === "Polygon") geometryIndex++;
                }
                if (geomType === "Polygon") multiFeatureIndex++;
                break;
              case "MultiPolygon":
                for (j = 0; j < coords.length; j++) {
                  geometryIndex = 0;
                  for (k = 0; k < coords[j].length; k++) {
                    for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                      if (callback(
                        coords[j][k][l],
                        coordIndex,
                        featureIndex,
                        multiFeatureIndex,
                        geometryIndex
                      ) === false)
                        return false;
                      coordIndex++;
                    }
                    geometryIndex++;
                  }
                  multiFeatureIndex++;
                }
                break;
              case "GeometryCollection":
                for (j = 0; j < geometry.geometries.length; j++)
                  if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false)
                    return false;
                break;
              default:
                throw new Error("Unknown Geometry Type");
            }
          }
        }
      }
      function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
        var previousValue = initialValue;
        coordEach(
          geojson,
          function(currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
            if (coordIndex === 0 && initialValue === void 0)
              previousValue = currentCoord;
            else
              previousValue = callback(
                previousValue,
                currentCoord,
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              );
          },
          excludeWrapCoord
        );
        return previousValue;
      }
      function propEach(geojson, callback) {
        var i;
        switch (geojson.type) {
          case "FeatureCollection":
            for (i = 0; i < geojson.features.length; i++) {
              if (callback(geojson.features[i].properties, i) === false) break;
            }
            break;
          case "Feature":
            callback(geojson.properties, 0);
            break;
        }
      }
      function propReduce(geojson, callback, initialValue) {
        var previousValue = initialValue;
        propEach(geojson, function(currentProperties, featureIndex) {
          if (featureIndex === 0 && initialValue === void 0)
            previousValue = currentProperties;
          else
            previousValue = callback(previousValue, currentProperties, featureIndex);
        });
        return previousValue;
      }
      function featureEach(geojson, callback) {
        if (geojson.type === "Feature") {
          callback(geojson, 0);
        } else if (geojson.type === "FeatureCollection") {
          for (var i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i], i) === false) break;
          }
        }
      }
      function featureReduce(geojson, callback, initialValue) {
        var previousValue = initialValue;
        featureEach(geojson, function(currentFeature, featureIndex) {
          if (featureIndex === 0 && initialValue === void 0)
            previousValue = currentFeature;
          else previousValue = callback(previousValue, currentFeature, featureIndex);
        });
        return previousValue;
      }
      function coordAll(geojson) {
        var coords = [];
        coordEach(geojson, function(coord) {
          coords.push(coord);
        });
        return coords;
      }
      function geomEach(geojson, callback) {
        var i, j, g, geometry, stopG, geometryMaybeCollection, isGeometryCollection, featureProperties, featureBBox, featureId, featureIndex = 0, isFeatureCollection = geojson.type === "FeatureCollection", isFeature = geojson.type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
        for (i = 0; i < stop; i++) {
          geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
          featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
          featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : void 0;
          featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : void 0;
          isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
          stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
          for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
            if (geometry === null) {
              if (callback(
                null,
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false)
                return false;
              continue;
            }
            switch (geometry.type) {
              case "Point":
              case "LineString":
              case "MultiPoint":
              case "Polygon":
              case "MultiLineString":
              case "MultiPolygon": {
                if (callback(
                  geometry,
                  featureIndex,
                  featureProperties,
                  featureBBox,
                  featureId
                ) === false)
                  return false;
                break;
              }
              case "GeometryCollection": {
                for (j = 0; j < geometry.geometries.length; j++) {
                  if (callback(
                    geometry.geometries[j],
                    featureIndex,
                    featureProperties,
                    featureBBox,
                    featureId
                  ) === false)
                    return false;
                }
                break;
              }
              default:
                throw new Error("Unknown Geometry Type");
            }
          }
          featureIndex++;
        }
      }
      function geomReduce(geojson, callback, initialValue) {
        var previousValue = initialValue;
        geomEach(
          geojson,
          function(currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
            if (featureIndex === 0 && initialValue === void 0)
              previousValue = currentGeometry;
            else
              previousValue = callback(
                previousValue,
                currentGeometry,
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              );
          }
        );
        return previousValue;
      }
      function flattenEach(geojson, callback) {
        geomEach(geojson, function(geometry, featureIndex, properties, bbox, id) {
          var type = geometry === null ? null : geometry.type;
          switch (type) {
            case null:
            case "Point":
            case "LineString":
            case "Polygon":
              if (callback(
                _helpers.feature.call(void 0, geometry, properties, { bbox, id }),
                featureIndex,
                0
              ) === false)
                return false;
              return;
          }
          var geomType;
          switch (type) {
            case "MultiPoint":
              geomType = "Point";
              break;
            case "MultiLineString":
              geomType = "LineString";
              break;
            case "MultiPolygon":
              geomType = "Polygon";
              break;
          }
          for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
            var coordinate = geometry.coordinates[multiFeatureIndex];
            var geom = {
              type: geomType,
              coordinates: coordinate
            };
            if (callback(_helpers.feature.call(void 0, geom, properties), featureIndex, multiFeatureIndex) === false)
              return false;
          }
        });
      }
      function flattenReduce(geojson, callback, initialValue) {
        var previousValue = initialValue;
        flattenEach(
          geojson,
          function(currentFeature, featureIndex, multiFeatureIndex) {
            if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === void 0)
              previousValue = currentFeature;
            else
              previousValue = callback(
                previousValue,
                currentFeature,
                featureIndex,
                multiFeatureIndex
              );
          }
        );
        return previousValue;
      }
      function segmentEach(geojson, callback) {
        flattenEach(geojson, function(feature2, featureIndex, multiFeatureIndex) {
          var segmentIndex = 0;
          if (!feature2.geometry) return;
          var type = feature2.geometry.type;
          if (type === "Point" || type === "MultiPoint") return;
          var previousCoords;
          var previousFeatureIndex = 0;
          var previousMultiIndex = 0;
          var prevGeomIndex = 0;
          if (coordEach(
            feature2,
            function(currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
              if (previousCoords === void 0 || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
                previousCoords = currentCoord;
                previousFeatureIndex = featureIndex;
                previousMultiIndex = multiPartIndexCoord;
                prevGeomIndex = geometryIndex;
                segmentIndex = 0;
                return;
              }
              var currentSegment = _helpers.lineString.call(
                void 0,
                [previousCoords, currentCoord],
                feature2.properties
              );
              if (callback(
                currentSegment,
                featureIndex,
                multiFeatureIndex,
                geometryIndex,
                segmentIndex
              ) === false)
                return false;
              segmentIndex++;
              previousCoords = currentCoord;
            }
          ) === false)
            return false;
        });
      }
      function segmentReduce(geojson, callback, initialValue) {
        var previousValue = initialValue;
        var started = false;
        segmentEach(
          geojson,
          function(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
            if (started === false && initialValue === void 0)
              previousValue = currentSegment;
            else
              previousValue = callback(
                previousValue,
                currentSegment,
                featureIndex,
                multiFeatureIndex,
                geometryIndex,
                segmentIndex
              );
            started = true;
          }
        );
        return previousValue;
      }
      function lineEach(geojson, callback) {
        if (!geojson) throw new Error("geojson is required");
        flattenEach(geojson, function(feature2, featureIndex, multiFeatureIndex) {
          if (feature2.geometry === null) return;
          var type = feature2.geometry.type;
          var coords = feature2.geometry.coordinates;
          switch (type) {
            case "LineString":
              if (callback(feature2, featureIndex, multiFeatureIndex, 0, 0) === false)
                return false;
              break;
            case "Polygon":
              for (var geometryIndex = 0; geometryIndex < coords.length; geometryIndex++) {
                if (callback(
                  _helpers.lineString.call(void 0, coords[geometryIndex], feature2.properties),
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false)
                  return false;
              }
              break;
          }
        });
      }
      function lineReduce(geojson, callback, initialValue) {
        var previousValue = initialValue;
        lineEach(
          geojson,
          function(currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
            if (featureIndex === 0 && initialValue === void 0)
              previousValue = currentLine;
            else
              previousValue = callback(
                previousValue,
                currentLine,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              );
          }
        );
        return previousValue;
      }
      function findSegment(geojson, options) {
        options = options || {};
        if (!_helpers.isObject.call(void 0, options)) throw new Error("options is invalid");
        var featureIndex = options.featureIndex || 0;
        var multiFeatureIndex = options.multiFeatureIndex || 0;
        var geometryIndex = options.geometryIndex || 0;
        var segmentIndex = options.segmentIndex || 0;
        var properties = options.properties;
        var geometry;
        switch (geojson.type) {
          case "FeatureCollection":
            if (featureIndex < 0)
              featureIndex = geojson.features.length + featureIndex;
            properties = properties || geojson.features[featureIndex].properties;
            geometry = geojson.features[featureIndex].geometry;
            break;
          case "Feature":
            properties = properties || geojson.properties;
            geometry = geojson.geometry;
            break;
          case "Point":
          case "MultiPoint":
            return null;
          case "LineString":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon":
            geometry = geojson;
            break;
          default:
            throw new Error("geojson is invalid");
        }
        if (geometry === null) return null;
        var coords = geometry.coordinates;
        switch (geometry.type) {
          case "Point":
          case "MultiPoint":
            return null;
          case "LineString":
            if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
            return _helpers.lineString.call(
              void 0,
              [coords[segmentIndex], coords[segmentIndex + 1]],
              properties,
              options
            );
          case "Polygon":
            if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
            if (segmentIndex < 0)
              segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
            return _helpers.lineString.call(
              void 0,
              [
                coords[geometryIndex][segmentIndex],
                coords[geometryIndex][segmentIndex + 1]
              ],
              properties,
              options
            );
          case "MultiLineString":
            if (multiFeatureIndex < 0)
              multiFeatureIndex = coords.length + multiFeatureIndex;
            if (segmentIndex < 0)
              segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
            return _helpers.lineString.call(
              void 0,
              [
                coords[multiFeatureIndex][segmentIndex],
                coords[multiFeatureIndex][segmentIndex + 1]
              ],
              properties,
              options
            );
          case "MultiPolygon":
            if (multiFeatureIndex < 0)
              multiFeatureIndex = coords.length + multiFeatureIndex;
            if (geometryIndex < 0)
              geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
            if (segmentIndex < 0)
              segmentIndex = coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
            return _helpers.lineString.call(
              void 0,
              [
                coords[multiFeatureIndex][geometryIndex][segmentIndex],
                coords[multiFeatureIndex][geometryIndex][segmentIndex + 1]
              ],
              properties,
              options
            );
        }
        throw new Error("geojson is invalid");
      }
      function findPoint(geojson, options) {
        options = options || {};
        if (!_helpers.isObject.call(void 0, options)) throw new Error("options is invalid");
        var featureIndex = options.featureIndex || 0;
        var multiFeatureIndex = options.multiFeatureIndex || 0;
        var geometryIndex = options.geometryIndex || 0;
        var coordIndex = options.coordIndex || 0;
        var properties = options.properties;
        var geometry;
        switch (geojson.type) {
          case "FeatureCollection":
            if (featureIndex < 0)
              featureIndex = geojson.features.length + featureIndex;
            properties = properties || geojson.features[featureIndex].properties;
            geometry = geojson.features[featureIndex].geometry;
            break;
          case "Feature":
            properties = properties || geojson.properties;
            geometry = geojson.geometry;
            break;
          case "Point":
          case "MultiPoint":
            return null;
          case "LineString":
          case "Polygon":
          case "MultiLineString":
          case "MultiPolygon":
            geometry = geojson;
            break;
          default:
            throw new Error("geojson is invalid");
        }
        if (geometry === null) return null;
        var coords = geometry.coordinates;
        switch (geometry.type) {
          case "Point":
            return _helpers.point.call(void 0, coords, properties, options);
          case "MultiPoint":
            if (multiFeatureIndex < 0)
              multiFeatureIndex = coords.length + multiFeatureIndex;
            return _helpers.point.call(void 0, coords[multiFeatureIndex], properties, options);
          case "LineString":
            if (coordIndex < 0) coordIndex = coords.length + coordIndex;
            return _helpers.point.call(void 0, coords[coordIndex], properties, options);
          case "Polygon":
            if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
            if (coordIndex < 0)
              coordIndex = coords[geometryIndex].length + coordIndex;
            return _helpers.point.call(void 0, coords[geometryIndex][coordIndex], properties, options);
          case "MultiLineString":
            if (multiFeatureIndex < 0)
              multiFeatureIndex = coords.length + multiFeatureIndex;
            if (coordIndex < 0)
              coordIndex = coords[multiFeatureIndex].length + coordIndex;
            return _helpers.point.call(void 0, coords[multiFeatureIndex][coordIndex], properties, options);
          case "MultiPolygon":
            if (multiFeatureIndex < 0)
              multiFeatureIndex = coords.length + multiFeatureIndex;
            if (geometryIndex < 0)
              geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
            if (coordIndex < 0)
              coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
            return _helpers.point.call(
              void 0,
              coords[multiFeatureIndex][geometryIndex][coordIndex],
              properties,
              options
            );
        }
        throw new Error("geojson is invalid");
      }
      exports.coordAll = coordAll;
      exports.coordEach = coordEach;
      exports.coordReduce = coordReduce;
      exports.featureEach = featureEach;
      exports.featureReduce = featureReduce;
      exports.findPoint = findPoint;
      exports.findSegment = findSegment;
      exports.flattenEach = flattenEach;
      exports.flattenReduce = flattenReduce;
      exports.geomEach = geomEach;
      exports.geomReduce = geomReduce;
      exports.lineEach = lineEach;
      exports.lineReduce = lineReduce;
      exports.propEach = propEach;
      exports.propReduce = propReduce;
      exports.segmentEach = segmentEach;
      exports.segmentReduce = segmentReduce;
    }
  });

  // node_modules/@turf/union/dist/cjs/index.cjs
  var require_cjs5 = __commonJS({
    "node_modules/@turf/union/dist/cjs/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = obj[key];
              }
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      var _polyclipts = require_cjs2();
      var polyclip = _interopRequireWildcard(_polyclipts);
      var _helpers = require_cjs3();
      var _meta = require_cjs4();
      function union2(features, options = {}) {
        const geoms = [];
        _meta.geomEach.call(void 0, features, (geom) => {
          geoms.push(geom.coordinates);
        });
        if (geoms.length < 2) {
          throw new Error("Must have at least 2 geometries");
        }
        const unioned = polyclip.union(geoms[0], ...geoms.slice(1));
        if (unioned.length === 0) return null;
        if (unioned.length === 1) return _helpers.polygon.call(void 0, unioned[0], options.properties);
        else return _helpers.multiPolygon.call(void 0, unioned, options.properties);
      }
      var turf_union_default = union2;
      exports.default = turf_union_default;
      exports.union = union2;
    }
  });

  // node_modules/proj4/dist/proj4-src.js
  var require_proj4_src = __commonJS({
    "node_modules/proj4/dist/proj4-src.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.proj4 = factory());
      })(exports, function() {
        "use strict";
        function globals(defs2) {
          defs2("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
          defs2("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
          defs2("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
          for (var i = 1; i <= 60; ++i) {
            defs2("EPSG:" + (32600 + i), "+proj=utm +zone=" + i + " +datum=WGS84 +units=m");
            defs2("EPSG:" + (32700 + i), "+proj=utm +zone=" + i + " +south +datum=WGS84 +units=m");
          }
          defs2.WGS84 = defs2["EPSG:4326"];
          defs2["EPSG:3785"] = defs2["EPSG:3857"];
          defs2.GOOGLE = defs2["EPSG:3857"];
          defs2["EPSG:900913"] = defs2["EPSG:3857"];
          defs2["EPSG:102113"] = defs2["EPSG:3857"];
        }
        var PJD_3PARAM = 1;
        var PJD_7PARAM = 2;
        var PJD_GRIDSHIFT = 3;
        var PJD_WGS84 = 4;
        var PJD_NODATUM = 5;
        var SRS_WGS84_SEMIMAJOR = 6378137;
        var SRS_WGS84_SEMIMINOR = 6356752314e-3;
        var SRS_WGS84_ESQUARED = 0.0066943799901413165;
        var SEC_TO_RAD = 484813681109536e-20;
        var HALF_PI = Math.PI / 2;
        var SIXTH = 0.16666666666666666;
        var RA4 = 0.04722222222222222;
        var RA6 = 0.022156084656084655;
        var EPSLN = 1e-10;
        var D2R$1 = 0.017453292519943295;
        var R2D = 57.29577951308232;
        var FORTPI = Math.PI / 4;
        var TWO_PI = Math.PI * 2;
        var SPI = 3.14159265359;
        var exports$1 = {};
        exports$1.greenwich = 0;
        exports$1.lisbon = -9.131906111111;
        exports$1.paris = 2.337229166667;
        exports$1.bogota = -74.080916666667;
        exports$1.madrid = -3.687938888889;
        exports$1.rome = 12.452333333333;
        exports$1.bern = 7.439583333333;
        exports$1.jakarta = 106.807719444444;
        exports$1.ferro = -17.666666666667;
        exports$1.brussels = 4.367975;
        exports$1.stockholm = 18.058277777778;
        exports$1.athens = 23.7163375;
        exports$1.oslo = 10.722916666667;
        var units = {
          mm: { to_meter: 1e-3 },
          cm: { to_meter: 0.01 },
          ft: { to_meter: 0.3048 },
          "us-ft": { to_meter: 1200 / 3937 },
          fath: { to_meter: 1.8288 },
          kmi: { to_meter: 1852 },
          "us-ch": { to_meter: 20.1168402336805 },
          "us-mi": { to_meter: 1609.34721869444 },
          km: { to_meter: 1e3 },
          "ind-ft": { to_meter: 0.30479841 },
          "ind-yd": { to_meter: 0.91439523 },
          mi: { to_meter: 1609.344 },
          yd: { to_meter: 0.9144 },
          ch: { to_meter: 20.1168 },
          link: { to_meter: 0.201168 },
          dm: { to_meter: 0.1 },
          in: { to_meter: 0.0254 },
          "ind-ch": { to_meter: 20.11669506 },
          "us-in": { to_meter: 0.025400050800101 },
          "us-yd": { to_meter: 0.914401828803658 }
        };
        var ignoredChar = /[\s_\-\/\(\)]/g;
        function match(obj, key2) {
          if (obj[key2]) {
            return obj[key2];
          }
          var keys = Object.keys(obj);
          var lkey = key2.toLowerCase().replace(ignoredChar, "");
          var i = -1;
          var testkey, processedKey;
          while (++i < keys.length) {
            testkey = keys[i];
            processedKey = testkey.toLowerCase().replace(ignoredChar, "");
            if (processedKey === lkey) {
              return obj[testkey];
            }
          }
        }
        function projStr(defData) {
          var self2 = {};
          var paramObj = defData.split("+").map(function(v) {
            return v.trim();
          }).filter(function(a) {
            return a;
          }).reduce(function(p, a) {
            var split = a.split("=");
            split.push(true);
            p[split[0].toLowerCase()] = split[1];
            return p;
          }, {});
          var paramName, paramVal, paramOutname;
          var params2 = {
            proj: "projName",
            datum: "datumCode",
            rf: function(v) {
              self2.rf = parseFloat(v);
            },
            lat_0: function(v) {
              self2.lat0 = v * D2R$1;
            },
            lat_1: function(v) {
              self2.lat1 = v * D2R$1;
            },
            lat_2: function(v) {
              self2.lat2 = v * D2R$1;
            },
            lat_ts: function(v) {
              self2.lat_ts = v * D2R$1;
            },
            lon_0: function(v) {
              self2.long0 = v * D2R$1;
            },
            lon_1: function(v) {
              self2.long1 = v * D2R$1;
            },
            lon_2: function(v) {
              self2.long2 = v * D2R$1;
            },
            alpha: function(v) {
              self2.alpha = parseFloat(v) * D2R$1;
            },
            gamma: function(v) {
              self2.rectified_grid_angle = parseFloat(v) * D2R$1;
            },
            lonc: function(v) {
              self2.longc = v * D2R$1;
            },
            x_0: function(v) {
              self2.x0 = parseFloat(v);
            },
            y_0: function(v) {
              self2.y0 = parseFloat(v);
            },
            k_0: function(v) {
              self2.k0 = parseFloat(v);
            },
            k: function(v) {
              self2.k0 = parseFloat(v);
            },
            a: function(v) {
              self2.a = parseFloat(v);
            },
            b: function(v) {
              self2.b = parseFloat(v);
            },
            r: function(v) {
              self2.a = self2.b = parseFloat(v);
            },
            r_a: function() {
              self2.R_A = true;
            },
            zone: function(v) {
              self2.zone = parseInt(v, 10);
            },
            south: function() {
              self2.utmSouth = true;
            },
            towgs84: function(v) {
              self2.datum_params = v.split(",").map(function(a) {
                return parseFloat(a);
              });
            },
            to_meter: function(v) {
              self2.to_meter = parseFloat(v);
            },
            units: function(v) {
              self2.units = v;
              var unit = match(units, v);
              if (unit) {
                self2.to_meter = unit.to_meter;
              }
            },
            from_greenwich: function(v) {
              self2.from_greenwich = v * D2R$1;
            },
            pm: function(v) {
              var pm = match(exports$1, v);
              self2.from_greenwich = (pm ? pm : parseFloat(v)) * D2R$1;
            },
            nadgrids: function(v) {
              if (v === "@null") {
                self2.datumCode = "none";
              } else {
                self2.nadgrids = v;
              }
            },
            axis: function(v) {
              var legalAxis = "ewnsud";
              if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
                self2.axis = v;
              }
            },
            approx: function() {
              self2.approx = true;
            }
          };
          for (paramName in paramObj) {
            paramVal = paramObj[paramName];
            if (paramName in params2) {
              paramOutname = params2[paramName];
              if (typeof paramOutname === "function") {
                paramOutname(paramVal);
              } else {
                self2[paramOutname] = paramVal;
              }
            } else {
              self2[paramName] = paramVal;
            }
          }
          if (typeof self2.datumCode === "string" && self2.datumCode !== "WGS84") {
            self2.datumCode = self2.datumCode.toLowerCase();
          }
          return self2;
        }
        class PROJJSONBuilderBase {
          static getId(node) {
            const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
            if (idNode && idNode.length >= 3) {
              return {
                authority: idNode[1],
                code: parseInt(idNode[2], 10)
              };
            }
            return null;
          }
          static convertUnit(node, type = "unit") {
            if (!node || node.length < 3) {
              return { type, name: "unknown", conversion_factor: null };
            }
            const name = node[1];
            const conversionFactor = parseFloat(node[2]) || null;
            const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
            const id = idNode ? {
              authority: idNode[1],
              code: parseInt(idNode[2], 10)
            } : null;
            return {
              type,
              name,
              conversion_factor: conversionFactor,
              id
            };
          }
          static convertAxis(node) {
            const name = node[1] || "Unknown";
            let direction;
            const abbreviationMatch = name.match(/^\((.)\)$/);
            if (abbreviationMatch) {
              const abbreviation = abbreviationMatch[1].toUpperCase();
              if (abbreviation === "E") direction = "east";
              else if (abbreviation === "N") direction = "north";
              else if (abbreviation === "U") direction = "up";
              else throw new Error(`Unknown axis abbreviation: ${abbreviation}`);
            } else {
              direction = node[2]?.toLowerCase() || "unknown";
            }
            const orderNode = node.find((child) => Array.isArray(child) && child[0] === "ORDER");
            const order = orderNode ? parseInt(orderNode[1], 10) : null;
            const unitNode = node.find(
              (child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")
            );
            const unit = this.convertUnit(unitNode);
            return {
              name,
              direction,
              // Use the valid PROJJSON direction value
              unit,
              order
            };
          }
          static extractAxes(node) {
            return node.filter((child) => Array.isArray(child) && child[0] === "AXIS").map((axis) => this.convertAxis(axis)).sort((a, b) => (a.order || 0) - (b.order || 0));
          }
          static convert(node, result2 = {}) {
            switch (node[0]) {
              case "PROJCRS":
                result2.type = "ProjectedCRS";
                result2.name = node[1];
                result2.base_crs = node.find((child) => Array.isArray(child) && child[0] === "BASEGEOGCRS") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "BASEGEOGCRS")) : null;
                result2.conversion = node.find((child) => Array.isArray(child) && child[0] === "CONVERSION") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "CONVERSION")) : null;
                const csNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
                if (csNode) {
                  result2.coordinate_system = {
                    type: csNode[1],
                    axis: this.extractAxes(node)
                  };
                }
                const lengthUnitNode = node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT");
                if (lengthUnitNode) {
                  const unit2 = this.convertUnit(lengthUnitNode);
                  result2.coordinate_system.unit = unit2;
                }
                result2.id = this.getId(node);
                break;
              case "BASEGEOGCRS":
              case "GEOGCRS":
                result2.type = "GeographicCRS";
                result2.name = node[1];
                const datumOrEnsembleNode = node.find(
                  (child) => Array.isArray(child) && (child[0] === "DATUM" || child[0] === "ENSEMBLE")
                );
                if (datumOrEnsembleNode) {
                  const datumOrEnsemble = this.convert(datumOrEnsembleNode);
                  if (datumOrEnsembleNode[0] === "ENSEMBLE") {
                    result2.datum_ensemble = datumOrEnsemble;
                  } else {
                    result2.datum = datumOrEnsemble;
                  }
                  const primem = node.find((child) => Array.isArray(child) && child[0] === "PRIMEM");
                  if (primem && primem[1] !== "Greenwich") {
                    datumOrEnsemble.prime_meridian = {
                      name: primem[1],
                      longitude: parseFloat(primem[2])
                    };
                  }
                }
                result2.coordinate_system = {
                  type: "ellipsoidal",
                  axis: this.extractAxes(node)
                };
                result2.id = this.getId(node);
                break;
              case "DATUM":
                result2.type = "GeodeticReferenceFrame";
                result2.name = node[1];
                result2.ellipsoid = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID")) : null;
                break;
              case "ENSEMBLE":
                result2.type = "DatumEnsemble";
                result2.name = node[1];
                result2.members = node.filter((child) => Array.isArray(child) && child[0] === "MEMBER").map((member) => ({
                  type: "DatumEnsembleMember",
                  name: member[1],
                  id: this.getId(member)
                  // Extract ID as { authority, code }
                }));
                const accuracyNode = node.find((child) => Array.isArray(child) && child[0] === "ENSEMBLEACCURACY");
                if (accuracyNode) {
                  result2.accuracy = parseFloat(accuracyNode[1]);
                }
                const ellipsoidNode = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID");
                if (ellipsoidNode) {
                  result2.ellipsoid = this.convert(ellipsoidNode);
                }
                result2.id = this.getId(node);
                break;
              case "ELLIPSOID":
                result2.type = "Ellipsoid";
                result2.name = node[1];
                result2.semi_major_axis = parseFloat(node[2]);
                result2.inverse_flattening = parseFloat(node[3]);
                node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT"), result2) : null;
                break;
              case "CONVERSION":
                result2.type = "Conversion";
                result2.name = node[1];
                result2.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
                result2.parameters = node.filter((child) => Array.isArray(child) && child[0] === "PARAMETER").map((param) => this.convert(param));
                break;
              case "METHOD":
                result2.type = "Method";
                result2.name = node[1];
                result2.id = this.getId(node);
                break;
              case "PARAMETER":
                result2.type = "Parameter";
                result2.name = node[1];
                result2.value = parseFloat(node[2]);
                result2.unit = this.convertUnit(
                  node.find(
                    (child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")
                  )
                );
                result2.id = this.getId(node);
                break;
              case "BOUNDCRS":
                result2.type = "BoundCRS";
                const sourceCrsNode = node.find((child) => Array.isArray(child) && child[0] === "SOURCECRS");
                if (sourceCrsNode) {
                  const sourceCrsContent = sourceCrsNode.find((child) => Array.isArray(child));
                  result2.source_crs = sourceCrsContent ? this.convert(sourceCrsContent) : null;
                }
                const targetCrsNode = node.find((child) => Array.isArray(child) && child[0] === "TARGETCRS");
                if (targetCrsNode) {
                  const targetCrsContent = targetCrsNode.find((child) => Array.isArray(child));
                  result2.target_crs = targetCrsContent ? this.convert(targetCrsContent) : null;
                }
                const transformationNode = node.find((child) => Array.isArray(child) && child[0] === "ABRIDGEDTRANSFORMATION");
                if (transformationNode) {
                  result2.transformation = this.convert(transformationNode);
                } else {
                  result2.transformation = null;
                }
                break;
              case "ABRIDGEDTRANSFORMATION":
                result2.type = "Transformation";
                result2.name = node[1];
                result2.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
                result2.parameters = node.filter((child) => Array.isArray(child) && (child[0] === "PARAMETER" || child[0] === "PARAMETERFILE")).map((param) => {
                  if (param[0] === "PARAMETER") {
                    return this.convert(param);
                  } else if (param[0] === "PARAMETERFILE") {
                    return {
                      name: param[1],
                      value: param[2],
                      id: {
                        "authority": "EPSG",
                        "code": 8656
                      }
                    };
                  }
                });
                if (result2.parameters.length === 7) {
                  const scaleDifference = result2.parameters[6];
                  if (scaleDifference.name === "Scale difference") {
                    scaleDifference.value = Math.round((scaleDifference.value - 1) * 1e12) / 1e6;
                  }
                }
                result2.id = this.getId(node);
                break;
              case "AXIS":
                if (!result2.coordinate_system) {
                  result2.coordinate_system = { type: "unspecified", axis: [] };
                }
                result2.coordinate_system.axis.push(this.convertAxis(node));
                break;
              case "LENGTHUNIT":
                const unit = this.convertUnit(node, "LinearUnit");
                if (result2.coordinate_system && result2.coordinate_system.axis) {
                  result2.coordinate_system.axis.forEach((axis) => {
                    if (!axis.unit) {
                      axis.unit = unit;
                    }
                  });
                }
                if (unit.conversion_factor && unit.conversion_factor !== 1) {
                  if (result2.semi_major_axis) {
                    result2.semi_major_axis = {
                      value: result2.semi_major_axis,
                      unit
                    };
                  }
                }
                break;
              default:
                result2.keyword = node[0];
                break;
            }
            return result2;
          }
        }
        class PROJJSONBuilder2015 extends PROJJSONBuilderBase {
          static convert(node, result2 = {}) {
            super.convert(node, result2);
            if (result2.coordinate_system?.subtype === "Cartesian") {
              delete result2.coordinate_system;
            }
            if (result2.usage) {
              delete result2.usage;
            }
            return result2;
          }
        }
        class PROJJSONBuilder2019 extends PROJJSONBuilderBase {
          static convert(node, result2 = {}) {
            super.convert(node, result2);
            const csNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
            if (csNode) {
              result2.coordinate_system = {
                subtype: csNode[1],
                axis: this.extractAxes(node)
              };
            }
            const usageNode = node.find((child) => Array.isArray(child) && child[0] === "USAGE");
            if (usageNode) {
              result2.usage = {
                scope: usageNode.find((child) => Array.isArray(child) && child[0] === "SCOPE")?.[1],
                area: usageNode.find((child) => Array.isArray(child) && child[0] === "AREA")?.[1],
                bbox: usageNode.find((child) => Array.isArray(child) && child[0] === "BBOX")?.slice(1)
              };
            }
            return result2;
          }
        }
        function detectWKT2Version(root) {
          if (root.find((child) => Array.isArray(child) && child[0] === "USAGE")) {
            return "2019";
          }
          if (root.find((child) => Array.isArray(child) && child[0] === "CS")) {
            return "2015";
          }
          if (root[0] === "BOUNDCRS" || root[0] === "PROJCRS" || root[0] === "GEOGCRS") {
            return "2015";
          }
          return "2015";
        }
        function buildPROJJSON(root) {
          const version = detectWKT2Version(root);
          const builder = version === "2019" ? PROJJSONBuilder2019 : PROJJSONBuilder2015;
          return builder.convert(root);
        }
        function detectWKTVersion(wkt2) {
          const normalizedWKT = wkt2.toUpperCase();
          if (normalizedWKT.includes("PROJCRS") || normalizedWKT.includes("GEOGCRS") || normalizedWKT.includes("BOUNDCRS") || normalizedWKT.includes("VERTCRS") || normalizedWKT.includes("LENGTHUNIT") || normalizedWKT.includes("ANGLEUNIT") || normalizedWKT.includes("SCALEUNIT")) {
            return "WKT2";
          }
          if (normalizedWKT.includes("PROJCS") || normalizedWKT.includes("GEOGCS") || normalizedWKT.includes("LOCAL_CS") || normalizedWKT.includes("VERT_CS") || normalizedWKT.includes("UNIT")) {
            return "WKT1";
          }
          return "WKT1";
        }
        var NEUTRAL = 1;
        var KEYWORD = 2;
        var NUMBER = 3;
        var QUOTED = 4;
        var AFTERQUOTE = 5;
        var ENDED = -1;
        var whitespace = /\s/;
        var latin = /[A-Za-z]/;
        var keyword = /[A-Za-z84_]/;
        var endThings = /[,\]]/;
        var digets = /[\d\.E\-\+]/;
        function Parser(text) {
          if (typeof text !== "string") {
            throw new Error("not a string");
          }
          this.text = text.trim();
          this.level = 0;
          this.place = 0;
          this.root = null;
          this.stack = [];
          this.currentObject = null;
          this.state = NEUTRAL;
        }
        Parser.prototype.readCharicter = function() {
          var char = this.text[this.place++];
          if (this.state !== QUOTED) {
            while (whitespace.test(char)) {
              if (this.place >= this.text.length) {
                return;
              }
              char = this.text[this.place++];
            }
          }
          switch (this.state) {
            case NEUTRAL:
              return this.neutral(char);
            case KEYWORD:
              return this.keyword(char);
            case QUOTED:
              return this.quoted(char);
            case AFTERQUOTE:
              return this.afterquote(char);
            case NUMBER:
              return this.number(char);
            case ENDED:
              return;
          }
        };
        Parser.prototype.afterquote = function(char) {
          if (char === '"') {
            this.word += '"';
            this.state = QUOTED;
            return;
          }
          if (endThings.test(char)) {
            this.word = this.word.trim();
            this.afterItem(char);
            return;
          }
          throw new Error(`havn't handled "` + char + '" in afterquote yet, index ' + this.place);
        };
        Parser.prototype.afterItem = function(char) {
          if (char === ",") {
            if (this.word !== null) {
              this.currentObject.push(this.word);
            }
            this.word = null;
            this.state = NEUTRAL;
            return;
          }
          if (char === "]") {
            this.level--;
            if (this.word !== null) {
              this.currentObject.push(this.word);
              this.word = null;
            }
            this.state = NEUTRAL;
            this.currentObject = this.stack.pop();
            if (!this.currentObject) {
              this.state = ENDED;
            }
            return;
          }
        };
        Parser.prototype.number = function(char) {
          if (digets.test(char)) {
            this.word += char;
            return;
          }
          if (endThings.test(char)) {
            this.word = parseFloat(this.word);
            this.afterItem(char);
            return;
          }
          throw new Error(`havn't handled "` + char + '" in number yet, index ' + this.place);
        };
        Parser.prototype.quoted = function(char) {
          if (char === '"') {
            this.state = AFTERQUOTE;
            return;
          }
          this.word += char;
          return;
        };
        Parser.prototype.keyword = function(char) {
          if (keyword.test(char)) {
            this.word += char;
            return;
          }
          if (char === "[") {
            var newObjects = [];
            newObjects.push(this.word);
            this.level++;
            if (this.root === null) {
              this.root = newObjects;
            } else {
              this.currentObject.push(newObjects);
            }
            this.stack.push(this.currentObject);
            this.currentObject = newObjects;
            this.state = NEUTRAL;
            return;
          }
          if (endThings.test(char)) {
            this.afterItem(char);
            return;
          }
          throw new Error(`havn't handled "` + char + '" in keyword yet, index ' + this.place);
        };
        Parser.prototype.neutral = function(char) {
          if (latin.test(char)) {
            this.word = char;
            this.state = KEYWORD;
            return;
          }
          if (char === '"') {
            this.word = "";
            this.state = QUOTED;
            return;
          }
          if (digets.test(char)) {
            this.word = char;
            this.state = NUMBER;
            return;
          }
          if (endThings.test(char)) {
            this.afterItem(char);
            return;
          }
          throw new Error(`havn't handled "` + char + '" in neutral yet, index ' + this.place);
        };
        Parser.prototype.output = function() {
          while (this.place < this.text.length) {
            this.readCharicter();
          }
          if (this.state === ENDED) {
            return this.root;
          }
          throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
        };
        function parseString(txt) {
          var parser = new Parser(txt);
          return parser.output();
        }
        function mapit(obj, key2, value) {
          if (Array.isArray(key2)) {
            value.unshift(key2);
            key2 = null;
          }
          var thing = key2 ? {} : obj;
          var out = value.reduce(function(newObj, item) {
            sExpr(item, newObj);
            return newObj;
          }, thing);
          if (key2) {
            obj[key2] = out;
          }
        }
        function sExpr(v, obj) {
          if (!Array.isArray(v)) {
            obj[v] = true;
            return;
          }
          var key2 = v.shift();
          if (key2 === "PARAMETER") {
            key2 = v.shift();
          }
          if (v.length === 1) {
            if (Array.isArray(v[0])) {
              obj[key2] = {};
              sExpr(v[0], obj[key2]);
              return;
            }
            obj[key2] = v[0];
            return;
          }
          if (!v.length) {
            obj[key2] = true;
            return;
          }
          if (key2 === "TOWGS84") {
            obj[key2] = v;
            return;
          }
          if (key2 === "AXIS") {
            if (!(key2 in obj)) {
              obj[key2] = [];
            }
            obj[key2].push(v);
            return;
          }
          if (!Array.isArray(key2)) {
            obj[key2] = {};
          }
          var i;
          switch (key2) {
            case "UNIT":
            case "PRIMEM":
            case "VERT_DATUM":
              obj[key2] = {
                name: v[0].toLowerCase(),
                convert: v[1]
              };
              if (v.length === 3) {
                sExpr(v[2], obj[key2]);
              }
              return;
            case "SPHEROID":
            case "ELLIPSOID":
              obj[key2] = {
                name: v[0],
                a: v[1],
                rf: v[2]
              };
              if (v.length === 4) {
                sExpr(v[3], obj[key2]);
              }
              return;
            case "EDATUM":
            case "ENGINEERINGDATUM":
            case "LOCAL_DATUM":
            case "DATUM":
            case "VERT_CS":
            case "VERTCRS":
            case "VERTICALCRS":
              v[0] = ["name", v[0]];
              mapit(obj, key2, v);
              return;
            case "COMPD_CS":
            case "COMPOUNDCRS":
            case "FITTED_CS":
            // the followings are the crs defined in
            // https://github.com/proj4js/proj4js/blob/1da4ed0b865d0fcb51c136090569210cdcc9019e/lib/parseCode.js#L11
            case "PROJECTEDCRS":
            case "PROJCRS":
            case "GEOGCS":
            case "GEOCCS":
            case "PROJCS":
            case "LOCAL_CS":
            case "GEODCRS":
            case "GEODETICCRS":
            case "GEODETICDATUM":
            case "ENGCRS":
            case "ENGINEERINGCRS":
              v[0] = ["name", v[0]];
              mapit(obj, key2, v);
              obj[key2].type = key2;
              return;
            default:
              i = -1;
              while (++i < v.length) {
                if (!Array.isArray(v[i])) {
                  return sExpr(v, obj[key2]);
                }
              }
              return mapit(obj, key2, v);
          }
        }
        var D2R = 0.017453292519943295;
        function d2r(input) {
          return input * D2R;
        }
        function applyProjectionDefaults(wkt2) {
          const normalizedProjName = (wkt2.projName || "").toLowerCase().replace(/_/g, " ");
          if (!wkt2.long0 && wkt2.longc && (normalizedProjName === "albers conic equal area" || normalizedProjName === "lambert azimuthal equal area")) {
            wkt2.long0 = wkt2.longc;
          }
          if (!wkt2.lat_ts && wkt2.lat1 && (normalizedProjName === "stereographic south pole" || normalizedProjName === "polar stereographic (variant b)")) {
            wkt2.lat0 = d2r(wkt2.lat1 > 0 ? 90 : -90);
            wkt2.lat_ts = wkt2.lat1;
            delete wkt2.lat1;
          } else if (!wkt2.lat_ts && wkt2.lat0 && (normalizedProjName === "polar stereographic" || normalizedProjName === "polar stereographic (variant a)")) {
            wkt2.lat_ts = wkt2.lat0;
            wkt2.lat0 = d2r(wkt2.lat0 > 0 ? 90 : -90);
            delete wkt2.lat1;
          }
        }
        function processUnit(unit) {
          let result2 = { units: null, to_meter: void 0 };
          if (typeof unit === "string") {
            result2.units = unit.toLowerCase();
            if (result2.units === "metre") {
              result2.units = "meter";
            }
            if (result2.units === "meter") {
              result2.to_meter = 1;
            }
          } else if (unit?.name) {
            result2.units = unit.name.toLowerCase();
            if (result2.units === "metre") {
              result2.units = "meter";
            }
            result2.to_meter = unit.conversion_factor;
          }
          return result2;
        }
        function toValue(valueOrObject) {
          if (typeof valueOrObject === "object") {
            return valueOrObject.value * valueOrObject.unit.conversion_factor;
          }
          return valueOrObject;
        }
        function calculateEllipsoid(value, result2) {
          if (value.ellipsoid.radius) {
            result2.a = value.ellipsoid.radius;
            result2.rf = 0;
          } else {
            result2.a = toValue(value.ellipsoid.semi_major_axis);
            if (value.ellipsoid.inverse_flattening !== void 0) {
              result2.rf = value.ellipsoid.inverse_flattening;
            } else if (value.ellipsoid.semi_major_axis !== void 0 && value.ellipsoid.semi_minor_axis !== void 0) {
              result2.rf = result2.a / (result2.a - toValue(value.ellipsoid.semi_minor_axis));
            }
          }
        }
        function transformPROJJSON(projjson, result2 = {}) {
          if (!projjson || typeof projjson !== "object") {
            return projjson;
          }
          if (projjson.type === "BoundCRS") {
            transformPROJJSON(projjson.source_crs, result2);
            if (projjson.transformation) {
              if (projjson.transformation.method?.name === "NTv2") {
                result2.nadgrids = projjson.transformation.parameters[0].value;
              } else {
                result2.datum_params = projjson.transformation.parameters.map((param) => param.value);
              }
            }
            return result2;
          }
          Object.keys(projjson).forEach((key2) => {
            const value = projjson[key2];
            if (value === null) {
              return;
            }
            switch (key2) {
              case "name":
                if (result2.srsCode) {
                  break;
                }
                result2.name = value;
                result2.srsCode = value;
                break;
              case "type":
                if (value === "GeographicCRS") {
                  result2.projName = "longlat";
                } else if (value === "ProjectedCRS") {
                  result2.projName = projjson.conversion?.method?.name;
                }
                break;
              case "datum":
              case "datum_ensemble":
                if (value.ellipsoid) {
                  result2.ellps = value.ellipsoid.name;
                  calculateEllipsoid(value, result2);
                }
                if (value.prime_meridian) {
                  result2.from_greenwich = value.prime_meridian.longitude * Math.PI / 180;
                }
                break;
              case "ellipsoid":
                result2.ellps = value.name;
                calculateEllipsoid(value, result2);
                break;
              case "prime_meridian":
                result2.long0 = (value.longitude || 0) * Math.PI / 180;
                break;
              case "coordinate_system":
                if (value.axis) {
                  result2.axis = value.axis.map((axis) => {
                    const direction = axis.direction;
                    if (direction === "east") return "e";
                    if (direction === "north") return "n";
                    if (direction === "west") return "w";
                    if (direction === "south") return "s";
                    throw new Error(`Unknown axis direction: ${direction}`);
                  }).join("") + "u";
                  if (value.unit) {
                    const { units: units2, to_meter } = processUnit(value.unit);
                    result2.units = units2;
                    result2.to_meter = to_meter;
                  } else if (value.axis[0]?.unit) {
                    const { units: units2, to_meter } = processUnit(value.axis[0].unit);
                    result2.units = units2;
                    result2.to_meter = to_meter;
                  }
                }
                break;
              case "id":
                if (value.authority && value.code) {
                  result2.title = value.authority + ":" + value.code;
                }
                break;
              case "conversion":
                if (value.method && value.method.name) {
                  result2.projName = value.method.name;
                }
                if (value.parameters) {
                  value.parameters.forEach((param) => {
                    const paramName = param.name.toLowerCase().replace(/\s+/g, "_");
                    const paramValue = param.value;
                    if (param.unit && param.unit.conversion_factor) {
                      result2[paramName] = paramValue * param.unit.conversion_factor;
                    } else if (param.unit === "degree") {
                      result2[paramName] = paramValue * Math.PI / 180;
                    } else {
                      result2[paramName] = paramValue;
                    }
                  });
                }
                break;
              case "unit":
                if (value.name) {
                  result2.units = value.name.toLowerCase();
                  if (result2.units === "metre") {
                    result2.units = "meter";
                  }
                }
                if (value.conversion_factor) {
                  result2.to_meter = value.conversion_factor;
                }
                break;
              case "base_crs":
                transformPROJJSON(value, result2);
                result2.datumCode = value.id ? value.id.authority + "_" + value.id.code : value.name;
                break;
            }
          });
          if (result2.latitude_of_false_origin !== void 0) {
            result2.lat0 = result2.latitude_of_false_origin;
          }
          if (result2.longitude_of_false_origin !== void 0) {
            result2.long0 = result2.longitude_of_false_origin;
          }
          if (result2.latitude_of_standard_parallel !== void 0) {
            result2.lat0 = result2.latitude_of_standard_parallel;
            result2.lat1 = result2.latitude_of_standard_parallel;
          }
          if (result2.latitude_of_1st_standard_parallel !== void 0) {
            result2.lat1 = result2.latitude_of_1st_standard_parallel;
          }
          if (result2.latitude_of_2nd_standard_parallel !== void 0) {
            result2.lat2 = result2.latitude_of_2nd_standard_parallel;
          }
          if (result2.latitude_of_projection_centre !== void 0) {
            result2.lat0 = result2.latitude_of_projection_centre;
          }
          if (result2.longitude_of_projection_centre !== void 0) {
            result2.longc = result2.longitude_of_projection_centre;
          }
          if (result2.easting_at_false_origin !== void 0) {
            result2.x0 = result2.easting_at_false_origin;
          }
          if (result2.northing_at_false_origin !== void 0) {
            result2.y0 = result2.northing_at_false_origin;
          }
          if (result2.latitude_of_natural_origin !== void 0) {
            result2.lat0 = result2.latitude_of_natural_origin;
          }
          if (result2.longitude_of_natural_origin !== void 0) {
            result2.long0 = result2.longitude_of_natural_origin;
          }
          if (result2.longitude_of_origin !== void 0) {
            result2.long0 = result2.longitude_of_origin;
          }
          if (result2.false_easting !== void 0) {
            result2.x0 = result2.false_easting;
          }
          if (result2.easting_at_projection_centre) {
            result2.x0 = result2.easting_at_projection_centre;
          }
          if (result2.false_northing !== void 0) {
            result2.y0 = result2.false_northing;
          }
          if (result2.northing_at_projection_centre) {
            result2.y0 = result2.northing_at_projection_centre;
          }
          if (result2.standard_parallel_1 !== void 0) {
            result2.lat1 = result2.standard_parallel_1;
          }
          if (result2.standard_parallel_2 !== void 0) {
            result2.lat2 = result2.standard_parallel_2;
          }
          if (result2.scale_factor_at_natural_origin !== void 0) {
            result2.k0 = result2.scale_factor_at_natural_origin;
          }
          if (result2.scale_factor_at_projection_centre !== void 0) {
            result2.k0 = result2.scale_factor_at_projection_centre;
          }
          if (result2.scale_factor_on_pseudo_standard_parallel !== void 0) {
            result2.k0 = result2.scale_factor_on_pseudo_standard_parallel;
          }
          if (result2.azimuth !== void 0) {
            result2.alpha = result2.azimuth;
          }
          if (result2.azimuth_at_projection_centre !== void 0) {
            result2.alpha = result2.azimuth_at_projection_centre;
          }
          if (result2.angle_from_rectified_to_skew_grid) {
            result2.rectified_grid_angle = result2.angle_from_rectified_to_skew_grid;
          }
          applyProjectionDefaults(result2);
          return result2;
        }
        var knownTypes = [
          "PROJECTEDCRS",
          "PROJCRS",
          "GEOGCS",
          "GEOCCS",
          "PROJCS",
          "LOCAL_CS",
          "GEODCRS",
          "GEODETICCRS",
          "GEODETICDATUM",
          "ENGCRS",
          "ENGINEERINGCRS"
        ];
        function rename(obj, params2) {
          var outName = params2[0];
          var inName = params2[1];
          if (!(outName in obj) && inName in obj) {
            obj[outName] = obj[inName];
            if (params2.length === 3) {
              obj[outName] = params2[2](obj[outName]);
            }
          }
        }
        function cleanWKT(wkt2) {
          var keys = Object.keys(wkt2);
          for (var i = 0, ii = keys.length; i < ii; ++i) {
            var key2 = keys[i];
            if (knownTypes.indexOf(key2) !== -1) {
              setPropertiesFromWkt(wkt2[key2]);
            }
            if (typeof wkt2[key2] === "object") {
              cleanWKT(wkt2[key2]);
            }
          }
        }
        function setPropertiesFromWkt(wkt2) {
          if (wkt2.AUTHORITY) {
            var authority = Object.keys(wkt2.AUTHORITY)[0];
            if (authority && authority in wkt2.AUTHORITY) {
              wkt2.title = authority + ":" + wkt2.AUTHORITY[authority];
            }
          }
          if (wkt2.type === "GEOGCS") {
            wkt2.projName = "longlat";
          } else if (wkt2.type === "LOCAL_CS") {
            wkt2.projName = "identity";
            wkt2.local = true;
          } else {
            if (typeof wkt2.PROJECTION === "object") {
              wkt2.projName = Object.keys(wkt2.PROJECTION)[0];
            } else {
              wkt2.projName = wkt2.PROJECTION;
            }
          }
          if (wkt2.AXIS) {
            var axisOrder = "";
            for (var i = 0, ii = wkt2.AXIS.length; i < ii; ++i) {
              var axis = [wkt2.AXIS[i][0].toLowerCase(), wkt2.AXIS[i][1].toLowerCase()];
              if (axis[0].indexOf("north") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "north") {
                axisOrder += "n";
              } else if (axis[0].indexOf("south") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "south") {
                axisOrder += "s";
              } else if (axis[0].indexOf("east") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "east") {
                axisOrder += "e";
              } else if (axis[0].indexOf("west") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "west") {
                axisOrder += "w";
              }
            }
            if (axisOrder.length === 2) {
              axisOrder += "u";
            }
            if (axisOrder.length === 3) {
              wkt2.axis = axisOrder;
            }
          }
          if (wkt2.UNIT) {
            wkt2.units = wkt2.UNIT.name.toLowerCase();
            if (wkt2.units === "metre") {
              wkt2.units = "meter";
            }
            if (wkt2.UNIT.convert) {
              if (wkt2.type === "GEOGCS") {
                if (wkt2.DATUM && wkt2.DATUM.SPHEROID) {
                  wkt2.to_meter = wkt2.UNIT.convert * wkt2.DATUM.SPHEROID.a;
                }
              } else {
                wkt2.to_meter = wkt2.UNIT.convert;
              }
            }
          }
          var geogcs = wkt2.GEOGCS;
          if (wkt2.type === "GEOGCS") {
            geogcs = wkt2;
          }
          if (geogcs) {
            if (geogcs.DATUM) {
              wkt2.datumCode = geogcs.DATUM.name.toLowerCase();
            } else {
              wkt2.datumCode = geogcs.name.toLowerCase();
            }
            if (wkt2.datumCode.slice(0, 2) === "d_") {
              wkt2.datumCode = wkt2.datumCode.slice(2);
            }
            if (wkt2.datumCode === "new_zealand_1949") {
              wkt2.datumCode = "nzgd49";
            }
            if (wkt2.datumCode === "wgs_1984" || wkt2.datumCode === "world_geodetic_system_1984") {
              if (wkt2.PROJECTION === "Mercator_Auxiliary_Sphere") {
                wkt2.sphere = true;
              }
              wkt2.datumCode = "wgs84";
            }
            if (wkt2.datumCode === "belge_1972") {
              wkt2.datumCode = "rnb72";
            }
            if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
              wkt2.ellps = geogcs.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk");
              if (wkt2.ellps.toLowerCase().slice(0, 13) === "international") {
                wkt2.ellps = "intl";
              }
              wkt2.a = geogcs.DATUM.SPHEROID.a;
              wkt2.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
            }
            if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
              wkt2.datum_params = geogcs.DATUM.TOWGS84;
            }
            if (~wkt2.datumCode.indexOf("osgb_1936")) {
              wkt2.datumCode = "osgb36";
            }
            if (~wkt2.datumCode.indexOf("osni_1952")) {
              wkt2.datumCode = "osni52";
            }
            if (~wkt2.datumCode.indexOf("tm65") || ~wkt2.datumCode.indexOf("geodetic_datum_of_1965")) {
              wkt2.datumCode = "ire65";
            }
            if (wkt2.datumCode === "ch1903+") {
              wkt2.datumCode = "ch1903";
            }
            if (~wkt2.datumCode.indexOf("israel")) {
              wkt2.datumCode = "isr93";
            }
          }
          if (wkt2.b && !isFinite(wkt2.b)) {
            wkt2.b = wkt2.a;
          }
          if (wkt2.rectified_grid_angle) {
            wkt2.rectified_grid_angle = d2r(wkt2.rectified_grid_angle);
          }
          function toMeter(input) {
            var ratio = wkt2.to_meter || 1;
            return input * ratio;
          }
          var renamer = function(a) {
            return rename(wkt2, a);
          };
          var list = [
            ["standard_parallel_1", "Standard_Parallel_1"],
            ["standard_parallel_1", "Latitude of 1st standard parallel"],
            ["standard_parallel_2", "Standard_Parallel_2"],
            ["standard_parallel_2", "Latitude of 2nd standard parallel"],
            ["false_easting", "False_Easting"],
            ["false_easting", "False easting"],
            ["false-easting", "Easting at false origin"],
            ["false_northing", "False_Northing"],
            ["false_northing", "False northing"],
            ["false_northing", "Northing at false origin"],
            ["central_meridian", "Central_Meridian"],
            ["central_meridian", "Longitude of natural origin"],
            ["central_meridian", "Longitude of false origin"],
            ["latitude_of_origin", "Latitude_Of_Origin"],
            ["latitude_of_origin", "Central_Parallel"],
            ["latitude_of_origin", "Latitude of natural origin"],
            ["latitude_of_origin", "Latitude of false origin"],
            ["scale_factor", "Scale_Factor"],
            ["k0", "scale_factor"],
            ["latitude_of_center", "Latitude_Of_Center"],
            ["latitude_of_center", "Latitude_of_center"],
            ["lat0", "latitude_of_center", d2r],
            ["longitude_of_center", "Longitude_Of_Center"],
            ["longitude_of_center", "Longitude_of_center"],
            ["longc", "longitude_of_center", d2r],
            ["x0", "false_easting", toMeter],
            ["y0", "false_northing", toMeter],
            ["long0", "central_meridian", d2r],
            ["lat0", "latitude_of_origin", d2r],
            ["lat0", "standard_parallel_1", d2r],
            ["lat1", "standard_parallel_1", d2r],
            ["lat2", "standard_parallel_2", d2r],
            ["azimuth", "Azimuth"],
            ["alpha", "azimuth", d2r],
            ["srsCode", "name"]
          ];
          list.forEach(renamer);
          applyProjectionDefaults(wkt2);
        }
        function wkt(wkt2) {
          if (typeof wkt2 === "object") {
            return transformPROJJSON(wkt2);
          }
          const version = detectWKTVersion(wkt2);
          var lisp = parseString(wkt2);
          if (version === "WKT2") {
            const projjson = buildPROJJSON(lisp);
            return transformPROJJSON(projjson);
          }
          var type = lisp[0];
          var obj = {};
          sExpr(lisp, obj);
          cleanWKT(obj);
          return obj[type];
        }
        function defs(name) {
          var that = this;
          if (arguments.length === 2) {
            var def = arguments[1];
            if (typeof def === "string") {
              if (def.charAt(0) === "+") {
                defs[name] = projStr(arguments[1]);
              } else {
                defs[name] = wkt(arguments[1]);
              }
            } else {
              defs[name] = def;
            }
          } else if (arguments.length === 1) {
            if (Array.isArray(name)) {
              return name.map(function(v) {
                if (Array.isArray(v)) {
                  defs.apply(that, v);
                } else {
                  defs(v);
                }
              });
            } else if (typeof name === "string") {
              if (name in defs) {
                return defs[name];
              }
            } else if ("EPSG" in name) {
              defs["EPSG:" + name.EPSG] = name;
            } else if ("ESRI" in name) {
              defs["ESRI:" + name.ESRI] = name;
            } else if ("IAU2000" in name) {
              defs["IAU2000:" + name.IAU2000] = name;
            } else {
              console.log(name);
            }
            return;
          }
        }
        globals(defs);
        function testObj(code) {
          return typeof code === "string";
        }
        function testDef(code) {
          return code in defs;
        }
        function testWKT(code) {
          return code.indexOf("+") !== 0 && code.indexOf("[") !== -1 || typeof code === "object" && !("srsCode" in code);
        }
        var codes = ["3857", "900913", "3785", "102113"];
        function checkMercator(item) {
          var auth = match(item, "authority");
          if (!auth) {
            return;
          }
          var code = match(auth, "epsg");
          return code && codes.indexOf(code) > -1;
        }
        function checkProjStr(item) {
          var ext = match(item, "extension");
          if (!ext) {
            return;
          }
          return match(ext, "proj4");
        }
        function testProj(code) {
          return code[0] === "+";
        }
        function parse(code) {
          if (testObj(code)) {
            if (testDef(code)) {
              return defs[code];
            }
            if (testWKT(code)) {
              var out = wkt(code);
              if (checkMercator(out)) {
                return defs["EPSG:3857"];
              }
              var maybeProjStr = checkProjStr(out);
              if (maybeProjStr) {
                return projStr(maybeProjStr);
              }
              return out;
            }
            if (testProj(code)) {
              return projStr(code);
            }
          } else if (!code.projName) {
            return wkt(code);
          } else {
            return code;
          }
        }
        function extend(destination, source) {
          destination = destination || {};
          var value, property;
          if (!source) {
            return destination;
          }
          for (property in source) {
            value = source[property];
            if (value !== void 0) {
              destination[property] = value;
            }
          }
          return destination;
        }
        function msfnz(eccent, sinphi, cosphi) {
          var con = eccent * sinphi;
          return cosphi / Math.sqrt(1 - con * con);
        }
        function sign(x) {
          return x < 0 ? -1 : 1;
        }
        function adjust_lon(x) {
          return Math.abs(x) <= SPI ? x : x - sign(x) * TWO_PI;
        }
        function tsfnz(eccent, phi, sinphi) {
          var con = eccent * sinphi;
          var com = 0.5 * eccent;
          con = Math.pow((1 - con) / (1 + con), com);
          return Math.tan(0.5 * (HALF_PI - phi)) / con;
        }
        function phi2z(eccent, ts) {
          var eccnth = 0.5 * eccent;
          var con, dphi;
          var phi = HALF_PI - 2 * Math.atan(ts);
          for (var i = 0; i <= 15; i++) {
            con = eccent * Math.sin(phi);
            dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi;
            phi += dphi;
            if (Math.abs(dphi) <= 1e-10) {
              return phi;
            }
          }
          return -9999;
        }
        function init$x() {
          var con = this.b / this.a;
          this.es = 1 - con * con;
          if (!("x0" in this)) {
            this.x0 = 0;
          }
          if (!("y0" in this)) {
            this.y0 = 0;
          }
          this.e = Math.sqrt(this.es);
          if (this.lat_ts) {
            if (this.sphere) {
              this.k0 = Math.cos(this.lat_ts);
            } else {
              this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
            }
          } else {
            if (!this.k0) {
              if (this.k) {
                this.k0 = this.k;
              } else {
                this.k0 = 1;
              }
            }
          }
        }
        function forward$v(p) {
          var lon = p.x;
          var lat = p.y;
          if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
            return null;
          }
          var x, y;
          if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
            return null;
          } else {
            if (this.sphere) {
              x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
              y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
            } else {
              var sinphi = Math.sin(lat);
              var ts = tsfnz(this.e, lat, sinphi);
              x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
              y = this.y0 - this.a * this.k0 * Math.log(ts);
            }
            p.x = x;
            p.y = y;
            return p;
          }
        }
        function inverse$v(p) {
          var x = p.x - this.x0;
          var y = p.y - this.y0;
          var lon, lat;
          if (this.sphere) {
            lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
          } else {
            var ts = Math.exp(-y / (this.a * this.k0));
            lat = phi2z(this.e, ts);
            if (lat === -9999) {
              return null;
            }
          }
          lon = adjust_lon(this.long0 + x / (this.a * this.k0));
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$x = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "Mercator_Variant_A", "merc"];
        var merc = {
          init: init$x,
          forward: forward$v,
          inverse: inverse$v,
          names: names$x
        };
        function init$w() {
        }
        function identity(pt) {
          return pt;
        }
        var names$w = ["longlat", "identity"];
        var longlat = {
          init: init$w,
          forward: identity,
          inverse: identity,
          names: names$w
        };
        var projs = [merc, longlat];
        var names$v = {};
        var projStore = [];
        function add(proj, i) {
          var len = projStore.length;
          if (!proj.names) {
            console.log(i);
            return true;
          }
          projStore[len] = proj;
          proj.names.forEach(function(n) {
            names$v[n.toLowerCase()] = len;
          });
          return this;
        }
        function getNormalizedProjName(n) {
          return n.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
        }
        function get(name) {
          if (!name) {
            return false;
          }
          var n = name.toLowerCase();
          if (typeof names$v[n] !== "undefined" && projStore[names$v[n]]) {
            return projStore[names$v[n]];
          }
          n = getNormalizedProjName(n);
          if (n in names$v && projStore[names$v[n]]) {
            return projStore[names$v[n]];
          }
        }
        function start() {
          projs.forEach(add);
        }
        var projections = {
          start,
          add,
          get
        };
        var ellipsoids = {
          MERIT: {
            a: 6378137,
            rf: 298.257,
            ellipseName: "MERIT 1983"
          },
          SGS85: {
            a: 6378136,
            rf: 298.257,
            ellipseName: "Soviet Geodetic System 85"
          },
          GRS80: {
            a: 6378137,
            rf: 298.257222101,
            ellipseName: "GRS 1980(IUGG, 1980)"
          },
          IAU76: {
            a: 6378140,
            rf: 298.257,
            ellipseName: "IAU 1976"
          },
          airy: {
            a: 6377563396e-3,
            b: 635625691e-2,
            ellipseName: "Airy 1830"
          },
          APL4: {
            a: 6378137,
            rf: 298.25,
            ellipseName: "Appl. Physics. 1965"
          },
          NWL9D: {
            a: 6378145,
            rf: 298.25,
            ellipseName: "Naval Weapons Lab., 1965"
          },
          mod_airy: {
            a: 6377340189e-3,
            b: 6356034446e-3,
            ellipseName: "Modified Airy"
          },
          andrae: {
            a: 637710443e-2,
            rf: 300,
            ellipseName: "Andrae 1876 (Den., Iclnd.)"
          },
          aust_SA: {
            a: 6378160,
            rf: 298.25,
            ellipseName: "Australian Natl & S. Amer. 1969"
          },
          GRS67: {
            a: 6378160,
            rf: 298.247167427,
            ellipseName: "GRS 67(IUGG 1967)"
          },
          bessel: {
            a: 6377397155e-3,
            rf: 299.1528128,
            ellipseName: "Bessel 1841"
          },
          bess_nam: {
            a: 6377483865e-3,
            rf: 299.1528128,
            ellipseName: "Bessel 1841 (Namibia)"
          },
          clrk66: {
            a: 63782064e-1,
            b: 63565838e-1,
            ellipseName: "Clarke 1866"
          },
          clrk80: {
            a: 6378249145e-3,
            rf: 293.4663,
            ellipseName: "Clarke 1880 mod."
          },
          clrk80ign: {
            a: 63782492e-1,
            b: 6356515,
            rf: 293.4660213,
            ellipseName: "Clarke 1880 (IGN)"
          },
          clrk58: {
            a: 6378293645208759e-9,
            rf: 294.2606763692654,
            ellipseName: "Clarke 1858"
          },
          CPM: {
            a: 63757387e-1,
            rf: 334.29,
            ellipseName: "Comm. des Poids et Mesures 1799"
          },
          delmbr: {
            a: 6376428,
            rf: 311.5,
            ellipseName: "Delambre 1810 (Belgium)"
          },
          engelis: {
            a: 637813605e-2,
            rf: 298.2566,
            ellipseName: "Engelis 1985"
          },
          evrst30: {
            a: 6377276345e-3,
            rf: 300.8017,
            ellipseName: "Everest 1830"
          },
          evrst48: {
            a: 6377304063e-3,
            rf: 300.8017,
            ellipseName: "Everest 1948"
          },
          evrst56: {
            a: 6377301243e-3,
            rf: 300.8017,
            ellipseName: "Everest 1956"
          },
          evrst69: {
            a: 6377295664e-3,
            rf: 300.8017,
            ellipseName: "Everest 1969"
          },
          evrstSS: {
            a: 6377298556e-3,
            rf: 300.8017,
            ellipseName: "Everest (Sabah & Sarawak)"
          },
          fschr60: {
            a: 6378166,
            rf: 298.3,
            ellipseName: "Fischer (Mercury Datum) 1960"
          },
          fschr60m: {
            a: 6378155,
            rf: 298.3,
            ellipseName: "Fischer 1960"
          },
          fschr68: {
            a: 6378150,
            rf: 298.3,
            ellipseName: "Fischer 1968"
          },
          helmert: {
            a: 6378200,
            rf: 298.3,
            ellipseName: "Helmert 1906"
          },
          hough: {
            a: 6378270,
            rf: 297,
            ellipseName: "Hough"
          },
          intl: {
            a: 6378388,
            rf: 297,
            ellipseName: "International 1909 (Hayford)"
          },
          kaula: {
            a: 6378163,
            rf: 298.24,
            ellipseName: "Kaula 1961"
          },
          lerch: {
            a: 6378139,
            rf: 298.257,
            ellipseName: "Lerch 1979"
          },
          mprts: {
            a: 6397300,
            rf: 191,
            ellipseName: "Maupertius 1738"
          },
          new_intl: {
            a: 63781575e-1,
            b: 63567722e-1,
            ellipseName: "New International 1967"
          },
          plessis: {
            a: 6376523,
            rf: 6355863,
            ellipseName: "Plessis 1817 (France)"
          },
          krass: {
            a: 6378245,
            rf: 298.3,
            ellipseName: "Krassovsky, 1942"
          },
          SEasia: {
            a: 6378155,
            b: 63567733205e-4,
            ellipseName: "Southeast Asia"
          },
          walbeck: {
            a: 6376896,
            b: 63558348467e-4,
            ellipseName: "Walbeck"
          },
          WGS60: {
            a: 6378165,
            rf: 298.3,
            ellipseName: "WGS 60"
          },
          WGS66: {
            a: 6378145,
            rf: 298.25,
            ellipseName: "WGS 66"
          },
          WGS7: {
            a: 6378135,
            rf: 298.26,
            ellipseName: "WGS 72"
          },
          WGS84: {
            a: 6378137,
            rf: 298.257223563,
            ellipseName: "WGS 84"
          },
          sphere: {
            a: 6370997,
            b: 6370997,
            ellipseName: "Normal Sphere (r=6370997)"
          }
        };
        const WGS84 = ellipsoids.WGS84;
        function eccentricity(a, b, rf, R_A) {
          var a2 = a * a;
          var b2 = b * b;
          var es = (a2 - b2) / a2;
          var e = 0;
          if (R_A) {
            a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
            a2 = a * a;
            es = 0;
          } else {
            e = Math.sqrt(es);
          }
          var ep2 = (a2 - b2) / b2;
          return {
            es,
            e,
            ep2
          };
        }
        function sphere(a, b, rf, ellps, sphere2) {
          if (!a) {
            var ellipse = match(ellipsoids, ellps);
            if (!ellipse) {
              ellipse = WGS84;
            }
            a = ellipse.a;
            b = ellipse.b;
            rf = ellipse.rf;
          }
          if (rf && !b) {
            b = (1 - 1 / rf) * a;
          }
          if (rf === 0 || Math.abs(a - b) < EPSLN) {
            sphere2 = true;
            b = a;
          }
          return {
            a,
            b,
            rf,
            sphere: sphere2
          };
        }
        var datums = {
          wgs84: {
            towgs84: "0,0,0",
            ellipse: "WGS84",
            datumName: "WGS84"
          },
          ch1903: {
            towgs84: "674.374,15.056,405.346",
            ellipse: "bessel",
            datumName: "swiss"
          },
          ggrs87: {
            towgs84: "-199.87,74.79,246.62",
            ellipse: "GRS80",
            datumName: "Greek_Geodetic_Reference_System_1987"
          },
          nad83: {
            towgs84: "0,0,0",
            ellipse: "GRS80",
            datumName: "North_American_Datum_1983"
          },
          nad27: {
            nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
            ellipse: "clrk66",
            datumName: "North_American_Datum_1927"
          },
          potsdam: {
            towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
            ellipse: "bessel",
            datumName: "Potsdam Rauenberg 1950 DHDN"
          },
          carthage: {
            towgs84: "-263.0,6.0,431.0",
            ellipse: "clark80",
            datumName: "Carthage 1934 Tunisia"
          },
          hermannskogel: {
            towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
            ellipse: "bessel",
            datumName: "Hermannskogel"
          },
          mgi: {
            towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
            ellipse: "bessel",
            datumName: "Militar-Geographische Institut"
          },
          osni52: {
            towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
            ellipse: "airy",
            datumName: "Irish National"
          },
          ire65: {
            towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
            ellipse: "mod_airy",
            datumName: "Ireland 1965"
          },
          rassadiran: {
            towgs84: "-133.63,-157.5,-158.62",
            ellipse: "intl",
            datumName: "Rassadiran"
          },
          nzgd49: {
            towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
            ellipse: "intl",
            datumName: "New Zealand Geodetic Datum 1949"
          },
          osgb36: {
            towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
            ellipse: "airy",
            datumName: "Ordnance Survey of Great Britain 1936"
          },
          s_jtsk: {
            towgs84: "589,76,480",
            ellipse: "bessel",
            datumName: "S-JTSK (Ferro)"
          },
          beduaram: {
            towgs84: "-106,-87,188",
            ellipse: "clrk80",
            datumName: "Beduaram"
          },
          gunung_segara: {
            towgs84: "-403,684,41",
            ellipse: "bessel",
            datumName: "Gunung Segara Jakarta"
          },
          rnb72: {
            towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
            ellipse: "intl",
            datumName: "Reseau National Belge 1972"
          },
          EPSG_5451: {
            towgs84: "6.41,-49.05,-11.28,1.5657,0.5242,6.9718,-5.7649"
          },
          IGNF_LURESG: {
            towgs84: "-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43"
          },
          EPSG_4614: {
            towgs84: "-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065"
          },
          EPSG_4615: {
            towgs84: "-494.088,-312.129,279.877,-1.423,-1.013,1.59,-0.748"
          },
          ESRI_37241: {
            towgs84: "-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031"
          },
          ESRI_37249: {
            towgs84: "-440.296,58.548,296.265,1.128,10.202,4.559,-0.438"
          },
          ESRI_37245: {
            towgs84: "-511.151,-181.269,139.609,1.05,2.703,1.798,3.071"
          },
          EPSG_4178: {
            towgs84: "24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01"
          },
          EPSG_4622: {
            towgs84: "-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984"
          },
          EPSG_4625: {
            towgs84: "126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227"
          },
          EPSG_5252: {
            towgs84: "0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439"
          },
          EPSG_4314: {
            towgs84: "597.1,71.4,412.1,0.894,0.068,-1.563,7.58"
          },
          EPSG_4282: {
            towgs84: "-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166"
          },
          EPSG_4231: {
            towgs84: "-83.11,-97.38,-117.22,0.0276,-0.2167,0.2147,0.1218"
          },
          EPSG_4274: {
            towgs84: "-230.994,102.591,25.199,0.633,-0.239,0.9,1.95"
          },
          EPSG_4134: {
            towgs84: "-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006"
          },
          EPSG_4254: {
            towgs84: "18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013"
          },
          EPSG_4159: {
            towgs84: "-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175"
          },
          EPSG_4687: {
            towgs84: "0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093"
          },
          EPSG_4227: {
            towgs84: "-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225"
          },
          EPSG_4746: {
            towgs84: "599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46"
          },
          EPSG_4745: {
            towgs84: "612.4,77,440.2,-0.054,0.057,-2.797,2.55"
          },
          EPSG_6311: {
            towgs84: "8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926"
          },
          EPSG_4289: {
            towgs84: "565.7381,50.4018,465.2904,-1.91514,1.60363,-9.09546,4.07244"
          },
          EPSG_4230: {
            towgs84: "-68.863,-134.888,-111.49,-0.53,-0.14,0.57,-3.4"
          },
          EPSG_4154: {
            towgs84: "-123.02,-158.95,-168.47"
          },
          EPSG_4156: {
            towgs84: "570.8,85.7,462.8,4.998,1.587,5.261,3.56"
          },
          EPSG_4299: {
            towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
          },
          EPSG_4179: {
            towgs84: "33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84"
          },
          EPSG_4313: {
            towgs84: "-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747"
          },
          EPSG_4194: {
            towgs84: "163.511,127.533,-159.789"
          },
          EPSG_4195: {
            towgs84: "105,326,-102.5"
          },
          EPSG_4196: {
            towgs84: "-45,417,-3.5"
          },
          EPSG_4611: {
            towgs84: "-162.619,-276.959,-161.764,0.067753,-2.243649,-1.158827,-1.094246"
          },
          EPSG_4633: {
            towgs84: "137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824"
          },
          EPSG_4641: {
            towgs84: "-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993"
          },
          EPSG_4643: {
            towgs84: "-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002"
          },
          EPSG_4300: {
            towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
          },
          EPSG_4188: {
            towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
          },
          EPSG_4660: {
            towgs84: "982.6087,552.753,-540.873,32.39344,-153.25684,-96.2266,16.805"
          },
          EPSG_4662: {
            towgs84: "97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259"
          },
          EPSG_3906: {
            towgs84: "577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664"
          },
          EPSG_4307: {
            towgs84: "-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547"
          },
          EPSG_6892: {
            towgs84: "-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686"
          },
          EPSG_4690: {
            towgs84: "221.597,152.441,176.523,2.403,1.3893,0.884,11.4648"
          },
          EPSG_4691: {
            towgs84: "218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817"
          },
          EPSG_4629: {
            towgs84: "72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653"
          },
          EPSG_4630: {
            towgs84: "165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111"
          },
          EPSG_4692: {
            towgs84: "217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093"
          },
          EPSG_9333: {
            towgs84: "0,0,0,-8.393,0.749,-10.276,0"
          },
          EPSG_9059: {
            towgs84: "0,0,0"
          },
          EPSG_4312: {
            towgs84: "601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887"
          },
          EPSG_4123: {
            towgs84: "-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496"
          },
          EPSG_4309: {
            towgs84: "-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365"
          },
          ESRI_104106: {
            towgs84: "-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058"
          },
          EPSG_4281: {
            towgs84: "-219.247,-73.802,269.529"
          },
          EPSG_4322: {
            towgs84: "0,0,4.5"
          },
          EPSG_4324: {
            towgs84: "0,0,1.9"
          },
          EPSG_4284: {
            towgs84: "43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549"
          },
          EPSG_4277: {
            towgs84: "446.448,-125.157,542.06,0.15,0.247,0.842,-20.489"
          },
          EPSG_4207: {
            towgs84: "-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46"
          },
          EPSG_4688: {
            towgs84: "347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647"
          },
          EPSG_4689: {
            towgs84: "410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218"
          },
          EPSG_4720: {
            towgs84: "0,0,4.5"
          },
          EPSG_4273: {
            towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21"
          },
          EPSG_4240: {
            towgs84: "204.64,834.74,293.8"
          },
          EPSG_4817: {
            towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21"
          },
          ESRI_104131: {
            towgs84: "426.62,142.62,460.09,4.98,4.49,-12.42,-17.1"
          },
          EPSG_4265: {
            towgs84: "-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"
          },
          EPSG_4263: {
            towgs84: "-111.92,-87.85,114.5,1.875,0.202,0.219,0.032"
          },
          EPSG_4298: {
            towgs84: "-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536"
          },
          EPSG_4270: {
            towgs84: "-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424"
          },
          EPSG_4229: {
            towgs84: "-121.8,98.1,-10.7"
          },
          EPSG_4220: {
            towgs84: "-55.5,-348,-229.2"
          },
          EPSG_4214: {
            towgs84: "12.646,-155.176,-80.863"
          },
          EPSG_4232: {
            towgs84: "-345,3,223"
          },
          EPSG_4238: {
            towgs84: "-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037"
          },
          EPSG_4168: {
            towgs84: "-170,33,326"
          },
          EPSG_4131: {
            towgs84: "199,931,318.9"
          },
          EPSG_4152: {
            towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
          },
          EPSG_5228: {
            towgs84: "572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378"
          },
          EPSG_8351: {
            towgs84: "485.021,169.465,483.839,7.786342,4.397554,4.102655,0"
          },
          EPSG_4683: {
            towgs84: "-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06"
          },
          EPSG_4133: {
            towgs84: "0,0,0"
          },
          EPSG_7373: {
            towgs84: "0.819,-0.5762,-1.6446,-0.00378,-0.03317,0.00318,0.0693"
          },
          EPSG_9075: {
            towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
          },
          EPSG_9072: {
            towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
          },
          EPSG_9294: {
            towgs84: "1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388"
          },
          EPSG_4212: {
            towgs84: "-267.434,173.496,181.814,-13.4704,8.7154,7.3926,14.7492"
          },
          EPSG_4191: {
            towgs84: "-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703"
          },
          EPSG_4237: {
            towgs84: "52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191"
          },
          EPSG_4740: {
            towgs84: "-1.08,-0.27,-0.9"
          },
          EPSG_4124: {
            towgs84: "419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496"
          },
          EPSG_5681: {
            towgs84: "584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922"
          },
          EPSG_4141: {
            towgs84: "23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262"
          },
          EPSG_4204: {
            towgs84: "-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194"
          },
          EPSG_4319: {
            towgs84: "226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798"
          },
          EPSG_4200: {
            towgs84: "24.82,-131.21,-82.66"
          },
          EPSG_4130: {
            towgs84: "0,0,0"
          },
          EPSG_4127: {
            towgs84: "-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359"
          },
          EPSG_4149: {
            towgs84: "674.374,15.056,405.346"
          },
          EPSG_4617: {
            towgs84: "-0.991,1.9072,0.5129,1.25033e-7,4.6785e-8,5.6529e-8,0"
          },
          EPSG_4663: {
            towgs84: "-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485"
          },
          EPSG_4664: {
            towgs84: "-211.939,137.626,58.3,-0.089,0.251,0.079,0.384"
          },
          EPSG_4665: {
            towgs84: "-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048"
          },
          EPSG_4666: {
            towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"
          },
          EPSG_4756: {
            towgs84: "-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188"
          },
          EPSG_4723: {
            towgs84: "-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925"
          },
          EPSG_4726: {
            towgs84: "8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081"
          },
          EPSG_4267: {
            towgs84: "-8.0,160.0,176.0"
          },
          EPSG_5365: {
            towgs84: "-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693"
          },
          EPSG_4218: {
            towgs84: "304.5,306.5,-318.1"
          },
          EPSG_4242: {
            towgs84: "-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95"
          },
          EPSG_4216: {
            towgs84: "-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289"
          },
          ESRI_104105: {
            towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"
          },
          ESRI_104129: {
            towgs84: "0,0,0"
          },
          EPSG_4673: {
            towgs84: "174.05,-25.49,112.57"
          },
          EPSG_4202: {
            towgs84: "-124,-60,154"
          },
          EPSG_4203: {
            towgs84: "-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191"
          },
          EPSG_3819: {
            towgs84: "595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408"
          },
          EPSG_8694: {
            towgs84: "-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169"
          },
          EPSG_4145: {
            towgs84: "275.57,676.78,229.6"
          },
          EPSG_4283: {
            towgs84: "61.55,-10.87,-40.19,39.4924,32.7221,32.8979,-9.994"
          },
          EPSG_4317: {
            towgs84: "2.3287,-147.0425,-92.0802,-0.3092483,0.32482185,0.49729934,5.68906266"
          },
          EPSG_4272: {
            towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993"
          },
          EPSG_4248: {
            towgs84: "-307.7,265.3,-363.5"
          },
          EPSG_5561: {
            towgs84: "24,-121,-76"
          },
          EPSG_5233: {
            towgs84: "-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338"
          },
          ESRI_104130: {
            towgs84: "-86,-98,-119"
          },
          ESRI_104102: {
            towgs84: "682,-203,480"
          },
          ESRI_37207: {
            towgs84: "7,-10,-26"
          },
          EPSG_4675: {
            towgs84: "59.935,118.4,-10.871"
          },
          ESRI_104109: {
            towgs84: "-89.121,-348.182,260.871"
          },
          ESRI_104112: {
            towgs84: "-185.583,-230.096,281.361"
          },
          ESRI_104113: {
            towgs84: "25.1,-275.6,222.6"
          },
          IGNF_WGS72G: {
            towgs84: "0,12,6"
          },
          IGNF_NTFG: {
            towgs84: "-168,-60,320"
          },
          IGNF_EFATE57G: {
            towgs84: "-127,-769,472"
          },
          IGNF_PGP50G: {
            towgs84: "324.8,153.6,172.1"
          },
          IGNF_REUN47G: {
            towgs84: "94,-948,-1262"
          },
          IGNF_CSG67G: {
            towgs84: "-186,230,110"
          },
          IGNF_GUAD48G: {
            towgs84: "-467,-16,-300"
          },
          IGNF_TAHI51G: {
            towgs84: "162,117,154"
          },
          IGNF_TAHAAG: {
            towgs84: "65,342,77"
          },
          IGNF_NUKU72G: {
            towgs84: "84,274,65"
          },
          IGNF_PETRELS72G: {
            towgs84: "365,194,166"
          },
          IGNF_WALL78G: {
            towgs84: "253,-133,-127"
          },
          IGNF_MAYO50G: {
            towgs84: "-382,-59,-262"
          },
          IGNF_TANNAG: {
            towgs84: "-139,-967,436"
          },
          IGNF_IGN72G: {
            towgs84: "-13,-348,292"
          },
          IGNF_ATIGG: {
            towgs84: "1118,23,66"
          },
          IGNF_FANGA84G: {
            towgs84: "150.57,158.33,118.32"
          },
          IGNF_RUSAT84G: {
            towgs84: "202.13,174.6,-15.74"
          },
          IGNF_KAUE70G: {
            towgs84: "126.74,300.1,-75.49"
          },
          IGNF_MOP90G: {
            towgs84: "-10.8,-1.8,12.77"
          },
          IGNF_MHPF67G: {
            towgs84: "338.08,212.58,-296.17"
          },
          IGNF_TAHI79G: {
            towgs84: "160.61,116.05,153.69"
          },
          IGNF_ANAA92G: {
            towgs84: "1.5,3.84,4.81"
          },
          IGNF_MARQUI72G: {
            towgs84: "330.91,-13.92,58.56"
          },
          IGNF_APAT86G: {
            towgs84: "143.6,197.82,74.05"
          },
          IGNF_TUBU69G: {
            towgs84: "237.17,171.61,-77.84"
          },
          IGNF_STPM50G: {
            towgs84: "11.363,424.148,373.13"
          },
          EPSG_4150: {
            towgs84: "674.374,15.056,405.346"
          },
          EPSG_4754: {
            towgs84: "-208.4058,-109.8777,-2.5764"
          },
          ESRI_104101: {
            towgs84: "374,150,588"
          },
          EPSG_4693: {
            towgs84: "0,-0.15,0.68"
          },
          EPSG_6207: {
            towgs84: "293.17,726.18,245.36"
          },
          EPSG_4153: {
            towgs84: "-133.63,-157.5,-158.62"
          },
          EPSG_4132: {
            towgs84: "-241.54,-163.64,396.06"
          },
          EPSG_4221: {
            towgs84: "-154.5,150.7,100.4"
          },
          EPSG_4266: {
            towgs84: "-80.7,-132.5,41.1"
          },
          EPSG_4193: {
            towgs84: "-70.9,-151.8,-41.4"
          },
          EPSG_5340: {
            towgs84: "-0.41,0.46,-0.35"
          },
          EPSG_4246: {
            towgs84: "-294.7,-200.1,525.5"
          },
          EPSG_4318: {
            towgs84: "-3.2,-5.7,2.8"
          },
          EPSG_4121: {
            towgs84: "-199.87,74.79,246.62"
          },
          EPSG_4223: {
            towgs84: "-260.1,5.5,432.2"
          },
          EPSG_4158: {
            towgs84: "-0.465,372.095,171.736"
          },
          EPSG_4285: {
            towgs84: "-128.16,-282.42,21.93"
          },
          EPSG_4613: {
            towgs84: "-404.78,685.68,45.47"
          },
          EPSG_4607: {
            towgs84: "195.671,332.517,274.607"
          },
          EPSG_4475: {
            towgs84: "-381.788,-57.501,-256.673"
          },
          EPSG_4208: {
            towgs84: "-157.84,308.54,-146.6"
          },
          EPSG_4743: {
            towgs84: "70.995,-335.916,262.898"
          },
          EPSG_4710: {
            towgs84: "-323.65,551.39,-491.22"
          },
          EPSG_7881: {
            towgs84: "-0.077,0.079,0.086"
          },
          EPSG_4682: {
            towgs84: "283.729,735.942,261.143"
          },
          EPSG_4739: {
            towgs84: "-156,-271,-189"
          },
          EPSG_4679: {
            towgs84: "-80.01,253.26,291.19"
          },
          EPSG_4750: {
            towgs84: "-56.263,16.136,-22.856"
          },
          EPSG_4644: {
            towgs84: "-10.18,-350.43,291.37"
          },
          EPSG_4695: {
            towgs84: "-103.746,-9.614,-255.95"
          },
          EPSG_4292: {
            towgs84: "-355,21,72"
          },
          EPSG_4302: {
            towgs84: "-61.702,284.488,472.052"
          },
          EPSG_4143: {
            towgs84: "-124.76,53,466.79"
          },
          EPSG_4606: {
            towgs84: "-153,153,307"
          },
          EPSG_4699: {
            towgs84: "-770.1,158.4,-498.2"
          },
          EPSG_4247: {
            towgs84: "-273.5,110.6,-357.9"
          },
          EPSG_4160: {
            towgs84: "8.88,184.86,106.69"
          },
          EPSG_4161: {
            towgs84: "-233.43,6.65,173.64"
          },
          EPSG_9251: {
            towgs84: "-9.5,122.9,138.2"
          },
          EPSG_9253: {
            towgs84: "-78.1,101.6,133.3"
          },
          EPSG_4297: {
            towgs84: "-198.383,-240.517,-107.909"
          },
          EPSG_4269: {
            towgs84: "0,0,0"
          },
          EPSG_4301: {
            towgs84: "-147,506,687"
          },
          EPSG_4618: {
            towgs84: "-59,-11,-52"
          },
          EPSG_4612: {
            towgs84: "0,0,0"
          },
          EPSG_4678: {
            towgs84: "44.585,-131.212,-39.544"
          },
          EPSG_4250: {
            towgs84: "-130,29,364"
          },
          EPSG_4144: {
            towgs84: "214,804,268"
          },
          EPSG_4147: {
            towgs84: "-17.51,-108.32,-62.39"
          },
          EPSG_4259: {
            towgs84: "-254.1,-5.36,-100.29"
          },
          EPSG_4164: {
            towgs84: "-76,-138,67"
          },
          EPSG_4211: {
            towgs84: "-378.873,676.002,-46.255"
          },
          EPSG_4182: {
            towgs84: "-422.651,-172.995,84.02"
          },
          EPSG_4224: {
            towgs84: "-143.87,243.37,-33.52"
          },
          EPSG_4225: {
            towgs84: "-205.57,168.77,-4.12"
          },
          EPSG_5527: {
            towgs84: "-67.35,3.88,-38.22"
          },
          EPSG_4752: {
            towgs84: "98,390,-22"
          },
          EPSG_4310: {
            towgs84: "-30,190,89"
          },
          EPSG_9248: {
            towgs84: "-192.26,65.72,132.08"
          },
          EPSG_4680: {
            towgs84: "124.5,-63.5,-281"
          },
          EPSG_4701: {
            towgs84: "-79.9,-158,-168.9"
          },
          EPSG_4706: {
            towgs84: "-146.21,112.63,4.05"
          },
          EPSG_4805: {
            towgs84: "682,-203,480"
          },
          EPSG_4201: {
            towgs84: "-165,-11,206"
          },
          EPSG_4210: {
            towgs84: "-157,-2,-299"
          },
          EPSG_4183: {
            towgs84: "-104,167,-38"
          },
          EPSG_4139: {
            towgs84: "11,72,-101"
          },
          EPSG_4668: {
            towgs84: "-86,-98,-119"
          },
          EPSG_4717: {
            towgs84: "-2,151,181"
          },
          EPSG_4732: {
            towgs84: "102,52,-38"
          },
          EPSG_4280: {
            towgs84: "-377,681,-50"
          },
          EPSG_4209: {
            towgs84: "-138,-105,-289"
          },
          EPSG_4261: {
            towgs84: "31,146,47"
          },
          EPSG_4658: {
            towgs84: "-73,46,-86"
          },
          EPSG_4721: {
            towgs84: "265.025,384.929,-194.046"
          },
          EPSG_4222: {
            towgs84: "-136,-108,-292"
          },
          EPSG_4601: {
            towgs84: "-255,-15,71"
          },
          EPSG_4602: {
            towgs84: "725,685,536"
          },
          EPSG_4603: {
            towgs84: "72,213.7,93"
          },
          EPSG_4605: {
            towgs84: "9,183,236"
          },
          EPSG_4621: {
            towgs84: "137,248,-430"
          },
          EPSG_4657: {
            towgs84: "-28,199,5"
          },
          EPSG_4316: {
            towgs84: "103.25,-100.4,-307.19"
          },
          EPSG_4642: {
            towgs84: "-13,-348,292"
          },
          EPSG_4698: {
            towgs84: "145,-187,103"
          },
          EPSG_4192: {
            towgs84: "-206.1,-174.7,-87.7"
          },
          EPSG_4311: {
            towgs84: "-265,120,-358"
          },
          EPSG_4135: {
            towgs84: "58,-283,-182"
          },
          ESRI_104138: {
            towgs84: "198,-226,-347"
          },
          EPSG_4245: {
            towgs84: "-11,851,5"
          },
          EPSG_4142: {
            towgs84: "-125,53,467"
          },
          EPSG_4213: {
            towgs84: "-106,-87,188"
          },
          EPSG_4253: {
            towgs84: "-133,-77,-51"
          },
          EPSG_4129: {
            towgs84: "-132,-110,-335"
          },
          EPSG_4713: {
            towgs84: "-77,-128,142"
          },
          EPSG_4239: {
            towgs84: "217,823,299"
          },
          EPSG_4146: {
            towgs84: "295,736,257"
          },
          EPSG_4155: {
            towgs84: "-83,37,124"
          },
          EPSG_4165: {
            towgs84: "-173,253,27"
          },
          EPSG_4672: {
            towgs84: "175,-38,113"
          },
          EPSG_4236: {
            towgs84: "-637,-549,-203"
          },
          EPSG_4251: {
            towgs84: "-90,40,88"
          },
          EPSG_4271: {
            towgs84: "-2,374,172"
          },
          EPSG_4175: {
            towgs84: "-88,4,101"
          },
          EPSG_4716: {
            towgs84: "298,-304,-375"
          },
          EPSG_4315: {
            towgs84: "-23,259,-9"
          },
          EPSG_4744: {
            towgs84: "-242.2,-144.9,370.3"
          },
          EPSG_4244: {
            towgs84: "-97,787,86"
          },
          EPSG_4293: {
            towgs84: "616,97,-251"
          },
          EPSG_4714: {
            towgs84: "-127,-769,472"
          },
          EPSG_4736: {
            towgs84: "260,12,-147"
          },
          EPSG_6883: {
            towgs84: "-235,-110,393"
          },
          EPSG_6894: {
            towgs84: "-63,176,185"
          },
          EPSG_4205: {
            towgs84: "-43,-163,45"
          },
          EPSG_4256: {
            towgs84: "41,-220,-134"
          },
          EPSG_4262: {
            towgs84: "639,405,60"
          },
          EPSG_4604: {
            towgs84: "174,359,365"
          },
          EPSG_4169: {
            towgs84: "-115,118,426"
          },
          EPSG_4620: {
            towgs84: "-106,-129,165"
          },
          EPSG_4184: {
            towgs84: "-203,141,53"
          },
          EPSG_4616: {
            towgs84: "-289,-124,60"
          },
          EPSG_9403: {
            towgs84: "-307,-92,127"
          },
          EPSG_4684: {
            towgs84: "-133,-321,50"
          },
          EPSG_4708: {
            towgs84: "-491,-22,435"
          },
          EPSG_4707: {
            towgs84: "114,-116,-333"
          },
          EPSG_4709: {
            towgs84: "145,75,-272"
          },
          EPSG_4712: {
            towgs84: "-205,107,53"
          },
          EPSG_4711: {
            towgs84: "124,-234,-25"
          },
          EPSG_4718: {
            towgs84: "230,-199,-752"
          },
          EPSG_4719: {
            towgs84: "211,147,111"
          },
          EPSG_4724: {
            towgs84: "208,-435,-229"
          },
          EPSG_4725: {
            towgs84: "189,-79,-202"
          },
          EPSG_4735: {
            towgs84: "647,1777,-1124"
          },
          EPSG_4722: {
            towgs84: "-794,119,-298"
          },
          EPSG_4728: {
            towgs84: "-307,-92,127"
          },
          EPSG_4734: {
            towgs84: "-632,438,-609"
          },
          EPSG_4727: {
            towgs84: "912,-58,1227"
          },
          EPSG_4729: {
            towgs84: "185,165,42"
          },
          EPSG_4730: {
            towgs84: "170,42,84"
          },
          EPSG_4733: {
            towgs84: "276,-57,149"
          },
          ESRI_37218: {
            towgs84: "230,-199,-752"
          },
          ESRI_37240: {
            towgs84: "-7,215,225"
          },
          ESRI_37221: {
            towgs84: "252,-209,-751"
          },
          ESRI_4305: {
            towgs84: "-123,-206,219"
          },
          ESRI_104139: {
            towgs84: "-73,-247,227"
          },
          EPSG_4748: {
            towgs84: "51,391,-36"
          },
          EPSG_4219: {
            towgs84: "-384,664,-48"
          },
          EPSG_4255: {
            towgs84: "-333,-222,114"
          },
          EPSG_4257: {
            towgs84: "-587.8,519.75,145.76"
          },
          EPSG_4646: {
            towgs84: "-963,510,-359"
          },
          EPSG_6881: {
            towgs84: "-24,-203,268"
          },
          EPSG_6882: {
            towgs84: "-183,-15,273"
          },
          EPSG_4715: {
            towgs84: "-104,-129,239"
          },
          IGNF_RGF93GDD: {
            towgs84: "0,0,0"
          },
          IGNF_RGM04GDD: {
            towgs84: "0,0,0"
          },
          IGNF_RGSPM06GDD: {
            towgs84: "0,0,0"
          },
          IGNF_RGTAAF07GDD: {
            towgs84: "0,0,0"
          },
          IGNF_RGFG95GDD: {
            towgs84: "0,0,0"
          },
          IGNF_RGNCG: {
            towgs84: "0,0,0"
          },
          IGNF_RGPFGDD: {
            towgs84: "0,0,0"
          },
          IGNF_ETRS89G: {
            towgs84: "0,0,0"
          },
          IGNF_RGR92GDD: {
            towgs84: "0,0,0"
          },
          EPSG_4173: {
            towgs84: "0,0,0"
          },
          EPSG_4180: {
            towgs84: "0,0,0"
          },
          EPSG_4619: {
            towgs84: "0,0,0"
          },
          EPSG_4667: {
            towgs84: "0,0,0"
          },
          EPSG_4075: {
            towgs84: "0,0,0"
          },
          EPSG_6706: {
            towgs84: "0,0,0"
          },
          EPSG_7798: {
            towgs84: "0,0,0"
          },
          EPSG_4661: {
            towgs84: "0,0,0"
          },
          EPSG_4669: {
            towgs84: "0,0,0"
          },
          EPSG_8685: {
            towgs84: "0,0,0"
          },
          EPSG_4151: {
            towgs84: "0,0,0"
          },
          EPSG_9702: {
            towgs84: "0,0,0"
          },
          EPSG_4758: {
            towgs84: "0,0,0"
          },
          EPSG_4761: {
            towgs84: "0,0,0"
          },
          EPSG_4765: {
            towgs84: "0,0,0"
          },
          EPSG_8997: {
            towgs84: "0,0,0"
          },
          EPSG_4023: {
            towgs84: "0,0,0"
          },
          EPSG_4670: {
            towgs84: "0,0,0"
          },
          EPSG_4694: {
            towgs84: "0,0,0"
          },
          EPSG_4148: {
            towgs84: "0,0,0"
          },
          EPSG_4163: {
            towgs84: "0,0,0"
          },
          EPSG_4167: {
            towgs84: "0,0,0"
          },
          EPSG_4189: {
            towgs84: "0,0,0"
          },
          EPSG_4190: {
            towgs84: "0,0,0"
          },
          EPSG_4176: {
            towgs84: "0,0,0"
          },
          EPSG_4659: {
            towgs84: "0,0,0"
          },
          EPSG_3824: {
            towgs84: "0,0,0"
          },
          EPSG_3889: {
            towgs84: "0,0,0"
          },
          EPSG_4046: {
            towgs84: "0,0,0"
          },
          EPSG_4081: {
            towgs84: "0,0,0"
          },
          EPSG_4558: {
            towgs84: "0,0,0"
          },
          EPSG_4483: {
            towgs84: "0,0,0"
          },
          EPSG_5013: {
            towgs84: "0,0,0"
          },
          EPSG_5264: {
            towgs84: "0,0,0"
          },
          EPSG_5324: {
            towgs84: "0,0,0"
          },
          EPSG_5354: {
            towgs84: "0,0,0"
          },
          EPSG_5371: {
            towgs84: "0,0,0"
          },
          EPSG_5373: {
            towgs84: "0,0,0"
          },
          EPSG_5381: {
            towgs84: "0,0,0"
          },
          EPSG_5393: {
            towgs84: "0,0,0"
          },
          EPSG_5489: {
            towgs84: "0,0,0"
          },
          EPSG_5593: {
            towgs84: "0,0,0"
          },
          EPSG_6135: {
            towgs84: "0,0,0"
          },
          EPSG_6365: {
            towgs84: "0,0,0"
          },
          EPSG_5246: {
            towgs84: "0,0,0"
          },
          EPSG_7886: {
            towgs84: "0,0,0"
          },
          EPSG_8431: {
            towgs84: "0,0,0"
          },
          EPSG_8427: {
            towgs84: "0,0,0"
          },
          EPSG_8699: {
            towgs84: "0,0,0"
          },
          EPSG_8818: {
            towgs84: "0,0,0"
          },
          EPSG_4757: {
            towgs84: "0,0,0"
          },
          EPSG_9140: {
            towgs84: "0,0,0"
          },
          EPSG_8086: {
            towgs84: "0,0,0"
          },
          EPSG_4686: {
            towgs84: "0,0,0"
          },
          EPSG_4737: {
            towgs84: "0,0,0"
          },
          EPSG_4702: {
            towgs84: "0,0,0"
          },
          EPSG_4747: {
            towgs84: "0,0,0"
          },
          EPSG_4749: {
            towgs84: "0,0,0"
          },
          EPSG_4674: {
            towgs84: "0,0,0"
          },
          EPSG_4755: {
            towgs84: "0,0,0"
          },
          EPSG_4759: {
            towgs84: "0,0,0"
          },
          EPSG_4762: {
            towgs84: "0,0,0"
          },
          EPSG_4763: {
            towgs84: "0,0,0"
          },
          EPSG_4764: {
            towgs84: "0,0,0"
          },
          EPSG_4166: {
            towgs84: "0,0,0"
          },
          EPSG_4170: {
            towgs84: "0,0,0"
          },
          EPSG_5546: {
            towgs84: "0,0,0"
          },
          EPSG_7844: {
            towgs84: "0,0,0"
          },
          EPSG_4818: {
            towgs84: "589,76,480"
          }
        };
        for (var key in datums) {
          var datum$1 = datums[key];
          if (!datum$1.datumName) {
            continue;
          }
          datums[datum$1.datumName] = datum$1;
        }
        function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
          var out = {};
          if (datumCode === void 0 || datumCode === "none") {
            out.datum_type = PJD_NODATUM;
          } else {
            out.datum_type = PJD_WGS84;
          }
          if (datum_params) {
            out.datum_params = datum_params.map(parseFloat);
            if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
              out.datum_type = PJD_3PARAM;
            }
            if (out.datum_params.length > 3) {
              if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
                out.datum_type = PJD_7PARAM;
                out.datum_params[3] *= SEC_TO_RAD;
                out.datum_params[4] *= SEC_TO_RAD;
                out.datum_params[5] *= SEC_TO_RAD;
                out.datum_params[6] = out.datum_params[6] / 1e6 + 1;
              }
            }
          }
          if (nadgrids) {
            out.datum_type = PJD_GRIDSHIFT;
            out.grids = nadgrids;
          }
          out.a = a;
          out.b = b;
          out.es = es;
          out.ep2 = ep2;
          return out;
        }
        var loadedNadgrids = {};
        function nadgrid(key2, data, options) {
          if (data instanceof ArrayBuffer) {
            return readNTV2Grid(key2, data, options);
          }
          return { ready: readGeotiffGrid(key2, data) };
        }
        function readNTV2Grid(key2, data, options) {
          var includeErrorFields = true;
          if (options !== void 0 && options.includeErrorFields === false) {
            includeErrorFields = false;
          }
          var view = new DataView(data);
          var isLittleEndian = detectLittleEndian(view);
          var header = readHeader(view, isLittleEndian);
          var subgrids = readSubgrids(view, header, isLittleEndian, includeErrorFields);
          var nadgrid2 = { header, subgrids };
          loadedNadgrids[key2] = nadgrid2;
          return nadgrid2;
        }
        async function readGeotiffGrid(key2, tiff) {
          var subgrids = [];
          var subGridCount = await tiff.getImageCount();
          for (var subgridIndex = subGridCount - 1; subgridIndex >= 0; subgridIndex--) {
            var image = await tiff.getImage(subgridIndex);
            var rasters = await image.readRasters();
            var data = rasters;
            var lim = [image.getWidth(), image.getHeight()];
            var imageBBoxRadians = image.getBoundingBox().map(degreesToRadians);
            var del = [image.fileDirectory.ModelPixelScale[0], image.fileDirectory.ModelPixelScale[1]].map(degreesToRadians);
            var maxX = imageBBoxRadians[0] + (lim[0] - 1) * del[0];
            var minY = imageBBoxRadians[3] - (lim[1] - 1) * del[1];
            var latitudeOffsetBand = data[0];
            var longitudeOffsetBand = data[1];
            var nodes = [];
            for (let i = lim[1] - 1; i >= 0; i--) {
              for (let j = lim[0] - 1; j >= 0; j--) {
                var index = i * lim[0] + j;
                nodes.push([-secondsToRadians(longitudeOffsetBand[index]), secondsToRadians(latitudeOffsetBand[index])]);
              }
            }
            subgrids.push({
              del,
              lim,
              ll: [-maxX, minY],
              cvs: nodes
            });
          }
          var tifGrid = {
            header: {
              nSubgrids: subGridCount
            },
            subgrids
          };
          loadedNadgrids[key2] = tifGrid;
          return tifGrid;
        }
        function getNadgrids(nadgrids) {
          if (nadgrids === void 0) {
            return null;
          }
          var grids = nadgrids.split(",");
          return grids.map(parseNadgridString);
        }
        function parseNadgridString(value) {
          if (value.length === 0) {
            return null;
          }
          var optional = value[0] === "@";
          if (optional) {
            value = value.slice(1);
          }
          if (value === "null") {
            return { name: "null", mandatory: !optional, grid: null, isNull: true };
          }
          return {
            name: value,
            mandatory: !optional,
            grid: loadedNadgrids[value] || null,
            isNull: false
          };
        }
        function degreesToRadians(degrees) {
          return degrees * Math.PI / 180;
        }
        function secondsToRadians(seconds) {
          return seconds / 3600 * Math.PI / 180;
        }
        function detectLittleEndian(view) {
          var nFields = view.getInt32(8, false);
          if (nFields === 11) {
            return false;
          }
          nFields = view.getInt32(8, true);
          if (nFields !== 11) {
            console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian");
          }
          return true;
        }
        function readHeader(view, isLittleEndian) {
          return {
            nFields: view.getInt32(8, isLittleEndian),
            nSubgridFields: view.getInt32(24, isLittleEndian),
            nSubgrids: view.getInt32(40, isLittleEndian),
            shiftType: decodeString(view, 56, 56 + 8).trim(),
            fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
            fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
            toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
            toSemiMinorAxis: view.getFloat64(168, isLittleEndian)
          };
        }
        function decodeString(view, start2, end) {
          return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start2, end)));
        }
        function readSubgrids(view, header, isLittleEndian, includeErrorFields) {
          var gridOffset = 176;
          var grids = [];
          for (var i = 0; i < header.nSubgrids; i++) {
            var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
            var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian, includeErrorFields);
            var lngColumnCount = Math.round(
              1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval
            );
            var latColumnCount = Math.round(
              1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval
            );
            grids.push({
              ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
              del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
              lim: [lngColumnCount, latColumnCount],
              count: subHeader.gridNodeCount,
              cvs: mapNodes(nodes)
            });
            var rowSize = 16;
            if (includeErrorFields === false) {
              rowSize = 8;
            }
            gridOffset += 176 + subHeader.gridNodeCount * rowSize;
          }
          return grids;
        }
        function mapNodes(nodes) {
          return nodes.map(function(r) {
            return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];
          });
        }
        function readGridHeader(view, offset, isLittleEndian) {
          return {
            name: decodeString(view, offset + 8, offset + 16).trim(),
            parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
            lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
            upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
            lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
            upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
            latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
            longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
            gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
          };
        }
        function readGridNodes(view, offset, gridHeader, isLittleEndian, includeErrorFields) {
          var nodesOffset = offset + 176;
          var gridRecordLength = 16;
          if (includeErrorFields === false) {
            gridRecordLength = 8;
          }
          var gridShiftRecords = [];
          for (var i = 0; i < gridHeader.gridNodeCount; i++) {
            var record = {
              latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
              longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian)
            };
            if (includeErrorFields !== false) {
              record.latitudeAccuracy = view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian);
              record.longitudeAccuracy = view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian);
            }
            gridShiftRecords.push(record);
          }
          return gridShiftRecords;
        }
        function Projection(srsCode, callback) {
          if (!(this instanceof Projection)) {
            return new Projection(srsCode);
          }
          callback = callback || function(error) {
            if (error) {
              throw error;
            }
          };
          var json = parse(srsCode);
          if (typeof json !== "object") {
            callback("Could not parse to valid json: " + srsCode);
            return;
          }
          var ourProj = Projection.projections.get(json.projName);
          if (!ourProj) {
            callback("Could not get projection name from: " + srsCode);
            return;
          }
          if (json.datumCode && json.datumCode !== "none") {
            var datumDef = match(datums, json.datumCode);
            if (datumDef) {
              json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(",") : null);
              json.ellps = datumDef.ellipse;
              json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
            }
          }
          json.k0 = json.k0 || 1;
          json.axis = json.axis || "enu";
          json.ellps = json.ellps || "wgs84";
          json.lat1 = json.lat1 || json.lat0;
          var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
          var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
          var nadgrids = getNadgrids(json.nadgrids);
          var datumObj = json.datum || datum(
            json.datumCode,
            json.datum_params,
            sphere_.a,
            sphere_.b,
            ecc.es,
            ecc.ep2,
            nadgrids
          );
          extend(this, json);
          extend(this, ourProj);
          this.a = sphere_.a;
          this.b = sphere_.b;
          this.rf = sphere_.rf;
          this.sphere = sphere_.sphere;
          this.es = ecc.es;
          this.e = ecc.e;
          this.ep2 = ecc.ep2;
          this.datum = datumObj;
          this.init();
          callback(null, this);
        }
        Projection.projections = projections;
        Projection.projections.start();
        function compareDatums(source, dest) {
          if (source.datum_type !== dest.datum_type) {
            return false;
          } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 5e-11) {
            return false;
          } else if (source.datum_type === PJD_3PARAM) {
            return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2];
          } else if (source.datum_type === PJD_7PARAM) {
            return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6];
          } else {
            return true;
          }
        }
        function geodeticToGeocentric(p, es, a) {
          var Longitude = p.x;
          var Latitude = p.y;
          var Height = p.z ? p.z : 0;
          var Rn;
          var Sin_Lat;
          var Sin2_Lat;
          var Cos_Lat;
          if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
            Latitude = -HALF_PI;
          } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
            Latitude = HALF_PI;
          } else if (Latitude < -HALF_PI) {
            return { x: -Infinity, y: -Infinity, z: p.z };
          } else if (Latitude > HALF_PI) {
            return { x: Infinity, y: Infinity, z: p.z };
          }
          if (Longitude > Math.PI) {
            Longitude -= 2 * Math.PI;
          }
          Sin_Lat = Math.sin(Latitude);
          Cos_Lat = Math.cos(Latitude);
          Sin2_Lat = Sin_Lat * Sin_Lat;
          Rn = a / Math.sqrt(1 - es * Sin2_Lat);
          return {
            x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
            y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
            z: (Rn * (1 - es) + Height) * Sin_Lat
          };
        }
        function geocentricToGeodetic(p, es, a, b) {
          var genau = 1e-12;
          var genau2 = genau * genau;
          var maxiter = 30;
          var P;
          var RR;
          var CT;
          var ST;
          var RX;
          var RK;
          var RN;
          var CPHI0;
          var SPHI0;
          var CPHI;
          var SPHI;
          var SDPHI;
          var iter;
          var X = p.x;
          var Y = p.y;
          var Z2 = p.z ? p.z : 0;
          var Longitude;
          var Latitude;
          var Height;
          P = Math.sqrt(X * X + Y * Y);
          RR = Math.sqrt(X * X + Y * Y + Z2 * Z2);
          if (P / a < genau) {
            Longitude = 0;
            if (RR / a < genau) {
              Latitude = HALF_PI;
              Height = -b;
              return {
                x: p.x,
                y: p.y,
                z: p.z
              };
            }
          } else {
            Longitude = Math.atan2(Y, X);
          }
          CT = Z2 / RR;
          ST = P / RR;
          RX = 1 / Math.sqrt(1 - es * (2 - es) * ST * ST);
          CPHI0 = ST * (1 - es) * RX;
          SPHI0 = CT * RX;
          iter = 0;
          do {
            iter++;
            RN = a / Math.sqrt(1 - es * SPHI0 * SPHI0);
            Height = P * CPHI0 + Z2 * SPHI0 - RN * (1 - es * SPHI0 * SPHI0);
            RK = es * RN / (RN + Height);
            RX = 1 / Math.sqrt(1 - RK * (2 - RK) * ST * ST);
            CPHI = ST * (1 - RK) * RX;
            SPHI = CT * RX;
            SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
            CPHI0 = CPHI;
            SPHI0 = SPHI;
          } while (SDPHI * SDPHI > genau2 && iter < maxiter);
          Latitude = Math.atan(SPHI / Math.abs(CPHI));
          return {
            x: Longitude,
            y: Latitude,
            z: Height
          };
        }
        function geocentricToWgs84(p, datum_type, datum_params) {
          if (datum_type === PJD_3PARAM) {
            return {
              x: p.x + datum_params[0],
              y: p.y + datum_params[1],
              z: p.z + datum_params[2]
            };
          } else if (datum_type === PJD_7PARAM) {
            var Dx_BF = datum_params[0];
            var Dy_BF = datum_params[1];
            var Dz_BF = datum_params[2];
            var Rx_BF = datum_params[3];
            var Ry_BF = datum_params[4];
            var Rz_BF = datum_params[5];
            var M_BF = datum_params[6];
            return {
              x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
              y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
              z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
            };
          }
        }
        function geocentricFromWgs84(p, datum_type, datum_params) {
          if (datum_type === PJD_3PARAM) {
            return {
              x: p.x - datum_params[0],
              y: p.y - datum_params[1],
              z: p.z - datum_params[2]
            };
          } else if (datum_type === PJD_7PARAM) {
            var Dx_BF = datum_params[0];
            var Dy_BF = datum_params[1];
            var Dz_BF = datum_params[2];
            var Rx_BF = datum_params[3];
            var Ry_BF = datum_params[4];
            var Rz_BF = datum_params[5];
            var M_BF = datum_params[6];
            var x_tmp = (p.x - Dx_BF) / M_BF;
            var y_tmp = (p.y - Dy_BF) / M_BF;
            var z_tmp = (p.z - Dz_BF) / M_BF;
            return {
              x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
              y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
              z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
            };
          }
        }
        function checkParams(type) {
          return type === PJD_3PARAM || type === PJD_7PARAM;
        }
        function datum_transform(source, dest, point) {
          if (compareDatums(source, dest)) {
            return point;
          }
          if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
            return point;
          }
          var source_a = source.a;
          var source_es = source.es;
          if (source.datum_type === PJD_GRIDSHIFT) {
            var gridShiftCode = applyGridShift(source, false, point);
            if (gridShiftCode !== 0) {
              return void 0;
            }
            source_a = SRS_WGS84_SEMIMAJOR;
            source_es = SRS_WGS84_ESQUARED;
          }
          var dest_a = dest.a;
          var dest_b = dest.b;
          var dest_es = dest.es;
          if (dest.datum_type === PJD_GRIDSHIFT) {
            dest_a = SRS_WGS84_SEMIMAJOR;
            dest_b = SRS_WGS84_SEMIMINOR;
            dest_es = SRS_WGS84_ESQUARED;
          }
          if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) {
            return point;
          }
          point = geodeticToGeocentric(point, source_es, source_a);
          if (checkParams(source.datum_type)) {
            point = geocentricToWgs84(point, source.datum_type, source.datum_params);
          }
          if (checkParams(dest.datum_type)) {
            point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
          }
          point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);
          if (dest.datum_type === PJD_GRIDSHIFT) {
            var destGridShiftResult = applyGridShift(dest, true, point);
            if (destGridShiftResult !== 0) {
              return void 0;
            }
          }
          return point;
        }
        function applyGridShift(source, inverse2, point) {
          if (source.grids === null || source.grids.length === 0) {
            console.log("Grid shift grids not found");
            return -1;
          }
          var input = { x: -point.x, y: point.y };
          var output = { x: Number.NaN, y: Number.NaN };
          var attemptedGrids = [];
          outer:
            for (var i = 0; i < source.grids.length; i++) {
              var grid = source.grids[i];
              attemptedGrids.push(grid.name);
              if (grid.isNull) {
                output = input;
                break;
              }
              if (grid.grid === null) {
                if (grid.mandatory) {
                  console.log("Unable to find mandatory grid '" + grid.name + "'");
                  return -1;
                }
                continue;
              }
              var subgrids = grid.grid.subgrids;
              for (var j = 0, jj = subgrids.length; j < jj; j++) {
                var subgrid = subgrids[j];
                var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 1e4;
                var minX = subgrid.ll[0] - epsilon;
                var minY = subgrid.ll[1] - epsilon;
                var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
                var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
                if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) {
                  continue;
                }
                output = applySubgridShift(input, inverse2, subgrid);
                if (!isNaN(output.x)) {
                  break outer;
                }
              }
            }
          if (isNaN(output.x)) {
            console.log("Failed to find a grid shift table for location '" + -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
            return -1;
          }
          point.x = -output.x;
          point.y = output.y;
          return 0;
        }
        function applySubgridShift(pin, inverse2, ct) {
          var val = { x: Number.NaN, y: Number.NaN };
          if (isNaN(pin.x)) {
            return val;
          }
          var tb = { x: pin.x, y: pin.y };
          tb.x -= ct.ll[0];
          tb.y -= ct.ll[1];
          tb.x = adjust_lon(tb.x - Math.PI) + Math.PI;
          var t = nadInterpolate(tb, ct);
          if (inverse2) {
            if (isNaN(t.x)) {
              return val;
            }
            t.x = tb.x - t.x;
            t.y = tb.y - t.y;
            var i = 9, tol = 1e-12;
            var dif, del;
            do {
              del = nadInterpolate(t, ct);
              if (isNaN(del.x)) {
                console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
                break;
              }
              dif = { x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y) };
              t.x += dif.x;
              t.y += dif.y;
            } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
            if (i < 0) {
              console.log("Inverse grid shift iterator failed to converge.");
              return val;
            }
            val.x = adjust_lon(t.x + ct.ll[0]);
            val.y = t.y + ct.ll[1];
          } else {
            if (!isNaN(t.x)) {
              val.x = pin.x + t.x;
              val.y = pin.y + t.y;
            }
          }
          return val;
        }
        function nadInterpolate(pin, ct) {
          var t = { x: pin.x / ct.del[0], y: pin.y / ct.del[1] };
          var indx = { x: Math.floor(t.x), y: Math.floor(t.y) };
          var frct = { x: t.x - 1 * indx.x, y: t.y - 1 * indx.y };
          var val = { x: Number.NaN, y: Number.NaN };
          var inx;
          if (indx.x < 0 || indx.x >= ct.lim[0]) {
            return val;
          }
          if (indx.y < 0 || indx.y >= ct.lim[1]) {
            return val;
          }
          inx = indx.y * ct.lim[0] + indx.x;
          var f00 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
          inx++;
          var f10 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
          inx += ct.lim[0];
          var f11 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
          inx--;
          var f01 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
          var m11 = frct.x * frct.y, m10 = frct.x * (1 - frct.y), m00 = (1 - frct.x) * (1 - frct.y), m01 = (1 - frct.x) * frct.y;
          val.x = m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x;
          val.y = m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y;
          return val;
        }
        function adjust_axis(crs, denorm, point) {
          var xin = point.x, yin = point.y, zin = point.z || 0;
          var v, t, i;
          var out = {};
          for (i = 0; i < 3; i++) {
            if (denorm && i === 2 && point.z === void 0) {
              continue;
            }
            if (i === 0) {
              v = xin;
              if ("ew".indexOf(crs.axis[i]) !== -1) {
                t = "x";
              } else {
                t = "y";
              }
            } else if (i === 1) {
              v = yin;
              if ("ns".indexOf(crs.axis[i]) !== -1) {
                t = "y";
              } else {
                t = "x";
              }
            } else {
              v = zin;
              t = "z";
            }
            switch (crs.axis[i]) {
              case "e":
                out[t] = v;
                break;
              case "w":
                out[t] = -v;
                break;
              case "n":
                out[t] = v;
                break;
              case "s":
                out[t] = -v;
                break;
              case "u":
                if (point[t] !== void 0) {
                  out.z = v;
                }
                break;
              case "d":
                if (point[t] !== void 0) {
                  out.z = -v;
                }
                break;
              default:
                return null;
            }
          }
          return out;
        }
        function common(array) {
          var out = {
            x: array[0],
            y: array[1]
          };
          if (array.length > 2) {
            out.z = array[2];
          }
          if (array.length > 3) {
            out.m = array[3];
          }
          return out;
        }
        function checkSanity(point) {
          checkCoord(point.x);
          checkCoord(point.y);
        }
        function checkCoord(num) {
          if (typeof Number.isFinite === "function") {
            if (Number.isFinite(num)) {
              return;
            }
            throw new TypeError("coordinates must be finite numbers");
          }
          if (typeof num !== "number" || num !== num || !isFinite(num)) {
            throw new TypeError("coordinates must be finite numbers");
          }
        }
        function checkNotWGS(source, dest) {
          return (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM || source.datum.datum_type === PJD_GRIDSHIFT) && dest.datumCode !== "WGS84" || (dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM || dest.datum.datum_type === PJD_GRIDSHIFT) && source.datumCode !== "WGS84";
        }
        function transform(source, dest, point, enforceAxis) {
          var wgs842;
          if (Array.isArray(point)) {
            point = common(point);
          } else {
            point = {
              x: point.x,
              y: point.y,
              z: point.z,
              m: point.m
            };
          }
          var hasZ = point.z !== void 0;
          checkSanity(point);
          if (source.datum && dest.datum && checkNotWGS(source, dest)) {
            wgs842 = new Projection("WGS84");
            point = transform(source, wgs842, point, enforceAxis);
            source = wgs842;
          }
          if (enforceAxis && source.axis !== "enu") {
            point = adjust_axis(source, false, point);
          }
          if (source.projName === "longlat") {
            point = {
              x: point.x * D2R$1,
              y: point.y * D2R$1,
              z: point.z || 0
            };
          } else {
            if (source.to_meter) {
              point = {
                x: point.x * source.to_meter,
                y: point.y * source.to_meter,
                z: point.z || 0
              };
            }
            point = source.inverse(point);
            if (!point) {
              return;
            }
          }
          if (source.from_greenwich) {
            point.x += source.from_greenwich;
          }
          point = datum_transform(source.datum, dest.datum, point);
          if (!point) {
            return;
          }
          if (dest.from_greenwich) {
            point = {
              x: point.x - dest.from_greenwich,
              y: point.y,
              z: point.z || 0
            };
          }
          if (dest.projName === "longlat") {
            point = {
              x: point.x * R2D,
              y: point.y * R2D,
              z: point.z || 0
            };
          } else {
            point = dest.forward(point);
            if (dest.to_meter) {
              point = {
                x: point.x / dest.to_meter,
                y: point.y / dest.to_meter,
                z: point.z || 0
              };
            }
          }
          if (enforceAxis && dest.axis !== "enu") {
            return adjust_axis(dest, true, point);
          }
          if (point && !hasZ) {
            delete point.z;
          }
          return point;
        }
        var wgs84 = Projection("WGS84");
        function transformer(from, to, coords, enforceAxis) {
          var transformedArray, out, keys;
          if (Array.isArray(coords)) {
            transformedArray = transform(from, to, coords, enforceAxis) || { x: NaN, y: NaN };
            if (coords.length > 2) {
              if (typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent") {
                if (typeof transformedArray.z === "number") {
                  return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.slice(3));
                } else {
                  return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.slice(3));
                }
              } else {
                return [transformedArray.x, transformedArray.y].concat(coords.slice(2));
              }
            } else {
              return [transformedArray.x, transformedArray.y];
            }
          } else {
            out = transform(from, to, coords, enforceAxis);
            keys = Object.keys(coords);
            if (keys.length === 2) {
              return out;
            }
            keys.forEach(function(key2) {
              if (typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent") {
                if (key2 === "x" || key2 === "y" || key2 === "z") {
                  return;
                }
              } else {
                if (key2 === "x" || key2 === "y") {
                  return;
                }
              }
              out[key2] = coords[key2];
            });
            return out;
          }
        }
        function checkProj(item) {
          if (item instanceof Projection) {
            return item;
          }
          if (item.oProj) {
            return item.oProj;
          }
          return Projection(item);
        }
        function proj4(fromProj, toProj, coord) {
          fromProj = checkProj(fromProj);
          var single = false;
          var obj;
          if (typeof toProj === "undefined") {
            toProj = fromProj;
            fromProj = wgs84;
            single = true;
          } else if (typeof toProj.x !== "undefined" || Array.isArray(toProj)) {
            coord = toProj;
            toProj = fromProj;
            fromProj = wgs84;
            single = true;
          }
          toProj = checkProj(toProj);
          if (coord) {
            return transformer(fromProj, toProj, coord);
          } else {
            obj = {
              forward: function(coords, enforceAxis) {
                return transformer(fromProj, toProj, coords, enforceAxis);
              },
              inverse: function(coords, enforceAxis) {
                return transformer(toProj, fromProj, coords, enforceAxis);
              }
            };
            if (single) {
              obj.oProj = toProj;
            }
            return obj;
          }
        }
        var NUM_100K_SETS = 6;
        var SET_ORIGIN_COLUMN_LETTERS = "AJSAJS";
        var SET_ORIGIN_ROW_LETTERS = "AFAFAF";
        var A = 65;
        var I = 73;
        var O = 79;
        var V = 86;
        var Z = 90;
        var mgrs = {
          forward: forward$u,
          inverse: inverse$u,
          toPoint
        };
        function forward$u(ll, accuracy) {
          accuracy = accuracy || 5;
          return encode(LLtoUTM({
            lat: ll[1],
            lon: ll[0]
          }), accuracy);
        }
        function inverse$u(mgrs2) {
          var bbox = UTMtoLL(decode(mgrs2.toUpperCase()));
          if (bbox.lat && bbox.lon) {
            return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
          }
          return [bbox.left, bbox.bottom, bbox.right, bbox.top];
        }
        function toPoint(mgrs2) {
          var bbox = UTMtoLL(decode(mgrs2.toUpperCase()));
          if (bbox.lat && bbox.lon) {
            return [bbox.lon, bbox.lat];
          }
          return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
        }
        function degToRad(deg) {
          return deg * (Math.PI / 180);
        }
        function radToDeg(rad) {
          return 180 * (rad / Math.PI);
        }
        function LLtoUTM(ll) {
          var Lat = ll.lat;
          var Long = ll.lon;
          var a = 6378137;
          var eccSquared = 669438e-8;
          var k0 = 0.9996;
          var LongOrigin;
          var eccPrimeSquared;
          var N, T, C, A5, M2;
          var LatRad = degToRad(Lat);
          var LongRad = degToRad(Long);
          var LongOriginRad;
          var ZoneNumber;
          ZoneNumber = Math.floor((Long + 180) / 6) + 1;
          if (Long === 180) {
            ZoneNumber = 60;
          }
          if (Lat >= 56 && Lat < 64 && Long >= 3 && Long < 12) {
            ZoneNumber = 32;
          }
          if (Lat >= 72 && Lat < 84) {
            if (Long >= 0 && Long < 9) {
              ZoneNumber = 31;
            } else if (Long >= 9 && Long < 21) {
              ZoneNumber = 33;
            } else if (Long >= 21 && Long < 33) {
              ZoneNumber = 35;
            } else if (Long >= 33 && Long < 42) {
              ZoneNumber = 37;
            }
          }
          LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
          LongOriginRad = degToRad(LongOrigin);
          eccPrimeSquared = eccSquared / (1 - eccSquared);
          N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
          T = Math.tan(LatRad) * Math.tan(LatRad);
          C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
          A5 = Math.cos(LatRad) * (LongRad - LongOriginRad);
          M2 = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
          var UTMEasting = k0 * N * (A5 + (1 - T + C) * A5 * A5 * A5 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 / 120) + 5e5;
          var UTMNorthing = k0 * (M2 + N * Math.tan(LatRad) * (A5 * A5 / 2 + (5 - T + 9 * C + 4 * C * C) * A5 * A5 * A5 * A5 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 * A5 / 720));
          if (Lat < 0) {
            UTMNorthing += 1e7;
          }
          return {
            northing: Math.round(UTMNorthing),
            easting: Math.round(UTMEasting),
            zoneNumber: ZoneNumber,
            zoneLetter: getLetterDesignator(Lat)
          };
        }
        function UTMtoLL(utm2) {
          var UTMNorthing = utm2.northing;
          var UTMEasting = utm2.easting;
          var zoneLetter = utm2.zoneLetter;
          var zoneNumber = utm2.zoneNumber;
          if (zoneNumber < 0 || zoneNumber > 60) {
            return null;
          }
          var k0 = 0.9996;
          var a = 6378137;
          var eccSquared = 669438e-8;
          var eccPrimeSquared;
          var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
          var N1, T1, C12, R1, D, M2;
          var LongOrigin;
          var mu, phi1Rad;
          var x = UTMEasting - 5e5;
          var y = UTMNorthing;
          if (zoneLetter < "N") {
            y -= 1e7;
          }
          LongOrigin = (zoneNumber - 1) * 6 - 180 + 3;
          eccPrimeSquared = eccSquared / (1 - eccSquared);
          M2 = y / k0;
          mu = M2 / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
          phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu);
          N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
          T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
          C12 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
          R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
          D = x / (N1 * k0);
          var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C12 - 4 * C12 * C12 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C12 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C12 * C12) * D * D * D * D * D * D / 720);
          lat = radToDeg(lat);
          var lon = (D - (1 + 2 * T1 + C12) * D * D * D / 6 + (5 - 2 * C12 + 28 * T1 - 3 * C12 * C12 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
          lon = LongOrigin + radToDeg(lon);
          var result2;
          if (utm2.accuracy) {
            var topRight = UTMtoLL({
              northing: utm2.northing + utm2.accuracy,
              easting: utm2.easting + utm2.accuracy,
              zoneLetter: utm2.zoneLetter,
              zoneNumber: utm2.zoneNumber
            });
            result2 = {
              top: topRight.lat,
              right: topRight.lon,
              bottom: lat,
              left: lon
            };
          } else {
            result2 = {
              lat,
              lon
            };
          }
          return result2;
        }
        function getLetterDesignator(lat) {
          var LetterDesignator = "Z";
          if (84 >= lat && lat >= 72) {
            LetterDesignator = "X";
          } else if (72 > lat && lat >= 64) {
            LetterDesignator = "W";
          } else if (64 > lat && lat >= 56) {
            LetterDesignator = "V";
          } else if (56 > lat && lat >= 48) {
            LetterDesignator = "U";
          } else if (48 > lat && lat >= 40) {
            LetterDesignator = "T";
          } else if (40 > lat && lat >= 32) {
            LetterDesignator = "S";
          } else if (32 > lat && lat >= 24) {
            LetterDesignator = "R";
          } else if (24 > lat && lat >= 16) {
            LetterDesignator = "Q";
          } else if (16 > lat && lat >= 8) {
            LetterDesignator = "P";
          } else if (8 > lat && lat >= 0) {
            LetterDesignator = "N";
          } else if (0 > lat && lat >= -8) {
            LetterDesignator = "M";
          } else if (-8 > lat && lat >= -16) {
            LetterDesignator = "L";
          } else if (-16 > lat && lat >= -24) {
            LetterDesignator = "K";
          } else if (-24 > lat && lat >= -32) {
            LetterDesignator = "J";
          } else if (-32 > lat && lat >= -40) {
            LetterDesignator = "H";
          } else if (-40 > lat && lat >= -48) {
            LetterDesignator = "G";
          } else if (-48 > lat && lat >= -56) {
            LetterDesignator = "F";
          } else if (-56 > lat && lat >= -64) {
            LetterDesignator = "E";
          } else if (-64 > lat && lat >= -72) {
            LetterDesignator = "D";
          } else if (-72 > lat && lat >= -80) {
            LetterDesignator = "C";
          }
          return LetterDesignator;
        }
        function encode(utm2, accuracy) {
          var seasting = "00000" + utm2.easting, snorthing = "00000" + utm2.northing;
          return utm2.zoneNumber + utm2.zoneLetter + get100kID(utm2.easting, utm2.northing, utm2.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
        }
        function get100kID(easting, northing, zoneNumber) {
          var setParm = get100kSetForZone(zoneNumber);
          var setColumn = Math.floor(easting / 1e5);
          var setRow = Math.floor(northing / 1e5) % 20;
          return getLetter100kID(setColumn, setRow, setParm);
        }
        function get100kSetForZone(i) {
          var setParm = i % NUM_100K_SETS;
          if (setParm === 0) {
            setParm = NUM_100K_SETS;
          }
          return setParm;
        }
        function getLetter100kID(column, row, parm) {
          var index = parm - 1;
          var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
          var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);
          var colInt = colOrigin + column - 1;
          var rowInt = rowOrigin + row;
          var rollover = false;
          if (colInt > Z) {
            colInt = colInt - Z + A - 1;
            rollover = true;
          }
          if (colInt === I || colOrigin < I && colInt > I || (colInt > I || colOrigin < I) && rollover) {
            colInt++;
          }
          if (colInt === O || colOrigin < O && colInt > O || (colInt > O || colOrigin < O) && rollover) {
            colInt++;
            if (colInt === I) {
              colInt++;
            }
          }
          if (colInt > Z) {
            colInt = colInt - Z + A - 1;
          }
          if (rowInt > V) {
            rowInt = rowInt - V + A - 1;
            rollover = true;
          } else {
            rollover = false;
          }
          if (rowInt === I || rowOrigin < I && rowInt > I || (rowInt > I || rowOrigin < I) && rollover) {
            rowInt++;
          }
          if (rowInt === O || rowOrigin < O && rowInt > O || (rowInt > O || rowOrigin < O) && rollover) {
            rowInt++;
            if (rowInt === I) {
              rowInt++;
            }
          }
          if (rowInt > V) {
            rowInt = rowInt - V + A - 1;
          }
          var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
          return twoLetter;
        }
        function decode(mgrsString) {
          if (mgrsString && mgrsString.length === 0) {
            throw "MGRSPoint coverting from nothing";
          }
          var length = mgrsString.length;
          var hunK = null;
          var sb = "";
          var testChar;
          var i = 0;
          while (!/[A-Z]/.test(testChar = mgrsString.charAt(i))) {
            if (i >= 2) {
              throw "MGRSPoint bad conversion from: " + mgrsString;
            }
            sb += testChar;
            i++;
          }
          var zoneNumber = parseInt(sb, 10);
          if (i === 0 || i + 3 > length) {
            throw "MGRSPoint bad conversion from: " + mgrsString;
          }
          var zoneLetter = mgrsString.charAt(i++);
          if (zoneLetter <= "A" || zoneLetter === "B" || zoneLetter === "Y" || zoneLetter >= "Z" || zoneLetter === "I" || zoneLetter === "O") {
            throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString;
          }
          hunK = mgrsString.substring(i, i += 2);
          var set = get100kSetForZone(zoneNumber);
          var east100k = getEastingFromChar(hunK.charAt(0), set);
          var north100k = getNorthingFromChar(hunK.charAt(1), set);
          while (north100k < getMinNorthing(zoneLetter)) {
            north100k += 2e6;
          }
          var remainder = length - i;
          if (remainder % 2 !== 0) {
            throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString;
          }
          var sep = remainder / 2;
          var sepEasting = 0;
          var sepNorthing = 0;
          var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
          if (sep > 0) {
            accuracyBonus = 1e5 / Math.pow(10, sep);
            sepEastingString = mgrsString.substring(i, i + sep);
            sepEasting = parseFloat(sepEastingString) * accuracyBonus;
            sepNorthingString = mgrsString.substring(i + sep);
            sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
          }
          easting = sepEasting + east100k;
          northing = sepNorthing + north100k;
          return {
            easting,
            northing,
            zoneLetter,
            zoneNumber,
            accuracy: accuracyBonus
          };
        }
        function getEastingFromChar(e, set) {
          var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
          var eastingValue = 1e5;
          var rewindMarker = false;
          while (curCol !== e.charCodeAt(0)) {
            curCol++;
            if (curCol === I) {
              curCol++;
            }
            if (curCol === O) {
              curCol++;
            }
            if (curCol > Z) {
              if (rewindMarker) {
                throw "Bad character: " + e;
              }
              curCol = A;
              rewindMarker = true;
            }
            eastingValue += 1e5;
          }
          return eastingValue;
        }
        function getNorthingFromChar(n, set) {
          if (n > "V") {
            throw "MGRSPoint given invalid Northing " + n;
          }
          var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
          var northingValue = 0;
          var rewindMarker = false;
          while (curRow !== n.charCodeAt(0)) {
            curRow++;
            if (curRow === I) {
              curRow++;
            }
            if (curRow === O) {
              curRow++;
            }
            if (curRow > V) {
              if (rewindMarker) {
                throw "Bad character: " + n;
              }
              curRow = A;
              rewindMarker = true;
            }
            northingValue += 1e5;
          }
          return northingValue;
        }
        function getMinNorthing(zoneLetter) {
          var northing;
          switch (zoneLetter) {
            case "C":
              northing = 11e5;
              break;
            case "D":
              northing = 2e6;
              break;
            case "E":
              northing = 28e5;
              break;
            case "F":
              northing = 37e5;
              break;
            case "G":
              northing = 46e5;
              break;
            case "H":
              northing = 55e5;
              break;
            case "J":
              northing = 64e5;
              break;
            case "K":
              northing = 73e5;
              break;
            case "L":
              northing = 82e5;
              break;
            case "M":
              northing = 91e5;
              break;
            case "N":
              northing = 0;
              break;
            case "P":
              northing = 8e5;
              break;
            case "Q":
              northing = 17e5;
              break;
            case "R":
              northing = 26e5;
              break;
            case "S":
              northing = 35e5;
              break;
            case "T":
              northing = 44e5;
              break;
            case "U":
              northing = 53e5;
              break;
            case "V":
              northing = 62e5;
              break;
            case "W":
              northing = 7e6;
              break;
            case "X":
              northing = 79e5;
              break;
            default:
              northing = -1;
          }
          if (northing >= 0) {
            return northing;
          } else {
            throw "Invalid zone letter: " + zoneLetter;
          }
        }
        function Point(x, y, z) {
          if (!(this instanceof Point)) {
            return new Point(x, y, z);
          }
          if (Array.isArray(x)) {
            this.x = x[0];
            this.y = x[1];
            this.z = x[2] || 0;
          } else if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z || 0;
          } else if (typeof x === "string" && typeof y === "undefined") {
            var coords = x.split(",");
            this.x = parseFloat(coords[0], 10);
            this.y = parseFloat(coords[1], 10);
            this.z = parseFloat(coords[2], 10) || 0;
          } else {
            this.x = x;
            this.y = y;
            this.z = z || 0;
          }
          console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
        }
        Point.fromMGRS = function(mgrsStr) {
          return new Point(toPoint(mgrsStr));
        };
        Point.prototype.toMGRS = function(accuracy) {
          return forward$u([this.x, this.y], accuracy);
        };
        var C00 = 1;
        var C02 = 0.25;
        var C04 = 0.046875;
        var C06 = 0.01953125;
        var C08 = 0.01068115234375;
        var C22 = 0.75;
        var C44 = 0.46875;
        var C46 = 0.013020833333333334;
        var C48 = 0.007120768229166667;
        var C66 = 0.3645833333333333;
        var C68 = 0.005696614583333333;
        var C88 = 0.3076171875;
        function pj_enfn(es) {
          var en = [];
          en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
          en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
          var t = es * es;
          en[2] = t * (C44 - es * (C46 + es * C48));
          t *= es;
          en[3] = t * (C66 - es * C68);
          en[4] = t * es * C88;
          return en;
        }
        function pj_mlfn(phi, sphi, cphi, en) {
          cphi *= sphi;
          sphi *= sphi;
          return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])));
        }
        var MAX_ITER$3 = 20;
        function pj_inv_mlfn(arg, es, en) {
          var k = 1 / (1 - es);
          var phi = arg;
          for (var i = MAX_ITER$3; i; --i) {
            var s = Math.sin(phi);
            var t = 1 - es * s * s;
            t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
            phi -= t;
            if (Math.abs(t) < EPSLN) {
              return phi;
            }
          }
          return phi;
        }
        function init$v() {
          this.x0 = this.x0 !== void 0 ? this.x0 : 0;
          this.y0 = this.y0 !== void 0 ? this.y0 : 0;
          this.long0 = this.long0 !== void 0 ? this.long0 : 0;
          this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
          if (this.es) {
            this.en = pj_enfn(this.es);
            this.ml0 = pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
          }
        }
        function forward$t(p) {
          var lon = p.x;
          var lat = p.y;
          var delta_lon = adjust_lon(lon - this.long0);
          var con;
          var x, y;
          var sin_phi = Math.sin(lat);
          var cos_phi = Math.cos(lat);
          if (!this.es) {
            var b = cos_phi * Math.sin(delta_lon);
            if (Math.abs(Math.abs(b) - 1) < EPSLN) {
              return 93;
            } else {
              x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
              y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
              b = Math.abs(y);
              if (b >= 1) {
                if (b - 1 > EPSLN) {
                  return 93;
                } else {
                  y = 0;
                }
              } else {
                y = Math.acos(y);
              }
              if (lat < 0) {
                y = -y;
              }
              y = this.a * this.k0 * (y - this.lat0) + this.y0;
            }
          } else {
            var al = cos_phi * delta_lon;
            var als = Math.pow(al, 2);
            var c = this.ep2 * Math.pow(cos_phi, 2);
            var cs = Math.pow(c, 2);
            var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
            var t = Math.pow(tq, 2);
            var ts = Math.pow(t, 2);
            con = 1 - this.es * Math.pow(sin_phi, 2);
            al = al / Math.sqrt(con);
            var ml = pj_mlfn(lat, sin_phi, cos_phi, this.en);
            x = this.a * (this.k0 * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c + als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) + this.x0;
            y = this.a * (this.k0 * (ml - this.ml0 + sin_phi * delta_lon * al / 2 * (1 + als / 12 * (5 - t + 9 * c + 4 * cs + als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c + als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) + this.y0;
          }
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$t(p) {
          var con, phi;
          var lat, lon;
          var x = (p.x - this.x0) * (1 / this.a);
          var y = (p.y - this.y0) * (1 / this.a);
          if (!this.es) {
            var f = Math.exp(x / this.k0);
            var g = 0.5 * (f - 1 / f);
            var temp = this.lat0 + y / this.k0;
            var h = Math.cos(temp);
            con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
            lat = Math.asin(con);
            if (y < 0) {
              lat = -lat;
            }
            if (g === 0 && h === 0) {
              lon = 0;
            } else {
              lon = adjust_lon(Math.atan2(g, h) + this.long0);
            }
          } else {
            con = this.ml0 + y / this.k0;
            phi = pj_inv_mlfn(con, this.es, this.en);
            if (Math.abs(phi) < HALF_PI) {
              var sin_phi = Math.sin(phi);
              var cos_phi = Math.cos(phi);
              var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
              var c = this.ep2 * Math.pow(cos_phi, 2);
              var cs = Math.pow(c, 2);
              var t = Math.pow(tan_phi, 2);
              var ts = Math.pow(t, 2);
              con = 1 - this.es * Math.pow(sin_phi, 2);
              var d = x * Math.sqrt(con) / this.k0;
              var ds = Math.pow(d, 2);
              con = con * tan_phi;
              lat = phi - con * ds / (1 - this.es) * 0.5 * (1 - ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs - ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c - ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));
              lon = adjust_lon(this.long0 + d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c - ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi);
            } else {
              lat = HALF_PI * sign(y);
              lon = 0;
            }
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$u = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
        var tmerc = {
          init: init$v,
          forward: forward$t,
          inverse: inverse$t,
          names: names$u
        };
        function sinh(x) {
          var r = Math.exp(x);
          r = (r - 1 / r) / 2;
          return r;
        }
        function hypot(x, y) {
          x = Math.abs(x);
          y = Math.abs(y);
          var a = Math.max(x, y);
          var b = Math.min(x, y) / (a ? a : 1);
          return a * Math.sqrt(1 + Math.pow(b, 2));
        }
        function log1py(x) {
          var y = 1 + x;
          var z = y - 1;
          return z === 0 ? x : x * Math.log(y) / z;
        }
        function asinhy(x) {
          var y = Math.abs(x);
          y = log1py(y * (1 + y / (hypot(1, y) + 1)));
          return x < 0 ? -y : y;
        }
        function gatg(pp, B) {
          var cos_2B = 2 * Math.cos(2 * B);
          var i = pp.length - 1;
          var h1 = pp[i];
          var h2 = 0;
          var h;
          while (--i >= 0) {
            h = -h2 + cos_2B * h1 + pp[i];
            h2 = h1;
            h1 = h;
          }
          return B + h * Math.sin(2 * B);
        }
        function clens(pp, arg_r) {
          var r = 2 * Math.cos(arg_r);
          var i = pp.length - 1;
          var hr1 = pp[i];
          var hr2 = 0;
          var hr;
          while (--i >= 0) {
            hr = -hr2 + r * hr1 + pp[i];
            hr2 = hr1;
            hr1 = hr;
          }
          return Math.sin(arg_r) * hr;
        }
        function cosh(x) {
          var r = Math.exp(x);
          r = (r + 1 / r) / 2;
          return r;
        }
        function clens_cmplx(pp, arg_r, arg_i) {
          var sin_arg_r = Math.sin(arg_r);
          var cos_arg_r = Math.cos(arg_r);
          var sinh_arg_i = sinh(arg_i);
          var cosh_arg_i = cosh(arg_i);
          var r = 2 * cos_arg_r * cosh_arg_i;
          var i = -2 * sin_arg_r * sinh_arg_i;
          var j = pp.length - 1;
          var hr = pp[j];
          var hi1 = 0;
          var hr1 = 0;
          var hi = 0;
          var hr2;
          var hi2;
          while (--j >= 0) {
            hr2 = hr1;
            hi2 = hi1;
            hr1 = hr;
            hi1 = hi;
            hr = -hr2 + r * hr1 - i * hi1 + pp[j];
            hi = -hi2 + i * hr1 + r * hi1;
          }
          r = sin_arg_r * cosh_arg_i;
          i = cos_arg_r * sinh_arg_i;
          return [r * hr - i * hi, r * hi + i * hr];
        }
        function init$u() {
          if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
            throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
          }
          if (this.approx) {
            tmerc.init.apply(this);
            this.forward = tmerc.forward;
            this.inverse = tmerc.inverse;
          }
          this.x0 = this.x0 !== void 0 ? this.x0 : 0;
          this.y0 = this.y0 !== void 0 ? this.y0 : 0;
          this.long0 = this.long0 !== void 0 ? this.long0 : 0;
          this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
          this.cgb = [];
          this.cbg = [];
          this.utg = [];
          this.gtu = [];
          var f = this.es / (1 + Math.sqrt(1 - this.es));
          var n = f / (2 - f);
          var np = n;
          this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))));
          this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));
          np = np * n;
          this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
          this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));
          np = np * n;
          this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
          this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));
          np = np * n;
          this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
          this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)));
          np = np * n;
          this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
          this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));
          np = np * n;
          this.cgb[5] = np * (601676 / 22275);
          this.cbg[5] = np * (444337 / 155925);
          np = Math.pow(n, 2);
          this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));
          this.utg[0] = n * (-0.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
          this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));
          this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
          this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));
          np = np * n;
          this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))));
          this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));
          np = np * n;
          this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
          this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));
          np = np * n;
          this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
          this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));
          np = np * n;
          this.utg[5] = np * (-20648693 / 638668800);
          this.gtu[5] = np * (212378941 / 319334400);
          var Z2 = gatg(this.cbg, this.lat0);
          this.Zb = -this.Qn * (Z2 + clens(this.gtu, 2 * Z2));
        }
        function forward$s(p) {
          var Ce = adjust_lon(p.x - this.long0);
          var Cn = p.y;
          Cn = gatg(this.cbg, Cn);
          var sin_Cn = Math.sin(Cn);
          var cos_Cn = Math.cos(Cn);
          var sin_Ce = Math.sin(Ce);
          var cos_Ce = Math.cos(Ce);
          Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
          Ce = Math.atan2(sin_Ce * cos_Cn, hypot(sin_Cn, cos_Cn * cos_Ce));
          Ce = asinhy(Math.tan(Ce));
          var tmp = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce);
          Cn = Cn + tmp[0];
          Ce = Ce + tmp[1];
          var x;
          var y;
          if (Math.abs(Ce) <= 2.623395162778) {
            x = this.a * (this.Qn * Ce) + this.x0;
            y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
          } else {
            x = Infinity;
            y = Infinity;
          }
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$s(p) {
          var Ce = (p.x - this.x0) * (1 / this.a);
          var Cn = (p.y - this.y0) * (1 / this.a);
          Cn = (Cn - this.Zb) / this.Qn;
          Ce = Ce / this.Qn;
          var lon;
          var lat;
          if (Math.abs(Ce) <= 2.623395162778) {
            var tmp = clens_cmplx(this.utg, 2 * Cn, 2 * Ce);
            Cn = Cn + tmp[0];
            Ce = Ce + tmp[1];
            Ce = Math.atan(sinh(Ce));
            var sin_Cn = Math.sin(Cn);
            var cos_Cn = Math.cos(Cn);
            var sin_Ce = Math.sin(Ce);
            var cos_Ce = Math.cos(Ce);
            Cn = Math.atan2(sin_Cn * cos_Ce, hypot(sin_Ce, cos_Ce * cos_Cn));
            Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);
            lon = adjust_lon(Ce + this.long0);
            lat = gatg(this.cgb, Cn);
          } else {
            lon = Infinity;
            lat = Infinity;
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$t = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"];
        var etmerc = {
          init: init$u,
          forward: forward$s,
          inverse: inverse$s,
          names: names$t
        };
        function adjust_zone(zone, lon) {
          if (zone === void 0) {
            zone = Math.floor((adjust_lon(lon) + Math.PI) * 30 / Math.PI) + 1;
            if (zone < 0) {
              return 0;
            } else if (zone > 60) {
              return 60;
            }
          }
          return zone;
        }
        var dependsOn = "etmerc";
        function init$t() {
          var zone = adjust_zone(this.zone, this.long0);
          if (zone === void 0) {
            throw new Error("unknown utm zone");
          }
          this.lat0 = 0;
          this.long0 = (6 * Math.abs(zone) - 183) * D2R$1;
          this.x0 = 5e5;
          this.y0 = this.utmSouth ? 1e7 : 0;
          this.k0 = 0.9996;
          etmerc.init.apply(this);
          this.forward = etmerc.forward;
          this.inverse = etmerc.inverse;
        }
        var names$s = ["Universal Transverse Mercator System", "utm"];
        var utm = {
          init: init$t,
          names: names$s,
          dependsOn
        };
        function srat(esinp, exp) {
          return Math.pow((1 - esinp) / (1 + esinp), exp);
        }
        var MAX_ITER$2 = 20;
        function init$s() {
          var sphi = Math.sin(this.lat0);
          var cphi = Math.cos(this.lat0);
          cphi *= cphi;
          this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
          this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
          this.phic0 = Math.asin(sphi / this.C);
          this.ratexp = 0.5 * this.C * this.e;
          this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp));
        }
        function forward$r(p) {
          var lon = p.x;
          var lat = p.y;
          p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
          p.x = this.C * lon;
          return p;
        }
        function inverse$r(p) {
          var DEL_TOL = 1e-14;
          var lon = p.x / this.C;
          var lat = p.y;
          var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
          for (var i = MAX_ITER$2; i > 0; --i) {
            lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), -0.5 * this.e)) - HALF_PI;
            if (Math.abs(lat - p.y) < DEL_TOL) {
              break;
            }
            p.y = lat;
          }
          if (!i) {
            return null;
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var gauss = {
          init: init$s,
          forward: forward$r,
          inverse: inverse$r
        };
        function init$r() {
          gauss.init.apply(this);
          if (!this.rc) {
            return;
          }
          this.sinc0 = Math.sin(this.phic0);
          this.cosc0 = Math.cos(this.phic0);
          this.R2 = 2 * this.rc;
          if (!this.title) {
            this.title = "Oblique Stereographic Alternative";
          }
        }
        function forward$q(p) {
          var sinc, cosc, cosl, k;
          p.x = adjust_lon(p.x - this.long0);
          gauss.forward.apply(this, [p]);
          sinc = Math.sin(p.y);
          cosc = Math.cos(p.y);
          cosl = Math.cos(p.x);
          k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
          p.x = k * cosc * Math.sin(p.x);
          p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
          p.x = this.a * p.x + this.x0;
          p.y = this.a * p.y + this.y0;
          return p;
        }
        function inverse$q(p) {
          var sinc, cosc, lon, lat, rho;
          p.x = (p.x - this.x0) / this.a;
          p.y = (p.y - this.y0) / this.a;
          p.x /= this.k0;
          p.y /= this.k0;
          if (rho = hypot(p.x, p.y)) {
            var c = 2 * Math.atan2(rho, this.R2);
            sinc = Math.sin(c);
            cosc = Math.cos(c);
            lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
            lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
          } else {
            lat = this.phic0;
            lon = 0;
          }
          p.x = lon;
          p.y = lat;
          gauss.inverse.apply(this, [p]);
          p.x = adjust_lon(p.x + this.long0);
          return p;
        }
        var names$r = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
        var sterea = {
          init: init$r,
          forward: forward$q,
          inverse: inverse$q,
          names: names$r
        };
        function ssfn_(phit, sinphi, eccen) {
          sinphi *= eccen;
          return Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen);
        }
        function init$q() {
          this.x0 = this.x0 || 0;
          this.y0 = this.y0 || 0;
          this.lat0 = this.lat0 || 0;
          this.long0 = this.long0 || 0;
          this.coslat0 = Math.cos(this.lat0);
          this.sinlat0 = Math.sin(this.lat0);
          if (this.sphere) {
            if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
              this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
            }
          } else {
            if (Math.abs(this.coslat0) <= EPSLN) {
              if (this.lat0 > 0) {
                this.con = 1;
              } else {
                this.con = -1;
              }
            }
            this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
            if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && Math.abs(Math.cos(this.lat_ts)) > EPSLN) {
              this.k0 = 0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
            }
            this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0);
            this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
            this.cosX0 = Math.cos(this.X0);
            this.sinX0 = Math.sin(this.X0);
          }
        }
        function forward$p(p) {
          var lon = p.x;
          var lat = p.y;
          var sinlat = Math.sin(lat);
          var coslat = Math.cos(lat);
          var A5, X, sinX, cosX, ts, rh;
          var dlon = adjust_lon(lon - this.long0);
          if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
            p.x = NaN;
            p.y = NaN;
            return p;
          }
          if (this.sphere) {
            A5 = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
            p.x = this.a * A5 * coslat * Math.sin(dlon) + this.x0;
            p.y = this.a * A5 * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
            return p;
          } else {
            X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
            cosX = Math.cos(X);
            sinX = Math.sin(X);
            if (Math.abs(this.coslat0) <= EPSLN) {
              ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
              rh = 2 * this.a * this.k0 * ts / this.cons;
              p.x = this.x0 + rh * Math.sin(lon - this.long0);
              p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
              return p;
            } else if (Math.abs(this.sinlat0) < EPSLN) {
              A5 = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
              p.y = A5 * sinX;
            } else {
              A5 = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
              p.y = A5 * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
            }
            p.x = A5 * cosX * Math.sin(dlon) + this.x0;
          }
          return p;
        }
        function inverse$p(p) {
          p.x -= this.x0;
          p.y -= this.y0;
          var lon, lat, ts, ce, Chi;
          var rh = Math.sqrt(p.x * p.x + p.y * p.y);
          if (this.sphere) {
            var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
            lon = this.long0;
            lat = this.lat0;
            if (rh <= EPSLN) {
              p.x = lon;
              p.y = lat;
              return p;
            }
            lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
            if (Math.abs(this.coslat0) < EPSLN) {
              if (this.lat0 > 0) {
                lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y));
              } else {
                lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
              }
            } else {
              lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
            }
            p.x = lon;
            p.y = lat;
            return p;
          } else {
            if (Math.abs(this.coslat0) <= EPSLN) {
              if (rh <= EPSLN) {
                lat = this.lat0;
                lon = this.long0;
                p.x = lon;
                p.y = lat;
                return p;
              }
              p.x *= this.con;
              p.y *= this.con;
              ts = rh * this.cons / (2 * this.a * this.k0);
              lat = this.con * phi2z(this.e, ts);
              lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, -1 * p.y));
            } else {
              ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
              lon = this.long0;
              if (rh <= EPSLN) {
                Chi = this.X0;
              } else {
                Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
                lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
              }
              lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
            }
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$q = ["stere", "Stereographic_South_Pole", "Polar_Stereographic_variant_A", "Polar_Stereographic_variant_B", "Polar_Stereographic"];
        var stere = {
          init: init$q,
          forward: forward$p,
          inverse: inverse$p,
          names: names$q,
          ssfn_
        };
        function init$p() {
          var phy0 = this.lat0;
          this.lambda0 = this.long0;
          var sinPhy0 = Math.sin(phy0);
          var semiMajorAxis = this.a;
          var invF = this.rf;
          var flattening = 1 / invF;
          var e2 = 2 * flattening - Math.pow(flattening, 2);
          var e = this.e = Math.sqrt(e2);
          this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
          this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
          this.b0 = Math.asin(sinPhy0 / this.alpha);
          var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
          var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
          var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
          this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
        }
        function forward$o(p) {
          var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
          var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
          var S = -this.alpha * (Sa1 + Sa2) + this.K;
          var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);
          var I2 = this.alpha * (p.x - this.lambda0);
          var rotI = Math.atan(Math.sin(I2) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I2)));
          var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I2));
          p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
          p.x = this.R * rotI + this.x0;
          return p;
        }
        function inverse$o(p) {
          var Y = p.x - this.x0;
          var X = p.y - this.y0;
          var rotI = Y / this.R;
          var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);
          var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
          var I2 = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));
          var lambda = this.lambda0 + I2 / this.alpha;
          var S = 0;
          var phy = b;
          var prevPhy = -1e3;
          var iteration = 0;
          while (Math.abs(phy - prevPhy) > 1e-7) {
            if (++iteration > 20) {
              return;
            }
            S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
            prevPhy = phy;
            phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
          }
          p.x = lambda;
          p.y = phy;
          return p;
        }
        var names$p = ["somerc"];
        var somerc = {
          init: init$p,
          forward: forward$o,
          inverse: inverse$o,
          names: names$p
        };
        var TOL = 1e-7;
        function isTypeA(P) {
          var typeAProjections = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"];
          var projectionName = typeof P.projName === "object" ? Object.keys(P.projName)[0] : P.projName;
          return "no_uoff" in P || "no_off" in P || typeAProjections.indexOf(projectionName) !== -1 || typeAProjections.indexOf(getNormalizedProjName(projectionName)) !== -1;
        }
        function init$o() {
          var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0, gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0;
          this.no_off = isTypeA(this);
          this.no_rot = "no_rot" in this;
          var alp = false;
          if ("alpha" in this) {
            alp = true;
          }
          var gam = false;
          if ("rectified_grid_angle" in this) {
            gam = true;
          }
          if (alp) {
            alpha_c = this.alpha;
          }
          if (gam) {
            gamma = this.rectified_grid_angle;
          }
          if (alp || gam) {
            lamc = this.longc;
          } else {
            lam1 = this.long1;
            phi1 = this.lat1;
            lam2 = this.long2;
            phi2 = this.lat2;
            if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL || Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL || Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
              throw new Error();
            }
          }
          var one_es = 1 - this.es;
          com = Math.sqrt(one_es);
          if (Math.abs(this.lat0) > EPSLN) {
            sinph0 = Math.sin(this.lat0);
            cosph0 = Math.cos(this.lat0);
            con = 1 - this.es * sinph0 * sinph0;
            this.B = cosph0 * cosph0;
            this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
            this.A = this.B * this.k0 * com / con;
            D = this.B * com / (cosph0 * Math.sqrt(con));
            F = D * D - 1;
            if (F <= 0) {
              F = 0;
            } else {
              F = Math.sqrt(F);
              if (this.lat0 < 0) {
                F = -F;
              }
            }
            this.E = F += D;
            this.E *= Math.pow(tsfnz(this.e, this.lat0, sinph0), this.B);
          } else {
            this.B = 1 / com;
            this.A = this.k0;
            this.E = D = F = 1;
          }
          if (alp || gam) {
            if (alp) {
              gamma0 = Math.asin(Math.sin(alpha_c) / D);
              if (!gam) {
                gamma = alpha_c;
              }
            } else {
              gamma0 = gamma;
              alpha_c = Math.asin(D * Math.sin(gamma0));
            }
            this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
          } else {
            H = Math.pow(tsfnz(this.e, phi1, Math.sin(phi1)), this.B);
            L = Math.pow(tsfnz(this.e, phi2, Math.sin(phi2)), this.B);
            F = this.E / H;
            p = (L - H) / (L + H);
            J = this.E * this.E;
            J = (J - L * H) / (J + L * H);
            con = lam1 - lam2;
            if (con < -Math.pi) {
              lam2 -= TWO_PI;
            } else if (con > Math.pi) {
              lam2 += TWO_PI;
            }
            this.lam0 = adjust_lon(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B);
            gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon(lam1 - this.lam0)) / (F - 1 / F));
            gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
          }
          this.singam = Math.sin(gamma0);
          this.cosgam = Math.cos(gamma0);
          this.sinrot = Math.sin(gamma);
          this.cosrot = Math.cos(gamma);
          this.rB = 1 / this.B;
          this.ArB = this.A * this.rB;
          this.BrA = 1 / this.ArB;
          if (this.no_off) {
            this.u_0 = 0;
          } else {
            this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
            if (this.lat0 < 0) {
              this.u_0 = -this.u_0;
            }
          }
          F = 0.5 * gamma0;
          this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
          this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
        }
        function forward$n(p) {
          var coords = {};
          var S, T, U, V2, W, temp, u, v;
          p.x = p.x - this.lam0;
          if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
            W = this.E / Math.pow(tsfnz(this.e, p.y, Math.sin(p.y)), this.B);
            temp = 1 / W;
            S = 0.5 * (W - temp);
            T = 0.5 * (W + temp);
            V2 = Math.sin(this.B * p.x);
            U = (S * this.singam - V2 * this.cosgam) / T;
            if (Math.abs(Math.abs(U) - 1) < EPSLN) {
              throw new Error();
            }
            v = 0.5 * this.ArB * Math.log((1 - U) / (1 + U));
            temp = Math.cos(this.B * p.x);
            if (Math.abs(temp) < TOL) {
              u = this.A * p.x;
            } else {
              u = this.ArB * Math.atan2(S * this.cosgam + V2 * this.singam, temp);
            }
          } else {
            v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
            u = this.ArB * p.y;
          }
          if (this.no_rot) {
            coords.x = u;
            coords.y = v;
          } else {
            u -= this.u_0;
            coords.x = v * this.cosrot + u * this.sinrot;
            coords.y = u * this.cosrot - v * this.sinrot;
          }
          coords.x = this.a * coords.x + this.x0;
          coords.y = this.a * coords.y + this.y0;
          return coords;
        }
        function inverse$n(p) {
          var u, v, Qp, Sp, Tp, Vp, Up;
          var coords = {};
          p.x = (p.x - this.x0) * (1 / this.a);
          p.y = (p.y - this.y0) * (1 / this.a);
          if (this.no_rot) {
            v = p.y;
            u = p.x;
          } else {
            v = p.x * this.cosrot - p.y * this.sinrot;
            u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
          }
          Qp = Math.exp(-this.BrA * v);
          Sp = 0.5 * (Qp - 1 / Qp);
          Tp = 0.5 * (Qp + 1 / Qp);
          Vp = Math.sin(this.BrA * u);
          Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
          if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
            coords.x = 0;
            coords.y = Up < 0 ? -HALF_PI : HALF_PI;
          } else {
            coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
            coords.y = phi2z(this.e, Math.pow(coords.y, 1 / this.B));
            if (coords.y === Infinity) {
              throw new Error();
            }
            coords.x = -this.rB * Math.atan2(Sp * this.cosgam - Vp * this.singam, Math.cos(this.BrA * u));
          }
          coords.x += this.lam0;
          return coords;
        }
        var names$o = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Variant_B", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
        var omerc = {
          init: init$o,
          forward: forward$n,
          inverse: inverse$n,
          names: names$o
        };
        function init$n() {
          if (!this.lat2) {
            this.lat2 = this.lat1;
          }
          if (!this.k0) {
            this.k0 = 1;
          }
          this.x0 = this.x0 || 0;
          this.y0 = this.y0 || 0;
          if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
            return;
          }
          var temp = this.b / this.a;
          this.e = Math.sqrt(1 - temp * temp);
          var sin1 = Math.sin(this.lat1);
          var cos1 = Math.cos(this.lat1);
          var ms1 = msfnz(this.e, sin1, cos1);
          var ts1 = tsfnz(this.e, this.lat1, sin1);
          var sin2 = Math.sin(this.lat2);
          var cos2 = Math.cos(this.lat2);
          var ms2 = msfnz(this.e, sin2, cos2);
          var ts2 = tsfnz(this.e, this.lat2, sin2);
          var ts0 = Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN ? 0 : tsfnz(this.e, this.lat0, Math.sin(this.lat0));
          if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
            this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
          } else {
            this.ns = sin1;
          }
          if (isNaN(this.ns)) {
            this.ns = sin1;
          }
          this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
          this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
          if (!this.title) {
            this.title = "Lambert Conformal Conic";
          }
        }
        function forward$m(p) {
          var lon = p.x;
          var lat = p.y;
          if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
            lat = sign(lat) * (HALF_PI - 2 * EPSLN);
          }
          var con = Math.abs(Math.abs(lat) - HALF_PI);
          var ts, rh1;
          if (con > EPSLN) {
            ts = tsfnz(this.e, lat, Math.sin(lat));
            rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
          } else {
            con = lat * this.ns;
            if (con <= 0) {
              return null;
            }
            rh1 = 0;
          }
          var theta = this.ns * adjust_lon(lon - this.long0);
          p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
          p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;
          return p;
        }
        function inverse$m(p) {
          var rh1, con, ts;
          var lat, lon;
          var x = (p.x - this.x0) / this.k0;
          var y = this.rh - (p.y - this.y0) / this.k0;
          if (this.ns > 0) {
            rh1 = Math.sqrt(x * x + y * y);
            con = 1;
          } else {
            rh1 = -Math.sqrt(x * x + y * y);
            con = -1;
          }
          var theta = 0;
          if (rh1 !== 0) {
            theta = Math.atan2(con * x, con * y);
          }
          if (rh1 !== 0 || this.ns > 0) {
            con = 1 / this.ns;
            ts = Math.pow(rh1 / (this.a * this.f0), con);
            lat = phi2z(this.e, ts);
            if (lat === -9999) {
              return null;
            }
          } else {
            lat = -HALF_PI;
          }
          lon = adjust_lon(theta / this.ns + this.long0);
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$n = [
          "Lambert Tangential Conformal Conic Projection",
          "Lambert_Conformal_Conic",
          "Lambert_Conformal_Conic_1SP",
          "Lambert_Conformal_Conic_2SP",
          "lcc",
          "Lambert Conic Conformal (1SP)",
          "Lambert Conic Conformal (2SP)"
        ];
        var lcc = {
          init: init$n,
          forward: forward$m,
          inverse: inverse$m,
          names: names$n
        };
        function init$m() {
          this.a = 6377397155e-3;
          this.es = 0.006674372230614;
          this.e = Math.sqrt(this.es);
          if (!this.lat0) {
            this.lat0 = 0.863937979737193;
          }
          if (!this.long0) {
            this.long0 = 0.7417649320975901 - 0.308341501185665;
          }
          if (!this.k0) {
            this.k0 = 0.9999;
          }
          this.s45 = 0.785398163397448;
          this.s90 = 2 * this.s45;
          this.fi0 = this.lat0;
          this.e2 = this.es;
          this.e = Math.sqrt(this.e2);
          this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
          this.uq = 1.04216856380474;
          this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
          this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
          this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
          this.k1 = this.k0;
          this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
          this.s0 = 1.37008346281555;
          this.n = Math.sin(this.s0);
          this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
          this.ad = this.s90 - this.uq;
        }
        function forward$l(p) {
          var gfi, u, deltav, s, d, eps, ro;
          var lon = p.x;
          var lat = p.y;
          var delta_lon = adjust_lon(lon - this.long0);
          gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2);
          u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
          deltav = -delta_lon * this.alfa;
          s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
          d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
          eps = this.n * d;
          ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
          p.y = ro * Math.cos(eps) / 1;
          p.x = ro * Math.sin(eps) / 1;
          if (!this.czech) {
            p.y *= -1;
            p.x *= -1;
          }
          return p;
        }
        function inverse$l(p) {
          var u, deltav, s, d, eps, ro, fi1;
          var ok;
          var tmp = p.x;
          p.x = p.y;
          p.y = tmp;
          if (!this.czech) {
            p.y *= -1;
            p.x *= -1;
          }
          ro = Math.sqrt(p.x * p.x + p.y * p.y);
          eps = Math.atan2(p.y, p.x);
          d = eps / Math.sin(this.s0);
          s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
          u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
          deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
          p.x = this.long0 - deltav / this.alfa;
          fi1 = u;
          ok = 0;
          var iter = 0;
          do {
            p.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
            if (Math.abs(fi1 - p.y) < 1e-10) {
              ok = 1;
            }
            fi1 = p.y;
            iter += 1;
          } while (ok === 0 && iter < 15);
          if (iter >= 15) {
            return null;
          }
          return p;
        }
        var names$m = ["Krovak", "krovak"];
        var krovak = {
          init: init$m,
          forward: forward$l,
          inverse: inverse$l,
          names: names$m
        };
        function mlfn(e0, e1, e2, e3, phi) {
          return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi);
        }
        function e0fn(x) {
          return 1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x));
        }
        function e1fn(x) {
          return 0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x));
        }
        function e2fn(x) {
          return 0.05859375 * x * x * (1 + 0.75 * x);
        }
        function e3fn(x) {
          return x * x * x * (35 / 3072);
        }
        function gN(a, e, sinphi) {
          var temp = e * sinphi;
          return a / Math.sqrt(1 - temp * temp);
        }
        function adjust_lat(x) {
          return Math.abs(x) < HALF_PI ? x : x - sign(x) * Math.PI;
        }
        function imlfn(ml, e0, e1, e2, e3) {
          var phi;
          var dphi;
          phi = ml / e0;
          for (var i = 0; i < 15; i++) {
            dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
            phi += dphi;
            if (Math.abs(dphi) <= 1e-10) {
              return phi;
            }
          }
          return NaN;
        }
        function init$l() {
          if (!this.sphere) {
            this.e0 = e0fn(this.es);
            this.e1 = e1fn(this.es);
            this.e2 = e2fn(this.es);
            this.e3 = e3fn(this.es);
            this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
          }
        }
        function forward$k(p) {
          var x, y;
          var lam = p.x;
          var phi = p.y;
          lam = adjust_lon(lam - this.long0);
          if (this.sphere) {
            x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
            y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
          } else {
            var sinphi = Math.sin(phi);
            var cosphi = Math.cos(phi);
            var nl = gN(this.a, this.e, sinphi);
            var tl = Math.tan(phi) * Math.tan(phi);
            var al = lam * Math.cos(phi);
            var asq = al * al;
            var cl = this.es * cosphi * cosphi / (1 - this.es);
            var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
            x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
            y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);
          }
          p.x = x + this.x0;
          p.y = y + this.y0;
          return p;
        }
        function inverse$k(p) {
          p.x -= this.x0;
          p.y -= this.y0;
          var x = p.x / this.a;
          var y = p.y / this.a;
          var phi, lam;
          if (this.sphere) {
            var dd = y + this.lat0;
            phi = Math.asin(Math.sin(dd) * Math.cos(x));
            lam = Math.atan2(Math.tan(x), Math.cos(dd));
          } else {
            var ml1 = this.ml0 / this.a + y;
            var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
            if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
              p.x = this.long0;
              p.y = HALF_PI;
              if (y < 0) {
                p.y *= -1;
              }
              return p;
            }
            var nl1 = gN(this.a, this.e, Math.sin(phi1));
            var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
            var tl1 = Math.pow(Math.tan(phi1), 2);
            var dl = x * this.a / nl1;
            var dsq = dl * dl;
            phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
            lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);
          }
          p.x = adjust_lon(lam + this.long0);
          p.y = adjust_lat(phi);
          return p;
        }
        var names$l = ["Cassini", "Cassini_Soldner", "cass"];
        var cass = {
          init: init$l,
          forward: forward$k,
          inverse: inverse$k,
          names: names$l
        };
        function qsfnz(eccent, sinphi) {
          var con;
          if (eccent > 1e-7) {
            con = eccent * sinphi;
            return (1 - eccent * eccent) * (sinphi / (1 - con * con) - 0.5 / eccent * Math.log((1 - con) / (1 + con)));
          } else {
            return 2 * sinphi;
          }
        }
        var S_POLE = 1;
        var N_POLE = 2;
        var EQUIT = 3;
        var OBLIQ = 4;
        function init$k() {
          var t = Math.abs(this.lat0);
          if (Math.abs(t - HALF_PI) < EPSLN) {
            this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
          } else if (Math.abs(t) < EPSLN) {
            this.mode = this.EQUIT;
          } else {
            this.mode = this.OBLIQ;
          }
          if (this.es > 0) {
            var sinphi;
            this.qp = qsfnz(this.e, 1);
            this.mmf = 0.5 / (1 - this.es);
            this.apa = authset(this.es);
            switch (this.mode) {
              case this.N_POLE:
                this.dd = 1;
                break;
              case this.S_POLE:
                this.dd = 1;
                break;
              case this.EQUIT:
                this.rq = Math.sqrt(0.5 * this.qp);
                this.dd = 1 / this.rq;
                this.xmf = 1;
                this.ymf = 0.5 * this.qp;
                break;
              case this.OBLIQ:
                this.rq = Math.sqrt(0.5 * this.qp);
                sinphi = Math.sin(this.lat0);
                this.sinb1 = qsfnz(this.e, sinphi) / this.qp;
                this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
                this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
                this.ymf = (this.xmf = this.rq) / this.dd;
                this.xmf *= this.dd;
                break;
            }
          } else {
            if (this.mode === this.OBLIQ) {
              this.sinph0 = Math.sin(this.lat0);
              this.cosph0 = Math.cos(this.lat0);
            }
          }
        }
        function forward$j(p) {
          var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
          var lam = p.x;
          var phi = p.y;
          lam = adjust_lon(lam - this.long0);
          if (this.sphere) {
            sinphi = Math.sin(phi);
            cosphi = Math.cos(phi);
            coslam = Math.cos(lam);
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
              if (y <= EPSLN) {
                return null;
              }
              y = Math.sqrt(2 / y);
              x = y * cosphi * Math.sin(lam);
              y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
              if (this.mode === this.N_POLE) {
                coslam = -coslam;
              }
              if (Math.abs(phi + this.lat0) < EPSLN) {
                return null;
              }
              y = FORTPI - phi * 0.5;
              y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y));
              x = y * Math.sin(lam);
              y *= coslam;
            }
          } else {
            sinb = 0;
            cosb = 0;
            b = 0;
            coslam = Math.cos(lam);
            sinlam = Math.sin(lam);
            sinphi = Math.sin(phi);
            q = qsfnz(this.e, sinphi);
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              sinb = q / this.qp;
              cosb = Math.sqrt(1 - sinb * sinb);
            }
            switch (this.mode) {
              case this.OBLIQ:
                b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
                break;
              case this.EQUIT:
                b = 1 + cosb * coslam;
                break;
              case this.N_POLE:
                b = HALF_PI + phi;
                q = this.qp - q;
                break;
              case this.S_POLE:
                b = phi - HALF_PI;
                q = this.qp + q;
                break;
            }
            if (Math.abs(b) < EPSLN) {
              return null;
            }
            switch (this.mode) {
              case this.OBLIQ:
              case this.EQUIT:
                b = Math.sqrt(2 / b);
                if (this.mode === this.OBLIQ) {
                  y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
                } else {
                  y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
                }
                x = this.xmf * b * cosb * sinlam;
                break;
              case this.N_POLE:
              case this.S_POLE:
                if (q >= 0) {
                  x = (b = Math.sqrt(q)) * sinlam;
                  y = coslam * (this.mode === this.S_POLE ? b : -b);
                } else {
                  x = y = 0;
                }
                break;
            }
          }
          p.x = this.a * x + this.x0;
          p.y = this.a * y + this.y0;
          return p;
        }
        function inverse$j(p) {
          p.x -= this.x0;
          p.y -= this.y0;
          var x = p.x / this.a;
          var y = p.y / this.a;
          var lam, phi, cCe, sCe, q, rho, ab;
          if (this.sphere) {
            var cosz = 0, rh, sinz = 0;
            rh = Math.sqrt(x * x + y * y);
            phi = rh * 0.5;
            if (phi > 1) {
              return null;
            }
            phi = 2 * Math.asin(phi);
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              sinz = Math.sin(phi);
              cosz = Math.cos(phi);
            }
            switch (this.mode) {
              case this.EQUIT:
                phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin(y * sinz / rh);
                x *= sinz;
                y = cosz * rh;
                break;
              case this.OBLIQ:
                phi = Math.abs(rh) <= EPSLN ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
                x *= sinz * this.cosph0;
                y = (cosz - Math.sin(phi) * this.sinph0) * rh;
                break;
              case this.N_POLE:
                y = -y;
                phi = HALF_PI - phi;
                break;
              case this.S_POLE:
                phi -= HALF_PI;
                break;
            }
            lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y);
          } else {
            ab = 0;
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              x /= this.dd;
              y *= this.dd;
              rho = Math.sqrt(x * x + y * y);
              if (rho < EPSLN) {
                p.x = this.long0;
                p.y = this.lat0;
                return p;
              }
              sCe = 2 * Math.asin(0.5 * rho / this.rq);
              cCe = Math.cos(sCe);
              x *= sCe = Math.sin(sCe);
              if (this.mode === this.OBLIQ) {
                ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
                q = this.qp * ab;
                y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
              } else {
                ab = y * sCe / rho;
                q = this.qp * ab;
                y = rho * cCe;
              }
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
              if (this.mode === this.N_POLE) {
                y = -y;
              }
              q = x * x + y * y;
              if (!q) {
                p.x = this.long0;
                p.y = this.lat0;
                return p;
              }
              ab = 1 - q / this.qp;
              if (this.mode === this.S_POLE) {
                ab = -ab;
              }
            }
            lam = Math.atan2(x, y);
            phi = authlat(Math.asin(ab), this.apa);
          }
          p.x = adjust_lon(this.long0 + lam);
          p.y = phi;
          return p;
        }
        var P00 = 0.3333333333333333;
        var P01 = 0.17222222222222222;
        var P02 = 0.10257936507936508;
        var P10 = 0.06388888888888888;
        var P11 = 0.0664021164021164;
        var P20 = 0.016415012942191543;
        function authset(es) {
          var t;
          var APA = [];
          APA[0] = es * P00;
          t = es * es;
          APA[0] += t * P01;
          APA[1] = t * P10;
          t *= es;
          APA[0] += t * P02;
          APA[1] += t * P11;
          APA[2] = t * P20;
          return APA;
        }
        function authlat(beta, APA) {
          var t = beta + beta;
          return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t);
        }
        var names$k = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
        var laea = {
          init: init$k,
          forward: forward$j,
          inverse: inverse$j,
          names: names$k,
          S_POLE,
          N_POLE,
          EQUIT,
          OBLIQ
        };
        function asinz(x) {
          if (Math.abs(x) > 1) {
            x = x > 1 ? 1 : -1;
          }
          return Math.asin(x);
        }
        function init$j() {
          if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
            return;
          }
          this.temp = this.b / this.a;
          this.es = 1 - Math.pow(this.temp, 2);
          this.e3 = Math.sqrt(this.es);
          this.sin_po = Math.sin(this.lat1);
          this.cos_po = Math.cos(this.lat1);
          this.t1 = this.sin_po;
          this.con = this.sin_po;
          this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po);
          this.qs1 = qsfnz(this.e3, this.sin_po);
          this.sin_po = Math.sin(this.lat2);
          this.cos_po = Math.cos(this.lat2);
          this.t2 = this.sin_po;
          this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po);
          this.qs2 = qsfnz(this.e3, this.sin_po);
          this.sin_po = Math.sin(this.lat0);
          this.cos_po = Math.cos(this.lat0);
          this.t3 = this.sin_po;
          this.qs0 = qsfnz(this.e3, this.sin_po);
          if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
            this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
          } else {
            this.ns0 = this.con;
          }
          this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
          this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
        }
        function forward$i(p) {
          var lon = p.x;
          var lat = p.y;
          this.sin_phi = Math.sin(lat);
          this.cos_phi = Math.cos(lat);
          var qs = qsfnz(this.e3, this.sin_phi);
          var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
          var theta = this.ns0 * adjust_lon(lon - this.long0);
          var x = rh1 * Math.sin(theta) + this.x0;
          var y = this.rh - rh1 * Math.cos(theta) + this.y0;
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$i(p) {
          var rh1, qs, con, theta, lon, lat;
          p.x -= this.x0;
          p.y = this.rh - p.y + this.y0;
          if (this.ns0 >= 0) {
            rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
            con = 1;
          } else {
            rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
            con = -1;
          }
          theta = 0;
          if (rh1 !== 0) {
            theta = Math.atan2(con * p.x, con * p.y);
          }
          con = rh1 * this.ns0 / this.a;
          if (this.sphere) {
            lat = Math.asin((this.c - con * con) / (2 * this.ns0));
          } else {
            qs = (this.c - con * con) / this.ns0;
            lat = this.phi1z(this.e3, qs);
          }
          lon = adjust_lon(theta / this.ns0 + this.long0);
          p.x = lon;
          p.y = lat;
          return p;
        }
        function phi1z(eccent, qs) {
          var sinphi, cosphi, con, com, dphi;
          var phi = asinz(0.5 * qs);
          if (eccent < EPSLN) {
            return phi;
          }
          var eccnts = eccent * eccent;
          for (var i = 1; i <= 25; i++) {
            sinphi = Math.sin(phi);
            cosphi = Math.cos(phi);
            con = eccent * sinphi;
            com = 1 - con * con;
            dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
            phi = phi + dphi;
            if (Math.abs(dphi) <= 1e-7) {
              return phi;
            }
          }
          return null;
        }
        var names$j = ["Albers_Conic_Equal_Area", "Albers_Equal_Area", "Albers", "aea"];
        var aea = {
          init: init$j,
          forward: forward$i,
          inverse: inverse$i,
          names: names$j,
          phi1z
        };
        function init$i() {
          this.sin_p14 = Math.sin(this.lat0);
          this.cos_p14 = Math.cos(this.lat0);
          this.infinity_dist = 1e3 * this.a;
          this.rc = 1;
        }
        function forward$h(p) {
          var sinphi, cosphi;
          var dlon;
          var coslon;
          var ksp;
          var g;
          var x, y;
          var lon = p.x;
          var lat = p.y;
          dlon = adjust_lon(lon - this.long0);
          sinphi = Math.sin(lat);
          cosphi = Math.cos(lat);
          coslon = Math.cos(dlon);
          g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
          ksp = 1;
          if (g > 0 || Math.abs(g) <= EPSLN) {
            x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
            y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
          } else {
            x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
            y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
          }
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$h(p) {
          var rh;
          var sinc, cosc;
          var c;
          var lon, lat;
          p.x = (p.x - this.x0) / this.a;
          p.y = (p.y - this.y0) / this.a;
          p.x /= this.k0;
          p.y /= this.k0;
          if (rh = Math.sqrt(p.x * p.x + p.y * p.y)) {
            c = Math.atan2(rh, this.rc);
            sinc = Math.sin(c);
            cosc = Math.cos(c);
            lat = asinz(cosc * this.sin_p14 + p.y * sinc * this.cos_p14 / rh);
            lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
            lon = adjust_lon(this.long0 + lon);
          } else {
            lat = this.phic0;
            lon = 0;
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$i = ["gnom"];
        var gnom = {
          init: init$i,
          forward: forward$h,
          inverse: inverse$h,
          names: names$i
        };
        function iqsfnz(eccent, q) {
          var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
          if (Math.abs(Math.abs(q) - temp) < 1e-6) {
            if (q < 0) {
              return -1 * HALF_PI;
            } else {
              return HALF_PI;
            }
          }
          var phi = Math.asin(0.5 * q);
          var dphi;
          var sin_phi;
          var cos_phi;
          var con;
          for (var i = 0; i < 30; i++) {
            sin_phi = Math.sin(phi);
            cos_phi = Math.cos(phi);
            con = eccent * sin_phi;
            dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
            phi += dphi;
            if (Math.abs(dphi) <= 1e-10) {
              return phi;
            }
          }
          return NaN;
        }
        function init$h() {
          if (!this.sphere) {
            this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
          }
        }
        function forward$g(p) {
          var lon = p.x;
          var lat = p.y;
          var x, y;
          var dlon = adjust_lon(lon - this.long0);
          if (this.sphere) {
            x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
            y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
          } else {
            var qs = qsfnz(this.e, Math.sin(lat));
            x = this.x0 + this.a * this.k0 * dlon;
            y = this.y0 + this.a * qs * 0.5 / this.k0;
          }
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$g(p) {
          p.x -= this.x0;
          p.y -= this.y0;
          var lon, lat;
          if (this.sphere) {
            lon = adjust_lon(this.long0 + p.x / this.a / Math.cos(this.lat_ts));
            lat = Math.asin(p.y / this.a * Math.cos(this.lat_ts));
          } else {
            lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
            lon = adjust_lon(this.long0 + p.x / (this.a * this.k0));
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$h = ["cea"];
        var cea = {
          init: init$h,
          forward: forward$g,
          inverse: inverse$g,
          names: names$h
        };
        function init$g() {
          this.x0 = this.x0 || 0;
          this.y0 = this.y0 || 0;
          this.lat0 = this.lat0 || 0;
          this.long0 = this.long0 || 0;
          this.lat_ts = this.lat_ts || 0;
          this.title = this.title || "Equidistant Cylindrical (Plate Carre)";
          this.rc = Math.cos(this.lat_ts);
        }
        function forward$f(p) {
          var lon = p.x;
          var lat = p.y;
          var dlon = adjust_lon(lon - this.long0);
          var dlat = adjust_lat(lat - this.lat0);
          p.x = this.x0 + this.a * dlon * this.rc;
          p.y = this.y0 + this.a * dlat;
          return p;
        }
        function inverse$f(p) {
          var x = p.x;
          var y = p.y;
          p.x = adjust_lon(this.long0 + (x - this.x0) / (this.a * this.rc));
          p.y = adjust_lat(this.lat0 + (y - this.y0) / this.a);
          return p;
        }
        var names$g = ["Equirectangular", "Equidistant_Cylindrical", "Equidistant_Cylindrical_Spherical", "eqc"];
        var eqc = {
          init: init$g,
          forward: forward$f,
          inverse: inverse$f,
          names: names$g
        };
        var MAX_ITER$1 = 20;
        function init$f() {
          this.temp = this.b / this.a;
          this.es = 1 - Math.pow(this.temp, 2);
          this.e = Math.sqrt(this.es);
          this.e0 = e0fn(this.es);
          this.e1 = e1fn(this.es);
          this.e2 = e2fn(this.es);
          this.e3 = e3fn(this.es);
          this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
        }
        function forward$e(p) {
          var lon = p.x;
          var lat = p.y;
          var x, y, el;
          var dlon = adjust_lon(lon - this.long0);
          el = dlon * Math.sin(lat);
          if (this.sphere) {
            if (Math.abs(lat) <= EPSLN) {
              x = this.a * dlon;
              y = -1 * this.a * this.lat0;
            } else {
              x = this.a * Math.sin(el) / Math.tan(lat);
              y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
            }
          } else {
            if (Math.abs(lat) <= EPSLN) {
              x = this.a * dlon;
              y = -1 * this.ml0;
            } else {
              var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
              x = nl * Math.sin(el);
              y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
            }
          }
          p.x = x + this.x0;
          p.y = y + this.y0;
          return p;
        }
        function inverse$e(p) {
          var lon, lat, x, y, i;
          var al, bl;
          var phi, dphi;
          x = p.x - this.x0;
          y = p.y - this.y0;
          if (this.sphere) {
            if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
              lon = adjust_lon(x / this.a + this.long0);
              lat = 0;
            } else {
              al = this.lat0 + y / this.a;
              bl = x * x / this.a / this.a + al * al;
              phi = al;
              var tanphi;
              for (i = MAX_ITER$1; i; --i) {
                tanphi = Math.tan(phi);
                dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
                phi += dphi;
                if (Math.abs(dphi) <= EPSLN) {
                  lat = phi;
                  break;
                }
              }
              lon = adjust_lon(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat));
            }
          } else {
            if (Math.abs(y + this.ml0) <= EPSLN) {
              lat = 0;
              lon = adjust_lon(this.long0 + x / this.a);
            } else {
              al = (this.ml0 + y) / this.a;
              bl = x * x / this.a / this.a + al * al;
              phi = al;
              var cl, mln, mlnp, ma;
              var con;
              for (i = MAX_ITER$1; i; --i) {
                con = this.e * Math.sin(phi);
                cl = Math.sqrt(1 - con * con) * Math.tan(phi);
                mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
                mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
                ma = mln / this.a;
                dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
                phi -= dphi;
                if (Math.abs(dphi) <= EPSLN) {
                  lat = phi;
                  break;
                }
              }
              cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
              lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
            }
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$f = ["Polyconic", "American_Polyconic", "poly"];
        var poly = {
          init: init$f,
          forward: forward$e,
          inverse: inverse$e,
          names: names$f
        };
        function init$e() {
          this.A = [];
          this.A[1] = 0.6399175073;
          this.A[2] = -0.1358797613;
          this.A[3] = 0.063294409;
          this.A[4] = -0.02526853;
          this.A[5] = 0.0117879;
          this.A[6] = -55161e-7;
          this.A[7] = 26906e-7;
          this.A[8] = -1333e-6;
          this.A[9] = 67e-5;
          this.A[10] = -34e-5;
          this.B_re = [];
          this.B_im = [];
          this.B_re[1] = 0.7557853228;
          this.B_im[1] = 0;
          this.B_re[2] = 0.249204646;
          this.B_im[2] = 3371507e-9;
          this.B_re[3] = -1541739e-9;
          this.B_im[3] = 0.04105856;
          this.B_re[4] = -0.10162907;
          this.B_im[4] = 0.01727609;
          this.B_re[5] = -0.26623489;
          this.B_im[5] = -0.36249218;
          this.B_re[6] = -0.6870983;
          this.B_im[6] = -1.1651967;
          this.C_re = [];
          this.C_im = [];
          this.C_re[1] = 1.3231270439;
          this.C_im[1] = 0;
          this.C_re[2] = -0.577245789;
          this.C_im[2] = -7809598e-9;
          this.C_re[3] = 0.508307513;
          this.C_im[3] = -0.112208952;
          this.C_re[4] = -0.15094762;
          this.C_im[4] = 0.18200602;
          this.C_re[5] = 1.01418179;
          this.C_im[5] = 1.64497696;
          this.C_re[6] = 1.9660549;
          this.C_im[6] = 2.5127645;
          this.D = [];
          this.D[1] = 1.5627014243;
          this.D[2] = 0.5185406398;
          this.D[3] = -0.03333098;
          this.D[4] = -0.1052906;
          this.D[5] = -0.0368594;
          this.D[6] = 7317e-6;
          this.D[7] = 0.0122;
          this.D[8] = 394e-5;
          this.D[9] = -13e-4;
        }
        function forward$d(p) {
          var n;
          var lon = p.x;
          var lat = p.y;
          var delta_lat = lat - this.lat0;
          var delta_lon = lon - this.long0;
          var d_phi = delta_lat / SEC_TO_RAD * 1e-5;
          var d_lambda = delta_lon;
          var d_phi_n = 1;
          var d_psi = 0;
          for (n = 1; n <= 10; n++) {
            d_phi_n = d_phi_n * d_phi;
            d_psi = d_psi + this.A[n] * d_phi_n;
          }
          var th_re = d_psi;
          var th_im = d_lambda;
          var th_n_re = 1;
          var th_n_im = 0;
          var th_n_re1;
          var th_n_im1;
          var z_re = 0;
          var z_im = 0;
          for (n = 1; n <= 6; n++) {
            th_n_re1 = th_n_re * th_re - th_n_im * th_im;
            th_n_im1 = th_n_im * th_re + th_n_re * th_im;
            th_n_re = th_n_re1;
            th_n_im = th_n_im1;
            z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
            z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
          }
          p.x = z_im * this.a + this.x0;
          p.y = z_re * this.a + this.y0;
          return p;
        }
        function inverse$d(p) {
          var n;
          var x = p.x;
          var y = p.y;
          var delta_x = x - this.x0;
          var delta_y = y - this.y0;
          var z_re = delta_y / this.a;
          var z_im = delta_x / this.a;
          var z_n_re = 1;
          var z_n_im = 0;
          var z_n_re1;
          var z_n_im1;
          var th_re = 0;
          var th_im = 0;
          for (n = 1; n <= 6; n++) {
            z_n_re1 = z_n_re * z_re - z_n_im * z_im;
            z_n_im1 = z_n_im * z_re + z_n_re * z_im;
            z_n_re = z_n_re1;
            z_n_im = z_n_im1;
            th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
            th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
          }
          for (var i = 0; i < this.iterations; i++) {
            var th_n_re = th_re;
            var th_n_im = th_im;
            var th_n_re1;
            var th_n_im1;
            var num_re = z_re;
            var num_im = z_im;
            for (n = 2; n <= 6; n++) {
              th_n_re1 = th_n_re * th_re - th_n_im * th_im;
              th_n_im1 = th_n_im * th_re + th_n_re * th_im;
              th_n_re = th_n_re1;
              th_n_im = th_n_im1;
              num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
              num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
            }
            th_n_re = 1;
            th_n_im = 0;
            var den_re = this.B_re[1];
            var den_im = this.B_im[1];
            for (n = 2; n <= 6; n++) {
              th_n_re1 = th_n_re * th_re - th_n_im * th_im;
              th_n_im1 = th_n_im * th_re + th_n_re * th_im;
              th_n_re = th_n_re1;
              th_n_im = th_n_im1;
              den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
              den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
            }
            var den2 = den_re * den_re + den_im * den_im;
            th_re = (num_re * den_re + num_im * den_im) / den2;
            th_im = (num_im * den_re - num_re * den_im) / den2;
          }
          var d_psi = th_re;
          var d_lambda = th_im;
          var d_psi_n = 1;
          var d_phi = 0;
          for (n = 1; n <= 9; n++) {
            d_psi_n = d_psi_n * d_psi;
            d_phi = d_phi + this.D[n] * d_psi_n;
          }
          var lat = this.lat0 + d_phi * SEC_TO_RAD * 1e5;
          var lon = this.long0 + d_lambda;
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$e = ["New_Zealand_Map_Grid", "nzmg"];
        var nzmg = {
          init: init$e,
          forward: forward$d,
          inverse: inverse$d,
          names: names$e
        };
        function init$d() {
        }
        function forward$c(p) {
          var lon = p.x;
          var lat = p.y;
          var dlon = adjust_lon(lon - this.long0);
          var x = this.x0 + this.a * dlon;
          var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$c(p) {
          p.x -= this.x0;
          p.y -= this.y0;
          var lon = adjust_lon(this.long0 + p.x / this.a);
          var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$d = ["Miller_Cylindrical", "mill"];
        var mill = {
          init: init$d,
          forward: forward$c,
          inverse: inverse$c,
          names: names$d
        };
        var MAX_ITER = 20;
        function init$c() {
          if (!this.sphere) {
            this.en = pj_enfn(this.es);
          } else {
            this.n = 1;
            this.m = 0;
            this.es = 0;
            this.C_y = Math.sqrt((this.m + 1) / this.n);
            this.C_x = this.C_y / (this.m + 1);
          }
        }
        function forward$b(p) {
          var x, y;
          var lon = p.x;
          var lat = p.y;
          lon = adjust_lon(lon - this.long0);
          if (this.sphere) {
            if (!this.m) {
              lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
            } else {
              var k = this.n * Math.sin(lat);
              for (var i = MAX_ITER; i; --i) {
                var V2 = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
                lat -= V2;
                if (Math.abs(V2) < EPSLN) {
                  break;
                }
              }
            }
            x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
            y = this.a * this.C_y * lat;
          } else {
            var s = Math.sin(lat);
            var c = Math.cos(lat);
            y = this.a * pj_mlfn(lat, s, c, this.en);
            x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
          }
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$b(p) {
          var lat, temp, lon, s;
          p.x -= this.x0;
          lon = p.x / this.a;
          p.y -= this.y0;
          lat = p.y / this.a;
          if (this.sphere) {
            lat /= this.C_y;
            lon = lon / (this.C_x * (this.m + Math.cos(lat)));
            if (this.m) {
              lat = asinz((this.m * lat + Math.sin(lat)) / this.n);
            } else if (this.n !== 1) {
              lat = asinz(Math.sin(lat) / this.n);
            }
            lon = adjust_lon(lon + this.long0);
            lat = adjust_lat(lat);
          } else {
            lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
            s = Math.abs(lat);
            if (s < HALF_PI) {
              s = Math.sin(lat);
              temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
              lon = adjust_lon(temp);
            } else if (s - EPSLN < HALF_PI) {
              lon = this.long0;
            }
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$c = ["Sinusoidal", "sinu"];
        var sinu = {
          init: init$c,
          forward: forward$b,
          inverse: inverse$b,
          names: names$c
        };
        function init$b() {
        }
        function forward$a(p) {
          var lon = p.x;
          var lat = p.y;
          var delta_lon = adjust_lon(lon - this.long0);
          var theta = lat;
          var con = Math.PI * Math.sin(lat);
          while (true) {
            var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
            theta += delta_theta;
            if (Math.abs(delta_theta) < EPSLN) {
              break;
            }
          }
          theta /= 2;
          if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
            delta_lon = 0;
          }
          var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
          var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$a(p) {
          var theta;
          var arg;
          p.x -= this.x0;
          p.y -= this.y0;
          arg = p.y / (1.4142135623731 * this.a);
          if (Math.abs(arg) > 0.999999999999) {
            arg = 0.999999999999;
          }
          theta = Math.asin(arg);
          var lon = adjust_lon(this.long0 + p.x / (0.900316316158 * this.a * Math.cos(theta)));
          if (lon < -Math.PI) {
            lon = -Math.PI;
          }
          if (lon > Math.PI) {
            lon = Math.PI;
          }
          arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
          if (Math.abs(arg) > 1) {
            arg = 1;
          }
          var lat = Math.asin(arg);
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$b = ["Mollweide", "moll"];
        var moll = {
          init: init$b,
          forward: forward$a,
          inverse: inverse$a,
          names: names$b
        };
        function init$a() {
          if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
            return;
          }
          this.lat2 = this.lat2 || this.lat1;
          this.temp = this.b / this.a;
          this.es = 1 - Math.pow(this.temp, 2);
          this.e = Math.sqrt(this.es);
          this.e0 = e0fn(this.es);
          this.e1 = e1fn(this.es);
          this.e2 = e2fn(this.es);
          this.e3 = e3fn(this.es);
          this.sinphi = Math.sin(this.lat1);
          this.cosphi = Math.cos(this.lat1);
          this.ms1 = msfnz(this.e, this.sinphi, this.cosphi);
          this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);
          if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
            this.ns = this.sinphi;
          } else {
            this.sinphi = Math.sin(this.lat2);
            this.cosphi = Math.cos(this.lat2);
            this.ms2 = msfnz(this.e, this.sinphi, this.cosphi);
            this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
            this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
          }
          this.g = this.ml1 + this.ms1 / this.ns;
          this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
          this.rh = this.a * (this.g - this.ml0);
        }
        function forward$9(p) {
          var lon = p.x;
          var lat = p.y;
          var rh1;
          if (this.sphere) {
            rh1 = this.a * (this.g - lat);
          } else {
            var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
            rh1 = this.a * (this.g - ml);
          }
          var theta = this.ns * adjust_lon(lon - this.long0);
          var x = this.x0 + rh1 * Math.sin(theta);
          var y = this.y0 + this.rh - rh1 * Math.cos(theta);
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$9(p) {
          p.x -= this.x0;
          p.y = this.rh - p.y + this.y0;
          var con, rh1, lat, lon;
          if (this.ns >= 0) {
            rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
            con = 1;
          } else {
            rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
            con = -1;
          }
          var theta = 0;
          if (rh1 !== 0) {
            theta = Math.atan2(con * p.x, con * p.y);
          }
          if (this.sphere) {
            lon = adjust_lon(this.long0 + theta / this.ns);
            lat = adjust_lat(this.g - rh1 / this.a);
            p.x = lon;
            p.y = lat;
            return p;
          } else {
            var ml = this.g - rh1 / this.a;
            lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
            lon = adjust_lon(this.long0 + theta / this.ns);
            p.x = lon;
            p.y = lat;
            return p;
          }
        }
        var names$a = ["Equidistant_Conic", "eqdc"];
        var eqdc = {
          init: init$a,
          forward: forward$9,
          inverse: inverse$9,
          names: names$a
        };
        function init$9() {
          this.R = this.a;
        }
        function forward$8(p) {
          var lon = p.x;
          var lat = p.y;
          var dlon = adjust_lon(lon - this.long0);
          var x, y;
          if (Math.abs(lat) <= EPSLN) {
            x = this.x0 + this.R * dlon;
            y = this.y0;
          }
          var theta = asinz(2 * Math.abs(lat / Math.PI));
          if (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
            x = this.x0;
            if (lat >= 0) {
              y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
            } else {
              y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
            }
          }
          var al = 0.5 * Math.abs(Math.PI / dlon - dlon / Math.PI);
          var asq = al * al;
          var sinth = Math.sin(theta);
          var costh = Math.cos(theta);
          var g = costh / (sinth + costh - 1);
          var gsq = g * g;
          var m = g * (2 / sinth - 1);
          var msq = m * m;
          var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
          if (dlon < 0) {
            con = -con;
          }
          x = this.x0 + con;
          var q = asq + g;
          con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
          if (lat >= 0) {
            y = this.y0 + con;
          } else {
            y = this.y0 - con;
          }
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$8(p) {
          var lon, lat;
          var xx, yy, xys, c1, c2, c3;
          var a1;
          var m1;
          var con;
          var th1;
          var d;
          p.x -= this.x0;
          p.y -= this.y0;
          con = Math.PI * this.R;
          xx = p.x / con;
          yy = p.y / con;
          xys = xx * xx + yy * yy;
          c1 = -Math.abs(yy) * (1 + xys);
          c2 = c1 - 2 * yy * yy + xx * xx;
          c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
          d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
          a1 = (c1 - c2 * c2 / 3 / c3) / c3;
          m1 = 2 * Math.sqrt(-a1 / 3);
          con = 3 * d / a1 / m1;
          if (Math.abs(con) > 1) {
            if (con >= 0) {
              con = 1;
            } else {
              con = -1;
            }
          }
          th1 = Math.acos(con) / 3;
          if (p.y >= 0) {
            lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
          } else {
            lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
          }
          if (Math.abs(xx) < EPSLN) {
            lon = this.long0;
          } else {
            lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$9 = ["Van_der_Grinten_I", "VanDerGrinten", "Van_der_Grinten", "vandg"];
        var vandg = {
          init: init$9,
          forward: forward$8,
          inverse: inverse$8,
          names: names$9
        };
        var geographiclibGeodesic_min = { exports: {} };
        var hasRequiredGeographiclibGeodesic_min;
        function requireGeographiclibGeodesic_min() {
          if (hasRequiredGeographiclibGeodesic_min) return geographiclibGeodesic_min.exports;
          hasRequiredGeographiclibGeodesic_min = 1;
          (function(module2) {
            (function(cb) {
              var geodesic = {};
              geodesic.Constants = {};
              geodesic.Math = {};
              geodesic.Accumulator = {};
              (function(c) {
                c.WGS84 = { a: 6378137, f: 1 / 298.257223563 };
                c.version = { major: 2, minor: 1, patch: 1 };
                c.version_string = "2.1.1";
              })(geodesic.Constants);
              (function(m) {
                m.digits = 53;
                m.epsilon = Math.pow(0.5, m.digits - 1);
                m.degree = Math.PI / 180;
                m.sq = function(x) {
                  return x * x;
                };
                m.hypot = function(x, y) {
                  return Math.sqrt(x * x + y * y);
                };
                m.cbrt = Math.cbrt || function(x) {
                  var y = Math.pow(Math.abs(x), 1 / 3);
                  return x > 0 ? y : x < 0 ? -y : x;
                };
                m.log1p = Math.log1p || function(x) {
                  var y = 1 + x, z = y - 1;
                  return z === 0 ? x : x * Math.log(y) / z;
                };
                m.atanh = Math.atanh || function(x) {
                  var y = Math.abs(x);
                  y = m.log1p(2 * y / (1 - y)) / 2;
                  return x > 0 ? y : x < 0 ? -y : x;
                };
                m.copysign = function(x, y) {
                  return Math.abs(x) * (y < 0 || y === 0 && 1 / y < 0 ? -1 : 1);
                };
                m.sum = function(u, v) {
                  var s = u + v, up = s - v, vpp = s - up, t;
                  up -= u;
                  vpp -= v;
                  t = s ? 0 - (up + vpp) : s;
                  return { s, t };
                };
                m.polyval = function(N, p, s, x) {
                  var y = N < 0 ? 0 : p[s++];
                  while (--N >= 0) y = y * x + p[s++];
                  return y;
                };
                m.AngRound = function(x) {
                  var z = 1 / 16, y = Math.abs(x);
                  y = y < z ? z - (z - y) : y;
                  return m.copysign(y, x);
                };
                m.remainder = function(x, y) {
                  x %= y;
                  return x < -y / 2 ? x + y : x < y / 2 ? x : x - y;
                };
                m.AngNormalize = function(x) {
                  var y = m.remainder(x, 360);
                  return Math.abs(y) === 180 ? m.copysign(180, x) : y;
                };
                m.LatFix = function(x) {
                  return Math.abs(x) > 90 ? NaN : x;
                };
                m.AngDiff = function(x, y) {
                  var r = m.sum(m.remainder(-x, 360), m.remainder(y, 360)), d, e;
                  r = m.sum(m.remainder(r.s, 360), r.t);
                  d = r.s;
                  e = r.t;
                  if (d === 0 || Math.abs(d) === 180)
                    d = m.copysign(d, e === 0 ? y - x : -e);
                  return { d, e };
                };
                m.sincosd = function(x) {
                  var d, r, q, s, c, sinx, cosx;
                  d = x % 360;
                  q = Math.round(d / 90);
                  d -= 90 * q;
                  r = d * this.degree;
                  s = Math.sin(r);
                  c = Math.cos(r);
                  if (Math.abs(d) === 45) {
                    c = Math.sqrt(0.5);
                    s = m.copysign(c, r);
                  } else if (Math.abs(d) === 30) {
                    c = Math.sqrt(0.75);
                    s = m.copysign(0.5, r);
                  }
                  switch (q & 3) {
                    case 0:
                      sinx = s;
                      cosx = c;
                      break;
                    case 1:
                      sinx = c;
                      cosx = -s;
                      break;
                    case 2:
                      sinx = -s;
                      cosx = -c;
                      break;
                    default:
                      sinx = -c;
                      cosx = s;
                      break;
                  }
                  cosx += 0;
                  if (sinx === 0) sinx = m.copysign(sinx, x);
                  return { s: sinx, c: cosx };
                };
                m.sincosde = function(x, t) {
                  var d, r, q, s, c, sinx, cosx;
                  d = x % 360;
                  q = Math.round(d / 90);
                  d = m.AngRound(d - 90 * q + t);
                  r = d * this.degree;
                  s = Math.sin(r);
                  c = Math.cos(r);
                  if (Math.abs(d) === 45) {
                    c = Math.sqrt(0.5);
                    s = m.copysign(c, r);
                  } else if (Math.abs(d) === 30) {
                    c = Math.sqrt(0.75);
                    s = m.copysign(0.5, r);
                  }
                  switch (q & 3) {
                    case 0:
                      sinx = s;
                      cosx = c;
                      break;
                    case 1:
                      sinx = c;
                      cosx = -s;
                      break;
                    case 2:
                      sinx = -s;
                      cosx = -c;
                      break;
                    default:
                      sinx = -c;
                      cosx = s;
                      break;
                  }
                  cosx += 0;
                  if (sinx === 0) sinx = m.copysign(sinx, x + t);
                  return { s: sinx, c: cosx };
                };
                m.atan2d = function(y, x) {
                  var q = 0, ang;
                  if (Math.abs(y) > Math.abs(x)) {
                    [y, x] = [x, y];
                    q = 2;
                  }
                  if (m.copysign(1, x) < 0) {
                    x = -x;
                    ++q;
                  }
                  ang = Math.atan2(y, x) / this.degree;
                  switch (q) {
                    case 1:
                      ang = m.copysign(180, y) - ang;
                      break;
                    case 2:
                      ang = 90 - ang;
                      break;
                    case 3:
                      ang = -90 + ang;
                      break;
                  }
                  return ang;
                };
              })(geodesic.Math);
              (function(a, m) {
                a.Accumulator = function(y) {
                  this.Set(y);
                };
                a.Accumulator.prototype.Set = function(y) {
                  if (!y) y = 0;
                  if (y.constructor === a.Accumulator) {
                    this._s = y._s;
                    this._t = y._t;
                  } else {
                    this._s = y;
                    this._t = 0;
                  }
                };
                a.Accumulator.prototype.Add = function(y) {
                  var u = m.sum(y, this._t), v = m.sum(u.s, this._s);
                  u = u.t;
                  this._s = v.s;
                  this._t = v.t;
                  if (this._s === 0)
                    this._s = u;
                  else
                    this._t += u;
                };
                a.Accumulator.prototype.Sum = function(y) {
                  var b;
                  if (!y)
                    return this._s;
                  else {
                    b = new a.Accumulator(this);
                    b.Add(y);
                    return b._s;
                  }
                };
                a.Accumulator.prototype.Negate = function() {
                  this._s *= -1;
                  this._t *= -1;
                };
                a.Accumulator.prototype.Remainder = function(y) {
                  this._s = m.remainder(this._s, y);
                  this.Add(0);
                };
              })(geodesic.Accumulator, geodesic.Math);
              geodesic.Geodesic = {};
              geodesic.GeodesicLine = {};
              geodesic.PolygonArea = {};
              (function(g, l, p, m, c) {
                var GEOGRAPHICLIB_GEODESIC_ORDER = 6, nA1_ = GEOGRAPHICLIB_GEODESIC_ORDER, nA2_ = GEOGRAPHICLIB_GEODESIC_ORDER, nA3_ = GEOGRAPHICLIB_GEODESIC_ORDER, nA3x_ = nA3_, nC3x_, nC4x_, maxit1_ = 20, maxit2_ = maxit1_ + m.digits + 10, tol0_ = m.epsilon, tol1_ = 200 * tol0_, tol2_ = Math.sqrt(tol0_), tolb_ = tol0_, xthresh_ = 1e3 * tol2_, CAP_NONE = 0, CAP_ALL = 31, OUT_ALL = 32640, astroid, A1m1f_coeff, C1f_coeff, C1pf_coeff, A2m1f_coeff, C2f_coeff, A3_coeff, C3_coeff, C4_coeff;
                g.tiny_ = Math.sqrt(Number.MIN_VALUE / Number.EPSILON);
                g.nC1_ = GEOGRAPHICLIB_GEODESIC_ORDER;
                g.nC1p_ = GEOGRAPHICLIB_GEODESIC_ORDER;
                g.nC2_ = GEOGRAPHICLIB_GEODESIC_ORDER;
                g.nC3_ = GEOGRAPHICLIB_GEODESIC_ORDER;
                g.nC4_ = GEOGRAPHICLIB_GEODESIC_ORDER;
                nC3x_ = g.nC3_ * (g.nC3_ - 1) / 2;
                nC4x_ = g.nC4_ * (g.nC4_ + 1) / 2;
                g.CAP_C1 = 1 << 0;
                g.CAP_C1p = 1 << 1;
                g.CAP_C2 = 1 << 2;
                g.CAP_C3 = 1 << 3;
                g.CAP_C4 = 1 << 4;
                g.NONE = 0;
                g.ARC = 1 << 6;
                g.LATITUDE = 1 << 7 | CAP_NONE;
                g.LONGITUDE = 1 << 8 | g.CAP_C3;
                g.AZIMUTH = 1 << 9 | CAP_NONE;
                g.DISTANCE = 1 << 10 | g.CAP_C1;
                g.STANDARD = g.LATITUDE | g.LONGITUDE | g.AZIMUTH | g.DISTANCE;
                g.DISTANCE_IN = 1 << 11 | g.CAP_C1 | g.CAP_C1p;
                g.REDUCEDLENGTH = 1 << 12 | g.CAP_C1 | g.CAP_C2;
                g.GEODESICSCALE = 1 << 13 | g.CAP_C1 | g.CAP_C2;
                g.AREA = 1 << 14 | g.CAP_C4;
                g.ALL = OUT_ALL | CAP_ALL;
                g.LONG_UNROLL = 1 << 15;
                g.OUT_MASK = OUT_ALL | g.LONG_UNROLL;
                g.SinCosSeries = function(sinp, sinx, cosx, c2) {
                  var k = c2.length, n = k - (sinp ? 1 : 0), ar = 2 * (cosx - sinx) * (cosx + sinx), y0 = n & 1 ? c2[--k] : 0, y1 = 0;
                  n = Math.floor(n / 2);
                  while (n--) {
                    y1 = ar * y0 - y1 + c2[--k];
                    y0 = ar * y1 - y0 + c2[--k];
                  }
                  return sinp ? 2 * sinx * cosx * y0 : cosx * (y0 - y1);
                };
                astroid = function(x, y) {
                  var k, p2 = m.sq(x), q = m.sq(y), r = (p2 + q - 1) / 6, S, r2, r3, disc, u, T3, T, ang, v, uv, w;
                  if (!(q === 0 && r <= 0)) {
                    S = p2 * q / 4;
                    r2 = m.sq(r);
                    r3 = r * r2;
                    disc = S * (S + 2 * r3);
                    u = r;
                    if (disc >= 0) {
                      T3 = S + r3;
                      T3 += T3 < 0 ? -Math.sqrt(disc) : Math.sqrt(disc);
                      T = m.cbrt(T3);
                      u += T + (T !== 0 ? r2 / T : 0);
                    } else {
                      ang = Math.atan2(Math.sqrt(-disc), -(S + r3));
                      u += 2 * r * Math.cos(ang / 3);
                    }
                    v = Math.sqrt(m.sq(u) + q);
                    uv = u < 0 ? q / (v - u) : u + v;
                    w = (uv - q) / (2 * v);
                    k = uv / (Math.sqrt(uv + m.sq(w)) + w);
                  } else {
                    k = 0;
                  }
                  return k;
                };
                A1m1f_coeff = [1, 4, 64, 0, 256];
                g.A1m1f = function(eps) {
                  var p2 = Math.floor(nA1_ / 2), t = m.polyval(p2, A1m1f_coeff, 0, m.sq(eps)) / A1m1f_coeff[p2 + 1];
                  return (t + eps) / (1 - eps);
                };
                C1f_coeff = [-1, 6, -16, 32, -9, 64, -128, 2048, 9, -16, 768, 3, -5, 512, -7, 1280, -7, 2048];
                g.C1f = function(eps, c2) {
                  var eps2 = m.sq(eps), d = eps, o = 0, l2, p2;
                  for (l2 = 1; l2 <= g.nC1_; ++l2) {
                    p2 = Math.floor((g.nC1_ - l2) / 2);
                    c2[l2] = d * m.polyval(p2, C1f_coeff, o, eps2) / C1f_coeff[o + p2 + 1];
                    o += p2 + 2;
                    d *= eps;
                  }
                };
                C1pf_coeff = [205, -432, 768, 1536, 4005, -4736, 3840, 12288, -225, 116, 384, -7173, 2695, 7680, 3467, 7680, 38081, 61440];
                g.C1pf = function(eps, c2) {
                  var eps2 = m.sq(eps), d = eps, o = 0, l2, p2;
                  for (l2 = 1; l2 <= g.nC1p_; ++l2) {
                    p2 = Math.floor((g.nC1p_ - l2) / 2);
                    c2[l2] = d * m.polyval(p2, C1pf_coeff, o, eps2) / C1pf_coeff[o + p2 + 1];
                    o += p2 + 2;
                    d *= eps;
                  }
                };
                A2m1f_coeff = [-11, -28, -192, 0, 256];
                g.A2m1f = function(eps) {
                  var p2 = Math.floor(nA2_ / 2), t = m.polyval(p2, A2m1f_coeff, 0, m.sq(eps)) / A2m1f_coeff[p2 + 1];
                  return (t - eps) / (1 + eps);
                };
                C2f_coeff = [1, 2, 16, 32, 35, 64, 384, 2048, 15, 80, 768, 7, 35, 512, 63, 1280, 77, 2048];
                g.C2f = function(eps, c2) {
                  var eps2 = m.sq(eps), d = eps, o = 0, l2, p2;
                  for (l2 = 1; l2 <= g.nC2_; ++l2) {
                    p2 = Math.floor((g.nC2_ - l2) / 2);
                    c2[l2] = d * m.polyval(p2, C2f_coeff, o, eps2) / C2f_coeff[o + p2 + 1];
                    o += p2 + 2;
                    d *= eps;
                  }
                };
                g.Geodesic = function(a, f) {
                  this.a = a;
                  this.f = f;
                  this._f1 = 1 - this.f;
                  this._e2 = this.f * (2 - this.f);
                  this._ep2 = this._e2 / m.sq(this._f1);
                  this._n = this.f / (2 - this.f);
                  this._b = this.a * this._f1;
                  this._c2 = (m.sq(this.a) + m.sq(this._b) * (this._e2 === 0 ? 1 : (this._e2 > 0 ? m.atanh(Math.sqrt(this._e2)) : Math.atan(Math.sqrt(-this._e2))) / Math.sqrt(Math.abs(this._e2)))) / 2;
                  this._etol2 = 0.1 * tol2_ / Math.sqrt(Math.max(1e-3, Math.abs(this.f)) * Math.min(1, 1 - this.f / 2) / 2);
                  if (!(isFinite(this.a) && this.a > 0))
                    throw new Error("Equatorial radius is not positive");
                  if (!(isFinite(this._b) && this._b > 0))
                    throw new Error("Polar semi-axis is not positive");
                  this._A3x = new Array(nA3x_);
                  this._C3x = new Array(nC3x_);
                  this._C4x = new Array(nC4x_);
                  this.A3coeff();
                  this.C3coeff();
                  this.C4coeff();
                };
                A3_coeff = [-3, 128, -2, -3, 64, -1, -3, -1, 16, 3, -1, -2, 8, 1, -1, 2, 1, 1];
                g.Geodesic.prototype.A3coeff = function() {
                  var o = 0, k = 0, j, p2;
                  for (j = nA3_ - 1; j >= 0; --j) {
                    p2 = Math.min(nA3_ - j - 1, j);
                    this._A3x[k++] = m.polyval(p2, A3_coeff, o, this._n) / A3_coeff[o + p2 + 1];
                    o += p2 + 2;
                  }
                };
                C3_coeff = [3, 128, 2, 5, 128, -1, 3, 3, 64, -1, 0, 1, 8, -1, 1, 4, 5, 256, 1, 3, 128, -3, -2, 3, 64, 1, -3, 2, 32, 7, 512, -10, 9, 384, 5, -9, 5, 192, 7, 512, -14, 7, 512, 21, 2560];
                g.Geodesic.prototype.C3coeff = function() {
                  var o = 0, k = 0, l2, j, p2;
                  for (l2 = 1; l2 < g.nC3_; ++l2) {
                    for (j = g.nC3_ - 1; j >= l2; --j) {
                      p2 = Math.min(g.nC3_ - j - 1, j);
                      this._C3x[k++] = m.polyval(p2, C3_coeff, o, this._n) / C3_coeff[o + p2 + 1];
                      o += p2 + 2;
                    }
                  }
                };
                C4_coeff = [97, 15015, 1088, 156, 45045, -224, -4784, 1573, 45045, -10656, 14144, -4576, -858, 45045, 64, 624, -4576, 6864, -3003, 15015, 100, 208, 572, 3432, -12012, 30030, 45045, 1, 9009, -2944, 468, 135135, 5792, 1040, -1287, 135135, 5952, -11648, 9152, -2574, 135135, -64, -624, 4576, -6864, 3003, 135135, 8, 10725, 1856, -936, 225225, -8448, 4992, -1144, 225225, -1440, 4160, -4576, 1716, 225225, -136, 63063, 1024, -208, 105105, 3584, -3328, 1144, 315315, -128, 135135, -2560, 832, 405405, 128, 99099];
                g.Geodesic.prototype.C4coeff = function() {
                  var o = 0, k = 0, l2, j, p2;
                  for (l2 = 0; l2 < g.nC4_; ++l2) {
                    for (j = g.nC4_ - 1; j >= l2; --j) {
                      p2 = g.nC4_ - j - 1;
                      this._C4x[k++] = m.polyval(p2, C4_coeff, o, this._n) / C4_coeff[o + p2 + 1];
                      o += p2 + 2;
                    }
                  }
                };
                g.Geodesic.prototype.A3f = function(eps) {
                  return m.polyval(nA3x_ - 1, this._A3x, 0, eps);
                };
                g.Geodesic.prototype.C3f = function(eps, c2) {
                  var mult = 1, o = 0, l2, p2;
                  for (l2 = 1; l2 < g.nC3_; ++l2) {
                    p2 = g.nC3_ - l2 - 1;
                    mult *= eps;
                    c2[l2] = mult * m.polyval(p2, this._C3x, o, eps);
                    o += p2 + 1;
                  }
                };
                g.Geodesic.prototype.C4f = function(eps, c2) {
                  var mult = 1, o = 0, l2, p2;
                  for (l2 = 0; l2 < g.nC4_; ++l2) {
                    p2 = g.nC4_ - l2 - 1;
                    c2[l2] = mult * m.polyval(p2, this._C4x, o, eps);
                    o += p2 + 1;
                    mult *= eps;
                  }
                };
                g.Geodesic.prototype.Lengths = function(eps, sig12, ssig1, csig1, dn1, ssig2, csig2, dn2, cbet1, cbet2, outmask, C1a, C2a) {
                  outmask &= g.OUT_MASK;
                  var vals = {}, m0x = 0, J12 = 0, A12 = 0, A22 = 0, B1, B2, l2, csig12, t;
                  if (outmask & (g.DISTANCE | g.REDUCEDLENGTH | g.GEODESICSCALE)) {
                    A12 = g.A1m1f(eps);
                    g.C1f(eps, C1a);
                    if (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE)) {
                      A22 = g.A2m1f(eps);
                      g.C2f(eps, C2a);
                      m0x = A12 - A22;
                      A22 = 1 + A22;
                    }
                    A12 = 1 + A12;
                  }
                  if (outmask & g.DISTANCE) {
                    B1 = g.SinCosSeries(true, ssig2, csig2, C1a) - g.SinCosSeries(true, ssig1, csig1, C1a);
                    vals.s12b = A12 * (sig12 + B1);
                    if (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE)) {
                      B2 = g.SinCosSeries(true, ssig2, csig2, C2a) - g.SinCosSeries(true, ssig1, csig1, C2a);
                      J12 = m0x * sig12 + (A12 * B1 - A22 * B2);
                    }
                  } else if (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE)) {
                    for (l2 = 1; l2 <= g.nC2_; ++l2)
                      C2a[l2] = A12 * C1a[l2] - A22 * C2a[l2];
                    J12 = m0x * sig12 + (g.SinCosSeries(true, ssig2, csig2, C2a) - g.SinCosSeries(true, ssig1, csig1, C2a));
                  }
                  if (outmask & g.REDUCEDLENGTH) {
                    vals.m0 = m0x;
                    vals.m12b = dn2 * (csig1 * ssig2) - dn1 * (ssig1 * csig2) - csig1 * csig2 * J12;
                  }
                  if (outmask & g.GEODESICSCALE) {
                    csig12 = csig1 * csig2 + ssig1 * ssig2;
                    t = this._ep2 * (cbet1 - cbet2) * (cbet1 + cbet2) / (dn1 + dn2);
                    vals.M12 = csig12 + (t * ssig2 - csig2 * J12) * ssig1 / dn1;
                    vals.M21 = csig12 - (t * ssig1 - csig1 * J12) * ssig2 / dn2;
                  }
                  return vals;
                };
                g.Geodesic.prototype.InverseStart = function(sbet1, cbet1, dn1, sbet2, cbet2, dn2, lam12, slam12, clam12, C1a, C2a) {
                  var vals = {}, sbet12 = sbet2 * cbet1 - cbet2 * sbet1, cbet12 = cbet2 * cbet1 + sbet2 * sbet1, sbet12a, shortline, omg12, sbetm2, somg12, comg12, t, ssig12, csig12, x, y, lamscale, betscale, k2, eps, cbet12a, bet12a, m12b, m0, nvals, k, omg12a, lam12x;
                  vals.sig12 = -1;
                  sbet12a = sbet2 * cbet1;
                  sbet12a += cbet2 * sbet1;
                  shortline = cbet12 >= 0 && sbet12 < 0.5 && cbet2 * lam12 < 0.5;
                  if (shortline) {
                    sbetm2 = m.sq(sbet1 + sbet2);
                    sbetm2 /= sbetm2 + m.sq(cbet1 + cbet2);
                    vals.dnm = Math.sqrt(1 + this._ep2 * sbetm2);
                    omg12 = lam12 / (this._f1 * vals.dnm);
                    somg12 = Math.sin(omg12);
                    comg12 = Math.cos(omg12);
                  } else {
                    somg12 = slam12;
                    comg12 = clam12;
                  }
                  vals.salp1 = cbet2 * somg12;
                  vals.calp1 = comg12 >= 0 ? sbet12 + cbet2 * sbet1 * m.sq(somg12) / (1 + comg12) : sbet12a - cbet2 * sbet1 * m.sq(somg12) / (1 - comg12);
                  ssig12 = m.hypot(vals.salp1, vals.calp1);
                  csig12 = sbet1 * sbet2 + cbet1 * cbet2 * comg12;
                  if (shortline && ssig12 < this._etol2) {
                    vals.salp2 = cbet1 * somg12;
                    vals.calp2 = sbet12 - cbet1 * sbet2 * (comg12 >= 0 ? m.sq(somg12) / (1 + comg12) : 1 - comg12);
                    t = m.hypot(vals.salp2, vals.calp2);
                    vals.salp2 /= t;
                    vals.calp2 /= t;
                    vals.sig12 = Math.atan2(ssig12, csig12);
                  } else if (Math.abs(this._n) > 0.1 || csig12 >= 0 || ssig12 >= 6 * Math.abs(this._n) * Math.PI * m.sq(cbet1)) ;
                  else {
                    lam12x = Math.atan2(-slam12, -clam12);
                    if (this.f >= 0) {
                      k2 = m.sq(sbet1) * this._ep2;
                      eps = k2 / (2 * (1 + Math.sqrt(1 + k2)) + k2);
                      lamscale = this.f * cbet1 * this.A3f(eps) * Math.PI;
                      betscale = lamscale * cbet1;
                      x = lam12x / lamscale;
                      y = sbet12a / betscale;
                    } else {
                      cbet12a = cbet2 * cbet1 - sbet2 * sbet1;
                      bet12a = Math.atan2(sbet12a, cbet12a);
                      nvals = this.Lengths(this._n, Math.PI + bet12a, sbet1, -cbet1, dn1, sbet2, cbet2, dn2, cbet1, cbet2, g.REDUCEDLENGTH, C1a, C2a);
                      m12b = nvals.m12b;
                      m0 = nvals.m0;
                      x = -1 + m12b / (cbet1 * cbet2 * m0 * Math.PI);
                      betscale = x < -0.01 ? sbet12a / x : -this.f * m.sq(cbet1) * Math.PI;
                      lamscale = betscale / cbet1;
                      y = lam12 / lamscale;
                    }
                    if (y > -tol1_ && x > -1 - xthresh_) {
                      if (this.f >= 0) {
                        vals.salp1 = Math.min(1, -x);
                        vals.calp1 = -Math.sqrt(1 - m.sq(vals.salp1));
                      } else {
                        vals.calp1 = Math.max(x > -tol1_ ? 0 : -1, x);
                        vals.salp1 = Math.sqrt(1 - m.sq(vals.calp1));
                      }
                    } else {
                      k = astroid(x, y);
                      omg12a = lamscale * (this.f >= 0 ? -x * k / (1 + k) : -y * (1 + k) / k);
                      somg12 = Math.sin(omg12a);
                      comg12 = -Math.cos(omg12a);
                      vals.salp1 = cbet2 * somg12;
                      vals.calp1 = sbet12a - cbet2 * sbet1 * m.sq(somg12) / (1 - comg12);
                    }
                  }
                  if (!(vals.salp1 <= 0)) {
                    t = m.hypot(vals.salp1, vals.calp1);
                    vals.salp1 /= t;
                    vals.calp1 /= t;
                  } else {
                    vals.salp1 = 1;
                    vals.calp1 = 0;
                  }
                  return vals;
                };
                g.Geodesic.prototype.Lambda12 = function(sbet1, cbet1, dn1, sbet2, cbet2, dn2, salp1, calp1, slam120, clam120, diffp, C1a, C2a, C3a) {
                  var vals = {}, t, salp0, calp0, somg1, comg1, somg2, comg2, somg12, comg12, B312, eta, k2, nvals;
                  if (sbet1 === 0 && calp1 === 0)
                    calp1 = -g.tiny_;
                  salp0 = salp1 * cbet1;
                  calp0 = m.hypot(calp1, salp1 * sbet1);
                  vals.ssig1 = sbet1;
                  somg1 = salp0 * sbet1;
                  vals.csig1 = comg1 = calp1 * cbet1;
                  t = m.hypot(vals.ssig1, vals.csig1);
                  vals.ssig1 /= t;
                  vals.csig1 /= t;
                  vals.salp2 = cbet2 !== cbet1 ? salp0 / cbet2 : salp1;
                  vals.calp2 = cbet2 !== cbet1 || Math.abs(sbet2) !== -sbet1 ? Math.sqrt(m.sq(calp1 * cbet1) + (cbet1 < -sbet1 ? (cbet2 - cbet1) * (cbet1 + cbet2) : (sbet1 - sbet2) * (sbet1 + sbet2))) / cbet2 : Math.abs(calp1);
                  vals.ssig2 = sbet2;
                  somg2 = salp0 * sbet2;
                  vals.csig2 = comg2 = vals.calp2 * cbet2;
                  t = m.hypot(vals.ssig2, vals.csig2);
                  vals.ssig2 /= t;
                  vals.csig2 /= t;
                  vals.sig12 = Math.atan2(Math.max(0, vals.csig1 * vals.ssig2 - vals.ssig1 * vals.csig2), vals.csig1 * vals.csig2 + vals.ssig1 * vals.ssig2);
                  somg12 = Math.max(0, comg1 * somg2 - somg1 * comg2);
                  comg12 = comg1 * comg2 + somg1 * somg2;
                  eta = Math.atan2(somg12 * clam120 - comg12 * slam120, comg12 * clam120 + somg12 * slam120);
                  k2 = m.sq(calp0) * this._ep2;
                  vals.eps = k2 / (2 * (1 + Math.sqrt(1 + k2)) + k2);
                  this.C3f(vals.eps, C3a);
                  B312 = g.SinCosSeries(true, vals.ssig2, vals.csig2, C3a) - g.SinCosSeries(true, vals.ssig1, vals.csig1, C3a);
                  vals.domg12 = -this.f * this.A3f(vals.eps) * salp0 * (vals.sig12 + B312);
                  vals.lam12 = eta + vals.domg12;
                  if (diffp) {
                    if (vals.calp2 === 0)
                      vals.dlam12 = -2 * this._f1 * dn1 / sbet1;
                    else {
                      nvals = this.Lengths(vals.eps, vals.sig12, vals.ssig1, vals.csig1, dn1, vals.ssig2, vals.csig2, dn2, cbet1, cbet2, g.REDUCEDLENGTH, C1a, C2a);
                      vals.dlam12 = nvals.m12b;
                      vals.dlam12 *= this._f1 / (vals.calp2 * cbet2);
                    }
                  }
                  return vals;
                };
                g.Geodesic.prototype.Inverse = function(lat1, lon1, lat2, lon2, outmask) {
                  var r, vals;
                  if (!outmask) outmask = g.STANDARD;
                  if (outmask === g.LONG_UNROLL) outmask |= g.STANDARD;
                  outmask &= g.OUT_MASK;
                  r = this.InverseInt(lat1, lon1, lat2, lon2, outmask);
                  vals = r.vals;
                  if (outmask & g.AZIMUTH) {
                    vals.azi1 = m.atan2d(r.salp1, r.calp1);
                    vals.azi2 = m.atan2d(r.salp2, r.calp2);
                  }
                  return vals;
                };
                g.Geodesic.prototype.InverseInt = function(lat1, lon1, lat2, lon2, outmask) {
                  var vals = {}, lon12, lon12s, lonsign, t, swapp, latsign, sbet1, cbet1, sbet2, cbet2, s12x, m12x, dn1, dn2, lam12, slam12, clam12, sig12, calp1, salp1, calp2, salp2, C1a, C2a, C3a, meridian, nvals, ssig1, csig1, ssig2, csig2, eps, omg12, dnm, numit, salp1a, calp1a, salp1b, calp1b, tripn, tripb, v, dv, dalp1, sdalp1, cdalp1, nsalp1, lengthmask, salp0, calp0, alp12, k2, A42, C4a, B41, B42, somg12, comg12, domg12, dbet1, dbet2, salp12, calp12, sdomg12, cdomg12;
                  vals.lat1 = lat1 = m.LatFix(lat1);
                  vals.lat2 = lat2 = m.LatFix(lat2);
                  lat1 = m.AngRound(lat1);
                  lat2 = m.AngRound(lat2);
                  lon12 = m.AngDiff(lon1, lon2);
                  lon12s = lon12.e;
                  lon12 = lon12.d;
                  if (outmask & g.LONG_UNROLL) {
                    vals.lon1 = lon1;
                    vals.lon2 = lon1 + lon12 + lon12s;
                  } else {
                    vals.lon1 = m.AngNormalize(lon1);
                    vals.lon2 = m.AngNormalize(lon2);
                  }
                  lonsign = m.copysign(1, lon12);
                  lon12 *= lonsign;
                  lon12s *= lonsign;
                  lam12 = lon12 * m.degree;
                  t = m.sincosde(lon12, lon12s);
                  slam12 = t.s;
                  clam12 = t.c;
                  lon12s = 180 - lon12 - lon12s;
                  swapp = Math.abs(lat1) < Math.abs(lat2) || isNaN(lat2) ? -1 : 1;
                  if (swapp < 0) {
                    lonsign *= -1;
                    [lat2, lat1] = [lat1, lat2];
                  }
                  latsign = m.copysign(1, -lat1);
                  lat1 *= latsign;
                  lat2 *= latsign;
                  t = m.sincosd(lat1);
                  sbet1 = this._f1 * t.s;
                  cbet1 = t.c;
                  t = m.hypot(sbet1, cbet1);
                  sbet1 /= t;
                  cbet1 /= t;
                  cbet1 = Math.max(g.tiny_, cbet1);
                  t = m.sincosd(lat2);
                  sbet2 = this._f1 * t.s;
                  cbet2 = t.c;
                  t = m.hypot(sbet2, cbet2);
                  sbet2 /= t;
                  cbet2 /= t;
                  cbet2 = Math.max(g.tiny_, cbet2);
                  if (cbet1 < -sbet1) {
                    if (cbet2 === cbet1)
                      sbet2 = m.copysign(sbet1, sbet2);
                  } else {
                    if (Math.abs(sbet2) === -sbet1)
                      cbet2 = cbet1;
                  }
                  dn1 = Math.sqrt(1 + this._ep2 * m.sq(sbet1));
                  dn2 = Math.sqrt(1 + this._ep2 * m.sq(sbet2));
                  C1a = new Array(g.nC1_ + 1);
                  C2a = new Array(g.nC2_ + 1);
                  C3a = new Array(g.nC3_);
                  meridian = lat1 === -90 || slam12 === 0;
                  if (meridian) {
                    calp1 = clam12;
                    salp1 = slam12;
                    calp2 = 1;
                    salp2 = 0;
                    ssig1 = sbet1;
                    csig1 = calp1 * cbet1;
                    ssig2 = sbet2;
                    csig2 = calp2 * cbet2;
                    sig12 = Math.atan2(Math.max(0, csig1 * ssig2 - ssig1 * csig2), csig1 * csig2 + ssig1 * ssig2);
                    nvals = this.Lengths(this._n, sig12, ssig1, csig1, dn1, ssig2, csig2, dn2, cbet1, cbet2, outmask | g.DISTANCE | g.REDUCEDLENGTH, C1a, C2a);
                    s12x = nvals.s12b;
                    m12x = nvals.m12b;
                    if (outmask & g.GEODESICSCALE) {
                      vals.M12 = nvals.M12;
                      vals.M21 = nvals.M21;
                    }
                    if (sig12 < 1 || m12x >= 0) {
                      if (sig12 < 3 * g.tiny_ || sig12 < tol0_ && (s12x < 0 || m12x < 0))
                        sig12 = m12x = s12x = 0;
                      m12x *= this._b;
                      s12x *= this._b;
                      vals.a12 = sig12 / m.degree;
                    } else
                      meridian = false;
                  }
                  somg12 = 2;
                  if (!meridian && sbet1 === 0 && (this.f <= 0 || lon12s >= this.f * 180)) {
                    calp1 = calp2 = 0;
                    salp1 = salp2 = 1;
                    s12x = this.a * lam12;
                    sig12 = omg12 = lam12 / this._f1;
                    m12x = this._b * Math.sin(sig12);
                    if (outmask & g.GEODESICSCALE)
                      vals.M12 = vals.M21 = Math.cos(sig12);
                    vals.a12 = lon12 / this._f1;
                  } else if (!meridian) {
                    nvals = this.InverseStart(sbet1, cbet1, dn1, sbet2, cbet2, dn2, lam12, slam12, clam12, C1a, C2a);
                    sig12 = nvals.sig12;
                    salp1 = nvals.salp1;
                    calp1 = nvals.calp1;
                    if (sig12 >= 0) {
                      salp2 = nvals.salp2;
                      calp2 = nvals.calp2;
                      dnm = nvals.dnm;
                      s12x = sig12 * this._b * dnm;
                      m12x = m.sq(dnm) * this._b * Math.sin(sig12 / dnm);
                      if (outmask & g.GEODESICSCALE)
                        vals.M12 = vals.M21 = Math.cos(sig12 / dnm);
                      vals.a12 = sig12 / m.degree;
                      omg12 = lam12 / (this._f1 * dnm);
                    } else {
                      numit = 0;
                      salp1a = g.tiny_;
                      calp1a = 1;
                      salp1b = g.tiny_;
                      calp1b = -1;
                      for (tripn = false, tripb = false; ; ++numit) {
                        nvals = this.Lambda12(sbet1, cbet1, dn1, sbet2, cbet2, dn2, salp1, calp1, slam12, clam12, numit < maxit1_, C1a, C2a, C3a);
                        v = nvals.lam12;
                        salp2 = nvals.salp2;
                        calp2 = nvals.calp2;
                        sig12 = nvals.sig12;
                        ssig1 = nvals.ssig1;
                        csig1 = nvals.csig1;
                        ssig2 = nvals.ssig2;
                        csig2 = nvals.csig2;
                        eps = nvals.eps;
                        domg12 = nvals.domg12;
                        dv = nvals.dlam12;
                        if (tripb || !(Math.abs(v) >= (tripn ? 8 : 1) * tol0_) || numit == maxit2_)
                          break;
                        if (v > 0 && (numit < maxit1_ || calp1 / salp1 > calp1b / salp1b)) {
                          salp1b = salp1;
                          calp1b = calp1;
                        } else if (v < 0 && (numit < maxit1_ || calp1 / salp1 < calp1a / salp1a)) {
                          salp1a = salp1;
                          calp1a = calp1;
                        }
                        if (numit < maxit1_ && dv > 0) {
                          dalp1 = -v / dv;
                          if (Math.abs(dalp1) < Math.PI) {
                            sdalp1 = Math.sin(dalp1);
                            cdalp1 = Math.cos(dalp1);
                            nsalp1 = salp1 * cdalp1 + calp1 * sdalp1;
                            if (nsalp1 > 0) {
                              calp1 = calp1 * cdalp1 - salp1 * sdalp1;
                              salp1 = nsalp1;
                              t = m.hypot(salp1, calp1);
                              salp1 /= t;
                              calp1 /= t;
                              tripn = Math.abs(v) <= 16 * tol0_;
                              continue;
                            }
                          }
                        }
                        salp1 = (salp1a + salp1b) / 2;
                        calp1 = (calp1a + calp1b) / 2;
                        t = m.hypot(salp1, calp1);
                        salp1 /= t;
                        calp1 /= t;
                        tripn = false;
                        tripb = Math.abs(salp1a - salp1) + (calp1a - calp1) < tolb_ || Math.abs(salp1 - salp1b) + (calp1 - calp1b) < tolb_;
                      }
                      lengthmask = outmask | (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE) ? g.DISTANCE : g.NONE);
                      nvals = this.Lengths(eps, sig12, ssig1, csig1, dn1, ssig2, csig2, dn2, cbet1, cbet2, lengthmask, C1a, C2a);
                      s12x = nvals.s12b;
                      m12x = nvals.m12b;
                      if (outmask & g.GEODESICSCALE) {
                        vals.M12 = nvals.M12;
                        vals.M21 = nvals.M21;
                      }
                      m12x *= this._b;
                      s12x *= this._b;
                      vals.a12 = sig12 / m.degree;
                      if (outmask & g.AREA) {
                        sdomg12 = Math.sin(domg12);
                        cdomg12 = Math.cos(domg12);
                        somg12 = slam12 * cdomg12 - clam12 * sdomg12;
                        comg12 = clam12 * cdomg12 + slam12 * sdomg12;
                      }
                    }
                  }
                  if (outmask & g.DISTANCE)
                    vals.s12 = 0 + s12x;
                  if (outmask & g.REDUCEDLENGTH)
                    vals.m12 = 0 + m12x;
                  if (outmask & g.AREA) {
                    salp0 = salp1 * cbet1;
                    calp0 = m.hypot(calp1, salp1 * sbet1);
                    if (calp0 !== 0 && salp0 !== 0) {
                      ssig1 = sbet1;
                      csig1 = calp1 * cbet1;
                      ssig2 = sbet2;
                      csig2 = calp2 * cbet2;
                      k2 = m.sq(calp0) * this._ep2;
                      eps = k2 / (2 * (1 + Math.sqrt(1 + k2)) + k2);
                      A42 = m.sq(this.a) * calp0 * salp0 * this._e2;
                      t = m.hypot(ssig1, csig1);
                      ssig1 /= t;
                      csig1 /= t;
                      t = m.hypot(ssig2, csig2);
                      ssig2 /= t;
                      csig2 /= t;
                      C4a = new Array(g.nC4_);
                      this.C4f(eps, C4a);
                      B41 = g.SinCosSeries(false, ssig1, csig1, C4a);
                      B42 = g.SinCosSeries(false, ssig2, csig2, C4a);
                      vals.S12 = A42 * (B42 - B41);
                    } else
                      vals.S12 = 0;
                    if (!meridian && somg12 == 2) {
                      somg12 = Math.sin(omg12);
                      comg12 = Math.cos(omg12);
                    }
                    if (!meridian && comg12 > -0.7071 && sbet2 - sbet1 < 1.75) {
                      domg12 = 1 + comg12;
                      dbet1 = 1 + cbet1;
                      dbet2 = 1 + cbet2;
                      alp12 = 2 * Math.atan2(somg12 * (sbet1 * dbet2 + sbet2 * dbet1), domg12 * (sbet1 * sbet2 + dbet1 * dbet2));
                    } else {
                      salp12 = salp2 * calp1 - calp2 * salp1;
                      calp12 = calp2 * calp1 + salp2 * salp1;
                      if (salp12 === 0 && calp12 < 0) {
                        salp12 = g.tiny_ * calp1;
                        calp12 = -1;
                      }
                      alp12 = Math.atan2(salp12, calp12);
                    }
                    vals.S12 += this._c2 * alp12;
                    vals.S12 *= swapp * lonsign * latsign;
                    vals.S12 += 0;
                  }
                  if (swapp < 0) {
                    [salp2, salp1] = [salp1, salp2];
                    [calp2, calp1] = [calp1, calp2];
                    if (outmask & g.GEODESICSCALE) {
                      [vals.M21, vals.M12] = [vals.M12, vals.M21];
                    }
                  }
                  salp1 *= swapp * lonsign;
                  calp1 *= swapp * latsign;
                  salp2 *= swapp * lonsign;
                  calp2 *= swapp * latsign;
                  return { vals, salp1, calp1, salp2, calp2 };
                };
                g.Geodesic.prototype.GenDirect = function(lat1, lon1, azi1, arcmode, s12_a12, outmask) {
                  var line;
                  if (!outmask) outmask = g.STANDARD;
                  else if (outmask === g.LONG_UNROLL) outmask |= g.STANDARD;
                  if (!arcmode) outmask |= g.DISTANCE_IN;
                  line = new l.GeodesicLine(this, lat1, lon1, azi1, outmask);
                  return line.GenPosition(arcmode, s12_a12, outmask);
                };
                g.Geodesic.prototype.Direct = function(lat1, lon1, azi1, s12, outmask) {
                  return this.GenDirect(lat1, lon1, azi1, false, s12, outmask);
                };
                g.Geodesic.prototype.ArcDirect = function(lat1, lon1, azi1, a12, outmask) {
                  return this.GenDirect(lat1, lon1, azi1, true, a12, outmask);
                };
                g.Geodesic.prototype.Line = function(lat1, lon1, azi1, caps) {
                  return new l.GeodesicLine(this, lat1, lon1, azi1, caps);
                };
                g.Geodesic.prototype.DirectLine = function(lat1, lon1, azi1, s12, caps) {
                  return this.GenDirectLine(lat1, lon1, azi1, false, s12, caps);
                };
                g.Geodesic.prototype.ArcDirectLine = function(lat1, lon1, azi1, a12, caps) {
                  return this.GenDirectLine(lat1, lon1, azi1, true, a12, caps);
                };
                g.Geodesic.prototype.GenDirectLine = function(lat1, lon1, azi1, arcmode, s12_a12, caps) {
                  var t;
                  if (!caps) caps = g.STANDARD | g.DISTANCE_IN;
                  if (!arcmode) caps |= g.DISTANCE_IN;
                  t = new l.GeodesicLine(this, lat1, lon1, azi1, caps);
                  t.GenSetDistance(arcmode, s12_a12);
                  return t;
                };
                g.Geodesic.prototype.InverseLine = function(lat1, lon1, lat2, lon2, caps) {
                  var r, t, azi1;
                  if (!caps) caps = g.STANDARD | g.DISTANCE_IN;
                  r = this.InverseInt(lat1, lon1, lat2, lon2, g.ARC);
                  azi1 = m.atan2d(r.salp1, r.calp1);
                  if (caps & (g.OUT_MASK & g.DISTANCE_IN)) caps |= g.DISTANCE;
                  t = new l.GeodesicLine(this, lat1, lon1, azi1, caps, r.salp1, r.calp1);
                  t.SetArc(r.vals.a12);
                  return t;
                };
                g.Geodesic.prototype.Polygon = function(polyline) {
                  return new p.PolygonArea(this, polyline);
                };
                g.WGS84 = new g.Geodesic(c.WGS84.a, c.WGS84.f);
              })(geodesic.Geodesic, geodesic.GeodesicLine, geodesic.PolygonArea, geodesic.Math, geodesic.Constants);
              (function(g, l, m) {
                l.GeodesicLine = function(geod, lat1, lon1, azi1, caps, salp1, calp1) {
                  var t, cbet1, sbet1, eps, s, c;
                  if (!caps) caps = g.STANDARD | g.DISTANCE_IN;
                  this.a = geod.a;
                  this.f = geod.f;
                  this._b = geod._b;
                  this._c2 = geod._c2;
                  this._f1 = geod._f1;
                  this.caps = caps | g.LATITUDE | g.AZIMUTH | g.LONG_UNROLL;
                  this.lat1 = m.LatFix(lat1);
                  this.lon1 = lon1;
                  if (typeof salp1 === "undefined" || typeof calp1 === "undefined") {
                    this.azi1 = m.AngNormalize(azi1);
                    t = m.sincosd(m.AngRound(this.azi1));
                    this.salp1 = t.s;
                    this.calp1 = t.c;
                  } else {
                    this.azi1 = azi1;
                    this.salp1 = salp1;
                    this.calp1 = calp1;
                  }
                  t = m.sincosd(m.AngRound(this.lat1));
                  sbet1 = this._f1 * t.s;
                  cbet1 = t.c;
                  t = m.hypot(sbet1, cbet1);
                  sbet1 /= t;
                  cbet1 /= t;
                  cbet1 = Math.max(g.tiny_, cbet1);
                  this._dn1 = Math.sqrt(1 + geod._ep2 * m.sq(sbet1));
                  this._salp0 = this.salp1 * cbet1;
                  this._calp0 = m.hypot(this.calp1, this.salp1 * sbet1);
                  this._ssig1 = sbet1;
                  this._somg1 = this._salp0 * sbet1;
                  this._csig1 = this._comg1 = sbet1 !== 0 || this.calp1 !== 0 ? cbet1 * this.calp1 : 1;
                  t = m.hypot(this._ssig1, this._csig1);
                  this._ssig1 /= t;
                  this._csig1 /= t;
                  this._k2 = m.sq(this._calp0) * geod._ep2;
                  eps = this._k2 / (2 * (1 + Math.sqrt(1 + this._k2)) + this._k2);
                  if (this.caps & g.CAP_C1) {
                    this._A1m1 = g.A1m1f(eps);
                    this._C1a = new Array(g.nC1_ + 1);
                    g.C1f(eps, this._C1a);
                    this._B11 = g.SinCosSeries(true, this._ssig1, this._csig1, this._C1a);
                    s = Math.sin(this._B11);
                    c = Math.cos(this._B11);
                    this._stau1 = this._ssig1 * c + this._csig1 * s;
                    this._ctau1 = this._csig1 * c - this._ssig1 * s;
                  }
                  if (this.caps & g.CAP_C1p) {
                    this._C1pa = new Array(g.nC1p_ + 1);
                    g.C1pf(eps, this._C1pa);
                  }
                  if (this.caps & g.CAP_C2) {
                    this._A2m1 = g.A2m1f(eps);
                    this._C2a = new Array(g.nC2_ + 1);
                    g.C2f(eps, this._C2a);
                    this._B21 = g.SinCosSeries(true, this._ssig1, this._csig1, this._C2a);
                  }
                  if (this.caps & g.CAP_C3) {
                    this._C3a = new Array(g.nC3_);
                    geod.C3f(eps, this._C3a);
                    this._A3c = -this.f * this._salp0 * geod.A3f(eps);
                    this._B31 = g.SinCosSeries(true, this._ssig1, this._csig1, this._C3a);
                  }
                  if (this.caps & g.CAP_C4) {
                    this._C4a = new Array(g.nC4_);
                    geod.C4f(eps, this._C4a);
                    this._A4 = m.sq(this.a) * this._calp0 * this._salp0 * geod._e2;
                    this._B41 = g.SinCosSeries(false, this._ssig1, this._csig1, this._C4a);
                  }
                  this.a13 = this.s13 = NaN;
                };
                l.GeodesicLine.prototype.GenPosition = function(arcmode, s12_a12, outmask) {
                  var vals = {}, sig12, ssig12, csig12, B12, AB1, ssig2, csig2, tau12, s, c, serr, omg12, lam12, lon12, E, sbet2, cbet2, somg2, comg2, salp2, calp2, dn2, B22, AB2, J12, t, B42, salp12, calp12;
                  if (!outmask) outmask = g.STANDARD;
                  else if (outmask === g.LONG_UNROLL) outmask |= g.STANDARD;
                  outmask &= this.caps & g.OUT_MASK;
                  vals.lat1 = this.lat1;
                  vals.azi1 = this.azi1;
                  vals.lon1 = outmask & g.LONG_UNROLL ? this.lon1 : m.AngNormalize(this.lon1);
                  if (arcmode)
                    vals.a12 = s12_a12;
                  else
                    vals.s12 = s12_a12;
                  if (!(arcmode || this.caps & g.DISTANCE_IN & g.OUT_MASK)) {
                    vals.a12 = NaN;
                    return vals;
                  }
                  B12 = 0;
                  AB1 = 0;
                  if (arcmode) {
                    sig12 = s12_a12 * m.degree;
                    t = m.sincosd(s12_a12);
                    ssig12 = t.s;
                    csig12 = t.c;
                  } else {
                    tau12 = s12_a12 / (this._b * (1 + this._A1m1));
                    s = Math.sin(tau12);
                    c = Math.cos(tau12);
                    B12 = -g.SinCosSeries(true, this._stau1 * c + this._ctau1 * s, this._ctau1 * c - this._stau1 * s, this._C1pa);
                    sig12 = tau12 - (B12 - this._B11);
                    ssig12 = Math.sin(sig12);
                    csig12 = Math.cos(sig12);
                    if (Math.abs(this.f) > 0.01) {
                      ssig2 = this._ssig1 * csig12 + this._csig1 * ssig12;
                      csig2 = this._csig1 * csig12 - this._ssig1 * ssig12;
                      B12 = g.SinCosSeries(true, ssig2, csig2, this._C1a);
                      serr = (1 + this._A1m1) * (sig12 + (B12 - this._B11)) - s12_a12 / this._b;
                      sig12 = sig12 - serr / Math.sqrt(1 + this._k2 * m.sq(ssig2));
                      ssig12 = Math.sin(sig12);
                      csig12 = Math.cos(sig12);
                    }
                  }
                  ssig2 = this._ssig1 * csig12 + this._csig1 * ssig12;
                  csig2 = this._csig1 * csig12 - this._ssig1 * ssig12;
                  dn2 = Math.sqrt(1 + this._k2 * m.sq(ssig2));
                  if (outmask & (g.DISTANCE | g.REDUCEDLENGTH | g.GEODESICSCALE)) {
                    if (arcmode || Math.abs(this.f) > 0.01)
                      B12 = g.SinCosSeries(true, ssig2, csig2, this._C1a);
                    AB1 = (1 + this._A1m1) * (B12 - this._B11);
                  }
                  sbet2 = this._calp0 * ssig2;
                  cbet2 = m.hypot(this._salp0, this._calp0 * csig2);
                  if (cbet2 === 0)
                    cbet2 = csig2 = g.tiny_;
                  salp2 = this._salp0;
                  calp2 = this._calp0 * csig2;
                  if (arcmode && outmask & g.DISTANCE)
                    vals.s12 = this._b * ((1 + this._A1m1) * sig12 + AB1);
                  if (outmask & g.LONGITUDE) {
                    somg2 = this._salp0 * ssig2;
                    comg2 = csig2;
                    E = m.copysign(1, this._salp0);
                    omg12 = outmask & g.LONG_UNROLL ? E * (sig12 - (Math.atan2(ssig2, csig2) - Math.atan2(this._ssig1, this._csig1)) + (Math.atan2(E * somg2, comg2) - Math.atan2(E * this._somg1, this._comg1))) : Math.atan2(somg2 * this._comg1 - comg2 * this._somg1, comg2 * this._comg1 + somg2 * this._somg1);
                    lam12 = omg12 + this._A3c * (sig12 + (g.SinCosSeries(true, ssig2, csig2, this._C3a) - this._B31));
                    lon12 = lam12 / m.degree;
                    vals.lon2 = outmask & g.LONG_UNROLL ? this.lon1 + lon12 : m.AngNormalize(m.AngNormalize(this.lon1) + m.AngNormalize(lon12));
                  }
                  if (outmask & g.LATITUDE)
                    vals.lat2 = m.atan2d(sbet2, this._f1 * cbet2);
                  if (outmask & g.AZIMUTH)
                    vals.azi2 = m.atan2d(salp2, calp2);
                  if (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE)) {
                    B22 = g.SinCosSeries(true, ssig2, csig2, this._C2a);
                    AB2 = (1 + this._A2m1) * (B22 - this._B21);
                    J12 = (this._A1m1 - this._A2m1) * sig12 + (AB1 - AB2);
                    if (outmask & g.REDUCEDLENGTH)
                      vals.m12 = this._b * (dn2 * (this._csig1 * ssig2) - this._dn1 * (this._ssig1 * csig2) - this._csig1 * csig2 * J12);
                    if (outmask & g.GEODESICSCALE) {
                      t = this._k2 * (ssig2 - this._ssig1) * (ssig2 + this._ssig1) / (this._dn1 + dn2);
                      vals.M12 = csig12 + (t * ssig2 - csig2 * J12) * this._ssig1 / this._dn1;
                      vals.M21 = csig12 - (t * this._ssig1 - this._csig1 * J12) * ssig2 / dn2;
                    }
                  }
                  if (outmask & g.AREA) {
                    B42 = g.SinCosSeries(false, ssig2, csig2, this._C4a);
                    if (this._calp0 === 0 || this._salp0 === 0) {
                      salp12 = salp2 * this.calp1 - calp2 * this.salp1;
                      calp12 = calp2 * this.calp1 + salp2 * this.salp1;
                    } else {
                      salp12 = this._calp0 * this._salp0 * (csig12 <= 0 ? this._csig1 * (1 - csig12) + ssig12 * this._ssig1 : ssig12 * (this._csig1 * ssig12 / (1 + csig12) + this._ssig1));
                      calp12 = m.sq(this._salp0) + m.sq(this._calp0) * this._csig1 * csig2;
                    }
                    vals.S12 = this._c2 * Math.atan2(salp12, calp12) + this._A4 * (B42 - this._B41);
                  }
                  if (!arcmode)
                    vals.a12 = sig12 / m.degree;
                  return vals;
                };
                l.GeodesicLine.prototype.Position = function(s12, outmask) {
                  return this.GenPosition(false, s12, outmask);
                };
                l.GeodesicLine.prototype.ArcPosition = function(a12, outmask) {
                  return this.GenPosition(true, a12, outmask);
                };
                l.GeodesicLine.prototype.GenSetDistance = function(arcmode, s13_a13) {
                  if (arcmode)
                    this.SetArc(s13_a13);
                  else
                    this.SetDistance(s13_a13);
                };
                l.GeodesicLine.prototype.SetDistance = function(s13) {
                  var r;
                  this.s13 = s13;
                  r = this.GenPosition(false, this.s13, g.ARC);
                  this.a13 = 0 + r.a12;
                };
                l.GeodesicLine.prototype.SetArc = function(a13) {
                  var r;
                  this.a13 = a13;
                  r = this.GenPosition(true, this.a13, g.DISTANCE);
                  this.s13 = 0 + r.s12;
                };
              })(geodesic.Geodesic, geodesic.GeodesicLine, geodesic.Math);
              (function(p, g, m, a) {
                var transit, transitdirect, AreaReduceA, AreaReduceB;
                transit = function(lon1, lon2) {
                  var lon12 = m.AngDiff(lon1, lon2).d;
                  lon1 = m.AngNormalize(lon1);
                  lon2 = m.AngNormalize(lon2);
                  return lon12 > 0 && (lon1 < 0 && lon2 >= 0 || lon1 > 0 && lon2 === 0) ? 1 : lon12 < 0 && lon1 >= 0 && lon2 < 0 ? -1 : 0;
                };
                transitdirect = function(lon1, lon2) {
                  lon1 = lon1 % 720;
                  lon2 = lon2 % 720;
                  return (0 <= lon2 && lon2 < 360 || lon2 < -360 ? 0 : 1) - (0 <= lon1 && lon1 < 360 || lon1 < -360 ? 0 : 1);
                };
                AreaReduceA = function(area, area0, crossings, reverse, sign2) {
                  area.Remainder(area0);
                  if (crossings & 1)
                    area.Add((area.Sum() < 0 ? 1 : -1) * area0 / 2);
                  if (!reverse)
                    area.Negate();
                  if (sign2) {
                    if (area.Sum() > area0 / 2)
                      area.Add(-area0);
                    else if (area.Sum() <= -area0 / 2)
                      area.Add(+area0);
                  } else {
                    if (area.Sum() >= area0)
                      area.Add(-area0);
                    else if (area.Sum() < 0)
                      area.Add(+area0);
                  }
                  return 0 + area.Sum();
                };
                AreaReduceB = function(area, area0, crossings, reverse, sign2) {
                  area = m.remainder(area, area0);
                  if (crossings & 1)
                    area += (area < 0 ? 1 : -1) * area0 / 2;
                  if (!reverse)
                    area *= -1;
                  if (sign2) {
                    if (area > area0 / 2)
                      area -= area0;
                    else if (area <= -area0 / 2)
                      area += area0;
                  } else {
                    if (area >= area0)
                      area -= area0;
                    else if (area < 0)
                      area += area0;
                  }
                  return 0 + area;
                };
                p.PolygonArea = function(geod, polyline) {
                  this._geod = geod;
                  this.a = this._geod.a;
                  this.f = this._geod.f;
                  this._area0 = 4 * Math.PI * geod._c2;
                  this.polyline = !polyline ? false : polyline;
                  this._mask = g.LATITUDE | g.LONGITUDE | g.DISTANCE | (this.polyline ? g.NONE : g.AREA | g.LONG_UNROLL);
                  if (!this.polyline)
                    this._areasum = new a.Accumulator(0);
                  this._perimetersum = new a.Accumulator(0);
                  this.Clear();
                };
                p.PolygonArea.prototype.Clear = function() {
                  this.num = 0;
                  this._crossings = 0;
                  if (!this.polyline)
                    this._areasum.Set(0);
                  this._perimetersum.Set(0);
                  this._lat0 = this._lon0 = this.lat = this.lon = NaN;
                };
                p.PolygonArea.prototype.AddPoint = function(lat, lon) {
                  var t;
                  if (this.num === 0) {
                    this._lat0 = this.lat = lat;
                    this._lon0 = this.lon = lon;
                  } else {
                    t = this._geod.Inverse(this.lat, this.lon, lat, lon, this._mask);
                    this._perimetersum.Add(t.s12);
                    if (!this.polyline) {
                      this._areasum.Add(t.S12);
                      this._crossings += transit(this.lon, lon);
                    }
                    this.lat = lat;
                    this.lon = lon;
                  }
                  ++this.num;
                };
                p.PolygonArea.prototype.AddEdge = function(azi, s) {
                  var t;
                  if (this.num) {
                    t = this._geod.Direct(this.lat, this.lon, azi, s, this._mask);
                    this._perimetersum.Add(s);
                    if (!this.polyline) {
                      this._areasum.Add(t.S12);
                      this._crossings += transitdirect(this.lon, t.lon2);
                    }
                    this.lat = t.lat2;
                    this.lon = t.lon2;
                  }
                  ++this.num;
                };
                p.PolygonArea.prototype.Compute = function(reverse, sign2) {
                  var vals = { number: this.num }, t, tempsum;
                  if (this.num < 2) {
                    vals.perimeter = 0;
                    if (!this.polyline)
                      vals.area = 0;
                    return vals;
                  }
                  if (this.polyline) {
                    vals.perimeter = this._perimetersum.Sum();
                    return vals;
                  }
                  t = this._geod.Inverse(this.lat, this.lon, this._lat0, this._lon0, this._mask);
                  vals.perimeter = this._perimetersum.Sum(t.s12);
                  tempsum = new a.Accumulator(this._areasum);
                  tempsum.Add(t.S12);
                  vals.area = AreaReduceA(tempsum, this._area0, this._crossings + transit(this.lon, this._lon0), reverse, sign2);
                  return vals;
                };
                p.PolygonArea.prototype.TestPoint = function(lat, lon, reverse, sign2) {
                  var vals = { number: this.num + 1 }, t, tempsum, crossings, i;
                  if (this.num === 0) {
                    vals.perimeter = 0;
                    if (!this.polyline)
                      vals.area = 0;
                    return vals;
                  }
                  vals.perimeter = this._perimetersum.Sum();
                  tempsum = this.polyline ? 0 : this._areasum.Sum();
                  crossings = this._crossings;
                  for (i = 0; i < (this.polyline ? 1 : 2); ++i) {
                    t = this._geod.Inverse(i === 0 ? this.lat : lat, i === 0 ? this.lon : lon, i !== 0 ? this._lat0 : lat, i !== 0 ? this._lon0 : lon, this._mask);
                    vals.perimeter += t.s12;
                    if (!this.polyline) {
                      tempsum += t.S12;
                      crossings += transit(i === 0 ? this.lon : lon, i !== 0 ? this._lon0 : lon);
                    }
                  }
                  if (this.polyline)
                    return vals;
                  vals.area = AreaReduceB(tempsum, this._area0, crossings, reverse, sign2);
                  return vals;
                };
                p.PolygonArea.prototype.TestEdge = function(azi, s, reverse, sign2) {
                  var vals = { number: this.num ? this.num + 1 : 0 }, t, tempsum, crossings;
                  if (this.num === 0)
                    return vals;
                  vals.perimeter = this._perimetersum.Sum() + s;
                  if (this.polyline)
                    return vals;
                  tempsum = this._areasum.Sum();
                  crossings = this._crossings;
                  t = this._geod.Direct(this.lat, this.lon, azi, s, this._mask);
                  tempsum += t.S12;
                  crossings += transitdirect(this.lon, t.lon2);
                  crossings += transit(t.lon2, this._lon0);
                  t = this._geod.Inverse(t.lat2, t.lon2, this._lat0, this._lon0, this._mask);
                  vals.perimeter += t.s12;
                  tempsum += t.S12;
                  vals.area = AreaReduceB(tempsum, this._area0, crossings, reverse, sign2);
                  return vals;
                };
              })(geodesic.PolygonArea, geodesic.Geodesic, geodesic.Math, geodesic.Accumulator);
              cb(geodesic);
            })(function(geo) {
              if (module2.exports) {
                module2.exports = geo;
              } else {
                window.geodesic = geo;
              }
            });
          })(geographiclibGeodesic_min);
          return geographiclibGeodesic_min.exports;
        }
        var geographiclibGeodesic_minExports = requireGeographiclibGeodesic_min();
        function init$8() {
          this.sin_p12 = Math.sin(this.lat0);
          this.cos_p12 = Math.cos(this.lat0);
          this.g = new geographiclibGeodesic_minExports.Geodesic.Geodesic(this.a, this.es / (1 + Math.sqrt(1 - this.es)));
        }
        function forward$7(p) {
          var lon = p.x;
          var lat = p.y;
          var sinphi = Math.sin(p.y);
          var cosphi = Math.cos(p.y);
          var dlon = adjust_lon(lon - this.long0);
          var e0, e1, e2, e3, Mlp, Ml, c, kp, cos_c, lat1, lon1, lat2, lon2, vars, azi1;
          if (this.sphere) {
            if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
              p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
              p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
              return p;
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
              p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
              p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
              return p;
            } else {
              cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
              c = Math.acos(cos_c);
              kp = c ? c / Math.sin(c) : 1;
              p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
              p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
              return p;
            }
          } else {
            e0 = e0fn(this.es);
            e1 = e1fn(this.es);
            e2 = e2fn(this.es);
            e3 = e3fn(this.es);
            if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
              Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
              Ml = this.a * mlfn(e0, e1, e2, e3, lat);
              p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
              p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
              return p;
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
              Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
              Ml = this.a * mlfn(e0, e1, e2, e3, lat);
              p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
              p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
              return p;
            } else {
              if (Math.abs(lon) < EPSLN && Math.abs(lat - this.lat0) < EPSLN) {
                p.x = p.y = 0;
                return p;
              }
              lat1 = this.lat0 / D2R$1;
              lon1 = this.long0 / D2R$1;
              lat2 = lat / D2R$1;
              lon2 = lon / D2R$1;
              vars = this.g.Inverse(lat1, lon1, lat2, lon2, this.g.AZIMUTH);
              azi1 = vars.azi1 * D2R$1;
              p.x = vars.s12 * Math.sin(azi1);
              p.y = vars.s12 * Math.cos(azi1);
              return p;
            }
          }
        }
        function inverse$7(p) {
          p.x -= this.x0;
          p.y -= this.y0;
          var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M2, lat1, lon1, azi1, s12, vars;
          if (this.sphere) {
            rh = Math.sqrt(p.x * p.x + p.y * p.y);
            if (rh > 2 * HALF_PI * this.a) {
              return;
            }
            z = rh / this.a;
            sinz = Math.sin(z);
            cosz = Math.cos(z);
            lon = this.long0;
            if (Math.abs(rh) <= EPSLN) {
              lat = this.lat0;
            } else {
              lat = asinz(cosz * this.sin_p12 + p.y * sinz * this.cos_p12 / rh);
              con = Math.abs(this.lat0) - HALF_PI;
              if (Math.abs(con) <= EPSLN) {
                if (this.lat0 >= 0) {
                  lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y));
                } else {
                  lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
                }
              } else {
                lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
              }
            }
            p.x = lon;
            p.y = lat;
            return p;
          } else {
            e0 = e0fn(this.es);
            e1 = e1fn(this.es);
            e2 = e2fn(this.es);
            e3 = e3fn(this.es);
            if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
              Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
              rh = Math.sqrt(p.x * p.x + p.y * p.y);
              M2 = Mlp - rh;
              lat = imlfn(M2 / this.a, e0, e1, e2, e3);
              lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y));
              p.x = lon;
              p.y = lat;
              return p;
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
              Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
              rh = Math.sqrt(p.x * p.x + p.y * p.y);
              M2 = rh - Mlp;
              lat = imlfn(M2 / this.a, e0, e1, e2, e3);
              lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
              p.x = lon;
              p.y = lat;
              return p;
            } else {
              lat1 = this.lat0 / D2R$1;
              lon1 = this.long0 / D2R$1;
              azi1 = Math.atan2(p.x, p.y) / D2R$1;
              s12 = Math.sqrt(p.x * p.x + p.y * p.y);
              vars = this.g.Direct(lat1, lon1, azi1, s12, this.g.STANDARD);
              p.x = vars.lon2 * D2R$1;
              p.y = vars.lat2 * D2R$1;
              return p;
            }
          }
        }
        var names$8 = ["Azimuthal_Equidistant", "aeqd"];
        var aeqd = {
          init: init$8,
          forward: forward$7,
          inverse: inverse$7,
          names: names$8
        };
        function init$7() {
          this.sin_p14 = Math.sin(this.lat0);
          this.cos_p14 = Math.cos(this.lat0);
        }
        function forward$6(p) {
          var sinphi, cosphi;
          var dlon;
          var coslon;
          var ksp;
          var g, x, y;
          var lon = p.x;
          var lat = p.y;
          dlon = adjust_lon(lon - this.long0);
          sinphi = Math.sin(lat);
          cosphi = Math.cos(lat);
          coslon = Math.cos(dlon);
          g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
          ksp = 1;
          if (g > 0 || Math.abs(g) <= EPSLN) {
            x = this.a * ksp * cosphi * Math.sin(dlon);
            y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
          }
          p.x = x;
          p.y = y;
          return p;
        }
        function inverse$6(p) {
          var rh;
          var z;
          var sinz, cosz;
          var con;
          var lon, lat;
          p.x -= this.x0;
          p.y -= this.y0;
          rh = Math.sqrt(p.x * p.x + p.y * p.y);
          z = asinz(rh / this.a);
          sinz = Math.sin(z);
          cosz = Math.cos(z);
          lon = this.long0;
          if (Math.abs(rh) <= EPSLN) {
            lat = this.lat0;
            p.x = lon;
            p.y = lat;
            return p;
          }
          lat = asinz(cosz * this.sin_p14 + p.y * sinz * this.cos_p14 / rh);
          con = Math.abs(this.lat0) - HALF_PI;
          if (Math.abs(con) <= EPSLN) {
            if (this.lat0 >= 0) {
              lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y));
            } else {
              lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
            }
            p.x = lon;
            p.y = lat;
            return p;
          }
          lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
          p.x = lon;
          p.y = lat;
          return p;
        }
        var names$7 = ["ortho"];
        var ortho = {
          init: init$7,
          forward: forward$6,
          inverse: inverse$6,
          names: names$7
        };
        var FACE_ENUM = {
          FRONT: 1,
          RIGHT: 2,
          BACK: 3,
          LEFT: 4,
          TOP: 5,
          BOTTOM: 6
        };
        var AREA_ENUM = {
          AREA_0: 1,
          AREA_1: 2,
          AREA_2: 3,
          AREA_3: 4
        };
        function init$6() {
          this.x0 = this.x0 || 0;
          this.y0 = this.y0 || 0;
          this.lat0 = this.lat0 || 0;
          this.long0 = this.long0 || 0;
          this.lat_ts = this.lat_ts || 0;
          this.title = this.title || "Quadrilateralized Spherical Cube";
          if (this.lat0 >= HALF_PI - FORTPI / 2) {
            this.face = FACE_ENUM.TOP;
          } else if (this.lat0 <= -(HALF_PI - FORTPI / 2)) {
            this.face = FACE_ENUM.BOTTOM;
          } else if (Math.abs(this.long0) <= FORTPI) {
            this.face = FACE_ENUM.FRONT;
          } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
            this.face = this.long0 > 0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
          } else {
            this.face = FACE_ENUM.BACK;
          }
          if (this.es !== 0) {
            this.one_minus_f = 1 - (this.a - this.b) / this.a;
            this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
          }
        }
        function forward$5(p) {
          var xy = { x: 0, y: 0 };
          var lat, lon;
          var theta, phi;
          var t, mu;
          var area = { value: 0 };
          p.x -= this.long0;
          if (this.es !== 0) {
            lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
          } else {
            lat = p.y;
          }
          lon = p.x;
          if (this.face === FACE_ENUM.TOP) {
            phi = HALF_PI - lat;
            if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
              area.value = AREA_ENUM.AREA_0;
              theta = lon - HALF_PI;
            } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
              area.value = AREA_ENUM.AREA_1;
              theta = lon > 0 ? lon - SPI : lon + SPI;
            } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
              area.value = AREA_ENUM.AREA_2;
              theta = lon + HALF_PI;
            } else {
              area.value = AREA_ENUM.AREA_3;
              theta = lon;
            }
          } else if (this.face === FACE_ENUM.BOTTOM) {
            phi = HALF_PI + lat;
            if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
              area.value = AREA_ENUM.AREA_0;
              theta = -lon + HALF_PI;
            } else if (lon < FORTPI && lon >= -FORTPI) {
              area.value = AREA_ENUM.AREA_1;
              theta = -lon;
            } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
              area.value = AREA_ENUM.AREA_2;
              theta = -lon - HALF_PI;
            } else {
              area.value = AREA_ENUM.AREA_3;
              theta = lon > 0 ? -lon + SPI : -lon - SPI;
            }
          } else {
            var q, r, s;
            var sinlat, coslat;
            var sinlon, coslon;
            if (this.face === FACE_ENUM.RIGHT) {
              lon = qsc_shift_lon_origin(lon, +HALF_PI);
            } else if (this.face === FACE_ENUM.BACK) {
              lon = qsc_shift_lon_origin(lon, 3.14159265359);
            } else if (this.face === FACE_ENUM.LEFT) {
              lon = qsc_shift_lon_origin(lon, -HALF_PI);
            }
            sinlat = Math.sin(lat);
            coslat = Math.cos(lat);
            sinlon = Math.sin(lon);
            coslon = Math.cos(lon);
            q = coslat * coslon;
            r = coslat * sinlon;
            s = sinlat;
            if (this.face === FACE_ENUM.FRONT) {
              phi = Math.acos(q);
              theta = qsc_fwd_equat_face_theta(phi, s, r, area);
            } else if (this.face === FACE_ENUM.RIGHT) {
              phi = Math.acos(r);
              theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
            } else if (this.face === FACE_ENUM.BACK) {
              phi = Math.acos(-q);
              theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
            } else if (this.face === FACE_ENUM.LEFT) {
              phi = Math.acos(-r);
              theta = qsc_fwd_equat_face_theta(phi, s, q, area);
            } else {
              phi = theta = 0;
              area.value = AREA_ENUM.AREA_0;
            }
          }
          mu = Math.atan(12 / SPI * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
          t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));
          if (area.value === AREA_ENUM.AREA_1) {
            mu += HALF_PI;
          } else if (area.value === AREA_ENUM.AREA_2) {
            mu += SPI;
          } else if (area.value === AREA_ENUM.AREA_3) {
            mu += 1.5 * SPI;
          }
          xy.x = t * Math.cos(mu);
          xy.y = t * Math.sin(mu);
          xy.x = xy.x * this.a + this.x0;
          xy.y = xy.y * this.a + this.y0;
          p.x = xy.x;
          p.y = xy.y;
          return p;
        }
        function inverse$5(p) {
          var lp = { lam: 0, phi: 0 };
          var mu, nu, cosmu, tannu;
          var tantheta, theta, cosphi, phi;
          var t;
          var area = { value: 0 };
          p.x = (p.x - this.x0) / this.a;
          p.y = (p.y - this.y0) / this.a;
          nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
          mu = Math.atan2(p.y, p.x);
          if (p.x >= 0 && p.x >= Math.abs(p.y)) {
            area.value = AREA_ENUM.AREA_0;
          } else if (p.y >= 0 && p.y >= Math.abs(p.x)) {
            area.value = AREA_ENUM.AREA_1;
            mu -= HALF_PI;
          } else if (p.x < 0 && -p.x >= Math.abs(p.y)) {
            area.value = AREA_ENUM.AREA_2;
            mu = mu < 0 ? mu + SPI : mu - SPI;
          } else {
            area.value = AREA_ENUM.AREA_3;
            mu += HALF_PI;
          }
          t = SPI / 12 * Math.tan(mu);
          tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2));
          theta = Math.atan(tantheta);
          cosmu = Math.cos(mu);
          tannu = Math.tan(nu);
          cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
          if (cosphi < -1) {
            cosphi = -1;
          } else if (cosphi > 1) {
            cosphi = 1;
          }
          if (this.face === FACE_ENUM.TOP) {
            phi = Math.acos(cosphi);
            lp.phi = HALF_PI - phi;
            if (area.value === AREA_ENUM.AREA_0) {
              lp.lam = theta + HALF_PI;
            } else if (area.value === AREA_ENUM.AREA_1) {
              lp.lam = theta < 0 ? theta + SPI : theta - SPI;
            } else if (area.value === AREA_ENUM.AREA_2) {
              lp.lam = theta - HALF_PI;
            } else {
              lp.lam = theta;
            }
          } else if (this.face === FACE_ENUM.BOTTOM) {
            phi = Math.acos(cosphi);
            lp.phi = phi - HALF_PI;
            if (area.value === AREA_ENUM.AREA_0) {
              lp.lam = -theta + HALF_PI;
            } else if (area.value === AREA_ENUM.AREA_1) {
              lp.lam = -theta;
            } else if (area.value === AREA_ENUM.AREA_2) {
              lp.lam = -theta - HALF_PI;
            } else {
              lp.lam = theta < 0 ? -theta - SPI : -theta + SPI;
            }
          } else {
            var q, r, s;
            q = cosphi;
            t = q * q;
            if (t >= 1) {
              s = 0;
            } else {
              s = Math.sqrt(1 - t) * Math.sin(theta);
            }
            t += s * s;
            if (t >= 1) {
              r = 0;
            } else {
              r = Math.sqrt(1 - t);
            }
            if (area.value === AREA_ENUM.AREA_1) {
              t = r;
              r = -s;
              s = t;
            } else if (area.value === AREA_ENUM.AREA_2) {
              r = -r;
              s = -s;
            } else if (area.value === AREA_ENUM.AREA_3) {
              t = r;
              r = s;
              s = -t;
            }
            if (this.face === FACE_ENUM.RIGHT) {
              t = q;
              q = -r;
              r = t;
            } else if (this.face === FACE_ENUM.BACK) {
              q = -q;
              r = -r;
            } else if (this.face === FACE_ENUM.LEFT) {
              t = q;
              q = r;
              r = -t;
            }
            lp.phi = Math.acos(-s) - HALF_PI;
            lp.lam = Math.atan2(r, q);
            if (this.face === FACE_ENUM.RIGHT) {
              lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
            } else if (this.face === FACE_ENUM.BACK) {
              lp.lam = qsc_shift_lon_origin(lp.lam, -3.14159265359);
            } else if (this.face === FACE_ENUM.LEFT) {
              lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
            }
          }
          if (this.es !== 0) {
            var invert_sign;
            var tanphi, xa;
            invert_sign = lp.phi < 0 ? 1 : 0;
            tanphi = Math.tan(lp.phi);
            xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
            lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
            if (invert_sign) {
              lp.phi = -lp.phi;
            }
          }
          lp.lam += this.long0;
          p.x = lp.lam;
          p.y = lp.phi;
          return p;
        }
        function qsc_fwd_equat_face_theta(phi, y, x, area) {
          var theta;
          if (phi < EPSLN) {
            area.value = AREA_ENUM.AREA_0;
            theta = 0;
          } else {
            theta = Math.atan2(y, x);
            if (Math.abs(theta) <= FORTPI) {
              area.value = AREA_ENUM.AREA_0;
            } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
              area.value = AREA_ENUM.AREA_1;
              theta -= HALF_PI;
            } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
              area.value = AREA_ENUM.AREA_2;
              theta = theta >= 0 ? theta - SPI : theta + SPI;
            } else {
              area.value = AREA_ENUM.AREA_3;
              theta += HALF_PI;
            }
          }
          return theta;
        }
        function qsc_shift_lon_origin(lon, offset) {
          var slon = lon + offset;
          if (slon < -3.14159265359) {
            slon += TWO_PI;
          } else if (slon > 3.14159265359) {
            slon -= TWO_PI;
          }
          return slon;
        }
        var names$6 = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
        var qsc = {
          init: init$6,
          forward: forward$5,
          inverse: inverse$5,
          names: names$6
        };
        var COEFS_X = [
          [1, 22199e-21, -715515e-10, 31103e-10],
          [0.9986, -482243e-9, -24897e-9, -13309e-10],
          [0.9954, -83103e-8, -448605e-10, -986701e-12],
          [0.99, -135364e-8, -59661e-9, 36777e-10],
          [0.9822, -167442e-8, -449547e-11, -572411e-11],
          [0.973, -214868e-8, -903571e-10, 18736e-12],
          [0.96, -305085e-8, -900761e-10, 164917e-11],
          [0.9427, -382792e-8, -653386e-10, -26154e-10],
          [0.9216, -467746e-8, -10457e-8, 481243e-11],
          [0.8962, -536223e-8, -323831e-10, -543432e-11],
          [0.8679, -609363e-8, -113898e-9, 332484e-11],
          [0.835, -698325e-8, -640253e-10, 934959e-12],
          [0.7986, -755338e-8, -500009e-10, 935324e-12],
          [0.7597, -798324e-8, -35971e-9, -227626e-11],
          [0.7186, -851367e-8, -701149e-10, -86303e-10],
          [0.6732, -986209e-8, -199569e-9, 191974e-10],
          [0.6213, -0.010418, 883923e-10, 624051e-11],
          [0.5722, -906601e-8, 182e-6, 624051e-11],
          [0.5322, -677797e-8, 275608e-9, 624051e-11]
        ];
        var COEFS_Y = [
          [-520417e-23, 0.0124, 121431e-23, -845284e-16],
          [0.062, 0.0124, -126793e-14, 422642e-15],
          [0.124, 0.0124, 507171e-14, -160604e-14],
          [0.186, 0.0123999, -190189e-13, 600152e-14],
          [0.248, 0.0124002, 710039e-13, -224e-10],
          [0.31, 0.0123992, -264997e-12, 835986e-13],
          [0.372, 0.0124029, 988983e-12, -311994e-12],
          [0.434, 0.0123893, -369093e-11, -435621e-12],
          [0.4958, 0.0123198, -102252e-10, -345523e-12],
          [0.5571, 0.0121916, -154081e-10, -582288e-12],
          [0.6176, 0.0119938, -241424e-10, -525327e-12],
          [0.6769, 0.011713, -320223e-10, -516405e-12],
          [0.7346, 0.0113541, -397684e-10, -609052e-12],
          [0.7903, 0.0109107, -489042e-10, -104739e-11],
          [0.8435, 0.0103431, -64615e-9, -140374e-14],
          [0.8936, 969686e-8, -64636e-9, -8547e-9],
          [0.9394, 840947e-8, -192841e-9, -42106e-10],
          [0.9761, 616527e-8, -256e-6, -42106e-10],
          [1, 328947e-8, -319159e-9, -42106e-10]
        ];
        var FXC = 0.8487;
        var FYC = 1.3523;
        var C1 = R2D / 5;
        var RC1 = 1 / C1;
        var NODES = 18;
        var poly3_val = function(coefs, x) {
          return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
        };
        var poly3_der = function(coefs, x) {
          return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
        };
        function newton_rapshon(f_df, start2, max_err, iters) {
          var x = start2;
          for (; iters; --iters) {
            var upd = f_df(x);
            x -= upd;
            if (Math.abs(upd) < max_err) {
              break;
            }
          }
          return x;
        }
        function init$5() {
          this.x0 = this.x0 || 0;
          this.y0 = this.y0 || 0;
          this.long0 = this.long0 || 0;
          this.es = 0;
          this.title = this.title || "Robinson";
        }
        function forward$4(ll) {
          var lon = adjust_lon(ll.x - this.long0);
          var dphi = Math.abs(ll.y);
          var i = Math.floor(dphi * C1);
          if (i < 0) {
            i = 0;
          } else if (i >= NODES) {
            i = NODES - 1;
          }
          dphi = R2D * (dphi - RC1 * i);
          var xy = {
            x: poly3_val(COEFS_X[i], dphi) * lon,
            y: poly3_val(COEFS_Y[i], dphi)
          };
          if (ll.y < 0) {
            xy.y = -xy.y;
          }
          xy.x = xy.x * this.a * FXC + this.x0;
          xy.y = xy.y * this.a * FYC + this.y0;
          return xy;
        }
        function inverse$4(xy) {
          var ll = {
            x: (xy.x - this.x0) / (this.a * FXC),
            y: Math.abs(xy.y - this.y0) / (this.a * FYC)
          };
          if (ll.y >= 1) {
            ll.x /= COEFS_X[NODES][0];
            ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
          } else {
            var i = Math.floor(ll.y * NODES);
            if (i < 0) {
              i = 0;
            } else if (i >= NODES) {
              i = NODES - 1;
            }
            for (; ; ) {
              if (COEFS_Y[i][0] > ll.y) {
                --i;
              } else if (COEFS_Y[i + 1][0] <= ll.y) {
                ++i;
              } else {
                break;
              }
            }
            var coefs = COEFS_Y[i];
            var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i + 1][0] - coefs[0]);
            t = newton_rapshon(function(x) {
              return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
            }, t, EPSLN, 100);
            ll.x /= poly3_val(COEFS_X[i], t);
            ll.y = (5 * i + t) * D2R$1;
            if (xy.y < 0) {
              ll.y = -ll.y;
            }
          }
          ll.x = adjust_lon(ll.x + this.long0);
          return ll;
        }
        var names$5 = ["Robinson", "robin"];
        var robin = {
          init: init$5,
          forward: forward$4,
          inverse: inverse$4,
          names: names$5
        };
        function init$4() {
          this.name = "geocent";
        }
        function forward$3(p) {
          var point = geodeticToGeocentric(p, this.es, this.a);
          return point;
        }
        function inverse$3(p) {
          var point = geocentricToGeodetic(p, this.es, this.a, this.b);
          return point;
        }
        var names$4 = ["Geocentric", "geocentric", "geocent", "Geocent"];
        var geocent = {
          init: init$4,
          forward: forward$3,
          inverse: inverse$3,
          names: names$4
        };
        var mode = {
          N_POLE: 0,
          S_POLE: 1,
          EQUIT: 2,
          OBLIQ: 3
        };
        var params = {
          h: { def: 1e5, num: true },
          // default is Karman line, no default in PROJ.7
          azi: { def: 0, num: true, degrees: true },
          // default is North
          tilt: { def: 0, num: true, degrees: true },
          // default is Nadir
          long0: { def: 0, num: true },
          // default is Greenwich, conversion to rad is automatic
          lat0: { def: 0, num: true }
          // default is Equator, conversion to rad is automatic
        };
        function init$3() {
          Object.keys(params).forEach(function(p) {
            if (typeof this[p] === "undefined") {
              this[p] = params[p].def;
            } else if (params[p].num && isNaN(this[p])) {
              throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
            } else if (params[p].num) {
              this[p] = parseFloat(this[p]);
            }
            if (params[p].degrees) {
              this[p] = this[p] * D2R$1;
            }
          }.bind(this));
          if (Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN) {
            this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
          } else if (Math.abs(this.lat0) < EPSLN) {
            this.mode = mode.EQUIT;
          } else {
            this.mode = mode.OBLIQ;
            this.sinph0 = Math.sin(this.lat0);
            this.cosph0 = Math.cos(this.lat0);
          }
          this.pn1 = this.h / this.a;
          if (this.pn1 <= 0 || this.pn1 > 1e10) {
            throw new Error("Invalid height");
          }
          this.p = 1 + this.pn1;
          this.rp = 1 / this.p;
          this.h1 = 1 / this.pn1;
          this.pfact = (this.p + 1) * this.h1;
          this.es = 0;
          var omega = this.tilt;
          var gamma = this.azi;
          this.cg = Math.cos(gamma);
          this.sg = Math.sin(gamma);
          this.cw = Math.cos(omega);
          this.sw = Math.sin(omega);
        }
        function forward$2(p) {
          p.x -= this.long0;
          var sinphi = Math.sin(p.y);
          var cosphi = Math.cos(p.y);
          var coslam = Math.cos(p.x);
          var x, y;
          switch (this.mode) {
            case mode.OBLIQ:
              y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
              break;
            case mode.EQUIT:
              y = cosphi * coslam;
              break;
            case mode.S_POLE:
              y = -sinphi;
              break;
            case mode.N_POLE:
              y = sinphi;
              break;
          }
          y = this.pn1 / (this.p - y);
          x = y * cosphi * Math.sin(p.x);
          switch (this.mode) {
            case mode.OBLIQ:
              y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
              break;
            case mode.EQUIT:
              y *= sinphi;
              break;
            case mode.N_POLE:
              y *= -(cosphi * coslam);
              break;
            case mode.S_POLE:
              y *= cosphi * coslam;
              break;
          }
          var yt, ba;
          yt = y * this.cg + x * this.sg;
          ba = 1 / (yt * this.sw * this.h1 + this.cw);
          x = (x * this.cg - y * this.sg) * this.cw * ba;
          y = yt * ba;
          p.x = x * this.a;
          p.y = y * this.a;
          return p;
        }
        function inverse$2(p) {
          p.x /= this.a;
          p.y /= this.a;
          var r = { x: p.x, y: p.y };
          var bm, bq, yt;
          yt = 1 / (this.pn1 - p.y * this.sw);
          bm = this.pn1 * p.x * yt;
          bq = this.pn1 * p.y * this.cw * yt;
          p.x = bm * this.cg + bq * this.sg;
          p.y = bq * this.cg - bm * this.sg;
          var rh = hypot(p.x, p.y);
          if (Math.abs(rh) < EPSLN) {
            r.x = 0;
            r.y = p.y;
          } else {
            var cosz, sinz;
            sinz = 1 - rh * rh * this.pfact;
            sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
            cosz = Math.sqrt(1 - sinz * sinz);
            switch (this.mode) {
              case mode.OBLIQ:
                r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
                p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
                p.x *= sinz * this.cosph0;
                break;
              case mode.EQUIT:
                r.y = Math.asin(p.y * sinz / rh);
                p.y = cosz * rh;
                p.x *= sinz;
                break;
              case mode.N_POLE:
                r.y = Math.asin(cosz);
                p.y = -p.y;
                break;
              case mode.S_POLE:
                r.y = -Math.asin(cosz);
                break;
            }
            r.x = Math.atan2(p.x, p.y);
          }
          p.x = r.x + this.long0;
          p.y = r.y;
          return p;
        }
        var names$3 = ["Tilted_Perspective", "tpers"];
        var tpers = {
          init: init$3,
          forward: forward$2,
          inverse: inverse$2,
          names: names$3
        };
        function init$2() {
          this.flip_axis = this.sweep === "x" ? 1 : 0;
          this.h = Number(this.h);
          this.radius_g_1 = this.h / this.a;
          if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
            throw new Error();
          }
          this.radius_g = 1 + this.radius_g_1;
          this.C = this.radius_g * this.radius_g - 1;
          if (this.es !== 0) {
            var one_es = 1 - this.es;
            var rone_es = 1 / one_es;
            this.radius_p = Math.sqrt(one_es);
            this.radius_p2 = one_es;
            this.radius_p_inv2 = rone_es;
            this.shape = "ellipse";
          } else {
            this.radius_p = 1;
            this.radius_p2 = 1;
            this.radius_p_inv2 = 1;
            this.shape = "sphere";
          }
          if (!this.title) {
            this.title = "Geostationary Satellite View";
          }
        }
        function forward$1(p) {
          var lon = p.x;
          var lat = p.y;
          var tmp, v_x, v_y, v_z;
          lon = lon - this.long0;
          if (this.shape === "ellipse") {
            lat = Math.atan(this.radius_p2 * Math.tan(lat));
            var r = this.radius_p / hypot(this.radius_p * Math.cos(lat), Math.sin(lat));
            v_x = r * Math.cos(lon) * Math.cos(lat);
            v_y = r * Math.sin(lon) * Math.cos(lat);
            v_z = r * Math.sin(lat);
            if ((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2 < 0) {
              p.x = Number.NaN;
              p.y = Number.NaN;
              return p;
            }
            tmp = this.radius_g - v_x;
            if (this.flip_axis) {
              p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
              p.y = this.radius_g_1 * Math.atan(v_z / tmp);
            } else {
              p.x = this.radius_g_1 * Math.atan(v_y / tmp);
              p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
            }
          } else if (this.shape === "sphere") {
            tmp = Math.cos(lat);
            v_x = Math.cos(lon) * tmp;
            v_y = Math.sin(lon) * tmp;
            v_z = Math.sin(lat);
            tmp = this.radius_g - v_x;
            if (this.flip_axis) {
              p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
              p.y = this.radius_g_1 * Math.atan(v_z / tmp);
            } else {
              p.x = this.radius_g_1 * Math.atan(v_y / tmp);
              p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
            }
          }
          p.x = p.x * this.a;
          p.y = p.y * this.a;
          return p;
        }
        function inverse$1(p) {
          var v_x = -1;
          var v_y = 0;
          var v_z = 0;
          var a, b, det, k;
          p.x = p.x / this.a;
          p.y = p.y / this.a;
          if (this.shape === "ellipse") {
            if (this.flip_axis) {
              v_z = Math.tan(p.y / this.radius_g_1);
              v_y = Math.tan(p.x / this.radius_g_1) * hypot(1, v_z);
            } else {
              v_y = Math.tan(p.x / this.radius_g_1);
              v_z = Math.tan(p.y / this.radius_g_1) * hypot(1, v_y);
            }
            var v_zp = v_z / this.radius_p;
            a = v_y * v_y + v_zp * v_zp + v_x * v_x;
            b = 2 * this.radius_g * v_x;
            det = b * b - 4 * a * this.C;
            if (det < 0) {
              p.x = Number.NaN;
              p.y = Number.NaN;
              return p;
            }
            k = (-b - Math.sqrt(det)) / (2 * a);
            v_x = this.radius_g + k * v_x;
            v_y *= k;
            v_z *= k;
            p.x = Math.atan2(v_y, v_x);
            p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
            p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y));
          } else if (this.shape === "sphere") {
            if (this.flip_axis) {
              v_z = Math.tan(p.y / this.radius_g_1);
              v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1 + v_z * v_z);
            } else {
              v_y = Math.tan(p.x / this.radius_g_1);
              v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1 + v_y * v_y);
            }
            a = v_y * v_y + v_z * v_z + v_x * v_x;
            b = 2 * this.radius_g * v_x;
            det = b * b - 4 * a * this.C;
            if (det < 0) {
              p.x = Number.NaN;
              p.y = Number.NaN;
              return p;
            }
            k = (-b - Math.sqrt(det)) / (2 * a);
            v_x = this.radius_g + k * v_x;
            v_y *= k;
            v_z *= k;
            p.x = Math.atan2(v_y, v_x);
            p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
          }
          p.x = p.x + this.long0;
          return p;
        }
        var names$2 = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
        var geos = {
          init: init$2,
          forward: forward$1,
          inverse: inverse$1,
          names: names$2
        };
        var A1 = 1.340264, A2 = -0.081106, A3 = 893e-6, A4 = 3796e-6, M = Math.sqrt(3) / 2;
        function init$1() {
          this.es = 0;
          this.long0 = this.long0 !== void 0 ? this.long0 : 0;
        }
        function forward(p) {
          var lam = adjust_lon(p.x - this.long0);
          var phi = p.y;
          var paramLat = Math.asin(M * Math.sin(phi)), paramLatSq = paramLat * paramLat, paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
          p.x = lam * Math.cos(paramLat) / (M * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
          p.y = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
          p.x = this.a * p.x + this.x0;
          p.y = this.a * p.y + this.y0;
          return p;
        }
        function inverse(p) {
          p.x = (p.x - this.x0) / this.a;
          p.y = (p.y - this.y0) / this.a;
          var EPS = 1e-9, NITER = 12, paramLat = p.y, paramLatSq, paramLatPow6, fy, fpy, dlat, i;
          for (i = 0; i < NITER; ++i) {
            paramLatSq = paramLat * paramLat;
            paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
            fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - p.y;
            fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
            paramLat -= dlat = fy / fpy;
            if (Math.abs(dlat) < EPS) {
              break;
            }
          }
          paramLatSq = paramLat * paramLat;
          paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
          p.x = M * p.x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat);
          p.y = Math.asin(Math.sin(paramLat) / M);
          p.x = adjust_lon(p.x + this.long0);
          return p;
        }
        var names$1 = ["eqearth", "Equal Earth", "Equal_Earth"];
        var eqearth = {
          init: init$1,
          forward,
          inverse,
          names: names$1
        };
        var EPS10 = 1e-10;
        function init() {
          var c;
          this.phi1 = this.lat1;
          if (Math.abs(this.phi1) < EPS10) {
            throw new Error();
          }
          if (this.es) {
            this.en = pj_enfn(this.es);
            this.m1 = pj_mlfn(
              this.phi1,
              this.am1 = Math.sin(this.phi1),
              c = Math.cos(this.phi1),
              this.en
            );
            this.am1 = c / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1);
            this.inverse = e_inv;
            this.forward = e_fwd;
          } else {
            if (Math.abs(this.phi1) + EPS10 >= HALF_PI) {
              this.cphi1 = 0;
            } else {
              this.cphi1 = 1 / Math.tan(this.phi1);
            }
            this.inverse = s_inv;
            this.forward = s_fwd;
          }
        }
        function e_fwd(p) {
          var lam = adjust_lon(p.x - (this.long0 || 0));
          var phi = p.y;
          var rh, E, c;
          rh = this.am1 + this.m1 - pj_mlfn(phi, E = Math.sin(phi), c = Math.cos(phi), this.en);
          E = c * lam / (rh * Math.sqrt(1 - this.es * E * E));
          p.x = rh * Math.sin(E);
          p.y = this.am1 - rh * Math.cos(E);
          p.x = this.a * p.x + (this.x0 || 0);
          p.y = this.a * p.y + (this.y0 || 0);
          return p;
        }
        function e_inv(p) {
          p.x = (p.x - (this.x0 || 0)) / this.a;
          p.y = (p.y - (this.y0 || 0)) / this.a;
          var s, rh, lam, phi;
          rh = hypot(p.x, p.y = this.am1 - p.y);
          phi = pj_inv_mlfn(this.am1 + this.m1 - rh, this.es, this.en);
          if ((s = Math.abs(phi)) < HALF_PI) {
            s = Math.sin(phi);
            lam = rh * Math.atan2(p.x, p.y) * Math.sqrt(1 - this.es * s * s) / Math.cos(phi);
          } else if (Math.abs(s - HALF_PI) <= EPS10) {
            lam = 0;
          } else {
            throw new Error();
          }
          p.x = adjust_lon(lam + (this.long0 || 0));
          p.y = adjust_lat(phi);
          return p;
        }
        function s_fwd(p) {
          var lam = adjust_lon(p.x - (this.long0 || 0));
          var phi = p.y;
          var E, rh;
          rh = this.cphi1 + this.phi1 - phi;
          if (Math.abs(rh) > EPS10) {
            p.x = rh * Math.sin(E = lam * Math.cos(phi) / rh);
            p.y = this.cphi1 - rh * Math.cos(E);
          } else {
            p.x = p.y = 0;
          }
          p.x = this.a * p.x + (this.x0 || 0);
          p.y = this.a * p.y + (this.y0 || 0);
          return p;
        }
        function s_inv(p) {
          p.x = (p.x - (this.x0 || 0)) / this.a;
          p.y = (p.y - (this.y0 || 0)) / this.a;
          var lam, phi;
          var rh = hypot(p.x, p.y = this.cphi1 - p.y);
          phi = this.cphi1 + this.phi1 - rh;
          if (Math.abs(phi) > HALF_PI) {
            throw new Error();
          }
          if (Math.abs(Math.abs(phi) - HALF_PI) <= EPS10) {
            lam = 0;
          } else {
            lam = rh * Math.atan2(p.x, p.y) / Math.cos(phi);
          }
          p.x = adjust_lon(lam + (this.long0 || 0));
          p.y = adjust_lat(phi);
          return p;
        }
        var names = ["bonne", "Bonne (Werner lat_1=90)"];
        var bonne = {
          init,
          names
        };
        function includedProjections(proj42) {
          proj42.Proj.projections.add(tmerc);
          proj42.Proj.projections.add(etmerc);
          proj42.Proj.projections.add(utm);
          proj42.Proj.projections.add(sterea);
          proj42.Proj.projections.add(stere);
          proj42.Proj.projections.add(somerc);
          proj42.Proj.projections.add(omerc);
          proj42.Proj.projections.add(lcc);
          proj42.Proj.projections.add(krovak);
          proj42.Proj.projections.add(cass);
          proj42.Proj.projections.add(laea);
          proj42.Proj.projections.add(aea);
          proj42.Proj.projections.add(gnom);
          proj42.Proj.projections.add(cea);
          proj42.Proj.projections.add(eqc);
          proj42.Proj.projections.add(poly);
          proj42.Proj.projections.add(nzmg);
          proj42.Proj.projections.add(mill);
          proj42.Proj.projections.add(sinu);
          proj42.Proj.projections.add(moll);
          proj42.Proj.projections.add(eqdc);
          proj42.Proj.projections.add(vandg);
          proj42.Proj.projections.add(aeqd);
          proj42.Proj.projections.add(ortho);
          proj42.Proj.projections.add(qsc);
          proj42.Proj.projections.add(robin);
          proj42.Proj.projections.add(geocent);
          proj42.Proj.projections.add(tpers);
          proj42.Proj.projections.add(geos);
          proj42.Proj.projections.add(eqearth);
          proj42.Proj.projections.add(bonne);
        }
        proj4.defaultDatum = "WGS84";
        proj4.Proj = Projection;
        proj4.WGS84 = new proj4.Proj("WGS84");
        proj4.Point = Point;
        proj4.toPoint = common;
        proj4.defs = defs;
        proj4.nadgrid = nadgrid;
        proj4.transform = transform;
        proj4.mgrs = mgrs;
        proj4.version = "2.17.0";
        includedProjections(proj4);
        return proj4;
      });
    }
  });

  // node_modules/rbush/rbush.min.js
  var require_rbush_min = __commonJS({
    "node_modules/rbush/rbush.min.js"(exports, module) {
      !function(t, i) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = t || self).RBush = i();
      }(exports, function() {
        "use strict";
        function t(t2, r2, e2, a2, h2) {
          !function t3(n2, r3, e3, a3, h3) {
            for (; a3 > e3; ) {
              if (a3 - e3 > 600) {
                var o2 = a3 - e3 + 1, s2 = r3 - e3 + 1, l2 = Math.log(o2), f2 = 0.5 * Math.exp(2 * l2 / 3), u2 = 0.5 * Math.sqrt(l2 * f2 * (o2 - f2) / o2) * (s2 - o2 / 2 < 0 ? -1 : 1), m2 = Math.max(e3, Math.floor(r3 - s2 * f2 / o2 + u2)), c2 = Math.min(a3, Math.floor(r3 + (o2 - s2) * f2 / o2 + u2));
                t3(n2, r3, m2, c2, h3);
              }
              var p2 = n2[r3], d2 = e3, x = a3;
              for (i(n2, e3, r3), h3(n2[a3], p2) > 0 && i(n2, e3, a3); d2 < x; ) {
                for (i(n2, d2, x), d2++, x--; h3(n2[d2], p2) < 0; ) d2++;
                for (; h3(n2[x], p2) > 0; ) x--;
              }
              0 === h3(n2[e3], p2) ? i(n2, e3, x) : i(n2, ++x, a3), x <= r3 && (e3 = x + 1), r3 <= x && (a3 = x - 1);
            }
          }(t2, r2, e2 || 0, a2 || t2.length - 1, h2 || n);
        }
        function i(t2, i2, n2) {
          var r2 = t2[i2];
          t2[i2] = t2[n2], t2[n2] = r2;
        }
        function n(t2, i2) {
          return t2 < i2 ? -1 : t2 > i2 ? 1 : 0;
        }
        var r = function(t2) {
          void 0 === t2 && (t2 = 9), this._maxEntries = Math.max(4, t2), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
        };
        function e(t2, i2, n2) {
          if (!n2) return i2.indexOf(t2);
          for (var r2 = 0; r2 < i2.length; r2++) if (n2(t2, i2[r2])) return r2;
          return -1;
        }
        function a(t2, i2) {
          h(t2, 0, t2.children.length, i2, t2);
        }
        function h(t2, i2, n2, r2, e2) {
          e2 || (e2 = p(null)), e2.minX = 1 / 0, e2.minY = 1 / 0, e2.maxX = -1 / 0, e2.maxY = -1 / 0;
          for (var a2 = i2; a2 < n2; a2++) {
            var h2 = t2.children[a2];
            o(e2, t2.leaf ? r2(h2) : h2);
          }
          return e2;
        }
        function o(t2, i2) {
          return t2.minX = Math.min(t2.minX, i2.minX), t2.minY = Math.min(t2.minY, i2.minY), t2.maxX = Math.max(t2.maxX, i2.maxX), t2.maxY = Math.max(t2.maxY, i2.maxY), t2;
        }
        function s(t2, i2) {
          return t2.minX - i2.minX;
        }
        function l(t2, i2) {
          return t2.minY - i2.minY;
        }
        function f(t2) {
          return (t2.maxX - t2.minX) * (t2.maxY - t2.minY);
        }
        function u(t2) {
          return t2.maxX - t2.minX + (t2.maxY - t2.minY);
        }
        function m(t2, i2) {
          return t2.minX <= i2.minX && t2.minY <= i2.minY && i2.maxX <= t2.maxX && i2.maxY <= t2.maxY;
        }
        function c(t2, i2) {
          return i2.minX <= t2.maxX && i2.minY <= t2.maxY && i2.maxX >= t2.minX && i2.maxY >= t2.minY;
        }
        function p(t2) {
          return { children: t2, height: 1, leaf: true, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
        }
        function d(i2, n2, r2, e2, a2) {
          for (var h2 = [n2, r2]; h2.length; ) if (!((r2 = h2.pop()) - (n2 = h2.pop()) <= e2)) {
            var o2 = n2 + Math.ceil((r2 - n2) / e2 / 2) * e2;
            t(i2, o2, n2, r2, a2), h2.push(n2, o2, o2, r2);
          }
        }
        return r.prototype.all = function() {
          return this._all(this.data, []);
        }, r.prototype.search = function(t2) {
          var i2 = this.data, n2 = [];
          if (!c(t2, i2)) return n2;
          for (var r2 = this.toBBox, e2 = []; i2; ) {
            for (var a2 = 0; a2 < i2.children.length; a2++) {
              var h2 = i2.children[a2], o2 = i2.leaf ? r2(h2) : h2;
              c(t2, o2) && (i2.leaf ? n2.push(h2) : m(t2, o2) ? this._all(h2, n2) : e2.push(h2));
            }
            i2 = e2.pop();
          }
          return n2;
        }, r.prototype.collides = function(t2) {
          var i2 = this.data;
          if (!c(t2, i2)) return false;
          for (var n2 = []; i2; ) {
            for (var r2 = 0; r2 < i2.children.length; r2++) {
              var e2 = i2.children[r2], a2 = i2.leaf ? this.toBBox(e2) : e2;
              if (c(t2, a2)) {
                if (i2.leaf || m(t2, a2)) return true;
                n2.push(e2);
              }
            }
            i2 = n2.pop();
          }
          return false;
        }, r.prototype.load = function(t2) {
          if (!t2 || !t2.length) return this;
          if (t2.length < this._minEntries) {
            for (var i2 = 0; i2 < t2.length; i2++) this.insert(t2[i2]);
            return this;
          }
          var n2 = this._build(t2.slice(), 0, t2.length - 1, 0);
          if (this.data.children.length) if (this.data.height === n2.height) this._splitRoot(this.data, n2);
          else {
            if (this.data.height < n2.height) {
              var r2 = this.data;
              this.data = n2, n2 = r2;
            }
            this._insert(n2, this.data.height - n2.height - 1, true);
          }
          else this.data = n2;
          return this;
        }, r.prototype.insert = function(t2) {
          return t2 && this._insert(t2, this.data.height - 1), this;
        }, r.prototype.clear = function() {
          return this.data = p([]), this;
        }, r.prototype.remove = function(t2, i2) {
          if (!t2) return this;
          for (var n2, r2, a2, h2 = this.data, o2 = this.toBBox(t2), s2 = [], l2 = []; h2 || s2.length; ) {
            if (h2 || (h2 = s2.pop(), r2 = s2[s2.length - 1], n2 = l2.pop(), a2 = true), h2.leaf) {
              var f2 = e(t2, h2.children, i2);
              if (-1 !== f2) return h2.children.splice(f2, 1), s2.push(h2), this._condense(s2), this;
            }
            a2 || h2.leaf || !m(h2, o2) ? r2 ? (n2++, h2 = r2.children[n2], a2 = false) : h2 = null : (s2.push(h2), l2.push(n2), n2 = 0, r2 = h2, h2 = h2.children[0]);
          }
          return this;
        }, r.prototype.toBBox = function(t2) {
          return t2;
        }, r.prototype.compareMinX = function(t2, i2) {
          return t2.minX - i2.minX;
        }, r.prototype.compareMinY = function(t2, i2) {
          return t2.minY - i2.minY;
        }, r.prototype.toJSON = function() {
          return this.data;
        }, r.prototype.fromJSON = function(t2) {
          return this.data = t2, this;
        }, r.prototype._all = function(t2, i2) {
          for (var n2 = []; t2; ) t2.leaf ? i2.push.apply(i2, t2.children) : n2.push.apply(n2, t2.children), t2 = n2.pop();
          return i2;
        }, r.prototype._build = function(t2, i2, n2, r2) {
          var e2, h2 = n2 - i2 + 1, o2 = this._maxEntries;
          if (h2 <= o2) return a(e2 = p(t2.slice(i2, n2 + 1)), this.toBBox), e2;
          r2 || (r2 = Math.ceil(Math.log(h2) / Math.log(o2)), o2 = Math.ceil(h2 / Math.pow(o2, r2 - 1))), (e2 = p([])).leaf = false, e2.height = r2;
          var s2 = Math.ceil(h2 / o2), l2 = s2 * Math.ceil(Math.sqrt(o2));
          d(t2, i2, n2, l2, this.compareMinX);
          for (var f2 = i2; f2 <= n2; f2 += l2) {
            var u2 = Math.min(f2 + l2 - 1, n2);
            d(t2, f2, u2, s2, this.compareMinY);
            for (var m2 = f2; m2 <= u2; m2 += s2) {
              var c2 = Math.min(m2 + s2 - 1, u2);
              e2.children.push(this._build(t2, m2, c2, r2 - 1));
            }
          }
          return a(e2, this.toBBox), e2;
        }, r.prototype._chooseSubtree = function(t2, i2, n2, r2) {
          for (; r2.push(i2), !i2.leaf && r2.length - 1 !== n2; ) {
            for (var e2 = 1 / 0, a2 = 1 / 0, h2 = void 0, o2 = 0; o2 < i2.children.length; o2++) {
              var s2 = i2.children[o2], l2 = f(s2), u2 = (m2 = t2, c2 = s2, (Math.max(c2.maxX, m2.maxX) - Math.min(c2.minX, m2.minX)) * (Math.max(c2.maxY, m2.maxY) - Math.min(c2.minY, m2.minY)) - l2);
              u2 < a2 ? (a2 = u2, e2 = l2 < e2 ? l2 : e2, h2 = s2) : u2 === a2 && l2 < e2 && (e2 = l2, h2 = s2);
            }
            i2 = h2 || i2.children[0];
          }
          var m2, c2;
          return i2;
        }, r.prototype._insert = function(t2, i2, n2) {
          var r2 = n2 ? t2 : this.toBBox(t2), e2 = [], a2 = this._chooseSubtree(r2, this.data, i2, e2);
          for (a2.children.push(t2), o(a2, r2); i2 >= 0 && e2[i2].children.length > this._maxEntries; ) this._split(e2, i2), i2--;
          this._adjustParentBBoxes(r2, e2, i2);
        }, r.prototype._split = function(t2, i2) {
          var n2 = t2[i2], r2 = n2.children.length, e2 = this._minEntries;
          this._chooseSplitAxis(n2, e2, r2);
          var h2 = this._chooseSplitIndex(n2, e2, r2), o2 = p(n2.children.splice(h2, n2.children.length - h2));
          o2.height = n2.height, o2.leaf = n2.leaf, a(n2, this.toBBox), a(o2, this.toBBox), i2 ? t2[i2 - 1].children.push(o2) : this._splitRoot(n2, o2);
        }, r.prototype._splitRoot = function(t2, i2) {
          this.data = p([t2, i2]), this.data.height = t2.height + 1, this.data.leaf = false, a(this.data, this.toBBox);
        }, r.prototype._chooseSplitIndex = function(t2, i2, n2) {
          for (var r2, e2, a2, o2, s2, l2, u2, m2 = 1 / 0, c2 = 1 / 0, p2 = i2; p2 <= n2 - i2; p2++) {
            var d2 = h(t2, 0, p2, this.toBBox), x = h(t2, p2, n2, this.toBBox), v = (e2 = d2, a2 = x, o2 = void 0, s2 = void 0, l2 = void 0, u2 = void 0, o2 = Math.max(e2.minX, a2.minX), s2 = Math.max(e2.minY, a2.minY), l2 = Math.min(e2.maxX, a2.maxX), u2 = Math.min(e2.maxY, a2.maxY), Math.max(0, l2 - o2) * Math.max(0, u2 - s2)), M = f(d2) + f(x);
            v < m2 ? (m2 = v, r2 = p2, c2 = M < c2 ? M : c2) : v === m2 && M < c2 && (c2 = M, r2 = p2);
          }
          return r2 || n2 - i2;
        }, r.prototype._chooseSplitAxis = function(t2, i2, n2) {
          var r2 = t2.leaf ? this.compareMinX : s, e2 = t2.leaf ? this.compareMinY : l;
          this._allDistMargin(t2, i2, n2, r2) < this._allDistMargin(t2, i2, n2, e2) && t2.children.sort(r2);
        }, r.prototype._allDistMargin = function(t2, i2, n2, r2) {
          t2.children.sort(r2);
          for (var e2 = this.toBBox, a2 = h(t2, 0, i2, e2), s2 = h(t2, n2 - i2, n2, e2), l2 = u(a2) + u(s2), f2 = i2; f2 < n2 - i2; f2++) {
            var m2 = t2.children[f2];
            o(a2, t2.leaf ? e2(m2) : m2), l2 += u(a2);
          }
          for (var c2 = n2 - i2 - 1; c2 >= i2; c2--) {
            var p2 = t2.children[c2];
            o(s2, t2.leaf ? e2(p2) : p2), l2 += u(s2);
          }
          return l2;
        }, r.prototype._adjustParentBBoxes = function(t2, i2, n2) {
          for (var r2 = n2; r2 >= 0; r2--) o(i2[r2], t2);
        }, r.prototype._condense = function(t2) {
          for (var i2 = t2.length - 1, n2 = void 0; i2 >= 0; i2--) 0 === t2[i2].children.length ? i2 > 0 ? (n2 = t2[i2 - 1].children).splice(n2.indexOf(t2[i2]), 1) : this.clear() : a(t2[i2], this.toBBox);
        }, r;
      });
    }
  });

  // node_modules/tinyqueue/tinyqueue.js
  var require_tinyqueue = __commonJS({
    "node_modules/tinyqueue/tinyqueue.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.TinyQueue = factory());
      })(exports, function() {
        "use strict";
        var TinyQueue = function TinyQueue2(data, compare) {
          if (data === void 0) data = [];
          if (compare === void 0) compare = defaultCompare;
          this.data = data;
          this.length = this.data.length;
          this.compare = compare;
          if (this.length > 0) {
            for (var i = (this.length >> 1) - 1; i >= 0; i--) {
              this._down(i);
            }
          }
        };
        TinyQueue.prototype.push = function push(item) {
          this.data.push(item);
          this.length++;
          this._up(this.length - 1);
        };
        TinyQueue.prototype.pop = function pop() {
          if (this.length === 0) {
            return void 0;
          }
          var top = this.data[0];
          var bottom = this.data.pop();
          this.length--;
          if (this.length > 0) {
            this.data[0] = bottom;
            this._down(0);
          }
          return top;
        };
        TinyQueue.prototype.peek = function peek() {
          return this.data[0];
        };
        TinyQueue.prototype._up = function _up(pos) {
          var ref = this;
          var data = ref.data;
          var compare = ref.compare;
          var item = data[pos];
          while (pos > 0) {
            var parent = pos - 1 >> 1;
            var current = data[parent];
            if (compare(item, current) >= 0) {
              break;
            }
            data[pos] = current;
            pos = parent;
          }
          data[pos] = item;
        };
        TinyQueue.prototype._down = function _down(pos) {
          var ref = this;
          var data = ref.data;
          var compare = ref.compare;
          var halfLength = this.length >> 1;
          var item = data[pos];
          while (pos < halfLength) {
            var left = (pos << 1) + 1;
            var best = data[left];
            var right = left + 1;
            if (right < this.length && compare(data[right], best) < 0) {
              left = right;
              best = data[right];
            }
            if (compare(best, item) >= 0) {
              break;
            }
            data[pos] = best;
            pos = left;
          }
          data[pos] = item;
        };
        function defaultCompare(a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        }
        return TinyQueue;
      });
    }
  });

  // node_modules/point-in-polygon/flat.js
  var require_flat = __commonJS({
    "node_modules/point-in-polygon/flat.js"(exports, module) {
      module.exports = function pointInPolygonFlat(point, vs, start, end) {
        var x = point[0], y = point[1];
        var inside = false;
        if (start === void 0) start = 0;
        if (end === void 0) end = vs.length;
        var len = (end - start) / 2;
        for (var i = 0, j = len - 1; i < len; j = i++) {
          var xi = vs[start + i * 2 + 0], yi = vs[start + i * 2 + 1];
          var xj = vs[start + j * 2 + 0], yj = vs[start + j * 2 + 1];
          var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
        return inside;
      };
    }
  });

  // node_modules/point-in-polygon/nested.js
  var require_nested = __commonJS({
    "node_modules/point-in-polygon/nested.js"(exports, module) {
      module.exports = function pointInPolygonNested(point, vs, start, end) {
        var x = point[0], y = point[1];
        var inside = false;
        if (start === void 0) start = 0;
        if (end === void 0) end = vs.length;
        var len = end - start;
        for (var i = 0, j = len - 1; i < len; j = i++) {
          var xi = vs[i + start][0], yi = vs[i + start][1];
          var xj = vs[j + start][0], yj = vs[j + start][1];
          var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
        return inside;
      };
    }
  });

  // node_modules/point-in-polygon/index.js
  var require_point_in_polygon = __commonJS({
    "node_modules/point-in-polygon/index.js"(exports, module) {
      var pointInPolygonFlat = require_flat();
      var pointInPolygonNested = require_nested();
      module.exports = function pointInPolygon(point, vs, start, end) {
        if (vs.length > 0 && Array.isArray(vs[0])) {
          return pointInPolygonNested(point, vs, start, end);
        } else {
          return pointInPolygonFlat(point, vs, start, end);
        }
      };
      module.exports.nested = pointInPolygonNested;
      module.exports.flat = pointInPolygonFlat;
    }
  });

  // node_modules/robust-predicates/umd/orient2d.min.js
  var require_orient2d_min = __commonJS({
    "node_modules/robust-predicates/umd/orient2d.min.js"(exports, module) {
      !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).predicates = {});
      }(exports, function(t) {
        "use strict";
        const e = 134217729, n = 33306690738754706e-32;
        function r(t2, e2, n2, r2, o2) {
          let f2, i2, u2, c2, s2 = e2[0], a2 = r2[0], d2 = 0, l2 = 0;
          a2 > s2 == a2 > -s2 ? (f2 = s2, s2 = e2[++d2]) : (f2 = a2, a2 = r2[++l2]);
          let p = 0;
          if (d2 < t2 && l2 < n2) for (a2 > s2 == a2 > -s2 ? (u2 = f2 - ((i2 = s2 + f2) - s2), s2 = e2[++d2]) : (u2 = f2 - ((i2 = a2 + f2) - a2), a2 = r2[++l2]), f2 = i2, 0 !== u2 && (o2[p++] = u2); d2 < t2 && l2 < n2; ) a2 > s2 == a2 > -s2 ? (u2 = f2 - ((i2 = f2 + s2) - (c2 = i2 - f2)) + (s2 - c2), s2 = e2[++d2]) : (u2 = f2 - ((i2 = f2 + a2) - (c2 = i2 - f2)) + (a2 - c2), a2 = r2[++l2]), f2 = i2, 0 !== u2 && (o2[p++] = u2);
          for (; d2 < t2; ) u2 = f2 - ((i2 = f2 + s2) - (c2 = i2 - f2)) + (s2 - c2), s2 = e2[++d2], f2 = i2, 0 !== u2 && (o2[p++] = u2);
          for (; l2 < n2; ) u2 = f2 - ((i2 = f2 + a2) - (c2 = i2 - f2)) + (a2 - c2), a2 = r2[++l2], f2 = i2, 0 !== u2 && (o2[p++] = u2);
          return 0 === f2 && 0 !== p || (o2[p++] = f2), p;
        }
        function o(t2) {
          return new Float64Array(t2);
        }
        const f = 33306690738754716e-32, i = 22204460492503146e-32, u = 11093356479670487e-47, c = o(4), s = o(8), a = o(12), d = o(16), l = o(4);
        t.orient2d = function(t2, o2, p, b, y, h) {
          const M = (o2 - h) * (p - y), x = (t2 - y) * (b - h), j = M - x;
          if (0 === M || 0 === x || M > 0 != x > 0) return j;
          const m = Math.abs(M + x);
          return Math.abs(j) >= f * m ? j : -function(t3, o3, f2, p2, b2, y2, h2) {
            let M2, x2, j2, m2, _, v, w, A, F, O, P, g, k, q, z, B, C, D;
            const E = t3 - b2, G = f2 - b2, H = o3 - y2, I = p2 - y2;
            _ = (z = (A = E - (w = (v = e * E) - (v - E))) * (O = I - (F = (v = e * I) - (v - I))) - ((q = E * I) - w * F - A * F - w * O)) - (P = z - (C = (A = H - (w = (v = e * H) - (v - H))) * (O = G - (F = (v = e * G) - (v - G))) - ((B = H * G) - w * F - A * F - w * O))), c[0] = z - (P + _) + (_ - C), _ = (k = q - ((g = q + P) - (_ = g - q)) + (P - _)) - (P = k - B), c[1] = k - (P + _) + (_ - B), _ = (D = g + P) - g, c[2] = g - (D - _) + (P - _), c[3] = D;
            let J = function(t4, e2) {
              let n2 = e2[0];
              for (let r2 = 1; r2 < t4; r2++) n2 += e2[r2];
              return n2;
            }(4, c), K = i * h2;
            if (J >= K || -J >= K) return J;
            if (M2 = t3 - (E + (_ = t3 - E)) + (_ - b2), j2 = f2 - (G + (_ = f2 - G)) + (_ - b2), x2 = o3 - (H + (_ = o3 - H)) + (_ - y2), m2 = p2 - (I + (_ = p2 - I)) + (_ - y2), 0 === M2 && 0 === x2 && 0 === j2 && 0 === m2) return J;
            if (K = u * h2 + n * Math.abs(J), (J += E * m2 + I * M2 - (H * j2 + G * x2)) >= K || -J >= K) return J;
            _ = (z = (A = M2 - (w = (v = e * M2) - (v - M2))) * (O = I - (F = (v = e * I) - (v - I))) - ((q = M2 * I) - w * F - A * F - w * O)) - (P = z - (C = (A = x2 - (w = (v = e * x2) - (v - x2))) * (O = G - (F = (v = e * G) - (v - G))) - ((B = x2 * G) - w * F - A * F - w * O))), l[0] = z - (P + _) + (_ - C), _ = (k = q - ((g = q + P) - (_ = g - q)) + (P - _)) - (P = k - B), l[1] = k - (P + _) + (_ - B), _ = (D = g + P) - g, l[2] = g - (D - _) + (P - _), l[3] = D;
            const L = r(4, c, 4, l, s);
            _ = (z = (A = E - (w = (v = e * E) - (v - E))) * (O = m2 - (F = (v = e * m2) - (v - m2))) - ((q = E * m2) - w * F - A * F - w * O)) - (P = z - (C = (A = H - (w = (v = e * H) - (v - H))) * (O = j2 - (F = (v = e * j2) - (v - j2))) - ((B = H * j2) - w * F - A * F - w * O))), l[0] = z - (P + _) + (_ - C), _ = (k = q - ((g = q + P) - (_ = g - q)) + (P - _)) - (P = k - B), l[1] = k - (P + _) + (_ - B), _ = (D = g + P) - g, l[2] = g - (D - _) + (P - _), l[3] = D;
            const N = r(L, s, 4, l, a);
            _ = (z = (A = M2 - (w = (v = e * M2) - (v - M2))) * (O = m2 - (F = (v = e * m2) - (v - m2))) - ((q = M2 * m2) - w * F - A * F - w * O)) - (P = z - (C = (A = x2 - (w = (v = e * x2) - (v - x2))) * (O = j2 - (F = (v = e * j2) - (v - j2))) - ((B = x2 * j2) - w * F - A * F - w * O))), l[0] = z - (P + _) + (_ - C), _ = (k = q - ((g = q + P) - (_ = g - q)) + (P - _)) - (P = k - B), l[1] = k - (P + _) + (_ - B), _ = (D = g + P) - g, l[2] = g - (D - _) + (P - _), l[3] = D;
            const Q = r(N, a, 4, l, d);
            return d[Q - 1];
          }(t2, o2, p, b, y, h, m);
        }, t.orient2dfast = function(t2, e2, n2, r2, o2, f2) {
          return (e2 - f2) * (n2 - o2) - (t2 - o2) * (r2 - f2);
        }, Object.defineProperty(t, "__esModule", { value: true });
      });
    }
  });

  // node_modules/concaveman/index.js
  var require_concaveman = __commonJS({
    "node_modules/concaveman/index.js"(exports, module) {
      "use strict";
      var RBush = require_rbush_min();
      var Queue = require_tinyqueue();
      var pointInPolygon = require_point_in_polygon();
      var orient = require_orient2d_min().orient2d;
      if (Queue.default) {
        Queue = Queue.default;
      }
      module.exports = concaveman;
      module.exports.default = concaveman;
      function concaveman(points, concavity, lengthThreshold) {
        concavity = Math.max(0, concavity === void 0 ? 2 : concavity);
        lengthThreshold = lengthThreshold || 0;
        var hull = fastConvexHull(points);
        var tree = new RBush(16);
        tree.toBBox = function(a2) {
          return {
            minX: a2[0],
            minY: a2[1],
            maxX: a2[0],
            maxY: a2[1]
          };
        };
        tree.compareMinX = function(a2, b2) {
          return a2[0] - b2[0];
        };
        tree.compareMinY = function(a2, b2) {
          return a2[1] - b2[1];
        };
        tree.load(points);
        var queue = [];
        for (var i = 0, last; i < hull.length; i++) {
          var p = hull[i];
          tree.remove(p);
          last = insertNode(p, last);
          queue.push(last);
        }
        var segTree = new RBush(16);
        for (i = 0; i < queue.length; i++) segTree.insert(updateBBox(queue[i]));
        var sqConcavity = concavity * concavity;
        var sqLenThreshold = lengthThreshold * lengthThreshold;
        while (queue.length) {
          var node = queue.shift();
          var a = node.p;
          var b = node.next.p;
          var sqLen = getSqDist(a, b);
          if (sqLen < sqLenThreshold) continue;
          var maxSqLen = sqLen / sqConcavity;
          p = findCandidate(tree, node.prev.p, a, b, node.next.next.p, maxSqLen, segTree);
          if (p && Math.min(getSqDist(p, a), getSqDist(p, b)) <= maxSqLen) {
            queue.push(node);
            queue.push(insertNode(p, node));
            tree.remove(p);
            segTree.remove(node);
            segTree.insert(updateBBox(node));
            segTree.insert(updateBBox(node.next));
          }
        }
        node = last;
        var concave = [];
        do {
          concave.push(node.p);
          node = node.next;
        } while (node !== last);
        concave.push(node.p);
        return concave;
      }
      function findCandidate(tree, a, b, c, d, maxDist, segTree) {
        var queue = new Queue([], compareDist);
        var node = tree.data;
        while (node) {
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            var dist = node.leaf ? sqSegDist(child, b, c) : sqSegBoxDist(b, c, child);
            if (dist > maxDist) continue;
            queue.push({
              node: child,
              dist
            });
          }
          while (queue.length && !queue.peek().node.children) {
            var item = queue.pop();
            var p = item.node;
            var d0 = sqSegDist(p, a, b);
            var d1 = sqSegDist(p, c, d);
            if (item.dist < d0 && item.dist < d1 && noIntersections(b, p, segTree) && noIntersections(c, p, segTree)) return p;
          }
          node = queue.pop();
          if (node) node = node.node;
        }
        return null;
      }
      function compareDist(a, b) {
        return a.dist - b.dist;
      }
      function sqSegBoxDist(a, b, bbox) {
        if (inside(a, bbox) || inside(b, bbox)) return 0;
        var d1 = sqSegSegDist(a[0], a[1], b[0], b[1], bbox.minX, bbox.minY, bbox.maxX, bbox.minY);
        if (d1 === 0) return 0;
        var d2 = sqSegSegDist(a[0], a[1], b[0], b[1], bbox.minX, bbox.minY, bbox.minX, bbox.maxY);
        if (d2 === 0) return 0;
        var d3 = sqSegSegDist(a[0], a[1], b[0], b[1], bbox.maxX, bbox.minY, bbox.maxX, bbox.maxY);
        if (d3 === 0) return 0;
        var d4 = sqSegSegDist(a[0], a[1], b[0], b[1], bbox.minX, bbox.maxY, bbox.maxX, bbox.maxY);
        if (d4 === 0) return 0;
        return Math.min(d1, d2, d3, d4);
      }
      function inside(a, bbox) {
        return a[0] >= bbox.minX && a[0] <= bbox.maxX && a[1] >= bbox.minY && a[1] <= bbox.maxY;
      }
      function noIntersections(a, b, segTree) {
        var minX = Math.min(a[0], b[0]);
        var minY = Math.min(a[1], b[1]);
        var maxX = Math.max(a[0], b[0]);
        var maxY = Math.max(a[1], b[1]);
        var edges = segTree.search({ minX, minY, maxX, maxY });
        for (var i = 0; i < edges.length; i++) {
          if (intersects(edges[i].p, edges[i].next.p, a, b)) return false;
        }
        return true;
      }
      function cross(p1, p2, p3) {
        return orient(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
      }
      function intersects(p1, q1, p2, q2) {
        return p1 !== q2 && q1 !== p2 && cross(p1, q1, p2) > 0 !== cross(p1, q1, q2) > 0 && cross(p2, q2, p1) > 0 !== cross(p2, q2, q1) > 0;
      }
      function updateBBox(node) {
        var p1 = node.p;
        var p2 = node.next.p;
        node.minX = Math.min(p1[0], p2[0]);
        node.minY = Math.min(p1[1], p2[1]);
        node.maxX = Math.max(p1[0], p2[0]);
        node.maxY = Math.max(p1[1], p2[1]);
        return node;
      }
      function fastConvexHull(points) {
        var left = points[0];
        var top = points[0];
        var right = points[0];
        var bottom = points[0];
        for (var i = 0; i < points.length; i++) {
          var p = points[i];
          if (p[0] < left[0]) left = p;
          if (p[0] > right[0]) right = p;
          if (p[1] < top[1]) top = p;
          if (p[1] > bottom[1]) bottom = p;
        }
        var cull = [left, top, right, bottom];
        var filtered = cull.slice();
        for (i = 0; i < points.length; i++) {
          if (!pointInPolygon(points[i], cull)) filtered.push(points[i]);
        }
        return convexHull(filtered);
      }
      function insertNode(p, prev) {
        var node = {
          p,
          prev: null,
          next: null,
          minX: 0,
          minY: 0,
          maxX: 0,
          maxY: 0
        };
        if (!prev) {
          node.prev = node;
          node.next = node;
        } else {
          node.next = prev.next;
          node.prev = prev;
          prev.next.prev = node;
          prev.next = node;
        }
        return node;
      }
      function getSqDist(p1, p2) {
        var dx = p1[0] - p2[0], dy = p1[1] - p2[1];
        return dx * dx + dy * dy;
      }
      function sqSegDist(p, p1, p2) {
        var x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
        if (dx !== 0 || dy !== 0) {
          var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
          if (t > 1) {
            x = p2[0];
            y = p2[1];
          } else if (t > 0) {
            x += dx * t;
            y += dy * t;
          }
        }
        dx = p[0] - x;
        dy = p[1] - y;
        return dx * dx + dy * dy;
      }
      function sqSegSegDist(x0, y0, x1, y1, x2, y2, x3, y3) {
        var ux = x1 - x0;
        var uy = y1 - y0;
        var vx = x3 - x2;
        var vy = y3 - y2;
        var wx = x0 - x2;
        var wy = y0 - y2;
        var a = ux * ux + uy * uy;
        var b = ux * vx + uy * vy;
        var c = vx * vx + vy * vy;
        var d = ux * wx + uy * wy;
        var e = vx * wx + vy * wy;
        var D = a * c - b * b;
        var sc, sN, tc, tN;
        var sD = D;
        var tD = D;
        if (D === 0) {
          sN = 0;
          sD = 1;
          tN = e;
          tD = c;
        } else {
          sN = b * e - c * d;
          tN = a * e - b * d;
          if (sN < 0) {
            sN = 0;
            tN = e;
            tD = c;
          } else if (sN > sD) {
            sN = sD;
            tN = e + b;
            tD = c;
          }
        }
        if (tN < 0) {
          tN = 0;
          if (-d < 0) sN = 0;
          else if (-d > a) sN = sD;
          else {
            sN = -d;
            sD = a;
          }
        } else if (tN > tD) {
          tN = tD;
          if (-d + b < 0) sN = 0;
          else if (-d + b > a) sN = sD;
          else {
            sN = -d + b;
            sD = a;
          }
        }
        sc = sN === 0 ? 0 : sN / sD;
        tc = tN === 0 ? 0 : tN / tD;
        var cx = (1 - sc) * x0 + sc * x1;
        var cy = (1 - sc) * y0 + sc * y1;
        var cx2 = (1 - tc) * x2 + tc * x3;
        var cy2 = (1 - tc) * y2 + tc * y3;
        var dx = cx2 - cx;
        var dy = cy2 - cy;
        return dx * dx + dy * dy;
      }
      function compareByX(a, b) {
        return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
      }
      function convexHull(points) {
        points.sort(compareByX);
        var lower = [];
        for (var i = 0; i < points.length; i++) {
          while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
            lower.pop();
          }
          lower.push(points[i]);
        }
        var upper = [];
        for (var ii = points.length - 1; ii >= 0; ii--) {
          while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[ii]) <= 0) {
            upper.pop();
          }
          upper.push(points[ii]);
        }
        upper.pop();
        lower.pop();
        return lower.concat(upper);
      }
    }
  });

  // node_modules/@turf/convex/dist/cjs/index.cjs
  var require_cjs6 = __commonJS({
    "node_modules/@turf/convex/dist/cjs/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _helpers = require_cjs3();
      var _meta = require_cjs4();
      var _concaveman = require_concaveman();
      var _concaveman2 = _interopRequireDefault(_concaveman);
      function convex(geojson, options = {}) {
        options.concavity = options.concavity || Infinity;
        const points = [];
        _meta.coordEach.call(void 0, geojson, (coord) => {
          points.push([coord[0], coord[1]]);
        });
        if (!points.length) {
          return null;
        }
        const convexHull = _concaveman2.default.call(void 0, points, options.concavity);
        if (convexHull.length > 3) {
          return _helpers.polygon.call(void 0, [convexHull]);
        }
        return null;
      }
      var turf_convex_default = convex;
      exports.convex = convex;
      exports.default = turf_convex_default;
    }
  });

  // node_modules/@turf/difference/dist/cjs/index.cjs
  var require_cjs7 = __commonJS({
    "node_modules/@turf/difference/dist/cjs/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = obj[key];
              }
            }
          }
          newObj.default = obj;
          return newObj;
        }
      }
      var _polyclipts = require_cjs2();
      var polyclip = _interopRequireWildcard(_polyclipts);
      var _helpers = require_cjs3();
      var _meta = require_cjs4();
      function difference2(features) {
        const geoms = [];
        _meta.geomEach.call(void 0, features, (geom) => {
          geoms.push(geom.coordinates);
        });
        if (geoms.length < 2) {
          throw new Error("Must have at least two features");
        }
        const properties = features.features[0].properties || {};
        const differenced = polyclip.difference(geoms[0], ...geoms.slice(1));
        if (differenced.length === 0) return null;
        if (differenced.length === 1) return _helpers.polygon.call(void 0, differenced[0], properties);
        return _helpers.multiPolygon.call(void 0, differenced, properties);
      }
      var turf_difference_default = difference2;
      exports.default = turf_difference_default;
      exports.difference = difference2;
    }
  });

  // node_modules/@turf/bbox/dist/cjs/index.cjs
  var require_cjs8 = __commonJS({
    "node_modules/@turf/bbox/dist/cjs/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _meta = require_cjs4();
      function bbox(geojson, options = {}) {
        if (geojson.bbox != null && true !== options.recompute) {
          return geojson.bbox;
        }
        const result2 = [Infinity, Infinity, -Infinity, -Infinity];
        _meta.coordEach.call(void 0, geojson, (coord) => {
          if (result2[0] > coord[0]) {
            result2[0] = coord[0];
          }
          if (result2[1] > coord[1]) {
            result2[1] = coord[1];
          }
          if (result2[2] < coord[0]) {
            result2[2] = coord[0];
          }
          if (result2[3] < coord[1]) {
            result2[3] = coord[1];
          }
        });
        return result2;
      }
      var turf_bbox_default = bbox;
      exports.bbox = bbox;
      exports.default = turf_bbox_default;
    }
  });

  // node_modules/@turf/center/dist/cjs/index.cjs
  var require_cjs9 = __commonJS({
    "node_modules/@turf/center/dist/cjs/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _bbox = require_cjs8();
      var _helpers = require_cjs3();
      function center(geojson, options = {}) {
        const ext = _bbox.bbox.call(void 0, geojson);
        const x = (ext[0] + ext[2]) / 2;
        const y = (ext[1] + ext[3]) / 2;
        return _helpers.point.call(void 0, [x, y], options.properties, options);
      }
      var turf_center_default = center;
      exports.center = center;
      exports.default = turf_center_default;
    }
  });

  // node_modules/suncalc/suncalc.js
  var require_suncalc = __commonJS({
    "node_modules/suncalc/suncalc.js"(exports, module) {
      (function() {
        "use strict";
        var PI = Math.PI, sin = Math.sin, cos = Math.cos, tan = Math.tan, asin = Math.asin, atan = Math.atan2, acos = Math.acos, rad = PI / 180;
        var dayMs = 1e3 * 60 * 60 * 24, J1970 = 2440588, J2000 = 2451545;
        function toJulian(date) {
          return date.valueOf() / dayMs - 0.5 + J1970;
        }
        function fromJulian(j) {
          return new Date((j + 0.5 - J1970) * dayMs);
        }
        function toDays(date) {
          return toJulian(date) - J2000;
        }
        var e = rad * 23.4397;
        function rightAscension(l, b) {
          return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
        }
        function declination(l, b) {
          return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
        }
        function azimuth(H, phi, dec) {
          return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
        }
        function altitude(H, phi, dec) {
          return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
        }
        function siderealTime(d, lw) {
          return rad * (280.16 + 360.9856235 * d) - lw;
        }
        function astroRefraction(h) {
          if (h < 0)
            h = 0;
          return 2967e-7 / Math.tan(h + 312536e-8 / (h + 0.08901179));
        }
        function solarMeanAnomaly(d) {
          return rad * (357.5291 + 0.98560028 * d);
        }
        function eclipticLongitude(M) {
          var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 3e-4 * sin(3 * M)), P = rad * 102.9372;
          return M + C + P + PI;
        }
        function sunCoords(d) {
          var M = solarMeanAnomaly(d), L = eclipticLongitude(M);
          return {
            dec: declination(L, 0),
            ra: rightAscension(L, 0)
          };
        }
        var SunCalc = {};
        SunCalc.getPosition = function(date, lat, lng) {
          var lw = rad * -lng, phi = rad * lat, d = toDays(date), c = sunCoords(d), H = siderealTime(d, lw) - c.ra;
          return {
            azimuth: azimuth(H, phi, c.dec),
            altitude: altitude(H, phi, c.dec)
          };
        };
        var times = SunCalc.times = [
          [-0.833, "sunrise", "sunset"],
          [-0.3, "sunriseEnd", "sunsetStart"],
          [-6, "dawn", "dusk"],
          [-12, "nauticalDawn", "nauticalDusk"],
          [-18, "nightEnd", "night"],
          [6, "goldenHourEnd", "goldenHour"]
        ];
        SunCalc.addTime = function(angle, riseName, setName) {
          times.push([angle, riseName, setName]);
        };
        var J0 = 9e-4;
        function julianCycle(d, lw) {
          return Math.round(d - J0 - lw / (2 * PI));
        }
        function approxTransit(Ht, lw, n) {
          return J0 + (Ht + lw) / (2 * PI) + n;
        }
        function solarTransitJ(ds, M, L) {
          return J2000 + ds + 53e-4 * sin(M) - 69e-4 * sin(2 * L);
        }
        function hourAngle(h, phi, d) {
          return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
        }
        function observerAngle(height) {
          return -2.076 * Math.sqrt(height) / 60;
        }
        function getSetJ(h, lw, phi, dec, n, M, L) {
          var w = hourAngle(h, phi, dec), a = approxTransit(w, lw, n);
          return solarTransitJ(a, M, L);
        }
        SunCalc.getTimes = function(date, lat, lng, height) {
          height = height || 0;
          var lw = rad * -lng, phi = rad * lat, dh = observerAngle(height), d = toDays(date), n = julianCycle(d, lw), ds = approxTransit(0, lw, n), M = solarMeanAnomaly(ds), L = eclipticLongitude(M), dec = declination(L, 0), Jnoon = solarTransitJ(ds, M, L), i, len, time, h0, Jset, Jrise;
          var result2 = {
            solarNoon: fromJulian(Jnoon),
            nadir: fromJulian(Jnoon - 0.5)
          };
          for (i = 0, len = times.length; i < len; i += 1) {
            time = times[i];
            h0 = (time[0] + dh) * rad;
            Jset = getSetJ(h0, lw, phi, dec, n, M, L);
            Jrise = Jnoon - (Jset - Jnoon);
            result2[time[1]] = fromJulian(Jrise);
            result2[time[2]] = fromJulian(Jset);
          }
          return result2;
        };
        function moonCoords(d) {
          var L = rad * (218.316 + 13.176396 * d), M = rad * (134.963 + 13.064993 * d), F = rad * (93.272 + 13.22935 * d), l = L + rad * 6.289 * sin(M), b = rad * 5.128 * sin(F), dt = 385001 - 20905 * cos(M);
          return {
            ra: rightAscension(l, b),
            dec: declination(l, b),
            dist: dt
          };
        }
        SunCalc.getMoonPosition = function(date, lat, lng) {
          var lw = rad * -lng, phi = rad * lat, d = toDays(date), c = moonCoords(d), H = siderealTime(d, lw) - c.ra, h = altitude(H, phi, c.dec), pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));
          h = h + astroRefraction(h);
          return {
            azimuth: azimuth(H, phi, c.dec),
            altitude: h,
            distance: c.dist,
            parallacticAngle: pa
          };
        };
        SunCalc.getMoonIllumination = function(date) {
          var d = toDays(date || /* @__PURE__ */ new Date()), s = sunCoords(d), m = moonCoords(d), sdist = 149598e3, phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)), inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)), angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));
          return {
            fraction: (1 + cos(inc)) / 2,
            phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
            angle
          };
        };
        function hoursLater(date, h) {
          return new Date(date.valueOf() + h * dayMs / 24);
        }
        SunCalc.getMoonTimes = function(date, lat, lng, inUTC) {
          var t = new Date(date);
          if (inUTC) t.setUTCHours(0, 0, 0, 0);
          else t.setHours(0, 0, 0, 0);
          var hc = 0.133 * rad, h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc, h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;
          for (var i = 1; i <= 24; i += 2) {
            h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
            h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;
            a = (h0 + h2) / 2 - h1;
            b = (h2 - h0) / 2;
            xe = -b / (2 * a);
            ye = (a * xe + b) * xe + h1;
            d = b * b - 4 * a * h1;
            roots = 0;
            if (d >= 0) {
              dx = Math.sqrt(d) / (Math.abs(a) * 2);
              x1 = xe - dx;
              x2 = xe + dx;
              if (Math.abs(x1) <= 1) roots++;
              if (Math.abs(x2) <= 1) roots++;
              if (x1 < -1) x1 = x2;
            }
            if (roots === 1) {
              if (h0 < 0) rise = i + x1;
              else set = i + x1;
            } else if (roots === 2) {
              rise = i + (ye < 0 ? x2 : x1);
              set = i + (ye < 0 ? x1 : x2);
            }
            if (rise && set) break;
            h0 = h2;
          }
          var result2 = {};
          if (rise) result2.rise = hoursLater(t, rise);
          if (set) result2.set = hoursLater(t, set);
          if (!rise && !set) result2[ye > 0 ? "alwaysUp" : "alwaysDown"] = true;
          return result2;
        };
        if (typeof exports === "object" && typeof module !== "undefined") module.exports = SunCalc;
        else if (typeof define === "function" && define.amd) define(SunCalc);
        else window.SunCalc = SunCalc;
      })();
    }
  });

  // node_modules/geojson-shadow-generator/index.js
  var require_geojson_shadow_generator = __commonJS({
    "node_modules/geojson-shadow-generator/index.js"(exports, module) {
      var gjv = require_geojson_validation();
      var { union } = require_cjs5();
      var proj4 = require_proj4_src();
      var { point, polygon } = require_cjs3();
      var { convex } = require_cjs6();
      var { difference } = require_cjs7();
      var { center } = require_cjs9();
      var SunCalc = require_suncalc();
      var GeoJSONShadowGenerator = class {
        constructor(geojson, elevationPropertyName = "elevation") {
          this.geojson = geojson;
          this.propName = elevationPropertyName;
          this.sunAzimuth = 0;
          this.sunElevation = 0;
          this.type = "direct";
          this.projWGS84 = "EPSG:4326";
          this.projMercator = "EPSG:3857";
          proj4.defs(
            this.projMercator,
            "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"
          );
        }
        getShadowGeometries(options) {
          if (!this.geojson || !this.propName) {
            throw new Error("GeoJSON and elevationPropertyName are required");
          }
          this.type = options.type == void 0 ? "direct" : options.type === "datetime" ? "datetime" : "direct";
          this.GeoJSONValidation();
          this.getSunPosition(options);
          return this.generateShadowGeometries();
        }
        getSunAngles(date, coordinate) {
          const position = SunCalc.getPosition(date, coordinate[1], coordinate[0]);
          return {
            azimuth: position.azimuth * 180 / Math.PI,
            elevation: position.altitude * 180 / Math.PI
          };
        }
        getSunPosition(options) {
          if (!options) {
            throw new Error("Options parameter is required");
          }
          if (this.type === "direct") {
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
            throw new Error("GeoJSON is not valid");
          }
          if (!gjv.isFeatureCollection(this.geojson) && !gjv.isFeature(this.geojson)) {
            throw new Error("GeoJSON type must be FeatureCollection or Feature");
          }
          const features = gjv.isFeatureCollection(this.geojson) ? this.geojson.features : [this.geojson];
          for (const feature of features) {
            if (!gjv.isPolygon(feature.geometry) && !gjv.isMultiPolygon(feature.geometry)) {
              throw new Error("Geometry type must be Polygon or MultiPolygon");
            }
          }
          if (gjv.isFeature(this.geojson)) {
            this.geojson = {
              type: "FeatureCollection",
              features: [this.geojson]
            };
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
            if (geom.type === "Polygon") {
              const shifted = this.offsetCoords(geom.coordinates, offsetX, offsetY);
              const combined = this.createUnion(geom.coordinates, shifted);
              if (combined) {
                var polygon2 = { type: "Feature", geometry: { type: "Polygon", coordinates: geom.coordinates } };
                var diff = difference({ type: "FeatureCollection", features: [combined, polygon2] });
                diff.properties = feature.properties;
                shadowFeatures.push(diff);
              }
            } else if (geom.type === "MultiPolygon") {
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
          var fc = { type: "FeatureCollection", features: shadowFeatures };
          if (shadowFeatures.length > 1) {
            var u = union(fc);
            return u;
          } else {
            return fc;
          }
        }
        offsetCoords(coords, offsetX, offsetY) {
          return coords.map((ring) => {
            const mercatorRing = ring.map(([lon, lat]) => proj4(this.projWGS84, this.projMercator, [lon, lat]));
            const shiftedRing = mercatorRing.map(([x, y]) => [x - offsetX, y - offsetY]);
            return shiftedRing.map(([x, y]) => proj4(this.projMercator, this.projWGS84, [x, y]));
          });
        }
        createUnion(originalCoords, shiftedCoords) {
          try {
            var points = originalCoords.map((ring) => ring.map((p) => point(p)));
            var points2 = shiftedCoords.map((ring) => ring.map((p) => point(p)));
            var allPoints = points[0].concat(points2[0]);
            var featureCollection = { type: "FeatureCollection", features: allPoints };
            const poly2 = convex(featureCollection);
            return poly2;
          } catch (err) {
            console.warn("Union failed", err);
            return null;
          }
        }
      };
      module.exports = GeoJSONShadowGenerator;
    }
  });

  // main.js
  var require_main = __commonJS({
    "main.js"() {
      var import_geojson_shadow_generator = __toESM(require_geojson_shadow_generator());
      window.GeoJSONShadowGenerator = import_geojson_shadow_generator.default;
    }
  });
  require_main();
})();
