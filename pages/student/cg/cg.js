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
    gradepoint: "",
    years: [],
    pers: [],
    options1: [],
    value1: "",
    buttons: [{
      openType: 'getUserInfo',
      label: '学期选择',
      icon: "../../assets/images/logo/iv_xueqi.png",
    }]
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var years = this.data.years = wx.getStorageSync("years");
    var pers = this.data.pers = wx.getStorageSync("pers");
    this.setData({
      years,
      pers
    });

    this.initData();
    var Q_year=wx.getStorageSync("user").year;
    var Q_per =wx.getStorageSync("user").per;

    this.getGrade(Q_year, Q_per);

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

  },getGrade:function( year,per){

    var cookie = wx.getStorageSync("cookie");
    var jwid = wx.getStorageSync("user").jwId;



    app.webCall("/v1/get/grade", {
      "cookie": cookie,
      "jwid": jwid,
      "year": year,
      "per":per
  
    }, this.data.QUERY_GRADE, this.onSuccess);

  },  /**初始化学期数据 */
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

      // //发起请求
      // app.webCall("/v1/get/user/test", {
      //   "cookie": cookie,
      //   "jwid": jwid,
      //   "year": year,
      //   "per": per
      // }, this.data.QUERY_KAOSHI, this.onSuccess);


      this.getGrade(year,per)

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

})