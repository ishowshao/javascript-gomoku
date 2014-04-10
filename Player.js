/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-5
 * Time: 下午11:55
 */

/**
 * @constructor
 */
var Player = function () {
};
/**
 * @param {String} color
 * @return {Player}
 */
Player.prototype.setColor = function (color) {
    this.color = color;
    return this;
};
/**
 * @return {String}
 */
Player.prototype.getColor = function () {
    return this.color;
};
/**
 * @param {Chessboard} chessboard
 * @return {Player}
 */
Player.prototype.play = function (chessboard) {
    chessboard.doNothing();
    return this;
};
