var n;

function Game() {
    this.kbEvent();
}

Game.prototype = {
    constructor: Game,
    init: function() {
        this.score = 0;
        this.arr = [];
        $("#score").html("分数：0");
        $(".number_cell").remove();
        n = document.getElementById("id_name").value;
        var num = 492 / n;
        for (let i = 1; i <= n * n; i++) {
            var item = '<div id = "cell' + i + '" class="cell"></div>';
            $(".g2048").append(item);
        }
        for (let i = 1; i <= n * n; i++) {
            document.getElementById("cell" + i).style.height = num + "px";
            document.getElementById("cell" + i).style.width = num + "px";
        }
        //var x = document.getElementsByName("cell");
        //for(let i = 0; i < x.length; i++)
        //{
        //  x[i].style.height = num + "px";
        // x[i].style.width = num + "px"
        //}     
        this.creatArr();
    },
    creatArr: function() {
        var i, j;
        for (i = 0; i < n; i++) {
            this.arr[i] = [];
            for (j = 0; j < n; j++) {
                this.arr[i][j] = {};
                this.arr[i][j].value = 0;
            }
        }
        var i1, i2, j1, j2;
        do {
            i1 = getRandom(n - 1), i2 = getRandom(n - 1), j1 = getRandom(n - 1), j2 = getRandom(n - 1);
        } while (i1 == i2 && j1 == j2);
        this.valueUpdate(2, i1, j1);
        this.valueUpdate(2, i2, j2);
        this.drawCell(i1, j1);
        this.drawCell(i2, j2);
    },
    valueUpdate: function(num, i, j) {
        this.arr[i][j].value = num;
    },
    drawCell: function(i, j) {

        var item = '<div class="number_cell p' + i + j + '" id="number_cell p' + i + j + '" ><div class="number_cell_con n2"><span>' +
            this.arr[i][j].value + '</span></div> </div>';
        $(".g2048").append(item);
        this.adjust(i, j); //调整大小

    },
    newCell: function() {
        var len, index;
        var ableArr = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (this.arr[i][j].value == 0) {
                    ableArr.push([i, j]);
                }
            }
        }
        len = ableArr.length;
        if (len > 0) {
            index = getRandom(len);
            let i = ableArr[index][0];
            let j = ableArr[index][1];
            this.valueUpdate(2, i, j);
            this.drawCell(i, j);
        }
    },
    kbEvent: function() {
        var that = this;
        document.onkeydown = function(event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];

            if (e && e.keyCode == 37) //左
            {
                that.moveLeft(n);
                that.checklose(n);
            }
            if (e && e.keyCode == 38) //上
            {
                that.moveUp(n);
                that.checklose(n);
            }
            if (e && e.keyCode == 39) //右
            {
                that.moveRight(n);
                that.checklose(n);
            }
            if (e && e.keyCode == 40) //下
            {
                that.moveDown(n);
                that.checklose(n);
            }
        }
    },
    moveUp: function(n) {
        var i, j, k, l;
        for (i = 0; i < n; i++) {
            l = 0;
            for (j = 0; j < n; j++) {
                if (this.arr[i][j].value == 0) {
                    continue;
                }
                k = j - 1;
                while (k >= l) {
                    if (this.arr[i][k].value == 0) {
                        if (k == l || (this.arr[i][k - 1].value != 0 && this.arr[i][k - 1].value != this.arr[i][j].value)) {
                            this.moveCell(i, j, i, k);
                        }
                        k--
                    } else {
                        if (this.arr[i][k].value == this.arr[i][j].value) {
                            this.mergeCells(i, j, i, k);
                            l++;
                        }
                        break;
                    }
                }
            }
        }
        this.newCell();
    },
    moveDown: function(n) {
        var i, j, k, l;
        for (i = 0; i < n; i++) {
            l = n - 1;
            for (j = n - 1; j >= 0; j--) {
                if (this.arr[i][j].value == 0) {
                    continue;
                }
                k = j + 1;
                while (k <= l) {
                    if (this.arr[i][k].value == 0) {
                        if (k == l || (this.arr[i][k + 1].value != 0 && this.arr[i][k + 1].value != this.arr[i][j].value)) {
                            this.moveCell(i, j, i, k);
                        }
                        k++;
                    } else {
                        if (this.arr[i][k].value == this.arr[i][j].value) {
                            this.mergeCells(i, j, i, k);
                            n--;
                        }
                        break;
                    }
                }
            }
        }
        this.newCell();
    },
    moveLeft: function(n) {
        var i, j, k, l;
        for (j = 0; j < n; j++) {
            l = 0;
            for (i = 0; i < n; i++) {
                if (this.arr[i][j].value == 0) {
                    continue;
                }
                k = i - 1;
                while (k >= l) {
                    if (this.arr[k][j].value == 0) {
                        if (k == l || (this.arr[k - 1][j].value != 0 && this.arr[k - 1][j].value != this.arr[i][j].value)) {
                            this.moveCell(i, j, k, j);
                        }
                        k--;
                    } else {
                        if (this.arr[k][j].value == this.arr[i][j].value) {
                            this.mergeCells(i, j, k, j);
                            n++;
                        }
                        break;
                    }
                }
            }
        }
        this.newCell();
    },
    moveRight: function(n) {
        var i, j, k, l;
        for (j = 0; j < n; j++) {
            l = n - 1;
            for (i = n - 1; i >= 0; i--) {
                if (this.arr[i][j].value == 0) {
                    continue;
                }
                k = i + 1;
                while (k <= l) {
                    if (this.arr[k][j].value == 0) {
                        if (k == l || (this.arr[k + 1][j].value != 0 && this.arr[k + 1][j].value != this.arr[i][j].value)) {
                            this.moveCell(i, j, k, j);
                        }
                        k++;
                    } else {
                        if (this.arr[k][j].value == this.arr[i][j].value) {
                            this.mergeCells(i, j, k, j);
                            l--;
                        }
                        break;
                    }
                }
            }
        }
        this.newCell();
    },
    mergeCells: function(i1, j1, i2, j2) {
        var temp = this.arr[i2][j2].value;
        var temp1 = temp * 2;
        this.arr[i2][j2].value = temp1;
        this.arr[i1][j1].value = 0;
        var el = document.getElementById("number_cell p" + i1 + j1);
        el.parentNode.removeChild(el);
        var theDom = $(".p" + i2 + j2).find(".number_cell_con");
        setTimeout(function() {
            theDom.addClass('n' + temp1).removeClass('n' + temp).find('span').html(temp1);
        }, 200); //移动耗时
        this.score += temp1;
        $("#score").html("分数：" + this.score);
        if (temp1 == 2048) {
            alert("you win");
            reloadPage();
            this.init();
        }
    },
    moveCell: function(i1, j1, i2, j2) {
        this.arr[i2][j2].value = this.arr[i1][j1].value;
        this.arr[i1][j1].value = 0;
        var el = document.getElementById("number_cell p" + i1 + j1);
        el.parentNode.removeChild(el);
        var item = '<div class="number_cell p' + i2 + j2 + '" id="number_cell p' + i2 + j2 + '" ><div class="number_cell_con n' + this.arr[i2][j2].value + '"><span>' +
            this.arr[i2][j2].value + '</span></div> </div>';
        $(".g2048").append(item);
        this.adjust(i2, j2); //调整大小  
    },
    adjust: function(i, j) {
        document.getElementById("number_cell p" + i + j).style.left = (100 / n) * i + "%";
        document.getElementById("number_cell p" + i + j).style.top = (100 / n) * j + "%";
        document.getElementById("number_cell p" + i + j).style.width = (100 / n) + "%";
        document.getElementById("number_cell p" + i + j).style.height = (100 / n) + "%";
    },
    checklose: function(n) {
        /*判定输赢*/
        var i, j, temp;
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                temp = this.arr[i][j].value;
                if (temp == 0) {
                    return false;
                }
                if (this.arr[i + 1] && (this.arr[i + 1][j].value == temp)) {
                    return false;
                }
                if ((this.arr[i][j + 1] != undefined) && (this.arr[i][j + 1].value == temp)) {
                    return false;
                }
            }
        }
        alert('YOU LOSE!');
        reloadPage();
        this.init();
        return true;
    }
}

function start() {
    var g = new Game();
    g.init();
}

function getRandom(n) {
    return Math.floor(Math.random() * n)
}
//重新加载页面
function reloadPage() {
    window.location.reload();
}