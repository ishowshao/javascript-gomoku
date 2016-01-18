
/**
 * 下一步棋，记录日志，并转交先手
 * @param {Array} coordinate
 * @param {String} color
 */
Chessboard.prototype.go = function(coordinate, color) {
    if(Chessboard._canvas){
        return this.goCanvas.apply(this, arguments);
    }
    var that = this;
    var value = (color == 'black' ? 3 : 1);
    if (this.matrix.getValueByCoordinate(coordinate) === 0) {
        this.matrix.setValueByCoordinate(coordinate, value);
        this.el.find('tr:eq(' + coordinate[0] + ')').find('td:eq(' + coordinate[1] + ')').append('<div class="pieces ' + color + '"></div>');
        this.doLog(coordinate, color);
        setTimeout(function() {
            that.changeTurn();
        }, 50);
    } else {
        alert(coordinate + ' 这个点已经有棋子了');
        this.wait();
    }
};

Chessboard.prototype.goCanvas = function(coordinate, color) {
    var that = this;
    var value = (color == 'black' ? 3 : 1);
    var cellFilled = "black" === color;
    var stage = this.stage;
    var layer = this.layer;
    var makeCell = function(row, col) {
        var circle = new Kinetic.Circle({
            x: 31*col+15,
            y: 31*row+15,
            radius: 15,
            stroke: 'black',
            fill: cellFilled ? "blank" : null,
            strokeWidth: 1
        });
        layer.add(circle);
    };
    if (this.matrix.getValueByCoordinate(coordinate) === 0) {
        this.matrix.setValueByCoordinate(coordinate, value);
        // this.el.find('tr:eq(' + coordinate[0] + ')').find('td:eq(' + coordinate[1] + ')').append('<div class="pieces ' + color + '"></div>');
        makeCell(coordinate[0], coordinate[1])
        stage.draw()
        this.doLog(coordinate, color);
        setTimeout(function() {
            that.changeTurn();
        }, 50);
    } else {
        alert(coordinate + ' 这个点已经有棋子了');
        this.wait();
    }
};


/**
 * 绘制棋盘
 * @param renderTo
 */
Chessboard.prototype.render = function(renderTo) {
    if(Chessboard._canvas){
        return this.renderCanvas.apply(this, arguments);
    }
    var size = this.size;
    var html = [];
    html.push('<table class="chessboard">');
    for (var i = 0; i < size; i++) {
        html.push('<tr class="row">');
        for (var j = 0; j < size; j++) {
            html.push('<td class="cell"' + 'data-i="' + i + '" data-j="' + j + '"></td>');
        }
        html.push('</tr>');
    }
    html.push('</table>');
    this.el = jQuery(html.join(''));
    jQuery(renderTo).append(this.el);
    var that = this;
    this.el.delegate('td', 'click', function() {
        if (that.waiting && that.isPlaying()) {
            that.waiting = false;
            var i = jQuery(this).data('i');
            var j = jQuery(this).data('j');
            that.go([i, j], that.turn);
        }
    });
};

/**
 * 绘制棋盘canvas方式
 * @param renderTo
 */
Chessboard.prototype.renderCanvas = function(renderTo) {
    var size = this.size,
        that = this,
        stage = new Kinetic.Stage({
            width: 31 * size,
            height: 31 * size,
            container: $(renderTo).prop("id")
        }),
        layer = new Kinetic.Layer(),
        addRect = function(row, col) {
            var rect = new Kinetic.Rect({
                x: 31 * col,
                y: 31 * row,
                width: 30,
                height: 30,
                stroke: 'black',
                strokeWidth: 1
            });
            rect.row = row;
            rect.col = col;
            rect.on("click", function() {
                if (that.waiting && that.isPlaying()) {
                    that.waiting = false;
                    var row = rect.row;
                    var col = rect.col;
                    that.go([row, col], that.turn);
                }
            });
            layer.add(rect)
        };

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            addRect(i, j);
        }
    }

    stage.add(layer);
    this.stage = stage;
    this.layer = layer;
    this.el = $(renderTo);
};