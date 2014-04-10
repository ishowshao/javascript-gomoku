/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-10
 * Time: 下午10:43
 * To change this template use File | Settings | File Templates.
 */

/**
 * 定式的匹配检测很容易
 * 如何避免重复定式检测
 * 定式的跟进，暂时可以用同一定式的枚举来完成跟进(用最高分策略完成跟进？)
 * 自动学习连续冲四胜利
 * 定式的防守
 */

var sourceFormulas = [
    {
        data: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, '.', 0]
        ],
        data2: [
            '00000',
            '00010',
            '00010',
            '00010',
            '000.0'
        ],
        next: [1, 2], //代表匹配上次定式，下一步该走哪里
        direction: 4
    }
];
var toString = function (matrix) {
    var s = '';
    for (var j = 0; j < matrix[0].length; j++) {
        for (var i = 0; i < matrix.length; i++) {
            s += matrix[i][j];
        }
    }
    return s;
};
var toString2 = function (matrix) {
    var s = '';
    var mLength = matrix.length;
    var sLength = matrix[0].length;
    for (var j = 0; j < sLength; j++) {
        for (var i = 0; i < mLength; i++) {
            s += matrix[i][j];
        }
    }
    return s;
};

console.log(toString(sourceFormulas[0].data));
console.log(toString2(sourceFormulas[0].data2));

console.time('a');
for (var i = 0; i < 100000; i++) {
    toString(sourceFormulas[0].data);
}
console.timeEnd('a');

console.time('b');
for (i = 0; i < 100000; i++) {
    toString2(sourceFormulas[0].data2);
}
console.timeEnd('b');

var compile = function (source) {
    for (var x = 0; x < source.length; x++) {

    }
};

