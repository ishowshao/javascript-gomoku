/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-5
 * Time: 下午10:42
 */
jQuery(function () {
    window.findSchemaCount = 0;
    var person = new Person();
    var ai = new Ai();
    var chessboard = new Chessboard(15);

    //设置人和电脑执棋默认颜色
    person.setColor('black');
    ai.setColor('white');

    //绘制棋盘
    chessboard.render('#container');

    jQuery('#play').click(function () {
        jQuery(this).remove();
        if (jQuery('input[name="black-or-white"]:checked').val() !== 'black') {
            ai.setColor('black');
            person.setColor('white');
        }

        chessboard.setPlayer(person);
        chessboard.setPlayer(ai);

        chessboard.start();
    });
});
