//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: ["#85B8CF", "#0A9A84","#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: [
      { "xqj": 1, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 2, "skjc": 1, "skcd": 2,"kcmc":"高等数学@教A-301"},
      { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 3, "skjc": 4, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 3, "skjc": 9, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 3, "skjc": 6, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 4, "skjc": 2, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 4, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 5, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 6, "skjc": 3, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 7, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },




     
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var data=[1,2,3,4,5,6,7,8,9,10,11,12]
    for (var index in data) {
      
      console.log(data[index] % 9)
    }
    
   
  }
})
