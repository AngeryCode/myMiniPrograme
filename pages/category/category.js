import { myRequest } from '../../request/myRequest'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftViewData: [],
    rightViewData: [],
    currentIndex: 0,
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.loadCategoryData ()
    }else{
      if (Date.now() - Cates.date > 1000 * 10) {
        this.loadCategoryData ()
      }else{
        const {cates} = Cates;
        this.setData({
          leftViewData: cates.map(item => item.cat_name),
          rightViewData: cates.map (item => item.children)
        })
      }

    }
  },

  async loadCategoryData () {
    const res = await myRequest({
      url: '/categories'
    })
    console.log(res)
    wx.setStorageSync("cates", {
      date:Date.now(),
      cates: res.data.message
    });
    this.setData({
      leftViewData: res.data.message.map(item => item.cat_name),
      rightViewData: res.data.message.map (item => item.children)
    })
  },
  clickItem (e) {
    const {index} = e.target.dataset
    this.setData({
      currentIndex: index
    })
    this.setData({
      scrollTop: 0
    })
    console.log(Date.now())
  }

})