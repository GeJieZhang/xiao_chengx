// pages/student/ks/ks.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QUERY_KAOSHI:"001",
    KaoShiList:[],
    years: [],
    pers: [],
    options1: [],
    value1: "",
    title: "考试安排",
    buttons: [{
      openType: 'getUserInfo',
      label: '学期选择',
      icon: "../../assets/images/logo/iv_xueqi.png",
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var years = this.data.years = wx.getStorageSync("years");
    var pers = this.data.pers = wx.getStorageSync("pers");
    var cookie = wx.getStorageSync("cookie");
    var jwid = wx.getStorageSync("user").jwId;
    this.setData({
      years,
      pers
    });


    this.initData();
    //发起请求
    app.webCall("/v1/get/user/test", {
      "cookie": cookie,
      "jwid": jwid,
      "year": "",
      "per": ""
    }, this.data.QUERY_KAOSHI, this.onSuccess);
  },

  /**网络请求onSuccess*/
  onSuccess: function (data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.QUERY_KAOSHI:
        //获取Code

        if (data.code == 0) {


          var KaoShiList = that.data.KaoShiList=data.result;
          that.setData({
            KaoShiList
          });


        } else {
          app.showToptips("查询考试失败");
        }



        break;


    }
  },

  /**FloatButton的点击事件处理 */
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 0) {

      this.setData({
        visible1: true
      })

    }
  },
  /**初始化学期数据 */
  initData: function () {
    var that = this;
    var newPer = [];
    for (var i = 0; i < that.data.pers.length; i++) {
      var obj = new Object();
      obj.label = "第" + that.data.pers[i].per + "学期";
      obj.value = that.data.pers[i].per;
      newPer.push(obj);
    }
    console.log(newPer);
    var newData = [];
    for (var i = 0; i < that.data.years.length; i++) {
      var obj = new Object();
      obj.value = that.data.years[i].year;
      obj.label = that.data.years[i].year + "学年";
      obj.isLeaf = false;
      obj.children = newPer;
      newData.push(obj);

    }
    this.setData({
      options1: newData
    });

  },


  /**关闭学期选择 */
  onClose1() {
    this.setData({ visible1: false })
  },
  /**学期选择回调 */
  onChange1(e) {


    var value1 = this.data.value1 = e.detail.options.map((n) => n.value).join('/');

    var title = this.data.title = e.detail.options.map((n) => n.label).join(' ');

    this.setData({
      value1,
      title
    });

    wx.setNavigationBarTitle({
      title: this.data.title
    })

    if (value1.indexOf("/") != -1) {

      console.log(title);
      console.log(wx.getStorageSync("user").yearandper);
      if (title == wx.getStorageSync("user").yearandper) {

        app.showToptips("请选择不同的时间段！");
        return;
      }

      var cookie = wx.getStorageSync("cookie");
      var jwid = wx.getStorageSync("user").jwId;
      var year = value1.split("/")[0];
      var per = value1.split("/")[1];

      //发起请求
      app.webCall("/v1/get/user/test", {
        "cookie": cookie,
        "jwid": jwid,
        "year": year,
        "per": per
      }, this.data.QUERY_KAOSHI, this.onSuccess);

    }


  }, 
  itemClick: function (e) {

    var that = this;

    console.log(e);
    var hide = e.currentTarget.dataset.clickinfo;

    var index = e.currentTarget.dataset.index;


    if (hide) {

      var KaoShiList = that.data.KaoShiList;

      KaoShiList[index].isselect = false;

      that.setData({
        KaoShiList
      });


    } else {
      var KaoShiList = that.data.KaoShiList;
      KaoShiList[index].isselect = true;
      that.setData({
        KaoShiList
      });
    }

  }
})