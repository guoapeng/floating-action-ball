
function isFn(value) {
  const type = Object.prototype.toString.call(value);
  return type === '[object Function]';
}
function isNode(value) {
  return value !== undefined && (value.nodeType === 1 || value.nodeType === 9);
}

function EventManage() {
    this.handlers = [];
  }
    
EventManage.prototype = {
    add: function (target, eventName, handler) {
    
          if (!target && !eventName && !handler) {
            throw new Error('缺少参数');
          }
          if (!isFn(handler)) {
            throw new TypeError('Third argument must be a Function');
          }
          
          if (isNode(target)) {
            target.addEventListener(eventName, handler)
            destroy = function(){
               target.removeEventListener(eventName, handler)
            }
            this.handlers.push({target:target, eventName: eventName, handler: handler, destroy: destroy})
            return
          }
          throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');

    },
    remove: function (target, eventName, handler) {
      for(i in this.handlers) {
         if(target.compareDocumentPosition(this.handlers[i].target)==0 
            && this.handlers[i].eventName ==eventName 
            && this.handlers[i].handler.toString() == handler.toString()) {
            this.handlers[i].destroy()
            this.handlers.splice(i, 1)
         }
      }
    }
}

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
  this.eventManage = new EventManage()

}

SuspensionBall.prototype.init = function() {
    this.eventManage.add(this.drag, this.startEvt, this.startMove.bind(this))
}

SuspensionBall.prototype.startMove = function(e) {
    // 阻止页面的滚动，缩放
    e.preventDefault()
    // 兼容IE浏览器
    var e = e || window.event
    // 手指按下时的坐标
    this.starX = e.touches ? e.touches[0].clientX : e.clientX
    this.starY = e.touches ? e.touches[0].clientY : e.clientY
    // 手指相对于拖动元素左上角的位置
    this.disX = this.starX - this.drag.offsetLeft
    this.disY = this.starY - this.drag.offsetTop
    // 按下之后才监听后续事件
    this.eventManage.add(document, this.moveEvt, this.moveFun.bind(this))
    this.eventManage.add(document, this.endEvt, this.endFun.bind(this))
    
}

SuspensionBall.prototype.moveFun = function(e) {
    // 兼容IE浏览器
    var e = e || window.event
    // 防止触摸不灵敏，拖动距离大于20像素就认为不是点击，小于20就认为是点击跳转
    
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
    this.drag.style.left = (this.left/document.documentElement.clientWidth)*100 + '%'
    this.drag.style.top = (this.top/document.documentElement.clientHeight) *100 + '%'
}

SuspensionBall.prototype.endFun = function(e) {
    this.eventManage.remove(document, this.moveEvt, this.moveFun.bind(this))
    this.eventManage.remove(document, this.endEvt, this.endFun.bind(this))
}

  
 
