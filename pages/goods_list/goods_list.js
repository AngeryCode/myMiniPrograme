import { myRequest } from '../../request/myRequest'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    catid: '',
    param: {
      query: '',
      cid: '',
      pagenum: 1,
      pagesize: 10
    },
    goodsList: [],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      catid: options.catid
    })
    this.loadListData()
  },
  onPullDownRefresh: function () {
    this.setData({
      goodsList: [],
      total: 0,
      param: {
        ...this.data.param,
        pagenum: 1
      }
    })
    this.loadListData()
  },
  onReachBottom() {
    const {total,param} = this.data
    const totalPage = Math.ceil(total / param.pagesize)
    if (param.pagenum < totalPage) {
      const {param} = this.data
      param.pagenum += 1
      this.setData({
        param
      })
      console.log(param)
      this.loadListData()

    }else {
      wx.showToast({
        title: '没有下一页了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  
  
  handleTap(e) {
    const { index } = e.detail
    const { tabs } = this.data
    tabs.forEach((item) => {
      item.id === index ? (item.isActive = true) : (item.isActive = false)
    })
    this.setData({
      tabs
    })
  },

  async loadListData() {
    this.setData({
      param: {
        ...this.data.param,
        cid: this.data.catid
      }
    })
    let {param, goodsList} = this.data
    const url = `/goods/search?cid=${param.cid}&query=${param.query}&pagenum=${param.pagenum}&pagesize=${param.pagesize}`
    const res = await myRequest({ url })
    wx.stopPullDownRefresh();
    const {goods} = res.data.message
    const {total} = res.data.message
    goodsList = [...goodsList, goods].flat()
    console.log(goodsList)
    this.setData({
      goodsList,
      total
    })
  }
})
