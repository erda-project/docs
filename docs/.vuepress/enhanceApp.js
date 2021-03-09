export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer // is this enhancement applied in server-rendering or client
}) => {
  if (!isServer) {
    // import('vue-toasted' /* webpackChunkName: "notification" */).then((module) => {
    //   Vue.use(module.default)
    // })

    // 页面加载后自动滚动到hash位置
    const hash = document.location.hash;
    if (hash.length > 1) {
      setTimeout(() => {
        const id = decodeURI(hash.substring(1)).replace(' ', '-');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 1000);
    }

    const nav = siteData.themeConfig.nav;
    const vers = nav[nav.length - 1].items.filter(v => v.version).map(v => v.version);
    // latest 路径自动转向 最新版本
    router.beforeEach((to, from, next) => {
      const [, ver, ...rest] = to.path.split('/');
      if (ver === 'latest') {
        next([, vers[0], ...rest].join('/'))
      } else {
        next();
      }
    })
  }
}
