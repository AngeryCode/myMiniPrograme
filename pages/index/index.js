//index.js
//获取应用实例
const app = getApp()

import { myRequest } from '../../request/myRequest'
Page({
  data: {
    swiperArr: [],
    navigateArr: [],
    floorArr: []
  },
  //事件处理函数
  bindViewTap: function () {},
  onLoad: function () {
    this.loadSwiperData()
    this.loadNavigateData()
    this.loadFloorData()
  },
  async loadSwiperData() {
    const res = await myRequest({
      url: '/home/swiperdata'
    })
    this.setData({
      swiperArr: res.data.message
    })
    console.log(this.data.swiperArr)
  },
  async loadNavigateData() {
    const res = await myRequest({
      url: '/home/catitems'
    })
    this.setData({
      navigateArr: res.data.message
    })
    console.log(this.data.navigateArr)
  },
  async loadFloorData () {
    const res = await myRequest({
      url: '/home/floordata'
    })
    this.setData({
      floorArr: res.data.message
    })
    console.log(this.data.floorArr)
  }
})
