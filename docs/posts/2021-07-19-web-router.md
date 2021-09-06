---
title: 浅谈：前端路由原理解析及实践
author: 张小俊
date: 2021-07-19
category: frontend
---


![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/7cca5e54-43ab-44d1-bf67-58c80bbe6069.png)

> **导读**：其实在前端领域，还有很多基础的东西有待深入去做。不为造轮子而造轮子，才是在做有意义的事情。所以，我们决定撰写《Erda 前端之声》系列文章，深入剖析我们在前端探索过程中的一些落地经验，以此助力在前端之路上奋进的开发者们，能够早日发掘属于自己的精彩。

​

系列文章推荐：

- [《灵魂拷问：我们该如何写一个适合自己的状态管理库？》](http://mp.weixin.qq.com/s?__biz=Mzg2MDYzNTAxMw==&mid=2247484732&idx=1&sn=52127f0ec99288f7b15f3676e97866a2&chksm=ce222fd6f955a6c02b0a547d74f9e7716593e5d409efc6d93d5fbc72e31d50d42d5ac5db4865&scene=21#wechat_redirect)
- 《浅谈：前端路由原理解析及实践》（本文）



# 前言
<br />大家好，这里是 [Erda](https://link.zhihu.com/?target=https%3A//github.com/erda-project) 技术团队。作为 Erda 项目的前端，[Erda-UI](https://link.zhihu.com/?target=https%3A//github.com/erda-project/erda-u) 项目从最初开发到现在开源，业务复杂度在不断递增，项目的代码文件已经近 2000，项目内部的路由配置已经超过 500 个。本文会先简单介绍一下前端路由原理，以及 React-Router 的基础使用，接着会主要分享 Erda-UI 项目在路由上实践的一些拓展功能。<br />​<br />
# 背景
<br />在单页面应用（SPA）已经非常成熟的当下，路由也成了前端项目的主要配置，我们使用路由来管理项目页面的组成结构，各大前端框架也都有各自成熟的路由解决方案（React: React-Router、Vue: Vue-Router）。而在复杂的业务系统中，往往存在很多跟路由相关的其他逻辑，比如权限、面包屑等。我们希望这部分逻辑能整合到路由的配置当中，这样能有效的减轻开发和维护的负担。Erda-UI 项目使用 React 框架，所以下面的内容都基于 React-Router。
# 路由原理
<br />路由的基本原理，就是在**不刷新**浏览器的情况下修改浏览器链接，同时**监听链接的变化**并找到匹配的组件渲染。满足这两个条件即可实现。<br />​

路由的实现通常有以下两种形式：<br />​<br />

- hash ( /#path )
- history ( /path )

​

hash 在浏览器中默认是作为锚点来使用的，在 hash 模式中，url 里始终会有 #，没有传统 url 写法那么美观，所以在不考虑兼容性的情况下使用 history 的模式是更好的选择。
## hash
<br />hash 模式下，url 中 # 后面的部分只是一个客户端状态，当这部分变化时，浏览器本身就不会刷新，天生具备第一个条件（即在不刷新浏览器的情况下修改浏览器链接），同时通过监听 hashChange 事件或注册 onhashchange 回调函数来监听 url 中 hash 值的变化。<br />​<br />
```
window.addEventListener('hashchange', hashChangeHandler);
// or window.onhashchange = hashChangeHandler;
```
## history
<br />history 模式，是利用了 HTML5 中 history 的 API，history.pushState 和 history.replaceState 这两个方法，可以在不刷新页面的情况下，操作浏览器的历史记录，前者为新增一条记录，后者为替换最后一条记录。同时通过监听 popState 事件或注册 onpopstate 回调函数来监听 url 的变化。<br />​<br />
```
window.addEventListener('popState', locationChangeHandler);
// or window.onpopstate = locationChangeHandler;
```
​

但是这里有一点需要注意，history.pushState 和 history.replaceState 是不会自动触发 popState 的。只有在做出浏览器动作时，才会触发该事件，比如用户点击浏览器的回退按钮。通常路由库里会封装一个监听方法，不管是调用 history.pushState、history.replaceState，还是用户触发浏览器动作导致的路由变化，都能够触发监听函数。以 react-router-dom 中的 listen（部分为伪代码）为例：<br />​<br />
```
function setState(nextState) {
  _extends(history, nextState);

  history.length = history.entries.length;
  // 将路由变化使用 state 管理，在变化时，通知所有监听者
  transitionManager.notifyListeners(history.location, history.action);
}

// 封装 push、replace 等方法
function push(path, state) {
  // ...
  globalHistory.pushState({
    key: key,
    state: state
  }, null, href);
  // ...
  setState({ // 手动触发监听
    action: action,
    location: location
  })
}

// popState 事件监听，监听事件同时 setState，通知 transitionManager 中的 listeners;
function handlePopState(location){
  // ...
  setState(location)
  // ...
}

// 封装 listen。
function listen(listener) {
  var unlisten = transitionManager.appendListener(listener);
  window.addEventListener('popState', handlePopState); // 监听浏览器事件。
  // ...
}
```
# React-Router 路由基础
<br />为了方便展开下面的内容探讨，本章节先简单介绍一下 React-Router 相关基础。<br />​<br />
## 基础库
<br />React-Router 相关的库主要有以下几个：<br />​<br />

- react-router 核心库
- react-router-dom 基于 DOM 的路由实现，内部包含 react-router 的实现，使用时无需再引 react-router
- react-router-native 基于 React Native 的路由实现
- react-router-redux 路由和 Redux 的集成，不再维护
- react-router-config 用于配置静态路由

​<br />
## react-router-dom
<br />对应了路由的两种实现方式，react-router-dom 库也提供了两个路由组件：BrowserRouter、HashRouter。<br />​<br />

- Route : 路由单元，配置一个 path 以及对应的渲染组件，其中 exact 表示精确匹配
- Switch: 控制渲染第一个匹配的路由组件
- Link: 链接组件，相当于 \<a\> 标签
- Redirect: 重定向组件

​<br />
## 使用
<br />路由基本的使用如下：<br />​<br />
```
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

function App(){
  return (
     <BrowserRouter>
     	<Link to="/home">home</Link>
        <Link to="/about">About</Link>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
     </BrowserRouter>
  )
}
```
​

除此之外，还可以嵌套使用，即在组件内部再配置路由。在路由过多的情况下，可以通过这种方式将 Router 拆分，这让 Router 更具有一般组件的特性，可以随意嵌套。而组件中可以得到一个 math 的 props 来获取上级路由的相关信息。<br />​<br />
```
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

function App(){
  return (
     <BrowserRouter>
     	<Link to="/home">home</Link>
      	<Link to="/settings">Settings</Link>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/settings" exact component={Settings} />
        </Switch>
     </BrowserRouter>
  )
}

const Setting = (props) => {
  const matchPath = props.match.path;
  return (
    <div>
      <Link to={`${matchPath}/a`}>a</Link>
      <Link to={`${matchPath}/b`}>b</Link>
      <Switch>
        <Route path={`${matchPath}/a`} component={AComp} />
        <Route path={`${matchPath}/b`} component={BComp} />
      </Switch>
    </div>
  )
}
```
​

然而，项目中的路由除了数量比较多外，通常还会有一些需要集中处理的逻辑，分散的路由配置方式显然不太适合，而 react-router-config 为我们提供了方便的静态路由配置，其本质就是将一份 config 转换为 Route 组件，而在组件渲染的方法 render 中，则可以根据业务情况来做一些统一的处理。<br />​<br />
```
function renderRoutes(routes, extraProps, switchProps) {
  // ...
  return routes ? React.createElement(reactRouter.Switch, switchProps, routes.map(function (route, i) {
    return React.createElement(reactRouter.Route, {
      key: route.key || i,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      render: function render(props) {
        return route.render ? route.render(_extends({}, props, {}, extraProps, {
          route: route
        })) : React.createElement(route.component, _extends({}, props, extraProps, {
          route: route
        }));
      }
    });
  })) : null;
}
```
# Erda-UI 项目路由实践
## 路由配置


```
const routers = {
  path: ':orgName',
  mark: 'org',
  breadcrumbName: '{orgName}'
  routes: [
    {
      path: 'workBench',
      breadcrumbName: 'DevOps平台',
      mark: 'workBench',
      routes: [
      	{
          path: 'projects/:projectId',
          breadcrumbName: '',
          mark: 'project',
          AuthContainer: ProjectAuth,
          routes: [
            {
              path: 'apps',
              pageTitle: '应用列表',
              getComp: cb => cb(import('/xx/xx')),
              routes: [
                {
                  path: 'apps/:appId',
                  mark: 'application',
                  breadcrumbName: '应用',
                  AuthContainer: AppAuth,
                }
              ]
            },
          ]
        }
      ],
    },
  ]
}
```
​

由上我们可以看到，在配置中除了 path 之外，其他的字段似乎都和 React-Router 没什么太大关系，这些字段也正是我们实现跟路由相关逻辑的配置，下面我们会一一介绍。

## 路由状态管理：routeInfoStore
<br />为了拓展路由相关功能，我们首先需要有一个路由对象为我们提供数据支持，之所以需要这个对象，是因为单个的路由信息不足以实现其他相关逻辑，我们需要更多路由信息，比如路由层级上的链路记录，前后路由的状态对比等。

我们使用一个 routeInfoStore 对象来管理路由相关的数据和状态。这个对象可以在组件之间共享路由状态（类似 Redux 中 store）。<br />​

我们通过在 browserHistory.listen 中监听并调用 routeInfoStore 中处理路由变化的方法（$_updateRouteInfo）来更新路由数据和状态。<br />​<br />
```
browserHistory.listen((loc) => {
  // 监听路由变化触发 routerStore 的更新，类似 Redux 中 dispatch；
  // 此处使用发布订阅模式 来实现触发调用事件
  emit('@routeChange', routerStore.reducers.$_updateRouteInfo(loc));
});


// routeStore 中的数据
const initRouteInfo: IRouteInfo = {
  routes: [], // 当前路由所经过的层级，若路由在子模块，则改子模块所有的父模块也会被记录在内
  params: {}, // 当前 url 中路径里的所有变量
  query: {}, // 当前 url 中 search（？后面）的参数
  currentRoute: {}, // 当前匹配上的路由配置
  routeMarks: [], // 标记了 mark 的路由层级
  isIn: () => false,  // 扩展方法：用于判断是否在当前路由内
  isMatch: () => false,// 扩展方法：用于判断是否匹配当前路由
  isEntering: () => false,// 扩展方法：用于判断是否正在进入当前路由
  isLeaving: () => false,// 扩展方法：用于判断是否离开当前路由
  prevRouteInfo: {}, // 上一次路由的信息
};
```


## 路由监听扩展：mark
<br />通常我们需要监听路由在进入或离开某个范围内，自动进行的一些前置初始化操作，比如进模块 A，首先要获取模块 A 的权限，或者模块 A 的一些基础信息。离开模块 A 时，需要去清空相关的信息。为了做到这些监听和初始化，我们需要两个条件：

- 标记范围的字段。
- 在路由变化的时候，判断路由是否离开或进入相应的范围。

<br />我们在路由配置中添加了 mark 字段，用于标记当前路由的范围，类似路由范围的 id，需要保证全局唯一。而上文有说到 routeInfoStore 中，routeMarks 中会记录路由链路层级的 mark 集合，prevRouteInfo 会记录上一次路由信息。借此，我们可以在 routerInfoStore 里添加一些路由范围判断的函数 isIn、isEntering、isLeaving、isMatch。<br />​<br />
### isIn($mark) => boolean
表示当前路由是否在某个范围内。传入一个 mark 值，通过 routeInfoStore 中 routeMarks 中是否包含来判断：<br />​<br />
```
// routeMarks 内记录了路由经过的所有 mark 标记，通过判断 mark 是否被包含
isIn: (mark: string) => routeMarks.includes(mark),
```


### isEntering($mark) => boolean
表示当前路由正在进入某个范围，区别于 isIn, 这是一个正在进行时的判断，表示上一次路由并不在该范围，而当前这次在该范围内。<br />

```
//通过判断 mark 被包含，同时上一次的路由不被包含，判断是正在进入当前 mark。
isEntering: (mark: string) => routeMarks.includes(mark) && !prevRouteInfo.routeMarks.includes(mark),
```


### isLeaving($mark) => boolean
跟 isEntering 相反，isLeaving 表示上一次路由在范围内，而下一次路由离开范围，即正在离开。<br />

```
//通过判断 mark 不被包含，同时上一次的路由被包含，判断是正在离开当前 mark。
isLeaving: (mark: string) => !routeMarks.includes(mark) && prevRouteInfo.routeMarks.includes(mark),
```


### isMatch($pattern) => boolean
传入一个正则，判断路由是否匹配正则，一般用于对当前路由的直接判断：<br />​<br />
```
//通过正则判断
isMatch: (pattern: string) => !!pathToRegexp(pattern, []).exec(pathname),
```


### 注册监听
<br />我们提供了一个监听的方法，可以在项目启动时，由各个模块注册自己的路由监听函数，而监听函数中，则可以方便使用以上方法判断路由的范围。<br />​<br />
```
// 路由监听注册
export const listenRoute = (cb: Function) => {
  // getState 返回routeInfoStore 对象，其中包含了以上的判断方法
  cb(routeInfoStore.getState(s => s));

  // 路由变化时，调用监听方法
  on('@routeChange', cb);
};


// 模块 A 注册
listenRoute((_routeInfo) => {
  const { isEntering, isLeaving } = _routeInfo;

  if(isEntering('markA')){
    // 初始化模块 A
  }

  if(isLeaving('markA')) {
    // 清除模块 A 信息
  }
})
```


## 路由拆分：toMark
<br />当路由数量过大，一份路由数据嵌套可能很深，因此必然需要支持路由配置的拆分。

我们提供了路由注册的方法 registerRouter，不同模块可以只注册自己的路由，然后通过 toMark 字段来建立路由之间的所属关联，toMark 的值是另一个路由的标记 mark 值。在 registerRouter 内部，将所有路由整合成一份完整的配置。<br />​<br />
```
// 注册 org 路由
registerRouter({
  path: ':orgName',
  mark: 'org',
  breadcrumbName: '{orgName}'
});

// 注册 workBench 路由
registerRouter({
  path: 'workBench',
  breadcrumbName: 'DevOps平台',
  mark: 'workBench',
  toMark: 'org', // 配置 workBench 路由属于 org 的子路由
});

// 注册 project 路由
registerRouter({
  path: 'projects/:projectId',
  breadcrumbName: '',
  mark: 'project',
  toMark: 'workBench', // 配置 project 路由属于 workBench 的子路由
  AuthContainer: ProjectAuth,
  routes: [
    {
      path: 'apps',
      pageTitle: '应用列表',
      getComp: cb => cb(import('/xx/xx')),
    },
  ]
});

// 注册 application 路由
registerRouter({
  path: 'apps/:appId',
  mark: 'application',
  toMark: 'project', // 配置 application 路由属于 project 的子路由
  breadcrumbName: '应用',
  AuthContainer: AppAuth,
})
```


## 路由组件异步加载：getComp
<br />我们使用 getComp 的方式给单个路由配置组件，getComp 是一个异步方法引入一个组件，然后我们通过一个异步加载的高阶组件来实现路由组件的加载。<br />​<br />
```
// 重写 render
map(router, route => {
  return {
    ...route,
    render: (props) => asyncComponent(()=>route.getComp());
  }
})

// 异步组件
export const asyncComponent = (getComponent: Function) => {
  return class AsyncComponent extends React.Component {
    static Component: any = null;

    state = { Component: AsyncComponent.Component };

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then((Component: any) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) { // 当组件加载完成后，渲染
        return <Component {...this.props} />;
      }
      return null;
    }
  };
};
```


## 面包屑：breadcrumbName
<br />Erda-UI 的业务中，路由的配置是一个树形结构，进入子模块路由则一定经过了父模块路由，通过对路由数据的解析，我们能得到从根路由到当前路由所经过的层级链路，而路由层级链路刚好映射了面包屑的层级。

我们通过在路由配置中添加 breadcrumbName 字段，并在 routeInfoStore 的 routes 存储路由的层级链路数据。因此面包屑的数据可以直接通过 routers 中得到。<br />​

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/25/78204e9e-5deb-4b01-a226-e2188c9f476f.png)<br />

```
map(routes, route => {
   return {
      name: route.breadcrumbName,
      path: route.path,
   }
})
```
​

在配置中， breadcrumbName 可以是文字，也可以是字符串模板 {temp} 。这里是利用了另一份 store 的数据来管理所有字符串模板对应的数据，渲染的时候，通过匹配 key 值获取相应的展示文字。<br />​<br />
## 路由鉴权: AuthContainer
<br />在项目中，路由是否能访问，往往需要对应一些条件判断（用户权限、模块是否开放等）。不同路由的鉴权条件可能不一样，而且鉴权失败的提示也可能需要个性化，或者可能存在鉴权不通过后页面需要重定向等场景。这些都需要路由上的鉴权能个性化。就如 react-router-config 中的一样，我们可以通过调整 Route 组件的 render 函数来达到这个目的。<br />​

我们通过在路由上配置 AuthContainer 组件来给路由做权限拦截，大致过程分两步：

- 提供一个鉴权组件 AuthComp，内部封装鉴权相关逻辑及提示。
- 在渲染路由前，获取这个鉴权组件 AuthComp，并重写 render。

​<br />
```
// AuthComp
const AuthComp = (props) => {
  const { children } = props;
  const [auth, setAuth] = React.useState(undefined);
  useMount(()=>{
    doSomeAuthCheck().then(()=>{
    	setAuth(true)
    })
  })

  if( auth === undefined ){
    return <div>加载中</div>
  }
  return auth ? children : <div>您无权访问，请联系管理员...</div>
}

// 重写 render
map(router, route => {
  return {
    ...route,
    render: (props) => {
      const AuthComp = route.AuthContainer;
      const Comp = route.components;
      return (
      	<AuthComp {...props} route={route}> // 添加路由鉴权拦截
          {Comp ? <Comp {...props} /> : Comp }
        </AuthComp>
      )
    }
  }
})
```


## 总结及后续思考
<br />Erda-UI 项目中，我们通过以上的一些配置扩展，来集中管理所有的路由。这种方式可以简单高效的维护路由本身以及扩展关联业务逻辑。除此之外还可以做一些更灵活的事情，比如通过分析整个路由结构，生成可视化的路由树，支持路由的动态调整等等。经过漫长的业务演进和内容完善，我们验证了这种方式带来的好处。

同时我们也在不断思考还可以改进的地方，比如：<br />​<br />

- 在有链路层级的模块之间，路由的监听如何做到异步串联？

​

如：模块 A 包含模块 B，在模块 A 中注册监听初始化方法 initA，在模块 B 中注册 initB，如何控制 initB 在 initA 完成之后执行（若 initB 中需要使用到 initA 返回的结果时，则需要严格控制执行顺序）。<br />​<br />
# 结语
<br />本文中的内容都是很常见的一些场景，为了贴合业务的需要，Erda 项目也在不断更新迭代。我们也会时刻保持对社区的关注以及对自身业务发展的分析，将这一块做到更好，也**欢迎大家添加小助手微信（Erda202106）进入交流群讨论**！<br />​<br />

- Erda Github 地址：[https://github.com/erda-project/erda](https://github.com/erda-project/erda)
- Erda Cloud 官网：[https://www.erda.cloud/](https://www.erda.cloud/)

