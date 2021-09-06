## Erda 用户文档

## 文档开发
*提前安装好 node >= 6*

```bash
npm i # 如果已安装过依赖，可跳过
npm run dev
```
本地服务启动后，按提示访问（默认是`http://localhost:8080/`）即可看到预览效果，改动后自动刷新。
如果某个改动导致页面白屏，可能是js报错了，需要重启一下服务再尝试。

### 文档结构
项目配置放在.vuepress目录中，导航菜单配置在nav目录下，侧边栏菜单配置在sidebar目录下，其他基本不用修改。

vuepress会把除`.vuepress`目录以外的目录下，所有的markdown、vue文件，按照同样的目录结构转为html文件。
每个目录下的README.md会作为index.html。
推荐每个目录都有一个README.md文件，避免用户访问某一个路径时出现404的问题。

### 导航菜单配置
在`.vuepress/nav/zh.js`中修改
```js
module.exports = [
  {
    text: '使用手册',
    link: '/manual/' // 有最后的/时，表示是个目录，需要有/manual/README.md
  },
  {
    text: 'CHANGELOG',
    link: '/changeLog' // 没有最后的/时，表示是个文件，需要有/changeLog.md文件
  },
  {
    text: 'FAQ',
    link: '/faq'
  },
  {
    text: '了解更多',
    ariaLabel: '了解更多',
    items: [ // 有多级菜单时
      {
        text: '产品架构',
        link: '/architecture'
      },
      {
        text: '其他',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md'
          }
        ]
      }
    ]
  },
]
```

### 侧边栏菜单配置
在`.vuepress/sidebar/zh.js`中修改
```js
  '/doc/guide/': [] // 按最先匹配到的，所以精确匹配的要放在前面
  '/doc/': [ // 匹配路径，前后都有/，当在这个路径下时，使用下面的配置作为菜单
    {
      title: '快速上手',
      collapsable: true, // 是否可折叠
      children: [ // 二级菜单
        'guide/', // 添加key作为路径前缀，这个指向/doc/guide/README.md
        'guide/getting-started', // 指向/doc/guide/getting-started.md
        '../api/cli', // 其他目录下的使用相对路径，这个指向/api/cli.md
      ]
    },
    {
      title: 'groupB',
      collapsable: true,
      children: [
      ]
    }
  ],
```

默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过以下代码来修改它的行为。
默认的深度是 1，它将提取到 h2 的标题，设置成 0 将会禁用标题（headers）链接，同时，最大的深度为 2，它将同时提取 h2 和 h3 标题。
```js
---
sidebarDepth: 0
---
```

如果所有内容都在一个文件内，且侧边栏没有分组，或分组不需要展开收起，可以直接在该文件头部添加如下内容，
可以自动根据h1\h2\h3层级生成侧边栏菜单
```js
---
sidebar: auto
---
```

### 设置主页模板
在任意文件顶部加入如下代码，会在该页加入首页的模板，就是一个logo+描述+按钮+footer
```js
---
home: true
heroImage: //terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2020/06/09/0b9da3f2-8aa6-4a5f-b649-96f09d874c25.png
actionText: 快速上手
actionLink: /manual/guide/getting-started
footer: Copyright © 2012-present terminus
---
```

### 注意事项
不要在文档中直接写 {{ }}, 除非用 ``` 代码块包裹，否则应使用以下任意一种方式：
```
<code v-text="'{{ ... }}'"/>
<code v-pre>{{ ... }}</code>
{{'{\{ ... }\}'}}
```

### 其他
支持类型：
* table
* 标签，有tip|warning|error三种类型，对应绿、黄、红三种颜色
```
<Badge type="warning" text="beta" />
```
* [Emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)
* 提示区块，有tip|warning|danger|details四种类型
```
::: tip 这是提示标题
这是一个提示
:::
```

* 代码块的行高亮和显示行号
* 自定义组件


更多配置参考[vuepress官方文档](https://vuepress.vuejs.org/)


### 编辑流程
1. 新建 feature 分支，完成初稿，提交前执行`npm run lint-md`检查文档格式，没问题后执行提交
2. 比较 feature 分支和 develop 分支发 Merge Request, 完成 Review 后合并分支
3. 定期把 develop 分支 merge 到 master 分支, 进行升级

### 编写规范
1. 截图使用 Mac 14 寸小屏非全屏(Shift + Command + 4 + 空格 + 单击) ，注意隐藏书签(Shift + Command + B)、关闭无关 Tab 页、项目图片请选择比较正式的terminus图片，项目或应用描述请填写比较正式的描述信息。
2. 截图使用内部 Uploader 服务上传至 OSS。
3. 中英文混排，英文前后必须有空格。
4. **不要使用类似`<project>`这样用尖括号包裹的占位符，如果需要使用请用代码块包裹起来**

## 发布版本
1. 复制一份旧版本文件并改名（比如3.18 -> 3.19）
2. `.vuepress/nav/zh.js`中增加版本号
3. `.vuepress/sidebar/zh.js`中增加新版的菜单配置
