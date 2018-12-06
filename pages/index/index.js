var app = getApp();

Page({
  data: {
    //banner配置
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    vertical: false,
    select_color: "#000000",
    QUERY_BANNER:"001",
    imageHead:"",
    imageLists:[],

    //菜单
    remind: '加载中',
    core: [{
        id: 'kb',
        name: '课表查询',
        disabled: false,
        teacher_disabled: false
      },
      {
        id: 'cj',
        name: '成绩查询',
        disabled: false,
        teacher_disabled: true
      },
      {
        id: 'ks',
        name: '考试安排',
        disabled: false,
        teacher_disabled: false
      },
      {
        id: 'kjs',
        name: '空教室',
        disabled: false,
        teacher_disabled: false
      },
      {
        id: 'xs',
        name: '学生查询',
        disabled: false,
        teacher_disabled: false
      },
      {
        id: 'ykt',
        name: '一卡通',
        disabled: false,
        teacher_disabled: false
      },
      {
        id: 'jy',
        name: '借阅信息',
        disabled: false,
        teacher_disabled: false
      },
      {
        id: 'xf',
        name: '学费信息',
        disabled: false,
        teacher_disabled: true
      },
      {
        id: 'sdf',
        name: '电费查询',
        disabled: false,
        teacher_disabled: true
      },
      {
        id: 'bx',
        name: '物业报修',
        disabled: true,
        teacher_disabled: false
      }
    ]

  },


  onLoad:function(e){


    var imageHead = this.data.imageHead = app.apiHost+"/";
    console.log(imageHead);
    this.setData({
      imageHead
    });

    app.webCall("/v1/index/topbanner", {}, this.data.QUERY_BANNER, this.onSuccess,null,null,null,"GET",null);
  },
  /**网络请求onSuccess*/
  onSuccess: function (data, requestCode) {

    var that = this;
    switch (requestCode) {
      case this.data.QUERY_BANNER:
        //获取Code

        if (data.code == 0) {

          var imageLists = that.data.imageLists = data.result;

          that.setData({
            imageLists
          });


        } else {
          app.showToptips("查询Banner失败");
        }



        break;


    }
  },


})