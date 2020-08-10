import { myRequest } from '../../request/myRequest'
Page({
  data: {
    goods_id: '',
    goods_detail: {},
    goods_text: ''
  },
  onLoad: function (options) {
    this.setData({
      goods_id: options.goods_id
    })
    this.loadGoodsDetail()
  },
  async loadGoodsDetail () {
    const res = await myRequest({url: `/goods/detail?goods_id=${this.data.goods_id}`})
    this.setData({
      goods_detail: res.data.message,
      goods_text: res.data.message.goods_introduce.replace(/.webp/g,'.jpg')
    })
  },
  addTocart (e) {
    const cartItems = wx.getStorageSync('cart') || [];
    const currentItem = e.target.dataset.item
    const idx = cartItems.findIndex(item => item.goods_id === currentItem.goods_id)
    if (idx === -1){
      currentItem.number = 1
      cartItems.push(currentItem)
    }else{
      cartItems[idx].number ++;
    }
    wx.setStorageSync('cart', cartItems);
  }
})