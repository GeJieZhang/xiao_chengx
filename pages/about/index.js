var app = getApp();

Page({
  data: {
    POST_QUESTION: "001",
    motto: 'Star me',
    github: 'https://github.com/wux-weapp/wux-weapp',
    userInfo: {},
    icon: "../../assets/images/logo.png",
    userImage: "",
    userName: "",
    userNumber: "",
    userSpecialty: "",
    out: "none",
    login: "none",

    msgCount:0,

    userType:1001,




  },


  onShow: function() {
    this.loadMsg();

    var cookie = wx.getStorageSync("cookie");

    var userType = wx.getStorageSync("userType");



    if (cookie != null && cookie != "") {

      var userInfo = this.data.userInfo = wx.getStorageSync("w_user");
      var userImage = userInfo.avatarUrl;
      var user = wx.getStorageSync("user");
      var userName = user.name;
      var userNumber = user.jwId;
      var userSpecialty = user.specialty;
      var out = "position"
      var login = "none"
      this.setData({
        userInfo,
        userImage,
        userName,
        userNumber,
        userSpecialty,
        out,
        login,
        userType
      });

    } else {


      var userInfo = {};
      var userImage = "../../assets/images/logo.png";

      var userName = "请登录";
      var userNumber = "未知";
      var userSpecialty = "未知";

      var out = "none"
      var login = "position"
      this.setData({
        userInfo,
        userImage,
        userName,
        userNumber,
        userSpecialty,
        out,
        login,
        userType
      });


    }





  },
  out: function() {

    wx.setStorageSync("cookie", "");

    wx.navigateTo({
      url: '../../pages/user/login2/login',
    })

  },
  fk: function() {
    if (app.checklogin()) {
    wx.navigateTo({
      url: '../../pages/detail/opinion/opinion'
    })
    }
  },
  us: function() {
    if (app.checklogin()) {
    wx.navigateTo({
      url: '../../pages/detail/us/us'
    })
    }
  },
  login: function() {
    wx.navigateTo({
      url: '../../pages/user/login2/login'
    })

  },onPullDownRefresh:function(){
    
  }, user_jz:function(){
    if (app.checklogin()) {
    wx.navigateTo({
      url: '../../pages/detail/user_jz/jz'
    })
    }
  }, add_jz: function () {
    if (app.checklogin()) {
    wx.navigateTo({
      url: '../../pages/detail/add_jz/index'
    })
    }
  },
   jz_sc: function () {
     if (app.checklogin()) {
    wx.navigateTo({
      url: '../../pages/detail/jz_sc/sc'
    })
     }
  }
  ,
  system_msg: function () {
    if (app.checklogin()) {
    wx.navigateTo({
      url: '../../pages/detail/system_msgs/msg'
    })
    }
  }, loadMsg: function () {
    var userid = wx.getStorageSync("account", userid);

    app.webCall("/v1/msg/no", {
      "userId": userid


    }, this.data.POST_QUESTION2, this.onSuccess);
  },
  /**网络请求onSuccess*/
  onSuccess: function (data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.POST_QUESTION:
        //获取Code

        if (data.code == 0) {

          var msgCount = that.data.msgCount=data.result.count;

          this.setData({
            msgCount
          })

        } else {
          app.showToptips("提交失败");
        }



        break;


    }
  }

})