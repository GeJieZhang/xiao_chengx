import {
  $wuxDialog
} from '../../../dist/index'
//获取应用实例
var app = getApp()
Page({
  data: {
    QUERY_CLASS: "001",
  
    itemHeight: 120,
    colorArrays: ["#85B8CF", "#0A9A84", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [],
    years: [],
    pers: [],
    options1: [],
    value1:"",
    title:"课表",
    buttons: [{
      openType: 'getUserInfo',
      label: '学期选择',
      icon: "../../assets/images/logo/iv_xueqi.png",
    }],
  },
  onLoad: function() {

    var wlist = this.data.wlist = wx.getStorageSync("kb");
    var years = this.data.years = wx.getStorageSync("years");
    var pers = this.data.pers = wx.getStorageSync("pers");
    this.setData({
      wlist,
      years,
      pers
    });

    this.initData();
    // wx.setNavigationBarTitle({
    //   title: wx.getStorageSync("user").yearandper
    // })

  },
  /**点击课表**/

  showDetail: function(event) {
    var clickinfo = event.currentTarget.dataset.clickinfo;

    $wuxDialog().open({
      closable: true,
      resetOnClose: true,
      title: '课程详情',
      content: clickinfo

    })



  },

  /**FloatButton的点击事件处理 */
  onClick(e) {
    console.log('onClick', e.detail)
    $wuxDialog().onClose();
    if (e.detail.index === 0) {

      this.setData({
        visible1: true
      })

    }
  },


  /**初始化学期数据 */
  initData: function() {
    var that = this;
    var newPer=[];
    for (var i = 0; i < that.data.pers.length; i++) {
      var obj = new Object();
      obj.label = "第" + that.data.pers[i].per+"学期";
      obj.value = that.data.pers[i].per;
      newPer.push(obj);
    }
    console.log(newPer);
    var newData = [];
    for (var i = 0; i < that.data.years.length; i++) {
      var obj = new Object();
      obj.value = that.data.years[i].year;
      obj.label = that.data.years[i].year + "学年";
      obj.isLeaf = false;
      obj.children = newPer;
      newData.push(obj);

    }
    this.setData({
      options1: newData
    });

  },	


  /**关闭学期选择 */
  onClose1() {
    this.setData({ visible1: false })
  },
  /**学期选择回调 */
  onChange1(e) {

  
    var value1 = this.data.value1 = e.detail.options.map((n) => n.value).join('/');

    var title = this.data.title = e.detail.options.map((n) => n.label).join(' ');

    this.setData({
      value1,
      title
    });
   
    wx.setNavigationBarTitle({
      title: this.data.title
    })

    if (value1.indexOf("/")!=-1){

      console.log(title);
      console.log(wx.getStorageSync("user").yearandper);
      if (title == wx.getStorageSync("user").yearandper){

        app.showToptips("请选择不同的时间段！");
        return;
      }
     
      var cookie = wx.getStorageSync("cookie");
      var jwid = wx.getStorageSync("user").jwId;
      var year = value1.split("/")[0];
      var per = value1.split("/")[1];

      //发起请求
      app.webCall("/v1/get/user/class", {
        "cookie": cookie,
        "jwid": jwid,
        "year": year,
        "per": per
      }, this.data.QUERY_CLASS, this.onSuccess);

    }


  }, 
  /**网络请求onSuccess*/
  onSuccess: function (data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.QUERY_CLASS:
        //获取Code

        if (data.code==0){
          var wlist = that.data.wlist = data.result;
          this.setData({
            wlist
          });
        }else{
          app.showToptips("查询课表失败");
        }

   

        break;
      
    
    }
  },
  //   /**网络请求onComplete*/
  // onComplete: function (requestCode) {
    


  // },
    /**网络请求onErrorBefore*/
  onErrorBefore: function (message, requestCode) {
    

  }

})