import {
  wxToast,
  getUserSetting,
  openSetting,
  chooseAddress,
  wxModal
} from '../../utils/userSetting'
Page({
  data: {
    userAddressInfo: {},
    userAddress: '',
    cart: [],
    totalPrice: 0,
    totalNumber: 0,
    isSelectedAll: false
  },

  onLoad: function (options) {
    this.getLocalCartInfo()
    this.getTotalPrice()
  },

  onShow: function () {
    this.getLocalCartInfo()
    this.getTotalPrice()
  },
  //获取收货地址
  async handleGetAddress() {
    //authSetting scope.address
    const result1 = await getUserSetting()
    if (result1.authSetting['scope.address'] === false) {
      const result2 = await openSetting()
      console.log(result2)
      if (result2.authSetting['scope.address']) {
        const userAddressInfo = await chooseAddress()
        console.log(userAddressInfo)
        const userAddress =
          userAddressInfo.cityName + userAddressInfo.countyName + userAddressInfo.detailInfo
        this.setData({
          userAddressInfo,
          userAddress
        })
      }
    } else {
      const userAddressInfo = await chooseAddress()
      console.log(userAddressInfo)
      const userAddress =
        userAddressInfo.cityName + userAddressInfo.countyName + userAddressInfo.detailInfo
      this.setData({
        userAddressInfo,
        userAddress
      })
    }
  },
  // 获取购物车信息
  getLocalCartInfo() {
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      cart
    })
  },
  // 获取总价，是否全选，购买数量
  getTotalPrice() {
    let totalPrice = 0
    let isSelectedAll = false
    let totalNumber = 0
    let selectedNumber = 0
    const { cart } = this.data
    cart.forEach((item) => {
      if (item.isActive) {
        totalPrice += item.goods_price * item.number
        selectedNumber += 1
        totalNumber += 1
      }
    })
    isSelectedAll = cart.length === selectedNumber ? true : false
    this.setData({
      totalPrice,
      totalNumber,
      isSelectedAll
    })
  },
  //购物车列表勾选改变事件
  handleItemCheck(e) {
    const goods_id = e.target.dataset.id
    const { cart } = this.data
    const idx = cart.findIndex((item) => item.goods_id === goods_id)
    cart[idx].isActive = !cart[idx].isActive
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.getTotalPrice()
  },
  //全选反选
  handleSelectAll() {
    const { cart, isSelectedAll } = this.data
    cart.forEach((item) => {
      if (isSelectedAll) {
        item.isActive = false
      } else {
        item.isActive = true
      }
    })
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.getTotalPrice()
  },
  //+ -
  async handleNumberTap(e) {
    const goods_id = e.target.dataset.id
    const operation = e.target.dataset.operation
    const { cart } = this.data
    const idx = cart.findIndex((item) => item.goods_id === goods_id)
    if (operation === 'add') {
      cart[idx].number += 1
      cart[idx].isActive = true
    }
    if (operation === 'reduce') {
      if (cart[idx].number === 1) {
        const res = await wxModal('提示', '确定从购物车中删除该商品吗')
        if (res.confirm) {
          cart.splice(idx, 1)
        }
      } else {
        if (cart[idx].number > 0) {
          cart[idx].number -= 1
        }
      }
    }
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.getTotalPrice()
  },
  //结算按钮
  handleCal() {
    const { totalNumber, userAddressInfo, userAddress } = this.data
    if (totalNumber) {
      if (Object.keys(userAddressInfo).length <= 0) {
        wxToast('请填写收货地址', 'none')
      } else {
        wx.setStorageSync('userAddress', userAddress)
        wx.setStorageSync('userAddressInfo', userAddressInfo)
        wx.navigateTo({ url: '../../pages/pay/pay' })
      }
    } else {
      wxToast('购物车没有货或未选中需要购买的商品', 'none')
    }
  }
})
