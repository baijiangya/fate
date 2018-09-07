//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

let menu = [] //放奖品


Page({
  data: {
    back: {}, //弹框遮罩动画
    isEdit: false, //是否显示编辑内容
    isMsg: false, //是否显示提示信息
    lottery: [],
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    menu: []
  },
  //页面加载数据页面
  onLoad: function() {

  },
  //页面显示
  onShow: function() {
    this.onReady();
    // //创建转盘旋转动画
    // let aniData = wx.createAnimation({ //创建动画对象
    //   duration: 4000,
    //   timingFunction: 'ease'
    // });
    // this.aniData = aniData; //将动画对象赋值给this的aniData属性
    // lotteryArrLen = lottery.length;
  },

  //开始
  getLottery: function() {
    var that = this
    var awardIndex = Math.random() * 8 >>> 0;

    // 获取奖品配置
    var awardsConfig = app.awardsConfig,
      runNum = 8
    if (awardIndex < 2) awardsConfig.chance = false
    // 旋转抽奖
    app.runDegs = app.runDegs || 0
    console.log('deg', app.runDegs)
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 8))
    console.log('deg', app.runDegs)

    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })

    // // 记录奖品
    // var winAwards = wx.getStorageSync('winAwards') || { data: [] }
    // winAwards.data.push(awardsConfig.awards[awardIndex].name + '1个')
    // wx.setStorageSync('winAwards', winAwards)

    // 中奖提示
    setTimeout(function() {
      wx.showModal({
        title: awardsConfig.awards[awardIndex].name,
        content: '恭喜',
        showCancel: false
      })
      if (awardsConfig.chance) {
        that.setData({
          btnDisabled: ''
        })
      }
    }, 4000);
  },

  onReady: function() {
    var that = this;

    // getAwardsConfig
    app.awardsConfig = {
      chance: true,
      awards: app.menu
    }

    // wx.setStorageSync('awardsConfig', JSON.stringify(awardsConfig))


    // 绘制转盘
    var awardsConfig = app.awardsConfig.awards,
      len = awardsConfig.length,
      rotateDeg = 360 / len / 2 + 90,
      html = [],
      turnNum = 1 / len // 文字旋转 turn 值
    that.setData({
      btnDisabled: app.awardsConfig.chance ? '' : 'disabled'
    })
    var ctx = wx.createContext()
    for (var i = 0; i < len; i++) {
      // 保存当前状态
      ctx.save();
      // 开始一条新路径
      ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      ctx.translate(100, 100);
      // 从(0, 0)坐标开始定义一条新的子路径
      ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      ctx.rotate((360 / len * i - rotateDeg) * Math.PI / 180);
      // 绘制圆弧
      ctx.arc(0, 0, 100, 0, 2 * Math.PI / len, false);

      // 颜色间隔
      if (i % 2 == 0) {
        ctx.setFillStyle('rgba(255,184,32,.1)');
      } else {
        ctx.setFillStyle('rgba(255,203,63,.1)');
      }
      // 填充扇形
      ctx.fill();
      // 绘制边框
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('#fff');
      ctx.stroke();

      // 恢复前一个状态
      ctx.restore();

      // 奖项列表
      html.push({
        turn: i * turnNum + 'turn',
        lineTurn: i * turnNum + turnNum / 2 + 'turn',
        award: awardsConfig[i].name
      });
    }
    that.setData({
      menu: html
    });

    // 对 canvas 支持度太差，换种方式实现
    /*wx.drawCanvas({
      canvasId: 'lotteryCanvas',
      actions: ctx.getActions()
    })*/
  },

  //编辑
  edit: function() {
    // if (this.data.isEdit) {
    //   this.setData({
    //     isEdit: false
    //   })
    // } else {
    //   this.setData({
    //     isEdit: true
    //   })
    // }
    wx.navigateTo({
      url: '../menu/menu',
    })
  },
  //删除菜单
  del: function(e) {
    console.log(e)
  },
  
})