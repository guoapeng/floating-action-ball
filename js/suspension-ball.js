
function SuspensionBall(drag, dragLink) {
   this.dragLink = dragLink
  // 判断是否支持触摸事件
  if ('ontouchstart' in window) {
    this.startEvt = 'touchstart'
    this.moveEvt = 'touchmove'
    this.endEvt = 'touchend'
  } else {
    this.startEvt = 'mousedown'
    this.moveEvt = 'mousemove'
    this.endEvt = 'mouseup'
  }
  // 获取元素
  this.drag = drag
  this.drag.style.position = 'absolute'
  this.drag.style.cursor = 'move'
  // 标记是拖曳还是点击
  var isClick = true
  var disX, disY, left, top, starX, starY

}

SuspensionBall.prototype.init = function() {
  this.drag.addEventListener(this.startEvt, this.startMoveProxy)

}

SuspensionBall.prototype.startMove = function(e) {
    // 阻止页面的滚动，缩放
    e.preventDefault()
    // 兼容IE浏览器
    var e = e || window.event
    this.isClick = true
    // 手指按下时的坐标
    this.starX = e.touches ? e.touches[0].clientX : e.clientX
    this.starY = e.touches ? e.touches[0].clientY : e.clientY
    // 手指相对于拖动元素左上角的位置
    this.disX = this.starX - this.drag.offsetLeft
    this.disY = suspensionBall.starY - this.drag.offsetTop
    // 按下之后才监听后续事件
    document.addEventListener(this.moveEvt, this.moveFunProxy)
    document.addEventListener(this.endEvt, this.endFunProxy)
}

SuspensionBall.prototype.moveFun = function(e) {
    // 兼容IE浏览器
    var e = e || window.event
    // 防止触摸不灵敏，拖动距离大于20像素就认为不是点击，小于20就认为是点击跳转
    if (
      Math.abs(this.starX - (e.touches ? e.touches[0].clientX : e.clientX)) > 20 ||
      Math.abs(this.starY - (e.touches ? e.touches[0].clientY : e.clientY)) > 20
    ) {
      this.isClick = false
    }
    this.left = (e.touches ? e.touches[0].clientX : e.clientX) - this.disX
    this.top = (e.touches ? e.touches[0].clientY : e.clientY) - this.disY
    // 限制拖拽的X范围，不能拖出屏幕
    if (this.left < 0) {
      this.left = 0
    } else if (this.left > document.documentElement.clientWidth - this.drag.offsetWidth) {
      this.left = document.documentElement.clientWidth - this.drag.offsetWidth
    }
    // 限制拖拽的Y范围，不能拖出屏幕
    if (this.top < 0) {
      this.top = 0
    } else if (this.top > document.documentElement.clientHeight - this.drag.offsetHeight) {
      this.top = document.documentElement.clientHeight - this.drag.offsetHeight
    }
    this.drag.style.left = this.left + 'px'
    this.drag.style.top = this.top + 'px'
}

SuspensionBall.prototype.endFun = function(e) {
    document.removeEventListener(this.moveEvt, this.moveFunProxy)
    document.removeEventListener(this.endEvt, this.endFunProxy)
    if (this.isClick) { // 点击
      window.location.href = this.dragLink
    }
}

SuspensionBall.prototype.startMoveProxy = function(e) {
    suspensionBall.startMove(e)
}

SuspensionBall.prototype.moveFunProxy = function(e) {
    suspensionBall.moveFun(e)
  }

 SuspensionBall.prototype.endFunProxy = function(e) {
    suspensionBall.endFun(e)
  }
  
  // suspension-ball.js
 var suspensionBall = new SuspensionBall(document.getElementById('ballId'))
 suspensionBall.init()
