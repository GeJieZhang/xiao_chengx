// pages/student/cg/cg.js


var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QUERY_GRADE: "001",
    GradeList: [],
    name: "",
    grade: "",
    types: "",
    credit: "",
    gradepoint: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var cookie = wx.getStorageSync("cookie");
    var jwid = wx.getStorageSync("user").jwId;


    app.webCall("/v1/get/grade/all", {
      "cookie": cookie,
      "jwid": jwid


    }, this.data.QUERY_GRADE, this.onSuccess);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**网络请求onSuccess*/
  onSuccess: function(data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.QUERY_GRADE:
        //获取Code

        if (data.code == 0) {


          var GradeList = that.data.GradeList = data.result;

          that.setData({
            GradeList
          });


        } else {
          app.showToptips("查询成绩失败");
        }



        break;


    }
  },
  itemClick: function(e) {

    var that = this;

    console.log(e);
    var hide = e.currentTarget.dataset.clickinfo;

    var index = e.currentTarget.dataset.index;


    if (hide) {

      var GradeList = that.data.GradeList;

      GradeList[index].isselect=false;

      that.setData({
        GradeList
      });


    } else {
      var GradeList = that.data.GradeList;
      GradeList[index].isselect = true;
      that.setData({
        GradeList
      });
    }

  }


})