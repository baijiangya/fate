// pages/components/dial.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lottery: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  //开始
  startRollTap:function(){

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function () {
      this.triggerEvent('customevent', {}) // 只会触发 pageEventListener2
      this.triggerEvent('customevent', {}, { bubbles: true }) // 会依次触发 pageEventListener2 、 pageEventListener1
      this.triggerEvent('customevent', {}, { bubbles: true, composed: true }) // 会依次触发 pageEventListener2 、 anotherEventListener 、 pageEventListener1
    }
  }
})
