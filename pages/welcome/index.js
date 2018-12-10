var app = getApp();

Page({

  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    QUERY_BANNER:"110",
    CHECK_CODE:"002"
  },
  onLoad: function() {

    var that=this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {

    
    
              wx.setStorageSync("w_user", res.userInfo)

              var cookie=wx.getStorageSync("cookie");

              var jwid = wx.getStorageSync("user").jwId;


              if(cookie==null||cookie==""){
                //如果没有cookie跳转到登录
                that.jumpLogin()
              }else{
                //验证cookie是否过期
               

                that.checkCode(cookie, jwid)
              }


       



            }
          })
        }
      }
    })
  },

  bindGetUserInfo: function(event) {
    var that = this;
    console.log(event.detail.userInfo)
    //使用
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            success: function(res) {
              var code = res.code; //登录凭证
              if (code) {
                //2、调用获取用户信息接口
                wx.getUserInfo({
                  success: function(res) {
                    console.log({
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                      code: code
                    })


                    var cookie = wx.getStorageSync("cookie");
                    var jwid = wx.getStorageSync("user").jwId;

                    if (cookie == null || cookie == "") {
                      //如果没有cookie跳转到登录
                      that.jumpLogin()
                    } else {
                      //验证cookie是否过期


                      that.checkCode(cookie, jwid)


                    }

                    // //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                    // wx.request({
                    //   url: 'https://xxxx.com/wxsp/decodeUserInfo', //自己的服务接口地址
                    //   method: 'post',
                    //   header: {
                    //     'content-type': 'application/x-www-form-urlencoded'
                    //   },
                    //   data: {
                    //     encryptedData: res.encryptedData,
                    //     iv: res.iv,
                    //     code: code
                    //   },
                    //   success: function(data) {

                    //     //4.解密成功后 获取自己服务器返回的结果
                    //     if (data.data.status == 1) {
                    //       var userInfo_ = data.data.userInfo;
                    //       console.log(userInfo_)
                    //     } else {
                    //       console.log('解密失败')
                    //     }

                    //   },
                    //   fail: function() {
                    //     console.log('系统错误')
                    //   }
                    // })
                  },
                  fail: function() {
                    console.log('获取用户信息失败')
                  }
                })

              } else {
                console.log('获取用户登录态失败！' + r.errMsg)
              }
            },
            fail: function() {
              console.log('登陆失败')
            }
          })

        } else {
          console.log('获取用户信息失败')

        }

      }
    })

  },
  jumpIndex: function() {

    wx.switchTab({
      url: "../../pages/index/index"
    })

  },

  jumpLogin:function(){
    wx.redirectTo({
      url: '../../pages/user/login/index'
    })
  },
  onSuccess: function(data, requestCode) {
    var that = this;
    switch (requestCode) {
      case that.data.QUERY_BANNER:
        console.log(data)

        break;

      case that.data.CHECK_CODE:

        if (data.code == 0) {
          that.jumpIndex();
        }else{
          that.jumpLogin();
        }


        break;
    }
  },
  onComplete: function(requestCode) {
    console.log(requestCode);


  },
  onErrorBefore: function(message, requestCode) {

    console.log(message);

  }, checkCode: function (cookie, jwid){


    //发起请求
    app.webCall("/v1/check/cookie", {
      "cookie": cookie,
      "jwid": jwid,
  
    }, this.data.CHECK_CODE, this.onSuccess);


  }

})