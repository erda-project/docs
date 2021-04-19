// 新版本放前面，内容均在该文档仓库中
const vers = [
  '3.21',
  '3.20',
  '3.19',
  '3.18',
  '3.17',
  '3.16'
];

module.exports = [
  {
    text: '使用手册',
    link: `/{version}/manual/`,
  },
  {
    text: 'CHANGELOG',
    link: '/changeLog'
  },
  {
    text: 'FAQ',
    link: '/faq'
  },
  {
    text: '版本',
    ariaLabel: '版本',
    items: vers.map(ver => (
      {
        text: `v${ver}`,
        link: `/${ver}/manual/`,
        version: ver,
      }
    ))
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
