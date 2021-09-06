"use strict";

// const { fs, path } = require('@vuepress/shared-utils')
module.exports = function (ctx) {
  return {
    dest: "dest",
    lang: 'zh-CN',
    title: "Erda Docs",
    description: "学习在 Erda 平台上构建、部署、管理应用",
    // locales: {
    //   '/en': {
    //     lang: 'en-US',
    //     title: 'Erda',
    //     description: 'Strong platform, rich market, make the technology more stable, and make the application more focused'
    //   },
    //   '/': {
    //     lang: 'zh-CN',
    //     title: "Erda",
    //     description: "学习在 Erda 平台上构建、部署、管理应用",
    //   }
    // },
    head: [['link', {
      rel: 'icon',
      href: "/favicon.ico"
    }], ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }], ['meta', {
      name: 'theme-color',
      content: '#5d48df'
    }], ['meta', {
      property: 'og:image',
      content: '/favicon.ico'
    }], ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }], ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }], ['link', {
      rel: "stylesheet",
      href: '//at.alicdn.com/t/font_1893647_d3gl9b04e4b.css'
    }] // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#5d48df' }],
    // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    // theme: '@vuepress/vue',
    themeConfig: {
      // repo: 'vuejs/vuepress',
      // editLinks: true,
      // docsDir: 'packages/docs/docs',
      logo: '/images/logo.png',
      smoothScroll: true,
      nav: require('./nav/zh'),
      sidebar: require('./sidebar/zh'),
      // algolia: {
      //   apiKey: '75ceab77c4536a615806be21b7e3b39c',
      //   indexName: 'Erda'
      // }
      // locales: {
      //   '/': {
      //     label: '简体中文',
      //     selectText: '选择语言',
      //     ariaLabel: '选择语言',
      //     editLinkText: '在 GitHub 上编辑此页',
      //     lastUpdated: '上次更新',
      //     nav: require('./nav/zh'),
      //     sidebar: require('./sidebar/zh'),
      //   },
      //   // '/en/': {
      //   //   label: 'English',
      //   //   selectText: 'Languages',
      //   //   ariaLabel: 'Select language',
      //   //   editLinkText: 'Edit this page on GitHub',
      //   //   lastUpdated: 'Last Updated',
      //   //   nav: require('./nav/en'),
      //   //   sidebar: require('./sidebar/en'),
      //   // }
      // },
      sidebarDepth: 0
    },
    // globalUIComponents: ['SideAnchor'],
    plugins: [['@vuepress/search', {
      searchMaxSuggestions: 10
    }], ['@vuepress/back-to-top', true], ['img-lazy'], ['vuepress-plugin-code-copy', {
      selector: '.extra-class',
      align: 'top',
      color: '#ccc' // backgroundTransition: Boolean,
      // backgroundColor: String,
      // successText: String

    }], // ['@vuepress/pwa', {
    //   serviceWorker: true,
    //   updatePopup: {
    //     message: "发现新内容可用",
    //     buttonText: "刷新"
    //   }
    // }],
    ['@vuepress/medium-zoom', true] // ['container', {
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
    extraWatchFiles: [// '.vuepress/nav/en.js',
    '.vuepress/nav/zh.js', // '.vuepress/sidebar/en.js',
    '.vuepress/sidebar/zh.js'],
    markdown: {
      extendMarkdown: function extendMarkdown(md) {
        var defaultImageRenderer = md.renderer.rules.image;

        md.renderer.rules.image = function (tokens, idx, options, env, self) {
          var token = tokens[idx];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = token.attrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var attr = _step.value;

              if (attr[0] === 'data-src' && attr[1].includes('.oss')) {
                attr[1] = attr[1] + '?x-oss-process=image/resize,w_1600/format,webp';
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          var originText = defaultImageRenderer(tokens, idx, options, env, self);
          return token.attrGet('alt') ? originText + '<span class="img-title">' + token.attrGet('alt') + '</span>' : originText;
        };
      }
    }
  };
};
