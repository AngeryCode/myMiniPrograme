let requestTimes = 0;
export const myRequest = (params) => {
    requestTimes++;
    wx.showLoading({
        title: '加载中...',
        mask: true,
    });
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise ((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (res)=>{
                resolve(res)
            },
            fail: (e)=>{
                reject(e)
            },
            complete: ()=> {
                requestTimes--;
                if (requestTimes === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}