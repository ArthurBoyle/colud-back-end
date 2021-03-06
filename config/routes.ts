const Routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    routes: [
      {
        title: '404',
        path: '/no/found/page',
        component: '@/pages/404'
      },
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
            title: '观看主题设置',
            path: '/watch-theme',
            component: '@/pages/liveConfig/basicSettings/WatchTheme'
          },
          {
            title: '观看人数设置',
            path: '/visitors-number',
            component: '@/pages/liveConfig/basicSettings/VisitorsNumber'
          },
          {
            title: '视频窗口Logo设置',
            path: '/window-logo',
            component: '@/pages/liveConfig/basicSettings/WindowLogo'
          },
          {
            title: '直播引导图',
            path: '/live-guide',
            component: '@/pages/liveConfig/basicSettings/LiveGuide'
          },
          {
            title: '直播窗口背景',
            path: '/live-background',
            component: '@/pages/liveConfig/basicSettings/LiveBackground'
          },
          {
            title: '公众号设置',
            path: '/official-account',
            component: '@/pages/liveConfig/basicSettings/OfficialAccount'
          },
          {
            title: '活动详情',
            path: '/live-detail',
            component: '@/pages/liveConfig/basicSettings/LiveDetail'
          },
          {
            title: '活动回放',
            path: '/live-playback',
            component: '@/pages/liveConfig/basicSettings/LivePlayback'
          },
          {
            title: '选项卡设置',
            path: '/tabs-config',
            component: '@/pages/liveConfig/TabsConfig'
          },
          {
            title: '观看权限设置',
            path: '/watching-auth',
            component: '@/pages/liveConfig/WatchingAuth'
          },
          {
            title: '抽奖设置',
            path: '/luck-draw-config',
            component: '@/pages/liveConfig/LuckDraw/Config'
          },
          {
            title: '中奖记录',
            path: '/luck-draw-record',
            component: '@/pages/liveConfig/LuckDraw/Record'
          },
          {
            title: '互动投票设置',
            path: 'interactive-voting',
            component: '@/pages/liveConfig/InteractiveVoting'
          },
          {
            title: '互动打赏设置',
            path: 'interactive-reward',
            component: '@/pages/liveConfig/InteractiveReward'
          },
          {
            title: '微信分享',
            path: 'wechat-sharing',
            component: '@/pages/liveConfig/WechatSharing'
          }
        ]
      }
    ]
  }
];

export default Routes;
