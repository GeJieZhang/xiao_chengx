var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    POST_QUESTION: "001",
    jobId:"",
    result:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var jobId=this.data.jobId= options.jobId;
   this.setData({
     jobId
   })

    this.loadData(jobId);
  },
  /**网络请求onSuccess*/
  onSuccess: function (data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.POST_QUESTION:
        //获取Code
        wx.stopPullDownRefresh()
        if (data.code == 0) {

          var result = that.data.result = data.result;
     


          this.setData({
            result
          });
          console.log(result)

        } else {
          app.showToptips("兼职查询失败");
        }



        break;


    }
  },
  loadData: function (jobId) {

   
    app.webCall("/v1/job/id", {
      "jobId": jobId,
      

    }, this.data.POST_QUESTION, this.onSuccess);
  },callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.result.jobPhone
    })
  }




})