/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-12
 * Time: 上午12:12
 * To change this template use File | Settings | File Templates.
 */

/**
 * 五子棋
 * @constructor
 * @class Gomoku
 */
var Gomoku = function (challenger) {
    /**
     * @type {Chessboard}
     */
    this.chessboard = new Chessboard(15);
    if (challenger) {
        this.player1 = new challenger; //把player1当做外来棋手，现在只是人，以后可能是别人编制的AI
    } else {
        this.player1 = new Person(); //把player1当做外来棋手，现在只是人，以后可能是别人编制的AI
    }
    this.player2 = new Ai();

    //绘制棋盘
    this.chessboard.render('#chessboard-ct');
};

/**
 * 开始游戏
 * @param {String} color 外来棋手的颜色
 */
Gomoku.prototype.play = function (color) {
    //设置人和电脑执棋颜色
    this.player1.setColor(color);
    this.player2.setColor(this.changeColor(color));
    this.chessboard.setPlayer(this.player1);
    this.chessboard.setPlayer(this.player2);
    this.chessboard.start();
};

/**
 * 重新开始游戏
 * @param {String} color 外来棋手的颜色
 */
Gomoku.prototype.replay = function (color) {
    this.play(color);
};

/**
 * 传入black返回white，传入white返回black
 * @param {String} color
 * @return {String}
 */
Gomoku.prototype.changeColor = function (color) {
    return color == 'black' ? 'white' : 'black';
};

Gomoku.getChallenger = function (code) {
    var func = '' +
        '(function () {' +
        '    var Challenger = function () {}; ' +
        '    Challenger.prototype = new Player(); ' +
        '    Challenger.prototype.play = function (chessboard) {' +
        code +
        '    };' +
        '    return Challenger;' +
        '})();';
    return eval(func);
};