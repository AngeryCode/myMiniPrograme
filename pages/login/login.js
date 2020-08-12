// pages/login/login.js
Page({
  handleGetUserinfo (e) {
    const {userInfo} = e.detail
    if (userInfo) {
      wx.setStorageSync("userInfo", userInfo);
      wx.navigateBack({
        delta: 1
      });
    }
  }
})