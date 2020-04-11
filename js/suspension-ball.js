// suspension-ball.js
 var suspensionBall = new SuspensionBall(document.getElementById('ballId'))

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

  drag.addEventListener(this.startEvt, startMove)

}

SuspensionBall.prototype = {

}

function startMove(e) {
    // 阻止页面的滚动，缩放
    e.preventDefault()
    // 兼容IE浏览器
    var e = e || window.event
    suspensionBall.isClick = true
    // 手指按下时的坐标
    suspensionBall.starX = e.touches ? e.touches[0].clientX : e.clientX
    suspensionBall.starY = e.touches ? e.touches[0].clientY : e.clientY
    // 手指相对于拖动元素左上角的位置
    suspensionBall.disX = suspensionBall.starX - suspensionBall.drag.offsetLeft
    suspensionBall.disY = suspensionBall.starY - suspensionBall.drag.offsetTop
    // 按下之后才监听后续事件
    document.addEventListener(suspensionBall.moveEvt, moveFun)
    document.addEventListener(suspensionBall.endEvt, endFun)
}

function moveFun(e) {
    // 兼容IE浏览器
    var e = e || window.event
    // 防止触摸不灵敏，拖动距离大于20像素就认为不是点击，小于20就认为是点击跳转
    if (
      Math.abs(suspensionBall.starX - (e.touches ? e.touches[0].clientX : e.clientX)) > 20 ||
      Math.abs(suspensionBall.starY - (e.touches ? e.touches[0].clientY : e.clientY)) > 20
    ) {
      suspensionBall.isClick = false
    }
    suspensionBall.left = (e.touches ? e.touches[0].clientX : e.clientX) - suspensionBall.disX
    suspensionBall.top = (e.touches ? e.touches[0].clientY : e.clientY) - suspensionBall.disY
    // 限制拖拽的X范围，不能拖出屏幕
    if (suspensionBall.left < 0) {
      suspensionBall.left = 0
    } else if (suspensionBall.left > document.documentElement.clientWidth - suspensionBall.drag.offsetWidth) {
      suspensionBall.left = document.documentElement.clientWidth - suspensionBall.drag.offsetWidth
    }
    // 限制拖拽的Y范围，不能拖出屏幕
    if (suspensionBall.top < 0) {
      suspensionBall.top = 0
    } else if (suspensionBall.top > document.documentElement.clientHeight - suspensionBall.drag.offsetHeight) {
      suspensionBall.top = document.documentElement.clientHeight - suspensionBall.drag.offsetHeight
    }
    suspensionBall.drag.style.left = suspensionBall.left + 'px'
    suspensionBall.drag.style.top = suspensionBall.top + 'px'
  }

 function endFun(e) {
    document.removeEventListener(suspensionBall.moveEvt, moveFun)
    document.removeEventListener(suspensionBall.endEvt, endFun)
    if (suspensionBall.isClick) { // 点击
      window.location.href = suspensionBall.dragLink
    }
  }