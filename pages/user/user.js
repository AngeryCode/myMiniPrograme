// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },


  onLoad: function (options) {
    this.getUserInfo()
  },


  onShow: function () {
    this.getUserInfo()
  },

  getUserInfo () {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo
    })
  }

})