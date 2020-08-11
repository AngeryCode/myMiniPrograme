export const getUserSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => resolve(result),
      fail: (e) => reject(e)
    })
  })
}

export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => resolve(result),
      fail: (e) => reject(e)
    })
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => resolve(result),
      fail: () => {}
    })
  })
}

export const wxModal = (title, content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => resolve(result),
      fail: (e) => reject(e)
    })
  })
}

export const wxToast = (title = '', icon = 'none') => {
  return new Promise((resolve, reject) => {
    wx.showToast({
        title: title,
        icon: icon,
        duration: 1500,
        mask: true,
        success: (result) => resolve(result),
        fail: (e) => reject(e),
      })
  })
}
