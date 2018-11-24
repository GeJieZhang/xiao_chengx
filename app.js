// var requestCount = [];
import {
  $wuxToptips
} from 'dist/index'
App(

  {


    //================================================================================================
    //===================================================================================网络请求
    //================================================================================================
    apiHost: "https://api.cdhxxd.cn",
    // apiHost: "http://192.168.0.189:8080",
    AppID:"wx81677b0306ec13eb",
    AppSecret:"dc292b07963b90a6fd0098771e5d83f5",

    requestCount: [],
    verifyCount: [],
    /**
     * 接口公共访问方法
     * @param {Object} urlPath 访问路径
     * @param {Object} params 访问参数（json格式）
     * @param {Object} requestCode 访问码，返回处理使用
     * @param {Object} onSuccess 成功回调
     * @param {Object} onErrorBefore 失败回调
     * @param {Object} onComplete 请求完成（不管成功或失败）回调
     * @param {Object} isVerify 是否验证重复提交
     * @param {Object} requestType 请求类型（默认POST）
     * @param {Object} retry 访问失败重新请求次数（默认1次）
     */
    webCall: function(urlPath, params, requestCode, onSuccess, onErrorBefore, onComplete, isVerify, requestType, retry) {
      var params = arguments[1] ? arguments[1] : {};
      var requestCode = arguments[2] ? arguments[2] : -1;
      var onSuccess = arguments[3] ? arguments[3] : this.onSuccess;
      var onErrorBefore = arguments[4] ? arguments[4] : function () { };
      var onComplete = arguments[5] ? arguments[5] : function () {};
      var isVerify = arguments[6] ? arguments[6] : false;
      var requestType = arguments[7] ? arguments[7] : "POST";
      var retry = arguments[8] ? arguments[8] : 1;
      var that = this;


      var nowTime = new Date().getTime();
      if (this.requestCount[urlPath] && (nowTime - this.requestCount[urlPath]) < 500) {
        return;
      }
      this.requestCount[urlPath] = nowTime;
      //是否验证重复提交
      if (isVerify) {
        if (this.verifyCount[urlPath]) {
          return;
        }
        this.verifyCount[urlPath] = true; //重复验证开关开启
      }

      console.log("发起网络请求, 路径:" + (that.apiHost + urlPath) + ", 参数:" + JSON.stringify(params));
      that.showLoading();
      wx.request({
        url: that.apiHost + urlPath,
        data: params,
        method: requestType, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': requestType == 'POST' ?
            'application/x-www-form-urlencoded' : 'application/json'
        }, // 设置请求的 header
        success: function(res) {

          console.log("返回结果：" + JSON.stringify(res.data));
          if (res.data) {
            if (res.statusCode == 200) { //访问成功
              onSuccess(res.data, requestCode);
            } else {//访问失败
              that.showToptips("请求失败 , 请重试！")
              onErrorBefore(res.data.message, requestCode);
            }
          } else {
            onErrorBefore("请求失败 , 请重试！", requestCode);
            that.showToptips("请求失败 , 请重试！")
          }
        },
        fail: function(res) {
          retry--;
          console.log("网络访问失败：" + JSON.stringify(res));
          that.showToptips("网络访问失败！")
          if (retry > 0){
            that.showToptips("网络访问失败：正在重试！")
            return that.webCall(urlPath, params, requestCode, onSuccess, onErrorBefore, onComplete, requestType, retry);
          } 
        },
        complete: function(res) {
          that.hideLoading();
          onComplete(requestCode);
          //请求完成后，2秒后重复验证的开关关闭
          if (isVerify) {
            setTimeout(function() {
              that.verifyCount[urlPath] = false;
            }, 2000);
          }
        }
      })
    },


    //================================================================================================
    //===================================================================================公用组件
    //================================================================================================
    /**显示加载中 */
    showLoading: function() {
      wx.showLoading({
        title: '数据加载中',
        icon: 'loading',
      })
    },

    /**隐藏加载中 */
    hideLoading: function() {
      wx.hideLoading();
    },

    /**顶部提示 */
    showToptips(str) {
      $wuxToptips().warn({
        hidden: false,
        text: str,
        duration: 3000,
      
      })
    },


  });