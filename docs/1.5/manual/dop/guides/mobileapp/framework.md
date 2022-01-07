# 三端统一框架

React Native 提供了一系列标签，例如 View、Image、ScrollView、Text 等，以及 API，例如 Platform.OS（用于判断当前系统为 iOS 或 Android）、Dimensions（可获取当前屏幕尺寸信息）等。鉴于语法和理论的相通性，为实现 React Native 的代码运行于浏览器，平台采用 React Native 社区提供的解决方案 [React Native Web](https://github.com/necolas/react-native-web)， 为 React Native 标签（包括标签的 Props）对应的 Web 建立一层映射。

完成标签的底层兼容后，下一步即实现组建统一。[Nusi Mobile](http://nusi-mobile.terminus.io/zh/docs/INTRODUCTION) 是端点倾力打造的多端 UI 库。当前市面上端的形态多种多样，Web、iOS、Android、小程序等各类平台生态日益繁盛。当业务要求不同的端均表现一致时，针对不同的端编写多套代码将耗费巨大成本，此时编写一套代码即可适配多端的能力显得尤为重要。

此外还需保持路由层面的统一。为此平台同样采用 React Native 社区提供的方案 React Navigation，以确保三端路由的统一。

由此，平台沉淀出一套三端统一的基本框架，同时提供三端统一模板工程，您可以基于该模版快速构建属于自己的三端统一工程。

