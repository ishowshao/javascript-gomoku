/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-5
 * Time: 下午11:55
 */

/**
 * @constructor
 * @class Person
 * @extends Player
 */
var Person = function () {
};
Person.prototype = new Player();
/**
 * @param {Chessboard} chessboard
 * @return {Person}
 */
Person.prototype.play = function (chessboard) {
    console.log('等待用户下棋');
    chessboard.wait();
    return this;
};

