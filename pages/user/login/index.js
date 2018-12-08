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
    code_image: "",
    focus:"flase",
    isChecked:false,
    account:"",
    password:"",
    checkValue:"0"
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var account=this.data.account=wx.getStorageSync("account", account);
    var password = this.data.password =wx.getStorageSync("password", password);

    this.setData({
      account,
      password
    });

    this.getCode();


  },
  formSubmit: function(e) {


    var that = this;
    var account = e.detail.value.account;
    var password = e.detail.value.password;
    var vcode = e.detail.value.vcode;

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

   if(that.data.isChecked){
     wx.setStorageSync("account", account);
     wx.setStorageSync("password", password);
   }else{
     wx.setStorageSync("account", "");
     wx.setStorageSync("password", "");
   }
    app.webCall("/v1/post/login", {
      "type": 1001,
      "code": vcode,
      "cookie": cookie,
      "jwid": account,
      "jwpass": password
    }, this.data.QUERY_LOGIN, this.onSuccess);




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

            console.log("课表："+wx.getStorageSync("kb")); 

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
  f_eye: function() {


    var that = this;
    // console.log(this.data.ic_eye_type);
    // console.log(this.ic_eye_type);
    // console.log(ic_eye_type);
    // console.log(that.ic_eye_type);
    var ic_eye_type = that.data.ic_eye_type == "md-eye-off" ? "md-eye" : "md-eye-off";

    var i_type = that.data.i_type == "password" ? "text" : "password";

    that.setData({
      ic_eye_type,
      i_type
    })
  },
  getCode: function() {
    app.webCall("/v1/get/code", {
      "type": 1001

    }, this.data.QUERY_CODE, this.onSuccess);
  },
  /**刷新验证码 */
  refreshCode: function() {
    this.getCode();
  },
  niming: function (e) {
    if (e.detail.value == "0") {

      var isChecked=this.data.isChecked="true"
      var checkValue = this.data.checkValue = "1"
      
      this.setData({
        isChecked,
        checkValue

      });
    }else {
      var isChecked = this.data.isChecked = "false"
      var checkValue = this.data.checkValue = "0"
      this.setData({
        isChecked,
        checkValue

      });
    }

   
  },


})