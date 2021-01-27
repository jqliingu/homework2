// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   data: [],
   info:{
     page:1,
     total:0
   },
   text:''
  },
  onLoad () {
    this.handleRefresh()
  },
  handleRefresh(page){
    wx.request({
      url: 'http://api.hunsh.net/s1/',
      data:{
        page:page || 1,
        q:this.data.text
      },
      success:(res) => {
        for(let i of res.data.data){
          i.create_time = (new Date(i.create_time * 1000).toLocaleDateString())
        }
        const ap = Math.ceil(res.data.info.page / 30);
        const start = Math.max(res.data.info.page - 2,1);
        const end = Math.min(res.data.info.page + 2,ap);

        this.setData({
          ...res.data,
          pp:Array.from({
            length: end - start + 1
          },(x,i)=>i+start)
        })
      }
    })
  },
  handleInput(e){
    this.setData({
      text:e.detail.value
    })
  },
  handleTap(){
    this.handleRefresh()
  },
  handlePageChange(e){
    this.handleRefresh(e.target.dataset.page)
  }
})