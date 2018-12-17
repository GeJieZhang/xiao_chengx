var app = getApp();

Page({
  data: {
    motto: 'Star me',
    github: 'https://github.com/wux-weapp/wux-weapp',
    userInfo: {},
    icon: "../../assets/images/logo.png",
    userImage: "",
    userName: "",
    userNumber: "",
    userSpecialty: "",
    out: "none",
    login: "none"



  },


  onShow: function() {


    var cookie = wx.getStorageSync("cookie");
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
        login
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
        login
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

  }


})