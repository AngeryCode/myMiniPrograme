Page({
  data: {
    cart: [],
    userAddress: '',
    userAddressInfo: {},
    totalNum: 0,
    totalPrice: 0
  },
  onLoad: function () {
    this.getPayInfo()
  },
  onShow: function () {
    this.getPayInfo()
  },
  getPayInfo() {
    let cart = wx.getStorageSync('cart');
    const userAddress = wx.getStorageSync('userAddress');
    const userAddressInfo = wx.getStorageSync('userAddressInfo');
    let totalNum = 0
    let totalPrice = 0
    cart = cart.filter(item => item.isActive)
    cart.forEach(item => {
      totalNum += item.number
      totalPrice += item.number * item.goods_price
    })
    this.setData({
      cart,
      userAddress,
      userAddressInfo,
      totalNum,
      totalPrice
    })
  },
  handlePay () {
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 1500,
      mask: true,
      success: (result)=>{
        console.log(result);
      },
      fail: (e)=>{console.log(e);}
    });
    wx.removeStorageSync('cart');
    wx.navigateBack({
      delta: 1
    });
  }
})