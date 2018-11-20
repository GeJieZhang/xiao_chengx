import { $wuxDialog } from '../../../dist/index'
//获取应用实例
var app = getApp()
Page({
  data: {
    itemHeight:120,
    colorArrays: ["#85B8CF", "#0A9A84","#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: wx.getStorageSync("kb")
  },
  onLoad: function () {

    console.log(this.data.wlist);
    
  },
  /**点击课表**/

  showDetail:function(event){
    var clickinfo = event.currentTarget.dataset.clickinfo;

    $wuxDialog().open({
      closable: true,
      resetOnClose: true,
      title: '详情',
      content: clickinfo

    })
  }
  
})
