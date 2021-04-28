# 移动端环境搭建

## Mac 机器环境搭建

### node , watchman 安装

- 推荐使用 [Homebrew](https://brew.sh/index_zh-cn) 来安装 node 及 watchman
```bash
brew install node
brew install watchman
```


注意：node 无需最新版本，建议 12.*  稳定版本即可


### android 环境搭建
#### 1. android studio 配置
为了方便 Android 开发环境的搭建，建议直接下载 [android studio](https://developer.android.com/studio/)。Android studio 内集成 Java、adb 及模拟器等常用工具。
完成上述安装后还需要进行一些环境变量的配置，具体配置方法如下：

- **java_home 环境变量配置**

![](https://cdn.yuque.com/lark/0/2018/png/114906/1530783610538-535208fd-1ede-4e2b-9f66-fb9a8a72d2f0.png#align=left&display=inline&height=273&margin=%5Bobject%20Object%5D&originHeight=1242&originWidth=1986&status=done&style=none&width=436)
![](https://cdn.yuque.com/lark/0/2018/png/114906/1530783817233-997e417f-3063-4dac-96b7-9ea3e6b7b4b7.png#align=left&display=inline&height=120&margin=%5Bobject%20Object%5D&originHeight=460&originWidth=1970&status=done&style=none&width=512)
将此路径配置在启动项里面。如 .bash_profile 文件

```bash
export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jre/jdk/Contents/Home
```


- **adb 配置及 Android SDK 下载**

  打开 Android studio 查看 android sdk  配置路径。
  ![](https://cdn.yuque.com/lark/0/2018/png/114906/1530784121137-c2be1c6e-442b-457e-b775-c770f0c691a8.png#align=left&display=inline&height=437&margin=%5Bobject%20Object%5D&originHeight=638&originWidth=784&status=done&style=none&width=537)


![](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/114906/1592200671338-e191d80d-02c8-40c2-919d-d5902288aa3b.png#align=left&display=inline&height=407&margin=%5Bobject%20Object%5D&name=image.png&originHeight=722&originWidth=982&size=445207&status=done&style=none&width=553)


需要勾选 android 9.0，即 API Level 为 28, android 10.0 即 API Level 为 29


adb 等工具就在 sdk location 路径的 platform-tools 文件夹中。可以将此路径配置到启动项中。方便直接执行 adb 等命令
```bash
export PATH=$PATH:/Users/yhrun/workspace/Android/IDE/sdk/platform-tools
export ANDROID_HOME=/Users/yhrun/workspace/Android/IDE/sdk
```


- android studio 自带模拟器使用


![](https://cdn.yuque.com/lark/0/2018/png/114906/1530785457379-74789e4f-a1ef-4095-89c0-ac36b92045c9.png#align=left&display=inline&height=416&margin=%5Bobject%20Object%5D&originHeight=789&originWidth=1418&status=done&style=none&width=747)
![](https://cdn.yuque.com/lark/0/2018/png/114906/1530785517853-49f38226-ff3c-4ea1-a497-16118c57c30b.png#align=left&display=inline&height=495&margin=%5Bobject%20Object%5D&originHeight=662&originWidth=1000&status=done&style=none&width=747)


创建成功后，可以在模拟器管理页面双击已经创建好的模拟器，就可以直接启动。


也可以使用 [Genymotion](http://www.genymotion.net/) 模拟器，速度比较快。


### ios 环境
#### 1.Xcode 下载
建议 Xcode 最新版本，即11.0以上.


#### 2. 注意事项

1. 当开发环境是 mac 的时候，不需要特殊配置。只需要安装 cocoapods，建议版本 1.4.0 及以上版本
```basic
sudo gem install cocoapods --version 1.4.0
```

 gem 说明：mac 自带 gem：[https://rubygems.org/](https://rubygems.org/)
如果需要安装其他版本，可以采用以下方式进行操作

```basic
//1. 删除历史版本（可选：如没安装过可忽略）
gem list cocoapods 查询当前安装的版本，示例可能结果如下：
 /**
  cocoapods (1.5.3)
  cocoapods-core (1.5.3, 1.5.0, 1.4.0)
  cocoapods-deintegrate (1.0.2)
  cocoapods-downloader (1.2.1, 1.1.3)
  cocoapods-plugins (1.0.0)
  cocoapods-search (1.0.0)
  cocoapods-stats (1.0.0)
  cocoapods-trunk (1.3.0)
  cocoapods-try (1.1.0)
*/

gem uninstall cocoapods -v 1.5.3 卸载历史版本号
gem uninstall cocoapods-core -v 1.5.3 如有cocoapods残留组件，也需要删除
..

//2. 安装cocoapods
sudo gem install cocoapods --version 1.4.0
```


ruby 版本需要 2.2.0 以上


#### 3. xcode 10 特殊处理如下
仅 xcode 10 版本需要配置此项内容，如果升级至更高版本则无需此项配置，可跳过。

- lstdc++ 库问题，解决方式如下:
```
//将 libstdc++.6.0.9.tbd 文件放入一下目录中
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS.sdk/usr/lib
```

- xcrun 工具生成 ipa 包问题
```
// 将 PackageApplication 放入一下目录中
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin
```


详细安装攻略见 RN 官网配置：

1. 中文网：[https://reactnative.cn/docs/getting-started.html](https://reactnative.cn/docs/getting-started.html)

1. 官网：[https://facebook.github.io/react-native](https://facebook.github.io/react-native/)




## window 机器环境配置

由于 ios 开发必须 macOS 系统环境中进行。因此 window 环境下只提供了 Android 环境配置说明。

### Android 环境配置

[官网](https://developer.android.com/studio/)下载 exe 安装包

#### 1. jdk 配置
[jdk配置参考](https://www.cnblogs.com/liuhongfeng/p/4177568.html)


#### 2. node 配置
官网下载 12.10.* 版本进行安装。[下载链接](https://nodejs.org/download/release/v12.10.0/)
![](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/114906/1592203354082-ca647b98-3d75-4834-99e6-013e471e0c3b.png)根据系统选择对应的版本。

安装后通过命令行检查是否安装成功
![](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1548294416168-4016f5ac-a7e6-42ea-a04b-a28dc255feb1.png#align=left&display=inline&height=233&margin=%5Bobject%20Object%5D&originHeight=233&originWidth=665&status=done&style=none&width=665)


#### 3. 下载 Android studio 并安装
[官网教程](https://developer.android.com/studio/install)


安装之后下载 SDK


![](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1548294427374-d94279e5-1c16-469a-8cae-2f63c74a1fa4.png#align=left&display=inline&height=549&margin=%5Bobject%20Object%5D&originHeight=702&originWidth=1058&status=done&style=none&width=827)

在有些 Windows 系统中，启动器脚本无法找到 JDK 的安装位置。如果您遇到此问题，您需要设置指示正确位置的环境变量。
选择 **“Start” 菜单 > Computer > System Properties > Advanced System Properties**。然后打开 **“Advanced” 选项卡 > Environment Variables**，添加指向您的 JDK 文件夹位置（例如 `C:\Program Files\Java\jdk1.8.0_77`）的新系统变量 `JAVA_HOME`。


#### 4. Android 常用命令配置 :adb 等
获取 SDK 目录。参考上边 Android 配置，在 Android studio 配置属性中找到 Android sdk Location 对应的路径。
然后参考[文档](https://www.cnblogs.com/cnwutianhao/p/6557571.html)配置 adb 等常用命令行工具


![](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/114906/1548294442163-0e296776-4319-45ca-b206-59f9446fb42d.png#align=left&display=inline&height=487&margin=%5Bobject%20Object%5D&originHeight=673&originWidth=1144&status=done&style=none&width=827)




#### window Android配置注意问题

- 检查环境变量是否已经配置

- 如果提示 local.properties 文件未找到，在项目 android 目录下执行 echo sdk.dir=SDK 路径 > local.properties. 配置时注意路径
