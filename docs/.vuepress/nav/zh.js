// 新版本放前面，内容均在该文档仓库中
const vers = [
  '3.21',
  '3.20',
  '3.19',
  '3.18',
  '3.17',
  '3.16'
];
// 老版本访问地址为 docs.terminus.io/dice-docs-3.x
const oldVers = [
  "3.15",
  "3.14",
  "3.13",
  "3.12",
  "3.11",
  "3.10",
  "3.9",
  "3.8",
  "3.7",
  "3.6",
  "3.5",
  "3.4",
  "3.3",
  "3.2",
  "3.1",
  "3.0",
  "2.13",
  "2.12"
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
    )).concat(oldVers.map((ver) => (
      {
        text: `v${ver}`,
        link: `https://docs.terminus.io/dice-docs-${ver.replace('.', '-')}/`,
      }
    )))
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
