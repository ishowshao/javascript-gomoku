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
var Chessboard = function(size) {
    /**
     * @type {Number}
     */
    this.size = size;

    /**
     * @type {Boolean}
     */
    this.playing = false;

    /**
     * 是否允许用户点击
     * @type {Boolean}
     */
    this.waiting = false;

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
Chessboard.prototype.wait = function() {
    this.waiting = true;
};

/**
 * 什么都不做
 */
Chessboard.prototype.doNothing = function() {};

/**
 * 记录走棋日志
 * @param {Array} coordinate
 * @param {String} color
 */
Chessboard.prototype.doLog = function(coordinate, color) {
    //记录日志
    this.log.push({
        coordinate: coordinate,
        color: color
    });
    jQuery('#log').append('<div><span class="log-coordinate badge badge-info">(' + coordinate[0] + ',' + coordinate[1] + ')</span> <span>' + color + '</span></div>');
};


/**
 * 胜利告知
 * @param {String} color
 */
Chessboard.prototype.showWinner = function(color) {
    alert(color + ' win');
    this.playing = false;
    if (typeof JSON.stringify !== 'undefined') {
        jQuery.ajax({
            url: 'data/log.php',
            type: 'POST',
            data: {
                log: JSON.stringify(this.log)
            },
            success: function() {}
        });
    }
};


/**
 * 启动对战
 */
Chessboard.prototype.start = function() {
    this.el.find('.pieces').remove();
    jQuery('#log').empty();
    this.playing = true;
    this.log = [];
    this.matrix = new Matrix(this.size);
    this.turn = 'black';
    this.setTurn(this.turn);
};

/**
 * 获得当前是否处于下棋进行中
 * @return {Boolean}
 */
Chessboard.prototype.isPlaying = function() {
    return this.playing;
};

/**
 * 设置当前轮到谁，并让轮到的player下棋
 * @param {String} turn
 */
Chessboard.prototype.setTurn = function(turn) {
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
Chessboard.prototype.changeTurn = function() {
    if (this.playing) {
        this.turn = (this.turn == 'black' ? 'white' : 'black');
        this.setTurn(this.turn);
    }
};

/**
 * 获得当前步数
 * @return {Number}
 */
Chessboard.prototype.getStep = function() {
    return this.log.length;
};

/**
 * @param {Player} player
 */
Chessboard.prototype.setPlayer = function(player) {
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
Chessboard.prototype.getMatrix = function() {
    return this.matrix;
};

Chessboard.prototype.getDomByCoordinate = function(coordinate) {
    return this.el.find('tr:eq(' + coordinate[0] + ')').find('td:eq(' + coordinate[1] + ')');
};