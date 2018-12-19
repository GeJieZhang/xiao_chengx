
var app = getApp();
Page({
  data: {
    items: [{
        type: 'text',
        label: '审核中',
        value: '0',
        groups: ['001'],
      },
      {
        type: 'text',
        label: '审核通过',
        value: '1',
        groups: ['002'],
      },


    ],
    POST_QUESTION: "001",

    dataList:[],
    page:1,

    state:0,
  },
  onLoad() {

   
    this.loadData(1,0);
  },
  onChange(e) {

    var that=this;
    const {
      checkedItems,
      items
    } = e.detail
    const params = {}

    console.log(checkedItems, items)

    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === '0') {
         var page= that.data.page=1;
          var sate =that.data.state = 0;

          that.setData({
            page,
            sate
          });


          that.loadData(page, sate);
        } else if (n.value === '1') {

          var page = that.data.page = 1;
          var sate = that.data.state =1;

          that.setData({
            page,
            sate
          });
          that.loadData(page, sate);

        }
      }
    })

  
  },
  itemClick: function(e) {

    var that = this;

    var index = e.currentTarget.dataset.index;

    console.log(index);


  },
  deletes: function() {
    console.log("删除");
  },
  onPullDownRefresh() {

    var page=this.data.page=1;

    this.loadData(page, this.data.state);

   
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var page=this.data.page+=1;
    this.setData({
      page
    })
    this.loadData(page, this.data.state);

  },
  /**网络请求onSuccess*/
  onSuccess: function (data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.POST_QUESTION:
        //获取Code
        wx.stopPullDownRefresh()
        if (data.code == 0) {


          if(that.data.page==1){
            
            var dataList = that.data.dataList = data.result.list;
          }else{
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
  loadData: function (page,state){
    var userid = wx.getStorageSync("account", userid);
    app.webCall("/v1/service/job", {
      "page": page,
      "limt": 10,
      "userId": userid,
      "state": state
    
    }, this.data.POST_QUESTION, this.onSuccess);
  }
})