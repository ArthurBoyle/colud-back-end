import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  title: 'B端管理系统',
  nodeModulesTransform: {
    type: 'none'
  },
  routes: routes,
  fastRefresh: {},
  dynamicImport: {
    loading: '@/Loading'
  },
  antd: {},
  dva: { immer: true },
  hash: true,
  history: { type: 'hash' },
  targets: {
    safari: false,
    edge: false,
    ios: false
  },
  proxy: {
    '/api': {
      target: 'https://zbqt.hnxsj.vip/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  }
});
