/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-6
 * Time: 下午3:56
 */


//var points = [1, 2, 3, 4, 5];
//var max = 0;
//
//var calculate2 = function (deepth) {
//    var result = 0;
//    if (deepth > 0) {
//        result = points.pop() + calculate2(deepth - 1);
//    } else {
//        result = points.pop(); //points.pop = matrix.score()
//    }
//    return result;
//};
//console.log(calculate2(3));

//console.log(+new Date);
//for (var i = 0; i < 1000000; i++) {
//    /0.1/.test('000000000000100');
//}
//console.log(+new Date);

console.time('b');
var matrix = [
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 3, 0, 0, 3, 0],
    [0, 0, 0, 0, 3, 0]
];

var schema = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 3, 0]
];

var s = '';
for (var i = 0; i < schema[0].length; i++) {
    for (var j = 0; j < schema.length; j++) {
        s += schema[j][i];
    }
}
console.log('s', s);

var m = '';
console.log('m', m);

var reg = new RegExp(s, 'g');
console.log(reg);
console.log(reg.exec(m));
console.log(reg.exec(m));
console.timeEnd('b');

console.time('a');
for (var x = 0; x < 1000000; x++) {
    var m = '';
    for (i = 0; i < matrix[0].length; i++) {
        for (j = 0; j < matrix.length; j++) {
            m += matrix[j][i];
        }
    }
    reg.test(m);
}
console.timeEnd('a');

