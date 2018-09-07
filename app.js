//app.js
App({
  onLaunch: function() {
    if (wx.getStorageSync('menu')) {
      this.menu = wx.getStorageSync('menu');
    } else {
      this.menu = [{
        name: '包子'
      }, {
        name: '混沌'
      }, {
        name: '拌饭'
      }, {
        name: '黄焖鸡'
      }, {
        name: '麻辣烫'
      }, {
        name: '米线'
      }, {
        name: '炒饭'
      }, {
        name: '肯德基'
      }] //放奖品
    }
  }
})