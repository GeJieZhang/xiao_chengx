Page({
  data: {
    motto: 'Star me',
    github: 'https://github.com/wux-weapp/wux-weapp',
    userInfo: {},
    icon: "../../assets/images/logo.png",
    userName: "",
    userNumber: "",
    userSpecialty: ""
  },
  onLoad: function() {

    var userInfo = this.data.userInfo = wx.getStorageSync("w_user");


    var user = wx.getStorageSync("user");


    var userName = user.name;
    var userNumber = user.jwId;
    var userSpecialty = user.specialty;
    this.setData({
      userInfo,
      userName,
      userNumber,
      userSpecialty
    });

  },
  out: function() {

    wx.setStorageSync("cookie", "");
   
    wx.redirectTo({
      url: '../../pages/user/login/index',
    })

  },
 

})