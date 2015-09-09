/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-4
 * Time: 下午11:45
 */

/**
 * @param {Number} size
 * @constructor
 */
var Matrix = function (size) {
    /**
     * @type {Number}
     */
    this.size = size;

    var data = [];
    for (var i = 0; i < size; i++) {
        var tmp = [];
        for (var j = 0; j < size; j++) {
            tmp.push(0);
        }
        data.push(tmp);
    }
    this.data = data;
};

/**
 * 获得此矩阵内所有值为needle的坐标
 * @param needle
 * @return {Array}
 */
Matrix.prototype.getCoordinatesByValue = function (needle) {
    var result = [];
    var data = this.data;
    var length = data.length;
    var row;
    var i, j;
    for (i = 0; i < length; i++) {
        row = data[i];
        for (j = 0; j < row.length; j++) {
            if (row[j] === needle) {
                result.push([i, j]);
            }
        }
    }
    return result;
};
/**
 * @param {Array} coordinate
 * @return {Number}
 */
Matrix.prototype.getValueByCoordinate = function (coordinate) {
    return this.data[coordinate[0]][coordinate[1]];
};
/**
 * @param {Array} coordinate
 * @param {Number} value
 */
Matrix.prototype.setValueByCoordinate = function (coordinate, value) {
    this.data[coordinate[0]][coordinate[1]] = value;
    this.cacheCoordinatesByValue();
};

Matrix.prototype.cacheCoordinatesByValue = function () {
    this._coordinatesCache = this.getCoordinatesByValue(1);
};

/**
 * @param {Array} schema
 * @return {Array}
 */
Matrix.prototype.findSchema = function (schema) {
    var coordinates;
    if (this._coordinatesCache) {
        coordinates = this._coordinatesCache;
    } else {
        coordinates = this.getCoordinatesByValue(1);
    }
    var has = [];
    var data = this.data;
    var length = coordinates.length;
    var len = schema.length;
    var coordinate;
    var item;
    var match = true;
    var temp = [];
    var added;
    for (var y = 0; y < length; y++) {
        coordinate = coordinates[y];
        match = true;
        temp = [];
        for (var x = 0; x < len; x++) {
            item = schema[x];
            added = [coordinate[0] + item[0], coordinate[1] + item[1]];
            temp.push(added);
            if (!data[added[0]] || data[added[0]][added[1]] !== item[2]) {
                match = false;
                break;
            }
        }
        if (match) {
            has.push(temp);
        }
    }
    return has;
};

/**
 * @param {Boolean} interchange
 * @return {Matrix}
 */
Matrix.prototype.copy = function (interchange) {
    var matrix = new Matrix(this.size);
    var size = this.size;
    var temp;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (interchange) {
                temp = this.data[i][j];
                if (temp === 1) {
                    matrix.data[i][j] = 3;
                } else if (temp === 3) {
                    matrix.data[i][j] = 1;
                } else {
                    matrix.data[i][j] = 0;
                }
            } else {
                matrix.data[i][j] = this.data[i][j];
            }
        }
    }
    return matrix;
};

/**
 * 转换matrix成array
 * @return {Array}
 */
Matrix.prototype.toArray = function () {
    var retArray = [];
    var rowArray;
    var length = this.data.length;
    var data = this.data;
    var i, j;

    for (i = 0; i < length; i++) {
        rowArray = [];
        for (j = 0; j < data[i].length; j++) {
            rowArray.push(data[i][j]);
        }
        retArray.push(rowArray);
    }
    return retArray;
};

Matrix.prototype.shrink = function () {
    var minI = this.size - 1;
    var minJ = this.size - 1;
    var maxI = 0;
    var maxJ = 0;
    var size = this.size;
    var data = this.data;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (data[i][j] !== 0) {
                minI = (i < minI ? i : minI);
                minJ = (j < minJ ? j : minJ);
                maxI = (i > maxI ? i : maxI);
                maxJ = (j > maxJ ? j : maxJ);
            }
        }
    }
    return [[minI - 2 > 0 ? minI - 2 : 0, maxI + 2 > size - 1 ? size - 1 : maxI + 2], [minJ - 2 > 0 ? minJ - 2 : 0, maxJ + 2 > size - 1 ? size - 1 : maxJ + 2]];
};
