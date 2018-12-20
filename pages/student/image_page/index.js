Page({

  data: {

    imageUrl: "http://192.168.0.107:8080/admin/classimg.png",
    imageList: ["http://192.168.0.107:8080/admin/classimg.png"],

  },
  onLoad: function() {

  },
  imageClick: function() {
    wx.previewImage({
      current: this.data.imageUrl, // 当前显示图片的http链接
      urls: this.data.imageList // 需要预览的图片http链接列表
    })


  }






});