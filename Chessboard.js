/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-5
 * Time: 下午10:43
 */

/**
 * @param {Number} size
 * @constructor
 */
var Chessboard = function (size) {
    /**
     * @type {Number}
     */
    this.size = size;

    /**
     * @type {Boolean}
     */
    this.playing = false;

    this.turn = 'black';

    /**
     * 记录每一步走棋位置
     * @type {Array}
     */
    this.log = [];

    /**
     * @type {Matrix}
     */
    this.matrix = new Matrix(size);
};

/**
 * 等待人点击
 * 点击之后马上注销点击事件，以防止多次点击
 */
Chessboard.prototype.wait = function () {
    var that = this;
    var todo = function () {
        if (that.isPlaying()) {
            var i = jQuery(this).data('i');
            var j = jQuery(this).data('j');
            console.log('用户下棋', [i, j], that.getDomByCoordinate([i, j]));
            that.el.undelegate('td', 'click', todo);
            that.go([i, j], that.turn);
        }
    };
    this.el.delegate('td', 'click', todo);
};

/**
 * 什么都不做
 */
Chessboard.prototype.doNothing = function () {
};

/**
 * 下一步棋，记录日志，并转交先手
 * @param {Array} coordinate
 * @param {String} color
 */
Chessboard.prototype.go = function (coordinate, color) {
    //记录日志
    this.log.push({
        coordinate: coordinate,
        color: color
    });

    var value = (color == 'black' ? 3 : 1);
    if (this.matrix.getValueByCoordinate(coordinate) === 0) {
        this.matrix.setValueByCoordinate(coordinate, value);
        this.el.find('tr:eq(' + coordinate[0] + ')').find('td:eq(' + coordinate[1] + ')').append('<div class="pieces ' + color + '"></div>');
        var that = this;
        setTimeout(function () {
            that.changeTurn();
        }, 10);
    } else {
        alert(coordinate + ' 这个点已经有棋子了');
    }
};

/**
 * 绘制棋盘
 * @param renderTo
 */
Chessboard.prototype.render = function (renderTo) {
    var makeHtml = function (size) {
        var html = [];
        html.push('<table class="chessboard">');
        for (var i = 0; i < size; i++) {
            html.push('<tr class="row">');
            for (var j = 0; j < size; j++) {
                html.push('<td class="cell" data-i="' + i + '" data-j="' + j + '"></td>');
            }
            html.push('</tr>');
        }
        html.push('</table>');
        return html.join('');
    };
    this.el = jQuery(makeHtml(this.size));
    jQuery(renderTo).append(this.el);
};

/**
 * 启动对战
 */
Chessboard.prototype.start = function () {
    this.playing = true;
    this.setTurn(this.turn);
};

/**
 * 获得当前是否处于下棋进行中
 * @return {Boolean}
 */
Chessboard.prototype.isPlaying = function () {
    return this.playing;
};

/**
 * 设置当前轮到谁，并让轮到的player下棋
 * @param {String} turn
 */
Chessboard.prototype.setTurn = function (turn) {
    this.turn = turn;
    if (turn == 'black') {
        this.blackPlayer.play(this);
    } else if (turn == 'white') {
        this.whitePlayer.play(this);
    }
};

/**
 * 切换先手
 */
Chessboard.prototype.changeTurn = function () {
    this.turn = (this.turn == 'black' ? 'white' : 'black');
    this.setTurn(this.turn);
};

/**
 * 获得当前步数
 * @return {Number}
 */
Chessboard.prototype.getStep = function () {
    return this.log.length;
};

/**
 * @param {Player} player
 */
Chessboard.prototype.setPlayer = function (player) {
    if (player.getColor() == 'black') {
        this.blackPlayer = player;
    } else if (player.getColor() == 'white') {
        this.whitePlayer = player;
    }
};

/**
 * 获得棋盘关联的矩阵
 * @return {Matrix}
 */
Chessboard.prototype.getMatrix = function () {
    return this.matrix;
};

Chessboard.prototype.getDomByCoordinate = function (coordinate) {
    return this.el.find('tr:eq(' + coordinate[0] + ')').find('td:eq(' + coordinate[1] + ')');
};