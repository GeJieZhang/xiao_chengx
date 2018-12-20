var app = getApp();
Page({
  data: {
    items: [{
        type: 'sort',
        label: '时间',
        value: 'time',
        groups: ['001'],
      },
      {
        type: 'sort',
        label: '薪酬',
        value: 'money',
        groups: ['002'],
      },
      {
        type: 'sort',
        label: '人数',
        value: 'person',
        groups: ['003'],
      },

    ],
    POST_QUESTION: "001",

    dataList: [],
    page: 1,

    sort: "desc",
    types: 1

  },
  onLoad() {
    this.loadData(1, this.data.sort,this.data.types);
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
          var page=this.data.page=1;
          var nowSort = n.sort === 1 ? 'asc' : 'desc';
          var types = this.data.types = 1;

          var sort = this.data.sort = nowSort;
          this.setData({
            sort,
            types,
            page
          })

          this.loadData(1, this.data.sort, this.data.types);

        } else if (n.value === 'money') {
          var page = this.data.page = 1;
          var nowSort = n.sort === 1 ? 'asc' : 'desc';
          var types = this.data.types = 2;

          var sort = this.data.sort = nowSort;
          this.setData({
            sort,
            types,
            page
          })

          this.loadData(1, this.data.sort, this.data.types);

        } else if (n.value === 'person') {
          var page = this.data.page = 1;
          var nowSort = n.sort === 1 ? 'asc' : 'desc';
          var types = this.data.types = 3;

          var sort = this.data.sort = nowSort;
          this.setData({
            sort,
            types,
            page
          })

          this.loadData(1, this.data.sort, this.data.types);

        }
      }
    })

   
  },
  itemClick: function(e) {

    var that = this;

    var index = e.currentTarget.dataset.index;
    var jobId = e.currentTarget.dataset.jobid;
    console.log(e);

    wx.navigateTo({
      url: '../../pages/detail/jz_detail/index?jobId='+jobId
    })


  },
  onPullDownRefresh() {

    var page = this.data.page = 1;

    this.setData({
      page
    })

    this.loadData(page, this.data.sort,this.data.types);


  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var page = this.data.page += 1;
    this.setData({
      page
    })
    this.loadData(page, this.data.sort, this.data.types);
  },
  /**网络请求onSuccess*/
  onSuccess: function(data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.POST_QUESTION:
        //获取Code
        wx.stopPullDownRefresh()
        if (data.code == 0) {


          if (that.data.page == 1) {

            var dataList = that.data.dataList = data.result.list;
          } else {
            var dataList = that.data.dataList.concat(data.result.list);
          }



          this.setData({
            dataList
          });
          console.log(dataList)

        } else {
          app.showToptips("兼职查询失败");
        }



        break;


    }
  },
  loadData: function(page, sort, types) {
    // var userid = wx.getStorageSync("account", userid);
    app.webCall("/v1/job/sort", {
      "page": page,
      "limt": 10,
      "sort": sort,
      "type": types

    }, this.data.POST_QUESTION, this.onSuccess);
  }
})