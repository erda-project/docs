// const { fs, path } = require('@vuepress/shared-utils')
const removeMd = require('remove-markdown')
const { enPrefix } = require('./util');
const dayjs = require('dayjs');
const locale = require('dayjs/locale/es');

module.exports = ctx => ({
  dest: `dest`,
  lang: 'zh-CN',
  title: "Erda Docs",
  description: "学习在 Erda 平台上构建、部署、管理应用",
  shouldPrefetch: () => false, // prevent too many request in first page
  locales: {
    [`${enPrefix}/`]: {
      lang: 'en-US',
      title: 'Erda',
      description: 'Start to learn, deploy and operate your applications on Erda'
    },
    '/': {
      lang: 'zh-CN',
      title: "Erda",
      description: "学习在 Erda 平台上构建、部署、管理应用",
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5d48df' }],
    ['meta', { property: 'og:image', content: '/favicon.ico' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['script', { src: "https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_2649_5.ddffa67f22dad0e11114c854c2fa61a2.js" }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#5d48df' }],
    // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  define: {
    THEME_BLOG_PAGINATION_COMPONENT: 'Pagination',
  },
  // theme: '@vuepress/vue',
  themeConfig: {
    repo: 'erda-project/docs',
    editLinks: true,
    docsDir: 'docs',
    logo: '/images/logo.png',
    smoothScroll: true,
    nav: require('./nav/zh'),
    blogNav: [
      {
        text: '官网',
        link: `https://www.erda.cloud/`,
      },
      {
        text: '博客',
        link: `/blog/`,
      },
    ],
    sidebar: require('./sidebar/zh'),
    categoryMap: {
      post: '全部',
      opensource: '开源',
      dop: 'DevOps',
      msp: '微服务',
      frontend: '前端',
      cmp: '容器',
    },
    // algolia: {
    //   apiKey: '75ceab77c4536a615806be21b7e3b39c',
    //   indexName: 'Erda'
    // }
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '最后更新于',
        nav: require('./nav/zh'),
        sidebar: require('./sidebar/zh'),
      },
      [`${enPrefix}/`]: {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: require('./sidebar/en'),
      }
    },
    sidebarDepth: 0,
  },
  // globalUIComponents: ['SideAnchor'],
  plugins: [
    ['@vuepress/search',
      {
        // test: ['^/2\.', '^/en/'],
        searchMaxSuggestions: 10,
        locales: { // seem to work for v2
          '/en/': {
            placeholder: 'Search',
          },
          '/': {
            placeholder: '搜索',
          },
        },
      },
    ],
    ['@vuepress/back-to-top', true],
    ['img-lazy'],
    ['vuepress-plugin-code-copy',
      {
        selector: '.extra-class',
        align: 'top',
        color: '#ccc',
        // backgroundTransition: Boolean,
        // backgroundColor: String,
        // successText: String
      }
    ],
    [
      '@vuepress/blog',
      {
        directories: [
          {
            // Unique ID of current classification
            id: 'post',
            // Target directory
            dirname: 'posts',
            // Path of the `entry page` (or `list page`)
            path: '/blog/post/',
            itemPermalink: '/blog/post/:year/:month/:day/:slug',
            layout: 'Blog-Layout',
            itemLayout: 'Blog-Layout',
          },
        ],
        frontmatters: [
          {
            // Unique ID of current classification
            id: 'category',
            // Decide that the frontmatter keys will be grouped under this classification
            keys: ['category'],
            // Path of the `entry page` (or `list page`)
            path: '/blog/',
            // Layout of the `entry page`
            layout: 'Blog-Layout',
            // Layout of the `scope page`
            scopeLayout: 'Blog-Layout'
          },
        ],
        globalPagination: {
          lengthPerPage: 100, // 先写大一些，分页目前有点问题
        },
        // comment: {
        //   // Which service you'd like to use
        //   service: 'vssue',
        //   // The owner's name of repository to store the issues and comments.
        //   owner: 'daskyrk',
        //   // The name of repository to store the issues and comments.
        //   repo: 'erda-project/erda',
        //   // The clientId & clientSecret introduced in OAuth2 spec.
        //   clientId: 'Your clientId',
        //   clientSecret: 'Your clientSecret',
        // },
        sitemap: {
          hostname: 'https://erda-docs.app.terminus.io/',
          dateFormatter: val => {
            return new Date(val).toLocaleDateString();
          }
        },
      },
    ],
    // ['@vuepress/pwa', {
    //   serviceWorker: true,
    //   updatePopup: {
    //     message: "发现新内容可用",
    //     buttonText: "刷新"
    //   }
    // }],
    ['@vuepress/medium-zoom', true],
    // ['container', {
    //   type: 'vue',
    //   before: '<pre class="vue-container"><code>',
    //   after: '</code></pre>'
    // }],
    // ['container', {
    //   type: 'upgrade',
    //   before: info => `<UpgradePath title="${info}">`,
    //   after: '</UpgradePath>'
    // }],
    // ['flowchart']
  ],
  extraWatchFiles: [
    // '.vuepress/nav/en.js',
    '.vuepress/nav/zh.js',
    // '.vuepress/sidebar/en.js',
    '.vuepress/sidebar/zh.js'
  ],
  markdown: {
    extendMarkdown: md => {
      var defaultImageRenderer = md.renderer.rules.image;
      md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        for (const attr of token.attrs) {
          if (attr[0] === 'data-src' && attr[1].includes('.oss') && !attr[1].includes('.gif')) {
            attr[1] = attr[1] + '?x-oss-process=image/resize,w_2304/format,webp';
          }
        }
        const originText = defaultImageRenderer(tokens, idx, options, env, self);
        return token.attrGet('alt')
          ? originText + '<span class="img-title">' + token.attrGet('alt') + '</span>'
          : originText;
      };
    }
  },
  /**
   * Generate summary.
   */
  extendPageData(pageCtx) {
    const strippedContent = pageCtx._strippedContent
    const isInBlog = pageCtx.path.startsWith('/blog') || pageCtx.path.startsWith('/posts')
    if (!strippedContent || !isInBlog) {
      // console.log('pageCtx.path:', pageCtx.path);
      return
    }
    pageCtx.summary =
      removeMd(
        strippedContent
          .trim()
          .replace(/^#+\s+(.*)/, '')
          .slice(0, 200)
      ) + ' ...'
    pageCtx.frontmatter.description = pageCtx.summary
    if (pageCtx.frontmatter.summary) {
      pageCtx.frontmatter.description = pageCtx.frontmatter.summary
    }
  },
})
