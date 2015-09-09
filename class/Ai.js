/**
 * Created with JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-5
 * Time: 下午11:49
 */

/**
 * @constructor
 * @class Ai
 * @extends Player
 */
var Ai = function () {
    /**
     * @type {Array}
     */
    this.schemas = new Schema().compile(Schema.source);
};
Ai.prototype = new Player();

/**
 * @param {Chessboard} chessboard
 * @return {Ai}
 */
Ai.prototype.play = function (chessboard) {
    if (chessboard.getStep() == 0) {
        //如果AI先开局，放置棋子在棋盘中间
        chessboard.go([7, 7], this.color);
    } else if (chessboard.getStep() == 1) {
        var yourFirst = chessboard.getMatrix().getCoordinatesByValue(3)[0];
        var myFirstI = yourFirst[0] - 1 > 0 ? yourFirst[0] - 1 : yourFirst[0] + 1;
        var myFirstJ = yourFirst[1] - 1 > 0 ? yourFirst[1] - 1 : yourFirst[1] + 1;
        chessboard.go([myFirstI, myFirstJ], this.color);
    } else {
        //当我下棋，检查每一个可摆放的位置
        //1.我有没有胜利的棋
        //2.对方有没有差1步胜利(对方当前有>2000的模式)
        //3.我有没有差1步胜利
        //4.对方有没有必须处置的棋(对方当前有>1000的模式)
        //5.我的最高分

        var schemas = this.schemas;
        //计算我方最高分的第一步
        var matrix = chessboard.getMatrix();
        var shrink = matrix.shrink();
        var i, j;
        var me = matrix.copy(this.color == 'black');
        var temp;
        var myScore = 0;
        var myFinalScore = 0;
        var myBestScore = 0;
        var myFinalCoordinate;
        var myBestCoordinate;
        var you = matrix.copy(this.color !== 'black');
        var yourScore = 0;
        //放哪一点
        //1.我的分数最高
        var myHighestScore = 0;
        var myHighestCoordinate = [0, 0];
        //2.你的分数最低
        var yourLowestScore = 1000000;
        var yourLowestCoordinate = [0, 0];
        //3.(我的分数 - 你的分数) 最高
        var myMinusHighestScore = 0;
        var myMinusHighestCoordinate = [0, 0];
        //4.你的分数 - 我的分数 最高
        //5.我的最高分的坐标
        var myWinCoordinate = [];
        //6.你的最高分坐标
        var yourWinCoordinate = [];
        //7.我差一步胜利的点
        var myMustWinCoordinate = [];
        var myAlmostWinCoordinate = [];
        //8.对方差一步胜利的点
        var yourAlmostWinCoordinate = [];
        //9.对方必须应对的点
        var yourMustCareCoordinate = [];

        for (i = shrink[0][0]; i < shrink[0][1]; i++) {
            for (j = shrink[1][0]; j < shrink[1][1]; j++) {
                temp = me.getValueByCoordinate([i, j]);
                myScore = 0;
                yourScore = 0;
                if (temp === 0) {
                    me.setValueByCoordinate([i, j], 1);
                    you.setValueByCoordinate([i, j], 3);
                    schemas.forEach(function (schema) {
                        var mySchema = me.findSchema(schema['schema']);
                        var yourSchema = you.findSchema(schema['schema']);
                        myScore += mySchema.length * schema['score'];
                        yourScore += yourSchema.length * schema['score'];
                        if (schema['score'] > 100000) {
                            //检查我的胜利点
                            if (mySchema.length > 0) {
                                myWinCoordinate.push([i, j]);
                            }
                        } else if (schema['score'] > 10000) {
                            //检查我的必胜点
                            if (mySchema.length > 0) {
                                myMustWinCoordinate.push([i, j]);
                            }
                        } else if (schema['score'] > 2000) {
                            //检查我的差一步胜利
                            if (mySchema.length > 0) {
                                myAlmostWinCoordinate.push([i, j]);
                            }
                        }
                    });
                    me.setValueByCoordinate([i, j], 0);
                    you.setValueByCoordinate([i, j], 0);
                    //我的得分已经计算
                    //计算对方得分
                    if (myScore - yourScore > myFinalScore) {
                        myFinalScore = myScore - yourScore;
                        myFinalCoordinate = [i, j];
                    }
                    if (myScore > myBestScore) {
                        myBestScore = myScore;
                        myBestCoordinate = [i, j];
                    }
                    //计算我的最高分
                    if (myScore > myHighestScore) {
                        myHighestScore = myScore;
                        myHighestCoordinate = [i, j];
                    }
                    //计算你的最低分
                    if (yourScore < yourLowestScore) {
                        yourLowestScore = yourScore;
                        yourLowestCoordinate = [i, j];
                    }
                    //计算我的分数 - 你的分数 最高分
                    if (myScore - yourScore > myMinusHighestScore) {
                        myMinusHighestScore = myScore - yourScore;
                        myMinusHighestCoordinate = [i, j];
                    }
                }
            }
        }
        //分析一下
        myScore = 0;
        yourScore = 0;
        schemas.forEach(function (schema) {
            myScore += me.findSchema(schema['schema']).length * schema['score'];
            yourScore += you.findSchema(schema['schema']).length * schema['score'];
        });
        console.log('当前局面 myScore', myScore);
        console.log('当前局面 yourScore', yourScore);
        console.log('myHighestScore', myHighestScore, myHighestCoordinate, chessboard.getDomByCoordinate(myHighestCoordinate));
        console.log('yourLowestScore', yourLowestScore, yourLowestCoordinate, chessboard.getDomByCoordinate(yourLowestCoordinate));
        console.log('myMinusHighestScore', myMinusHighestScore, myMinusHighestCoordinate, chessboard.getDomByCoordinate(myMinusHighestCoordinate));
        console.log('myWinCoordinate', myWinCoordinate);
        console.log('myAlmostWinCoordinate', myAlmostWinCoordinate);
        console.log('yourWinCoordinate', yourWinCoordinate);
        //分析结束

        yourScore = 0;
        schemas.forEach(function (schema) {
            var find = you.findSchema(schema['schema']);
            yourScore += find.length * schema['score'];
            if (schema['score'] > 100000) {
                //检查我的胜利点
                if (find.length > 0) {
                    yourWinCoordinate.push(find);
                }
            } else if (schema['score'] > 2000) {
                //检查我的差一步胜利
                if (find.length > 0) {
                    yourAlmostWinCoordinate.push(find);
                }
            } else if (schema['score'] > 1000) {
                if (find.length > 0) {
                    yourMustCareCoordinate.push(find);
                }
            }
        });
        if (myWinCoordinate.length > 0) {
            console.log('choose my win');
            myFinalCoordinate = myWinCoordinate[0];
        } else if (yourAlmostWinCoordinate.length > 0) {
            console.log('choose your almost');
            myFinalCoordinate = yourLowestCoordinate;
        } else if (myMustWinCoordinate.length > 0) {
            console.log('choose my must win');
            myFinalCoordinate = myMustWinCoordinate[0];
        } else if (myAlmostWinCoordinate.length > 0) {
            console.log('choose my almost');
            myFinalCoordinate = myHighestCoordinate;
        } else if (yourMustCareCoordinate.length > 0) {
            console.log('choose your muse care');
            myFinalCoordinate = yourLowestCoordinate;
        } else if (myMinusHighestScore == 0) {
            console.log('choose my best');
            myFinalCoordinate = myBestCoordinate;
        } else {
            console.log('choose my minus');
            myFinalCoordinate = myMinusHighestCoordinate;
        }
        console.log('yourAlmostWin', yourAlmostWinCoordinate);
        console.log('yourMustCare', yourMustCareCoordinate);
        console.log('myFinalCoordinate', myFinalCoordinate, chessboard.getDomByCoordinate(myFinalCoordinate));
        chessboard.go(myFinalCoordinate, this.color);

        //TODO 胜利检测在这里是错误的
        if (yourWinCoordinate.length > 0) {
            chessboard.showWinner(this.color == 'black' ? 'white' : 'black');
        } else if (myWinCoordinate.length > 0) {
            chessboard.showWinner(this.color);
        }
    }
    return this;
};
