//index.js
//获取应用实例
const app = getApp()
let canRoll = true, //加控制，防止用户点击两次
  num = 1, //用在动画上，让用户在第二次点击的时候可以接着上次转动的角度继续转
  lotteryArrLen = 0, //放奖品的数组的长度
  lottery = ['奖品1', '奖品2', '奖品3']; //放奖品


Page({
  data: {
    back: {}, //弹框遮罩动画
    isEdit: false, //是否显示编辑内容
    isMsg: false, //是否显示提示信息
    lottery: ['包子', '混沌', '拌饭', '黄焖鸡', '西红柿牛肉羹', '米线', '炒饭', '肯德基']
  },
  //页面加载数据页面
  onLoad: function() {

  },
  //页面显示
  onShow: function() {
    let that = this;
    let aniData = wx.createAnimation({ //创建动画对象
      duration: 4000,
      timingFunction: 'ease'
    });
    this.aniData = aniData; //将动画对象赋值给this的aniData属性
    lotteryArrLen = lottery.length;
  },

  //开始转盘
  startRollTap() { 
    let that = this;
    if (canRoll) {
      canRoll = false;
      let aniData = this.aniData; //获取this对象上的动画对象
      let rightNum = ~~(Math.random() * lotteryArrLen); //生成随机数
      aniData.rotate(3600 * num - 360 / lotteryArrLen * rightNum).step(); //设置转动的圈数
      this.setData({
        aniData: aniData.export()
      })
      num++;    
    }
    if(!canRoll){
      setTimeout(function () {
        canRoll = true;
      }, 4000)
    }
  },
  //编辑
  edit: function() {
    if (this.data.isEdit) {
      this.setData({
        isEdit: false
      })
    } else {
      this.setData({
        isEdit: true
      })
    }
  },
})