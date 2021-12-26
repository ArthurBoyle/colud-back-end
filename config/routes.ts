const Routes = [
  {
    title: '首页',
    path: '/',
    component: '@/pages/index'
  },
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    routes: [
      {
        title: '登录',
        path: '/login',
        component: '@/pages/Login'
      },
      {
        title: '直播列表',
        path: '/live-list',
        component: '@/pages/LiveList'
      },
      {
        path: '/',
        component: '@/layouts/ConfigLayout',
        routes: [
          {
            title: '测试',
            path: '/test',
            component: '@/pages/liveConfig/Test'
          },
          {
            title: '聊天管理',
            path: '/chat',
            component: '@/pages/liveConfig/Chat'
          },
          {
            title: '播放地址设置',
            path: '/play-address',
            component: '@/pages/liveConfig/basicSettings/PlayAddress'
          },
          {
            title: '观看主题页设置',
            path: '/watch-theme',
            component: '@/pages/liveConfig/basicSettings/WatchTheme'
          },
          {
            title: '观看人数设置',
            path: '/visitors-number',
            component: '@/pages/liveConfig/basicSettings/VisitorsNumber'
          }
        ]
      }
      /*{
        path: '/no/auth',
        pageName: '无权限',
        component: '@/pages/NoAuth'
      },
      {
        path: '/no/found/page',
        pageName: '404',
        component: '@/pages/404'
      }*/
    ]
  }
];

export default Routes;
