/*
* @Author: wrma
* @Date:   2018-04-18 17:01:36
* @Last Modified by:   wrma
* @Last Modified time: 2018-04-18 18:41:16
*/
;(function () {
    //用于存放格子位置的二维数组
    var positionArr = [];
    for (var i = 0;i<4;i++){
        positionArr.push(new Array(4));
    }
    //用于判断格子是否合并过的数组
    var isMerge = [];
    for (var i = 0;i<4;i++){
        isMerge.push(new Array(4));
    }
    //分数
    var score = 0;
    function Cell(score,row,column) {
        this.score = score;
        this.row = row;
        this.column = column;
    }
    Cell.fn = Cell.prototype = {
        constructor : Cell,
        __init : function () {
            this.__createRandomCell();
            this.__createRandomCell();
            this.__initScore();
            this.__bindEvent();
            this.__bindNewGameEvent();
        },
        __bindEvent : function () {
            var self = this;
            document.addEventListener('keydown',function (ev) {
                if (ev.keyCode == 37){
                    self.__moveCell('left');
                    self.__createRandomCell();
                    self.__caculateScore();
                    self.__isGameOver();
                }
                if (ev.keyCode == 38){
                    self.__moveCell('up');
                    self.__createRandomCell();
                    self.__caculateScore();
                    self.__isGameOver();
                }
                if (ev.keyCode == 39){
                    self.__moveCell('right');
                    self.__createRandomCell();
                    self.__caculateScore();
                    self.__isGameOver();
                }
                if (ev.keyCode == 40){
                    self.__moveCell('down');
                    self.__createRandomCell();
                    self.__caculateScore();
                    self.__isGameOver();
                }
            })
        },
        //移动方块
        __moveCell : function (direction) {
            // 清空是否被合并的标志位
            for (var i = 0;i<4;i++){
                isMerge[i] = new Array(4);
            }
            if (direction == 'left'){
                for (var i = 0;i<4;i++){
                    for (var j = 1;j<4;j++){
                        //如果左边没有方块则一直移动
                        //有方块则判断分数，相同则合并
                        if (positionArr[i][j]){
                            for (var y = j;y>0;y--){
                                //左边没有方块
                                if (!positionArr[i][y-1]){
                                    [positionArr[i][y-1],positionArr[i][y]] = [positionArr[i][y],positionArr[i][y-1]];
                                }
                                //左边有方块且分数相同且未被合并过
                                if (!isMerge[i][y] && !isMerge[i][y-1] && positionArr[i][y-1] && positionArr[i][y-1] === positionArr[i][y]){
                                    positionArr[i][y-1] = positionArr[i][y-1]*2;
                                    score += positionArr[i][y-1];
                                    positionArr[i][y] = '';
                                    isMerge[i][y-1] = true;
                                }
                            }
                        }
                    }
                }
            }
            if (direction == 'up'){
                //第一行不用再向上移
                for (var j = 0;j<4;j++){
                    for (var i = 1;i<4;i++){
                        //如果上边没有方块则一直移动
                        //有方块则判断分数，相同则合并
                        if (positionArr[i][j]){
                            for (var y = i;y>0;y--){
                                //上边没有方块
                                if (!positionArr[y-1][j]){
                                    [positionArr[y-1][j],positionArr[y][j]] = [positionArr[y][j],positionArr[y-1][j]];
                                }
                                //上边有方块且分数相同且未被合并过
                                if (!isMerge[y][j] && !isMerge[y-1][i] && positionArr[y-1][j] && positionArr[y-1][j] === positionArr[y][j]){
                                    positionArr[y-1][j] = positionArr[y][j]*2;
                                    score += positionArr[y-1][j];
                                    positionArr[y][j] = '';
                                    isMerge[y-1][j] = true;
                                }
                            }
                        }
                    }
                }
            }
            if (direction == 'right'){
                for (var i = 0;i<4;i++){
                    //最右边不需要再移动
                    for (var j = 2;j>=0;j--){
                        //如果右边没有方块则一直移动
                        //有方块则判断分数，相同则合并
                        if (positionArr[i][j]){
                            for (var y = j;y<=2;y++){
                                //右边没有方块
                                if (!positionArr[i][y+1]){
                                    [positionArr[i][y+1],positionArr[i][y]] = [positionArr[i][y],positionArr[i][y+1]];
                                }
                                //右边有方块且分数相同且未被合并过
                                if (!isMerge[i][y] && !isMerge[i][y+1] && positionArr[i][y+1] && positionArr[i][y] === positionArr[i][y+1]){
                                    positionArr[i][y+1] = positionArr[i][y]*2;
                                    score += positionArr[i][y+1];
                                    positionArr[i][y] = '';
                                    isMerge[i][y+1] = true;
                                }
                            }
                        }
                    }
                }
            }
            if (direction == 'down'){
                for (var j = 0;j<4;j++){
                    //最上边不需要再移动
                    for (var i = 2;i>=0;i--){
                        //如果上边没有方块则一直移动
                        //有方块则判断分数，相同则合并
                        if (positionArr[i][j]){
                            for (var y = i;y<=2;y++){
                                //上边没有方块
                                if (!positionArr[y+1][j]){
                                    [positionArr[y+1][j],positionArr[y][j]] = [positionArr[y][j],positionArr[y+1][j]];
                                }
                                //上边有方块且分数相同且未被合并过
                                if (!isMerge[y][j] && !isMerge[y+1][j] && positionArr[y+1][j] && positionArr[y][j] === positionArr[y+1][j]){
                                    positionArr[y+1][j] = positionArr[y][j]*2;
                                    score += positionArr[y+1][j];
                                    positionArr[y][j] = '';
                                    isMerge[y+1][j] = true;
                                }
                            }
                        }
                    }
                }
            }
            this.__updateCellHtml();
        },
        //移动之后，重新渲染所有格子的位置
        __updateCellHtml : function () {
            this.__removeAllCellHtml();
            for (var i = 0;i<4;i++){
                for (var j = 0;j<4;j++){
                    if (positionArr[i][j]) {
                        var cell = new Cell(positionArr[i][j],i,j);
                        this.__renderCellHtml(cell);
                    }
                }
            }
        },
        //生成随机的一个格子数据
        __createRandomCell : function () {
            if (this.__nospace()){
                return
            }
            // Math.random()函数返回范围 [0,1)
            // 取2或4的随机数
            var score = Math.ceil(Math.random()*2)*2;
            // 取[0,3]之间的随机数
            var randomRow = parseInt(Math.random()*4);
            var randomColumn = parseInt(Math.random()*4);

            while (true) {
                if (!positionArr[randomRow][randomColumn]){
                    break
                }
                else {
                    randomRow = parseInt(Math.random()*4);
                    randomColumn = parseInt(Math.random()*4);
                }
            }
            positionArr[randomRow][randomColumn] = score;
            var cell = new Cell(score,randomRow,randomColumn);
            this.__renderRandomCellHtml(cell);

        },
        //生成随机cell的html
        __renderRandomCellHtml : function (cell) {
            var $cell = this.__renderBaseCellHtml(cell);
            $cell.style.animation = 'show .3s ease-in-out';
            this.__appendCellToWrap($cell);
        },
        //基础cell
        __renderBaseCellHtml : function (cell) {
            //生成$cell单元格并添加样式，填充内容
            var $cell = document.createElement('div');
            $cell.classList.add('cell');
            $cell.innerHTML = cell.score;
            $cell.style.background = this.__setCellColor(cell.score).background;
            $cell.style.color = this.__setCellColor(cell.score).color;

            //确定单元格位置
            $cell.style.top = (15+cell.row*121)+ 'px';
            $cell.style.left = (15+cell.column*121)+ 'px';
            return $cell
        },
        //将cell添加到父容器中
        __appendCellToWrap : function ($cell) {
            var $cellWrap = document.querySelector('.cell-wrap');
            $cellWrap.appendChild($cell);
        },
        //根据分数设置格子颜色
        __setCellColor : function (score) {
            var color = {
                2 : {
                    background : '#EEE4DA',
                    color : '#666'
                },
                4 : {
                    background : '#EDE0C8',
                    color : '#666'
                },
                8 : {
                    background : '#F2B179',
                    color : '#fff'
                },
                16 : {
                    background : '#F59563',
                    color : '#fff'
                },
                32 : {
                    background : '#F67C5F',
                    color : '#fff'
                },
                64 : {
                    background : '#F65E3B',
                    color : '#fff'
                },
                128 : {
                    background : '#EDCF72',
                    color : '#fff'
                },
                256 : {
                    background : '#EDCC61',
                    color : '#fff'
                },
                512 : {
                    background : '#ECC850',
                    color : '#fff'
                },
                1024 : {
                    background : '#EDC53F',
                    color : '#fff'
                },
                2048 : {
                    background : '#ECC500',
                    color : '#fff'
                }
            }
            return color[score];
        },
        //渲染格子的html
        __renderCellHtml : function (cell) {
            var $cell = this.__renderBaseCellHtml(cell);
            this.__appendCellToWrap($cell);
        },
        //移除所有的格子html
        __removeAllCellHtml : function () {
            var $cellWrap = document.querySelector('.cell-wrap');
            while ($cellWrap.lastChild){
                $cellWrap.removeChild($cellWrap.lastChild);
            }
        },
        //初始化分数
        __initScore : function () {
            var $score = document.querySelector('.current-score>span');
            score = 0;
            $score.innerHTML = score;
        },
        //计算分数
        __caculateScore : function () {
            var $score = document.querySelector('.current-score>span');
            $score.innerHTML = score;
        },
        //当没有空格且无法再移动时，游戏结束
        __isGameOver : function () {
            var $gameOver = document.querySelector('.game-body .game--over');
            var $gameWin = document.querySelector('.game-body .game--win');
            if (this.__nospace() && !this.__canMove()){
                $gameOver.style.display = 'flex';
                return true;
            }
            for (var i = 0;i<4;i++){
                for (var j = 0;j<4;j++){
                    if (positionArr[i][j] === 2048){
                        $gameWin.style.display = 'flex';
                        return true;
                    }
                }
            }
        },
        //没有空格
        __nospace : function () {
            for (var i = 0;i<4;i++){
                for (var j = 0;j<4;j++){
                    // 有空格 false
                    if (!positionArr[i][j]){
                        return false
                    }
                }
            }
            //没有空格 true
            return true
        },
        //判断是否还能移动
        __canMove : function () {
            if (this.__canMoveLeft() || this.__canMoveDown() || this.__canMoveRight() || this.__canMoveUp()){
                return true
            }
            return false
        },
        //实现功能判断
        __canMoveLeft :function(){
            for(var i = 0;i<4;i++)
                for(var j = 0;j<4;j++)
                    if( positionArr[i][j] !== 0 && j !== 0)
                        if( positionArr[i][j-1] === 0 || positionArr[i][j-1] === positionArr[i][j])
                            return true;
            return false;
        },
        __canMoveRight : function(){
            for(var i = 0;i<4;i++)
                for(var j = 0;j<4;j++)
                    if( positionArr[i][j] !== 0 && j !== 3)
                        if( positionArr[i][j+1] === 0 || positionArr[i][j+1] === positionArr[i][j])
                            return true;
            return false;
        },
        __canMoveUp : function(){
            for(var i = 0;i<4;i++)
                for(var j = 0;j<4;j++)
                    if( positionArr[i][j] !== 0 && i !== 0)
                        if( positionArr[i-1][j] === 0 || positionArr[i-1][j] === positionArr[i][j])
                            return true;
            return false;
        },
        __canMoveDown : function(){
            for(var i = 0;i<4;i++)
                for(var j = 0;j<4;j++)
                    if( positionArr[i][j] !== 0 && i !== 3)
                        if( positionArr[i+1][j] === 0 || positionArr[i+1][j] === positionArr[i][j])
                            return true;
            return false;
        },
        //新游戏按钮事件绑定
        __bindNewGameEvent : function () {
            var $newgame = document.querySelector('.newgame');
            var $gameOver = document.querySelector('.game-body .game--over');
            var $gameWin = document.querySelector('.game-body .game--win');
            var self = this;
            $newgame.addEventListener('click',function () {
                $gameOver.style.display = 'none';
                $gameWin.style.display = 'none';

                self.__removeAllCellHtml();
                for (var i = 0;i<4;i++){
                    for (var j = 0;j<4;j++){
                        positionArr[i][j] = '';
                        isMerge[i][j] = '';
                    }
                }
                self.__initScore();
                self.__createRandomCell();
                self.__createRandomCell();
            })
        }
    }
    Cell.fn.__init();
}())

