/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-24
 * Time: 下午10:18
 */

/**
 * @constructor
 * @class TestAi
 * @extends Player
 */
var TestAi = function () {
};
TestAi.prototype = new Player();

TestAi.prototype.play = function (chessboard) {
var matrix = chessboard.getMatrix();
var getRandomCoordinate = function () {
    var i = Math.floor(Math.random() * 15);
    var j = Math.floor(Math.random() * 15);
    return [i, j];
};
var coordinate = getRandomCoordinate();
while (true) {
    if (matrix.getValueByCoordinate(coordinate) == 0) {
        break;
    } else {
        coordinate = getRandomCoordinate();
    }
}
chessboard.go(coordinate, this.color);
};
