import {
  $wuxToptips
} from '../../../dist/index'
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ic_eye_type: "md-eye-off",
    QUERY_CODE: "001",
    QUERY_LOGIN: "002",
    i_type: "password",
    cookie: "",


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
 
    app.webCall("/v1/get/code", {
      "type": 1001

    }, this.data.QUERY_CODE, this.onSuccess, this.onErrorBefore);



  },
  formSubmit: function(e) {


    var that = this;
    var account = e.detail.value.account;
    var password = e.detail.value.password;
    var vcode = e.detail.value.vcode;

    var cookie = that.data.cookie;


    if (account == "" || account == null || account == undefined) {

      that.showToptips("请输入学号");

      return;
    }

    if (password == "" || password == null || password == undefined) {
      that.showToptips("请输入密码");

      return;
    }

    if (vcode == "" || vcode == null || vcode == undefined) {

      that.showToptips("请输入验证码");
      return;
    }

    app.webCall("/v1/post/login", {
      "type": 1001,
      "code": vcode,
      "cookie": cookie,
      "jwid": account,
      "jwpass": password
    }, this.data.QUERY_LOGIN, this.onSuccess, this.onErrorBefore);




  },
  showToptips: function(str) {
    $wuxToptips().warn({
      hidden: false,
      text: str,
      duration: 3000,

    })
  },
  onSuccess: function(data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.QUERY_CODE:
        //获取Code

        that.data.cookie = data.result.cookie;

        break;
      case this.data.QUERY_LOGIN:
        //登录
        console.log("登录");

        if(data.code==0){

          wx.setStorageSync("kb", data.result)

          wx.switchTab({
            url: '../../../pages/index/index'
          })

        }else{
          app.showToptips(data.errorInfo)
        }

        break;
    }
  },
  onComplete: function(requestCode) {
    console.log(requestCode);


  },
  onErrorBefore: function(message, requestCode) {

    console.log(message);

  },
  f_eye: function() {


    var that = this;
    // console.log(this.data.ic_eye_type);
    // console.log(this.ic_eye_type);
    // console.log(ic_eye_type);
    // console.log(that.ic_eye_type);
    const ic_eye_type = that.data.ic_eye_type == "md-eye-off" ? "md-eye" : "md-eye-off";

    const i_type = that.data.i_type == "password" ? "text" : "password";

    this.setData({
      ic_eye_type,
      i_type
    })

    console.log(this.ic_eye_type);


  }


})