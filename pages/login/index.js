import {
  $wuxToptips
} from '../../dist/index'
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ic_eye_type:"md-eye-off",


    QUERY_BANNER: 110,

    i_type:"password"

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },formSubmit: function(e) {

    
    var that=this;
    var account = e.detail.value.account;
    var password = e.detail.value.password;
    var vcode = e.detail.value.vcode;

  
    if (account == "" || account == null || account == undefined){

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

    app.webCall("/testjson", {}, this.QUERY_BANNER, this.onSuccess, this.onErrorBefore,null,false,"GET",1);




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
      case this.QUERY_BANNER:
        console.log(data);

        break;
    }
  },
  onComplete: function(requestCode) {
    console.log(requestCode);
  

  },
  onErrorBefore: function(message, requestCode) {

    console.log(message);

  },
  f_eye:function(){
   

    var that=this;
    // console.log(this.data.ic_eye_type);
    // console.log(this.ic_eye_type);
    // console.log(ic_eye_type);
    // console.log(that.ic_eye_type);
    const ic_eye_type = that.data.ic_eye_type == "md-eye-off" ? "md-eye" : "md-eye-off";

    const i_type = that.data.i_type =="password"?"text":"password";

    this.setData({
      ic_eye_type,
      i_type
    })

    console.log(this.ic_eye_type);
 

  }


})