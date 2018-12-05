// pages/detail/opinion/opinion.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  formSubmit: function (e) {


    var that = this;
    var title = e.detail.value.title;
    var content = e.detail.value.content;
   


    if (title == "" || title == null || title == undefined) {

      app.showToptips("请输入标题");

      return;
    }

    if (content == "" || content == null || content == undefined) {
      app.showToptips("请输入内容");

      return;
    }



    app.webCall("/v1/post/login", {
      "type": 1001,
      "code": vcode,
      "cookie": cookie,
      "jwid": account,
      "jwpass": password
    }, this.data.QUERY_LOGIN, this.onSuccess);




  }

 
})