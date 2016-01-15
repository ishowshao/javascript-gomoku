#javascript-gomoku(dom & canvas)

> 写个单机五子棋，带胜负判断，兼容Chrome即可。界面可用DOM或者Canvas或者SVG实现。想办法使得后续切换界面实现方式成本最低。（比如选择使用DOM实现，当需求改为使用Canvas实现时尽量少改动代码

forked from [ishowshao/javascript-gomoku](https://github.com/ishowshao/javascript-gomoku)

基于ishowshao的项目（原项目实现的是DOM棋盘），利用[kineticjs](http://www.kineticjs.com/)实现canvas棋盘的五子棋游戏，并支持随时的DOM/Canvas棋盘模式切换。

修改幅度：

* js/index.js，少量幅度的修改
* class/ChessboardCanvas.js，增加了2个原型方法，少量幅度的修改

