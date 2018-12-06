// pages/detail/opinion/opinion.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    POST_QUESTION:"001",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  formSubmit: function (e) {


    var that = this;
    var title = e.detail.value.title;

    var weixing = e.detail.value.weixing;
    var content = e.detail.value.content;
   


    if (title == "" || title == null || title == undefined) {

      app.showToptips("请输入标题");

      return;
    }
    if (weixing == "" || weixing == null || weixing == undefined) {
      app.showToptips("请输入微信号");

      return;
    }
    if (content == "" || content == null || content == undefined) {
      app.showToptips("请输入内容");

      return;
    }



    app.webCall("/v1/feedback/add", {
      "title": title,
      "wx": weixing,
      "content": content,
    
    }, this.data.POST_QUESTION, this.onSuccess);




  },
  /**网络请求onSuccess*/
  onSuccess: function (data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.POST_QUESTION:
        //获取Code

        if (data.code == 0) {

          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })

        } else {
          app.showToptips("查询成绩失败");
        }



        break;


    }
  },
 
})