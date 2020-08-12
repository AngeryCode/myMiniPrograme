Page({
  data: {
    tabArr: [
      {
        id: 1,
        value: '全部订单',
        isActive: true
      },
      {
        id: 2,
        value: '代付款',
        isActive: false
      },
      {
        id: 3,
        value: '待收货',
        isActive: false
      },
      {
        id: 4,
        value: '退款/退货',
        isActive: false
      }
    ],
    allOrder: [],
    needPayOrder: [
      {
        order_number: 'HMDD20190812000000001104',
        order_price: 13618,
        order_date: '2019/8/12 下午9:36:25'
      },
      {
        order_number: 'HMDD20190812000000001104',
        order_price: 15623,
        order_date: '2019/8/12 下午9:36:25'
      },
      {
        order_number: 'HMDD20190812000000001104',
        order_price: 23918,
        order_date: '2019/8/12 下午9:36:25'
      }
    ],
    paiedOrder: [
      {
        order_number: 'HMDD20190912000000001104',
        order_price: 18,
        order_date: '2019/9/12 下午9:36:25'
      },
      {
        order_number: 'HMDD20190912000000001104',
        order_price: 623,
        order_date: '2019/9/12 下午9:36:25'
      },
      {
        order_number: 'HMDD20190912000000001104',
        order_price: 918,
        order_date: '2019/9/12 下午9:36:25'
      }
    ],
    otherOrder: [
      {
        order_number: 'HMDD20191012000000001104',
        order_price: 233,
        order_date: '2019/9/12 下午9:36:25'
      }
    ],
    showData: []
  },

  onLoad: function (options) {
    this.setData({
      allOrder: [...this.data.needPayOrder, ...this.data.paiedOrder, ...this.data.otherOrder]
    })
  },

  onShow: function () {
    const pagesArr = getCurrentPages()
    const { type } = pagesArr[pagesArr.length - 1].options
    this.changeTabs(Number(type))
    this.changeDisData(type)
    
  },

  handleTap(e) {
    const { index } = e.detail
    this.changeTabs(index)
    this.changeDisData(index)
  },
  changeTabs(idx) {
    const { tabArr } = this.data
    tabArr.forEach((item) => {
      item.isActive = false
      if (item.id === idx) {
        item.isActive = true
      }
    })
    this.setData({
      tabArr
    })
  },
  changeDisData(idx) {
    idx = Number(idx)
    switch (idx) {
      case 1:
        this.setData({
          showData: this.data.allOrder
        })
        break
      case 2:
        this.setData({
          showData: this.data.needPayOrder
        })
        break
      case 3:
        this.setData({
          showData: this.data.paiedOrder
        })
        break
      case 4:
        this.setData({
          showData: this.data.otherOrder
        })
        break
      default:
        this.setData({
          showData: []
        })
        break
    }
  }
})
