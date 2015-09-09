/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-11
 * Time: 上午11:32
 */

/**
 * @constructor
 * @class Schema
 */
var Schema = function () {
};
Schema.prototype = {
    compile: function (source) {
        var schemas = [];
        var schema;
        for (var x = 0; x < source.length; x++) {
            schema = source[x];
            schemas.push({
                schema: this.left(schema['data']),
                score: schema['score']
            });
            schemas.push({
                schema: this.bottomLeft(schema['data']),
                score: schema['score']
            });
            schemas.push({
                schema: this.bottom(schema['data']),
                score: schema['score']
            });
            schemas.push({
                schema: this.bottomRight(schema['data']),
                score: schema['score']
            });
            if (schema.direction == 8) {
                schemas.push({
                    schema: this.right(schema['data']),
                    score: schema['score']
                });
                schemas.push({
                    schema: this.topRight(schema['data']),
                    score: schema['score']
                });
                schemas.push({
                    schema: this.top(schema['data']),
                    score: schema['score']
                });
                schemas.push({
                    schema: this.topLeft(schema['data']),
                    score: schema['score']
                });
            }
        }
        return schemas;
    },
    left: function (source) {
        var result = [];
        var origin = source.indexOf(1);
        for (var i = 0; i < source.length; i++) {
            result.push([0, i - origin, source[i]]);
        }
        return result;
    },
    bottomLeft: function (source) {
        var result = [];
        var origin = source.indexOf(1);
        for (var i = 0; i < source.length; i++) {
            result.push([i - origin, i - origin, source[i]]);
        }
        return result;
    },
    bottom: function (source) {
        var result = [];
        var origin = source.indexOf(1);
        for (var i = 0; i < source.length; i++) {
            result.push([i - origin, 0, source[i]]);
        }
        return result;
    },
    bottomRight: function (source) {
        var result = [];
        var origin = source.indexOf(1);
        for (var i = 0; i < source.length; i++) {
            result.push([i - origin, origin - i, source[i]]);
        }
        return result;
    },
    right: function (source) {
        var result = [];
        var origin = source.indexOf(1);
        for (var i = 0; i < source.length; i++) {
            result.push([0, origin - i, source[i]]);
        }
        return result;
    },
    topRight: function (source) {
        var result = [];
        var origin = source.indexOf(1);
        for (var i = 0; i < source.length; i++) {
            result.push([origin - i, origin - i, source[i]]);
        }
        return result;
    },
    top: function (source) {
        var result = [];
        var origin = source.indexOf(1);
        for (var i = 0; i < source.length; i++) {
            result.push([origin - i, 0, source[i]]);
        }
        return result;
    },
    topLeft: function (source) {
        var result = [];
        var origin = source.indexOf(1);
        for (var i = 0; i < source.length; i++) {
            result.push([origin - i, i - origin, source[i]]);
        }
        return result;
    }
};

Schema.source = [
    {"data": [1, 1, 1, 1, 1], "score": 100001, "direction": 4},
    {"data": [0, 1, 1, 1, 1, 0], "score": 10001, "direction": 4},
    {"data": [0, 1, 1, 1, 0, 1, 0], "score": 3001, "direction": 8},
    {"data": [0, 1, 1, 0, 1, 1, 0], "score": 3001, "direction": 4},
    {"data": [3, 1, 1, 1, 1, 0], "score": 3200, "direction": 8},
    {"data": [3, 1, 1, 1, 0, 1, 0], "score": 3001, "direction": 8},
    {"data": [3, 1, 1, 0, 1, 1, 0], "score": 3001, "direction": 8},
    {"data": [3, 1, 1, 1, 0, 1, 3], "score": 3001, "direction": 8},
    {"data": [3, 1, 1, 0, 1, 1, 3], "score": 3001, "direction": 4},
    {"data": [0, 1, 1, 1, 0], "score": 1050, "direction": 4},
    {"data": [0, 1, 1, 0, 1, 0], "score": 1001, "direction": 8},
    {"data": [3, 1, 1, 1, 0], "score": 100, "direction": 8},
    {"data": [3, 1, 1, 0, 1, 0], "score": 50, "direction": 8},
    {"data": [0, 1, 1, 0], "score": 10, "direction": 4},
    {"data": [0, 1, 0, 1, 0], "score": 5, "direction": 4},
    {"data": [3, 1, 1, 0], "score": 2, "direction": 8}
];
