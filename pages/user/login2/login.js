//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    code_focus: false,
    QUERY_CODE: "001",
    QUERY_LOGIN: "002",
    userid: '',
    passwd: '',
    code: '',
    angle: 0,
    cookie: "",
    code_image: "",
    focus: "flase",
    isChecked: false,

    checkValue: "0"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
 


  },
  onShow: function() {

    var that=this;

    setTimeout(function () {
      var userid = that.data.userid = wx.getStorageSync("account", userid);
      var passwd = that.data.passwd = wx.getStorageSync("password", passwd);
      var isChecked = that.data.isChecked = wx.getStorageSync("loginIsChecked", isChecked);
      var code_image = that.data.code_image ="../../../assets/images/vcode5.png";
      that.setData({
        userid,
        passwd,
        isChecked,
        code_image
      });

      //that.getCode();
    }, 1000);
    
  },
  bind: function() {
    var that = this;
    var account = that.data.userid;
    var password = that.data.passwd;
    var vcode = that.data.code;

    var cookie = that.data.cookie;


    if (account == "" || account == null || account == undefined) {

      app.showToptips("请输入学号");

      return;
    }

    if (password == "" || password == null || password == undefined) {
      app.showToptips("请输入密码");

      return;
    }

    if (vcode == "" || vcode == null || vcode == undefined) {

      app.showToptips("请输入验证码");
      return;
    }

    if (that.data.isChecked) {
      wx.setStorageSync("account", account);
      wx.setStorageSync("password", password);
      wx.setStorageSync("loginIsChecked", true);
    } else {
      wx.setStorageSync("account", "");
      wx.setStorageSync("password", "");
      wx.setStorageSync("loginIsChecked", false);
    }
    app.webCall("/v1/post/login", {
      "type": 1001,
      "code": vcode,
      "cookie": cookie,
      "jwid": account,
      "jwpass": password
    }, this.data.QUERY_LOGIN, this.onSuccess);


  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    // if(e.detail.value.length >= 7){
    //   wx.hideKeyboard();
    // }
  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    });
  },
  inputFocus: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id == 'code') {
      this.setData({
        'code_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    } else if (e.target.id == 'code') {
      this.setData({
        'code_focus': false
      });
    }
  },
  tapHelp: function(e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function(e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e) {
    this.setData({
      'help_status': false
    });
  },

  onSuccess: function(data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.QUERY_CODE:
        //获取Code

        if (data.code == 0) {
          var cookie = that.data.cookie = data.result.cookie;
          var code_image = that.data.code_image = data.result.imgeUrl;
          this.setData({
            code_image,
            cookie
          });

          console.log("图片地址：" + that.data.code_image);
        }
        break;
      case this.data.QUERY_LOGIN:
        //登录
        console.log("登录");

        if (data.code == 0) {
          try {
            //缓存用户信息
            wx.setStorageSync("user", data.result.user)
            //缓存课表
            wx.setStorageSync("kb", data.result.class)
            //缓存学年
            wx.setStorageSync("years", data.result.years)
            //缓存学期
            wx.setStorageSync("pers", data.result.pers)
            //cookie
            wx.setStorageSync("cookie", data.result.cookie)

            console.log("课表：" + wx.getStorageSync("kb"));

          } catch (e) {
            console.log(e);
          }
          wx.switchTab({
            url: '../../../pages/index/index'
          })

        } else {
          app.showToptips(data.errorInfo)
        }

        break;
    }
  },
  getCode: function () {
    app.webCall("/v1/get/code", {
      "type": 1001

    }, this.data.QUERY_CODE, this.onSuccess);
  },
  /**刷新验证码 */
  refreshCode: function () {
    this.getCode();
  },
  niming: function (e) {
    if (e.detail.value == "0") {

      var isChecked = this.data.isChecked = "true"
      var checkValue = this.data.checkValue = "1"

      this.setData({
        isChecked,
        checkValue

      });
    } else {
      var isChecked = this.data.isChecked = "false"
      var checkValue = this.data.checkValue = "0"
      this.setData({
        isChecked,
        checkValue

      });
    }


  },

});