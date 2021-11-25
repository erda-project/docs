# 三端统一框架

React-native 提供了一系列的标签，例如 View、Image、ScrollView、Text 等等，还有一些 API，例如Platform.os( 判断当前系统，IOS 或 Android)、Dimensions( 可以获取当前屏幕宽度高度之类的 ) 等等，由于语法和理论的相通性，我们想尝试让 React-native 的代码也能运行在浏览器，React-native 的社区为我们提供了一种解决方案 [React-native-web](https://github.com/necolas/react-native-web)， 把 RN 的标签 ( 包括标签的 props) 都对应 web 做了一层映射。
有了标签的底层兼容，接下来我们要做的就是组件统一，[nusi-mobile](http://nusi-mobile.terminus.io/zh/docs/INTRODUCTION) 是我们倾力打造的多端 UI 库。现如今市面上端的形态多种多样，Web、iOS、android、小程序等各种平台生态日益繁盛，当业务要求同时在不同的端都要求一致表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。
此外我们还需要做的就是路由层面的统一，我们同样采用了 React-native 社区的方案 React-navigation，确保三端路由的统一。
基于以上几点平台沉淀出一套三端统一的基本框架，并提供三端统一模板工程，基于模板工程能快速构建属于自己的三端统一工程。
