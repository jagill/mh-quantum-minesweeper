
$(function() {
  "use strict";
  var result = {
    gameOver : true,
    boardEl : null,
    a9485 : null,
    a9699 : 0,
    undoStack : null,
    a1122 : "",
    revealed : "",
    b1124 : "",
    b2456 : new Array(2),
    c8921 : "",
    a9265 : ""
  };
  var config = {
    cellSize : 30,
    boardWidth : 450,
    boardHeight : 450,
    bombCount : 100,
    a5782 : "white",
    b8314 : "14px Arial",
    c9582 : "#dadada",
    c1844 : "white",
    b3111 : 5,
    bombImgPath : "skull.png"
  };
  var viewCache = {};
  var b7764 = {
    /**
     * @return {undefined}
     */
    b7764 : function() {
      result.boardEl = $("#board");
      result.a9485 = result.boardEl[0].getContext("2d");
      result.a9485.a5782 = config.a5782;
      result.a9485.font = config.b8314;
      result.c8921 = Math.floor(config.boardWidth / config.cellSize);
      result.a9265 = Math.floor(config.boardHeight / config.cellSize);
      /** @type {Array} */
      result.b8377 = new Array(result.c8921 * result.a9265);
      /** @type {Array} */
      result.b8377[0] = new Array(result.c8921 * result.a9265);
      /** @type {number} */
      result.b8377[0][0] = 1;
      /** @type {number} */
      var x = 1;
      for (;x < result.b8377.length;x++) {
        /** @type {number} */
        result.b8377[0][x] = 0;
      }
      /** @type {number} */
      var y = 1;
      for (;y < result.b8377.length;y++) {
        /** @type {Array} */
        result.b8377[y] = new Array(result.c8921 * result.a9265);
        /** @type {number} */
        result.b8377[y][0] = 1;
        /** @type {number} */
        x = 1;
        for (;x < result.b8377.length;x++) {
          result.b8377[y][x] = result.b8377[y - 1][x] + result.b8377[y - 1][x - 1];
        }
      }
      /** @type {Array} */
      result.a1122 = new Array(result.c8921);
      /** @type {Array} */
      result.revealed = new Array(result.c8921);
      viewCache.restartBtn = $("#restartbtn");
      viewCache.undoBtn = $("#undobtn");
      viewCache.restartBtn.on({
        /**
         * @return {undefined}
         */
        click : function() {
          b7764.init();
        }
      });
      viewCache.undoBtn.on({
        /**
         * @return {undefined}
         */
        click : function() {
          options.undoBtn();
        }
      });
      result.boardEl.on({
        /**
         * @param {?} y
         * @return {undefined}
         */
        mouseup : function(y) {
          options.click(y);
        },
        /**
         * @param {?} y
         * @return {undefined}
         */
        mousemove : function(y) {
          options.hover(y);
        }
      });
      /** @type {Image} */
      result.bombImg = new Image;
      result.bombImg.src = config.bombImgPath;
      b7764.init();
    },
    /**
     * @return {undefined}
     */
    init : function() {
      result.a9485.strokeStyle = config.c1844;
      result.a9485.fillStyle = config.c9582;
      result.a9485.clearRect(0, 0, config.boardWidth, config.boardHeight);
      /** @type {Array} */
      result.undoStack = Array();
      /** @type {boolean} */
      result.gameOver = false;
      result.a9699 = config.bombCount;
      result.a1122 = undefined;
      /** @type {Array} */
      result.revealed = Array(result.c8921);
      /** @type {number} */
      var dtid = 0;
      for (;dtid < result.c8921;dtid++) {
        /** @type {Array} */
        result.revealed[dtid] = Array(result.a9265);
      }
      /** @type {Array} */
      result.b3817 = new Array(_0x388fx2.length);
      /** @type {number} */
      var meCard = 0;
      for (;meCard < _0x388fx2.length;meCard++) {
        /** @type {number} */
        result.b3817[meCard] = 0;
      }
      window.clearInterval(result.b1124);
      element.c1144();
    }
  };
  var options = {
    /**
     * @param {?} dataAndEvents
     * @return {?}
     */
    click : function(dataAndEvents) {
      if (dataAndEvents.which === 3) { // right click
        this.undoBtn();
        return true;
      }
      if (result.gameOver) {
        return false;
      }
      var y = Math.max(0, Math.floor((dataAndEvents.pageX - result.boardEl[0].offsetLeft) / config.cellSize));
      var x = Math.max(0, Math.floor((dataAndEvents.pageY - result.boardEl[0].offsetTop) / config.cellSize));
      if (dataAndEvents.which !== 1 || result.revealed[y][x]) {
        return false;
      }
      result.undoStack.push([y, x]);
      /** @type {number} */
      result.revealed[y][x] = 1;
      /** @type {number} */
      var k = 0;
      for (;k < _0x388fx3[x][y].length;k++) {
        result.b3817[_0x388fx3[x][y][k]] += _0x388fx4[x][y][k];
      }
      result.a1122 = this.c1849();
      if (result.a1122) {
        element.b4256();
      } else {
        result.a9485.drawImage(result.bombImg, y * config.cellSize, x * config.cellSize, config.cellSize, config.cellSize);
        /** @type {boolean} */
        result.gameOver = true;
      }
    },
    /**
     * @param {?} onHover
     * @return {undefined}
     */
    hover : function(onHover) {
      if (!result.gameOver) {
        var type = Math.max(0, Math.floor((onHover.pageX - result.boardEl[0].offsetLeft) / config.cellSize));
        var fn = Math.max(0, Math.floor((onHover.pageY - result.boardEl[0].offsetTop) / config.cellSize));
        /** @type {number} */
        var _0x1fb4x10 = result.revealed[type][fn] ? 1 : -1;
        var y = result.b2456[0];
        var x = result.b2456[1];
        if (typeof y !== "undefined" && result.revealed[y][x] !== 1) {
          result.a9485.fillStyle = config.c9582;
          element.c1168(result.b2456[0], result.b2456[1]);
        }
        if (_0x1fb4x10 < 0 && !result.gameOver) {
          result.a9485.fillStyle = "#aaa";
          element.c1168(type, fn);
          result.b2456[0] = type;
          result.b2456[1] = fn;
        }
      }
    },
    /**
     * @return {undefined}
     */
    undoBtn : function() {
      if (result.undoStack.length === 0) {
        return;
      }
      var args = result.undoStack.pop();
      var type = args[0];
      var fn = args[1];
      /** @type {number} */
      result.revealed[type][fn] = 0;
      /** @type {number} */
      var k = 0;
      for (;k < _0x388fx3[fn][type].length;k++) {
        result.b3817[_0x388fx3[fn][type][k]] -= _0x388fx4[fn][type][k];
      }
      result.a1122 = this.c1849();
      result.a9485.fillStyle = config.c9582;
      element.c1168(type, fn);
      if (result.a1122) {
        element.b4256();
        /** @type {boolean} */
        result.gameOver = false;
      }
    },
    /**
     * @return {?}
     */
    c1849 : function() {
      /** @type {Array} */
      var grid = Array(result.c8921);
      /** @type {number} */
      var index = 0;
      /** @type {number} */
      var copyByClone = 0;
      /** @type {number} */
      var j = 0;
      for (;j < result.c8921;j++) {
        /** @type {Array} */
        grid[j] = Array(result.a9265);
        /** @type {number} */
        var i = 0;
        for (;i < result.a9265;i++) {
          if (result.revealed[j][i]) {
            /** @type {number} */
            grid[j][i] = 1;
            /** @type {number} */
            copyByClone = 1;
            /** @type {number} */
            var right_key = 0;
            for (;right_key <= 1;right_key++) {
              /** @type {Array} */
              var a = [0, 1];
              var h = _0x388fx5[i][j];
              /** @type {number} */
              var k = 0;
              for (;k < h.length;k++) {
                if (k == right_key) {
                  continue;
                }
                var b = _0x388fx1[_0x388fx2[h[k]][result.b3817[h[k]]]];
                /** @type {Array} */
                var temp = new Array(Math.min(a.length + b.length - 2, result.a9699 + 2 - a[0] - b[0]));
                temp[0] = a[0] + b[0];
                /** @type {number} */
                var xx = 1;
                for (;xx < temp.length;xx++) {
                  /** @type {number} */
                  temp[xx] = 0;
                }
                /** @type {number} */
                xx = 1;
                for (;xx < a.length;xx++) {
                  /** @type {number} */
                  var yy = 1;
                  for (;yy < b.length && xx + yy - 1 < temp.length;yy++) {
                    temp[xx + yy - 1] += a[xx] * b[yy];
                  }
                }
                /** @type {Array} */
                a = temp;
              }
              /** @type {number} */
              var v = 0;
              if (a[0] + a.length - 1 == result.a9699 + 1) {
                v = a[a.length - 1];
              }
              if (right_key) {
                if (v < 1E-20) {
                  return undefined;
                }
                grid[j][i] /= v;
              } else {
                grid[j][i] *= v;
              }
            }
            index += grid[j][i];
          } else {
            /** @type {number} */
            grid[j][i] = 0;
          }
        }
      }
      if (copyByClone && index < 0.01) {
        return undefined;
      }
      return grid;
    }
  };
  var element = {
    /**
     * @return {undefined}
     */
    c1144 : function() {
      result.a9485.fillStyle = config.c9582;
      /** @type {number} */
      var r20 = 0;
      for (;r20 <= result.c8921;r20++) {
        /** @type {number} */
        var restoreScript = 0;
        for (;restoreScript <= result.a9265;restoreScript++) {
          this.c1168(r20, restoreScript);
        }
      }
    },
    /**
     * @param {number} day
     * @return {?}
     */
    b9987 : function(day) {
      /** @type {Array} */
      var config = [[255, 255, 255], [1, 0, 254], [1, 127, 1], [254, 0, 0], [1, 0, 128], [129, 1, 2], [0, 128, 129], [0, 0, 0], [128, 128, 128], [128, 128, 128]];
      /** @type {Array} */
      var weekDays = [100, 97, 92, 84, 70, 50, 30, 16, 8, 3, 0];
      day = Math.round(day * 10);
      var otherAlpha = weekDays[day % 10];
      if (day > 0 && day < 6) {
        otherAlpha -= 10;
      }
      var row = Math.floor(day / 10 + 0.01);
      /** @type {Array} */
      var prevSources = [];
      /** @type {number} */
      var i = 0;
      for (;i < 3;i++) {
        prevSources[i] = Math.round((config[row][i] * otherAlpha + config[row + 1][i] * (100 - otherAlpha)) / 100);
      }
      return prevSources;
    },
    /**
     * @return {undefined}
     */
    b4256 : function() {
      /** @type {number} */
      var y = 0;
      for (;y < result.c8921;y++) {
        /** @type {number} */
        var x = 0;
        for (;x < result.a9265;x++) {
          if (result.revealed[y][x]) {
            result.a9485.strokeStyle = "white";
            result.a9485.fillStyle = "white";
            this.c1168(y, x);
            var _0x1fb4x29 = this.b9987(result.a1122[y][x]);
            result.a9485.fillStyle = "rgb(" + _0x1fb4x29[0] + "," + _0x1fb4x29[1] + "," + _0x1fb4x29[2] + ")";
            result.a9485.fillText(result.a1122[y][x].toFixed(1), y * config.cellSize + 5, x * config.cellSize + 20);
          }
        }
      }
    },
    /**
     * @param {number} x
     * @param {number} base
     * @return {undefined}
     */
    c1168 : function(x, base) {
      /** @type {number} */
      var delta = config.cellSize - 1;
      /** @type {number} */
      var post = config.cellSize - 1;
      /** @type {number} */
      x = x * config.cellSize;
      /** @type {number} */
      base = base * config.cellSize;
      result.a9485.beginPath();
      result.a9485.moveTo(x + config.b3111, base);
      result.a9485.lineTo(x + delta - config.b3111, base);
      result.a9485.quadraticCurveTo(x + delta, base, x + delta, base + config.b3111);
      result.a9485.lineTo(x + delta, base + post - config.b3111);
      result.a9485.quadraticCurveTo(x + delta, base + post, x + delta - config.b3111, base + post);
      result.a9485.lineTo(x + config.b3111, base + post);
      result.a9485.quadraticCurveTo(x, base + post, x, base + post - config.b3111);
      result.a9485.lineTo(x, base + config.b3111);
      result.a9485.quadraticCurveTo(x, base, x + config.b3111, base);
      result.a9485.closePath();
      result.a9485.stroke();
      result.a9485.fill();
    }
  };
  b7764.b7764();
});
