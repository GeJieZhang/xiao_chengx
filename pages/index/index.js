Page({
  data: {
    //banner配置
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    vertical: false,
    select_color: "#000000",

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

  }


})