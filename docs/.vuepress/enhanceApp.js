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

    siteData.themeConfig.algolia.transformData = suggestions => {
      const hash ={};
      const [, version, type] = router.history.current.path.split('/');
      // 一、在[使用手册]页面搜索时：[使用手册] 当前页面 url 路径包含版本号。若内容为[使用手册]，则在本版本搜索内容；若内容为 [CHANGELOG/FAQ] 则不过滤内容
      if(type === 'manual') {
        return suggestions.filter(({ url }) => url.includes('manual') && url.includes(version) || !url.includes('manual'));
      } 
      // 二、在[CHANGELOG/FAQ]页面搜索时：[CHANGELOG/FAQ]当前页面 url 路径不包含版本号
      // 1、搜索内容为[使用手册]时，筛选出有结果的最新版本
      const manualSuggestions = suggestions.filter(({ url }) => url.includes('manual') && vers.filter((ver) => url.includes(ver)));
      // 进行版本号的比较，将最新内容放置数组前列
      manualSuggestions.sort((a, b) => {
        // url 格式：
        // https://dice-docs.app.terminus.io/changeLog.html#_3-19
        // https://doc.app.terminus.io/3.21/manual/support/diagnostics.html#%E6%8F%90%E9%97%AE%E4%B9%8B%E5%89%8D

        const PROTOCOL_LENGTH = 8 // https:// 的长度
        const version1 = a.url.slice(PROTOCOL_LENGTH).split('/')[1].split('.');
        const version2 = b.url.slice(PROTOCOL_LENGTH).split('/')[1].split('.');
        const [versionInteger1, versionDecimal1] = version1;
        const [versionInteger2, versionDecimal2] = version2;
        return versionInteger2 === versionInteger1
          ? versionDecimal2 - versionDecimal1
          : versionInteger2 - versionInteger1;
      });
       // 根据 anchor 字段对相同内容进行过滤显示
      const latestManualSuggestions = manualSuggestions.reduce(function(arr, current) {
        return hash[current.anchor] ? arr : arr.concat(current);
      }, [])
      // 2、若内容为 [CHANGELOG/FAQ] 则不过滤内容
      const unManualSuggestions = suggestions.filter(({ url }) => !url.includes('manual'))
      return unManualSuggestions.concat(latestManualSuggestions)
    };
  }
}
