var jsonData = require("../../utils/json.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {},
    wlist: [{
        "xqj": 1,
        "skjc": 1,
        "skcd": 3,
        "kcmc": [
          {
            "name":"数学"
          },
          {
            "name": "英语"
          }
        ]
      },
      {
        "xqj": 1,
        "skjc": 5,
        "skcd": 3,
        "kcmc": [
          {
            "name": "数学"
          },
          {
            "name": "英语"
          }
        ]
      },
      {
        "xqj": 2,
        "skjc": 1,
        "skcd": 2,
        "kcmc": [
          {
            "name": "数学"
          },
          {
            "name": "英语"
          }
        ]
      },
      {
        "xqj": 2,
        "skjc": 8,
        "skcd": 2,
        "kcmc": [
          {
            "name": "数学"
          },
          {
            "name": "英语"
          }
        ]
      },
      {
        "xqj": 3,
        "skjc": 4,
        "skcd": 1,
        "kcmc": [
          {
            "name": "数学"
          },
          {
            "name": "英语"
          }
        ]
      },
      {
        "xqj": 3,
        "skjc": 8,
        "skcd": 1,
        "kcmc": [
          {
            "name": "数学"
          },
          {
            "name": "英语"
          }
        ]
      },
      {
        "xqj": 3,
        "skjc": 5,
        "skcd": 2,
        "kcmc": [
          {
            "name": "数学"
          },
          {
            "name": "英语"
          }
        ]
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    var that = this;
    that.setData({
      dataList:jsonData
    })
    console.log(that.data.dataList);

 

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})