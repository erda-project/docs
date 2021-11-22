const { getVers } = require('../util');

const verItems = getVers().map(ver => {
  if (ver <= 1.1) {
    return {
      text: `v${ver}`,
      link: `/${ver}/manual/`,
      forceToIndex: true,
      version: ver,
    }
  }
  return {
    text: `v${ver}`,
    link: `/${ver}/manual/about/intro.html`,
    version: ver,
  }
})

module.exports = [
  {
    text: '官网',
    link: `https://www.erda.cloud/`,
  },
  // {
  //   text: '使用手册',
  //   link: `/{version}/manual/`,
  // },
  // {
  //   text: 'CHANGELOG',
  //   link: '/changeLog'
  // },
  // {
  //   text: 'FAQ',
  //   link: '/faq'
  // },
  {
    text: '版本',
    ariaLabel: '版本',
    items: verItems,
  },
  // {
  //   text: '了解更多',
  //   ariaLabel: '了解更多',
  //   items: [
  //     {
  //       text: '产品架构',
  //       link: '/architecture'
  //     },
  //     {
  //       text: 'CLI',
  //       link: '/api/cli.html'
  //     },
  //     {
  //       text: '其他',
  //       items: [
  //         {
  //           text: 'Changelog',
  //           link: 'https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md'
  //         }
  //       ]
  //     }
  //   ]
  // },
]
