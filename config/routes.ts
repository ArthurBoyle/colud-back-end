const Routes = [
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    routes: [
      {
        path: '/login',
        pageName: '登录',
        component: '@/pages/login'
      },
      {
        path: '/',
        pageName: '首页',
        component: '@/pages/index'
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
