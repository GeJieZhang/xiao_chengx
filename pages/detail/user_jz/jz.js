Page({
  data: {
    items: [{
        type: 'text',
        label: '审核中',
        value: 'time',
        groups: ['001'],
      },
      {
        type: 'text',
        label: '审核通过',
        value: 'money',
        groups: ['002'],
      },
      

    ],
  },
  onLoad() {
    this.getRepos()
  },
  onChange(e) {
    const {
      checkedItems,
      items
    } = e.detail
    const params = {}

    console.log(checkedItems, items)

    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === 'time') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'money') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'person') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        }
      }
    })

    this.getRepos(params)
  },
  getRepos(params = {}) {
    const language = params.language || 'javascript'
    const query = params.query || 'react'
    const q = `${query}+language:${language}`
    const data = Object.assign({
      q,
    }, params)

    wx.showLoading()
    wx.request({
      url: `https://api.github.com/search/repositories`,
      data,
      success: (res) => {
        console.log(res)

        wx.hideLoading()

        this.setData({
          repos: res.data.items.map((n) => Object.assign({}, n, {
            date: n.created_at.substr(0, 7),
          })),
        })
      },
    })
  },
  onOpen(e) {
    this.setData({
      pageStyle: 'height: 100%; overflow: hidden',
    })
  },
  onClose(e) {
    this.setData({
      pageStyle: '',
    })
  }, itemClick: function (e) {

    var that = this;

    var index = e.currentTarget.dataset.index;

    console.log(index);


  },
  deletes:function(){
    console.log("删除");
  }
})