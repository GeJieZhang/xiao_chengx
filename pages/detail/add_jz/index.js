// pages/detail/add_jz/index.js


var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    POST_QUESTION: "001",
    title: "",
    weixing: "",
    phone: "",
    addrees: "",
    date: "",
    time: "",
    money: "",
    personNumber: "",
    content: "",
    certification: "0",
    isChecked: false,
    checkValue: "0",
    moneyModle: "",
    array: ['元/小时', '元/天'],
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var title = this.data.title = wx.getStorageSync("jz_title");
    var weixing = this.data.weixing = wx.getStorageSync("jz_weixing");
    var phone = this.data.phone = wx.getStorageSync("jz_phone");
    var addrees = this.data.addrees = wx.getStorageSync("jz_addrees");
    var date = this.data.date = wx.getStorageSync("jz_date");
    var time = this.data.time = wx.getStorageSync("jz_time");
    var money = this.data.money = wx.getStorageSync("jz_money");
    var personNumber = this.data.personNumber = wx.getStorageSync("jz_personNumber");
    var content = this.data.content = wx.getStorageSync("jz_content");
    var certification = this.data.certification = wx.getStorageSync("jz_certification");
    var moneyModle = this.data.moneyModle = wx.getStorageSync("jz_moneyModle");

    if (certification == "1") {

      var isChecked = this.data.isChecked = true;
      var checkValue = this.data.checkValue = "1";

      this.setData({
        isChecked,
        checkValue
      })

    } else {
      var isChecked = this.data.isChecked = false;
      var checkValue = this.data.checkValue = "0";

      this.setData({
        isChecked,
        checkValue
      })
    }


    this.setData({
      title,
      weixing,
      phone,
      addrees,
      date,
      time,
      money,
      personNumber,
      content,
      certification,
      moneyModle
    })





  },
  formSubmit: function(e) {


    var that = this;
    var userid = wx.getStorageSync("account", userid);
    var title = e.detail.value.title;
    var weixing = e.detail.value.weixing;
    var phone = e.detail.value.phone;
    var addrees = e.detail.value.addrees;
    var date = e.detail.value.date;
    var time = e.detail.value.time;
    var money = e.detail.value.money;

    var moneyModle = e.detail.value.moneyModle;
    var personNumber = e.detail.value.personNumber;
    var content = e.detail.value.content;
    var certification = this.data.certification;
    var userInfo = this.data.userInfo = wx.getStorageSync("w_user");
    var userImage = userInfo.avatarUrl;
    var user = wx.getStorageSync("user");
    var userName = user.name;


    if (userid == "" || userid == null || userid == undefined) {

      app.showToptips("用户id为空");

      return;
    }
    if (title == "" || title == null || title == undefined) {

      app.showToptips("请输入标题");

      return;
    }
    if (weixing == "" || weixing == null || weixing == undefined) {
      app.showToptips("请输入微信号");

      return;
    }
    if (phone == "" || phone == null || phone == undefined) {
      app.showToptips("请输入手机号");

      return;
    }

    if (addrees == "" || addrees == null || addrees == undefined) {

      app.showToptips("请输入地址");

      return;
    }
    if (date == "" || date == null || date == undefined) {
      app.showToptips("请选择日期");

      return;
    }
    if (time == "" || time == null || time == undefined) {
      app.showToptips("请选择时间");

      return;
    }

    if (moneyModle == "" || moneyModle == null || moneyModle == undefined) {

      app.showToptips("请选择薪酬计算模式");

      return;
    }
    if (money == "" || money == null || money == undefined) {

      app.showToptips("请输入薪酬");

      return;
    }
    if (personNumber == "" || personNumber == null || personNumber == undefined) {
      app.showToptips("请输入人数");

      return;
    }
    if (content == "" || content == null || content == undefined) {
      app.showToptips("请输入简介");

      return;
    }



    app.webCall("/v1/job/add", {
      "userid": userid,
      "title": title,
      "address": addrees,
      "wx": weixing,
      "number": personNumber,
      "context": content,
      "moneyText": money + moneyModle,
      "money": money,
      "claim": "无",
      "isCertifiation": certification,
      "time": date + " " + time,
      "wx": weixing,
      "phone": phone,
      "userName": userName,
      "userImage": userImage,

    }, this.data.POST_QUESTION, this.onSuccess);




  },
  niming: function(e) {

    if (e.detail.value == "0") {

      var isChecked = this.data.isChecked = true;
      var checkValue = this.data.checkValue = "1"
      wx.setStorageSync("jz_certification", "1")
      var certification = this.data.certification = "1";
      this.setData({
        isChecked,
        checkValue,
        certification

      });
    } else {
      var isChecked = this.data.isChecked = false;
      var checkValue = this.data.checkValue = "0"
      var certification = this.data.certification = "0";
      wx.setStorageSync("jz_certification", "0")
      this.setData({
        isChecked,
        checkValue,
        certification

      });
    }


  },
  titleInput: function(e) {
    console.log(e);
    console.log(e.detail.value);

    wx.setStorageSync("jz_title", e.detail.value)

  },
  weixingInput: function(e) {

    wx.setStorageSync("jz_weixing", e.detail.value)

  },
  phoneInput: function(e) {

    wx.setStorageSync("jz_phone", e.detail.value)

  },
  addreesInput: function(e) {

    wx.setStorageSync("jz_addrees", e.detail.value)

  },
  dateInput: function(e) {

    wx.setStorageSync("jz_date", e.detail.value)

  },
  timeInput: function(e) {

    wx.setStorageSync("jz_time", e.detail.value)

  },
  moneyInput: function(e) {

    wx.setStorageSync("jz_money", e.detail.value)

  },
  personNumberInput: function(e) {

    wx.setStorageSync("jz_personNumber", e.detail.value)

  },
  contentInput: function(e) {

    wx.setStorageSync("jz_content", e.detail.value)

  },
  // certificationInput: function(e) {

  //   wx.setStorageSync("jz_certification", e.detail.value)

  // },
  bindDateChange: function(e) {

    wx.setStorageSync("jz_date", e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    wx.setStorageSync("jz_time", e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerChange: function(e) {

    var moneyModle = this.data.moneyModle = this.data.array[e.detail.value]

    
    wx.setStorageSync("jz_moneyModle", moneyModle)
    this.setData({
      moneyModle
    })


  },
  /**网络请求onSuccess*/
  onSuccess: function(data, requestCode) {

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
          app.showToptips("提交失败");
        }



        break;


    }
  },






})