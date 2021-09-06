
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
    items: [
      {
        text: 'v1.2',
        link: '/1.2/manual/about/intro.html',
        version: 1.2,
      },
      {
        text: 'v1.1',
        link: '/1.1/manual/',
        forceToIndex: true,
        version: 1.1,
      },
      {
        text: 'v1.0',
        link: '/1.0/manual/',
        forceToIndex: true,
        version: 1.0,
      },
    ]
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
