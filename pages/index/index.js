//index.js
//获取应用实例
const app = getApp();
const word = require('../../word.js');

Page({
  data: {
    motto: word.default[Math.ceil(Math.random()*12864)],
    time: 60,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    disabled: true,
    value: "",
    right: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function(){
    this.start();
  },
  start: function(){
    let limit = --this.data.time;
    if(limit>0){
      setTimeout(this.start,1000);
    }
    this.setData({
      time: limit
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  confirmAnswer: function(e){
    let that = this;
    if(this.data.value.slice(0,1)===this.data.motto.slice(-1) && word.default.every(function(item){return item === that.data.value;})){
      this.setData({
        motto: this.data.value,
        right: true
      })
    }
  },
  next: function(){

  },
  canUseBtn: function(e){
    this.setData({
      disabled: ((e.detail.value || "").trim()).length<=0,
      value: e.detail.value
    })
  }
})
