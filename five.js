Array.prototype.coordinate = function (coordinate) {
    var r;
    if (this[coordinate[0]]) {
        r = this[coordinate[0]][coordinate[1]];
    }
    return r;
};
Array.prototype.coordinateAdd = function (coordinate) {
    return [this[0] + coordinate[0], this[1] + coordinate[1]];
};
/**
 * 检查是否所有items都和equalTo相等
 * @param {Object} equalTo
 * @param {Array} items 需要和equalTo比较的所有元素
 * @return {Boolean}
 */
var allEqual = function (equalTo, items) {
    var equal = true;
    for (var i = 0; i < items.length; i++) {
        if (items[i] !== equalTo) {
            equal = false;
            break;
        }
    }
    return equal;
};
var inside = function (coordinate, width, height) {
    return coordinate[0] >= 0 && coordinate[0] < height && coordinate[1] >= 0 && coordinate[1] < width;
};

/**
 * @param {Array} coordinate
 * @param {Number} length
 * @param {Number} matrixWidth
 * @param {Number} matrixHeight
 * @return {Array}
 */
var allDirection = function (coordinate, length, matrixWidth, matrixHeight) {
    var result = [];
    var direction = [];
    var i = coordinate[0];
    var j = coordinate[1];
    var l = 0;

    //check inside
    if (!inside(coordinate, matrixWidth, matrixHeight)) {
        return false;
    }

    //left
    if (inside([i, j + length - 1], matrixWidth, matrixHeight)) {
        for (l = 0; l < length; l++) {
            direction.push([i, j + l]);
        }
        result.push(direction);
        direction = [];
    }
    //left bottom
    if (inside([i + length - 1, j + length - 1], matrixWidth, matrixHeight)) {
        for (l = 0; l < length; l++) {
            direction.push([i + l, j + l]);
        }
        result.push(direction);
        direction = [];
    }
    //bottom
    if (inside([i + length - 1, j], matrixWidth, matrixHeight)) {
        for (l = 0; l < length; l++) {
            direction.push([i + l, j]);
        }
        result.push(direction);
        direction = [];
    }
    //bottom right
    if (inside([i + length - 1, j - length + 1], matrixWidth, matrixHeight)) {
        for (l = 0; l < length; l++) {
            direction.push([i + l, j - l]);
        }
        result.push(direction);
        direction = [];
    }
    //right
    if (inside([i, j - length + 1], matrixWidth, matrixHeight)) {
        for (l = 0; l < length; l++) {
            direction.push([i, j - l]);
        }
        result.push(direction);
        direction = [];
    }
    //right top
    if (inside([i - length + 1, j - length + 1], matrixWidth, matrixHeight)) {
        for (l = 0; l < length; l++) {
            direction.push([i - l, j - l]);
        }
        result.push(direction);
        direction = [];
    }
    //top
    if (inside([i - length + 1, j], matrixWidth, matrixHeight)) {
        for (l = 0; l < length; l++) {
            direction.push([i - l, j]);
        }
        result.push(direction);
        direction = [];
    }
    //top left
    if (inside([i - length + 1, j + length - 1], matrixWidth, matrixHeight)) {
        for (l = 0; l < length; l++) {
            direction.push([i - l, j + l]);
        }
        result.push(direction);
    }
    return result;
};
