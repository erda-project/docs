# 数据大盘系统(Metrics Dashboard)
## 背景
在可配置大盘还没诞生的时候，每一个需要展示数据的页面都需要定制化开发，然而需求是经常会变化的，显而易见这样的方式并不灵活，随时定制图表的时候就无法满足了。数据大盘系统就是解决这样的问题，前端和后端的底层实现都能够统一用一种方式来实现，并且能够提供给用户自定义图表页面的功能。

• 统一平台上的所有图表<br>
• 可供用户灵活的自定义数据视图

## 引导

### 1.进入运维大盘列表

> 微服务治理平台->运维大盘

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/14/8b61c388-ba97-4635-8363-bec846d91160.png)

### 2.进入大盘编辑器页面
点击新建运维大盘，进入编辑模式，点击右上角的+号，选择图表类型

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/14/5c4db078-cd81-4543-8d26-c499a684b3f9.png)

### 3.进入图表编辑器页面
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/14/d59814a3-5d12-4598-8c50-9fafcf42d1a9.png)

左侧通用项目可以输入图表的名称，简介等

### 4.数据源配置

指标分组——指标的数据源 选择HTTP请求-所有HTTP请求
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/14/e310d890-4eee-4626-8365-2bcb65e8922d.png)

维度——依据选定条件或者字段分组  选择添加指标-时间，点击添加好的tag-时间配置进入，如图所示
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/14/ccfb3328-faf5-484c-b6b4-35994ce867aa.png)

结果筛选器
固定图表时间范围——本周

### 5.保存返回
右下角确认保存返回大盘编辑器，查看大盘预览，鼠标悬浮到柱状图上，可以显示详细信息

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/14/2c96024e-65bf-4b44-a90c-5053eacf35ac.png)

输入大盘名称和描述后，点击保存，即可保存，随时查看
![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/04/14/dc7bb892-228e-4e5b-9c04-81a7965ca452.png)

## 概念

### 基础指标
机器<br>
平台资源<br>
项目资源<br>
云产品<br>
日志指标<br>
其他指标<br>
### 应用指标
Java<br>
NodeJS<br>
HTTP请求<br>
RPC请求<br>
数据库请求<br>
缓存请求<br>
消息队列请求<br>
日志指标<br>
自定义指标<br>

### 图表类型

折线图/面积图 <br>
• 关注指标的变化趋势

柱状图<br>
• 反映数值的差异，易解读

饼图<br>
• 反映某个部分占整体的比重

漏斗图<br>
• 适用于业务流程比较规范、周期长、环节多的流程分析，通过漏斗各环节业务数据的比较，能够直观地发现和说明问题所在

地图 <br>
• 关注指标的分布情况，如不同省份的响应延迟时间

卡片图<br>

表格<br>
• 可用自定义表达式配置，满足更多复杂查询

### (进阶)表达式
配置表达式是在表单配置无法满足的情况下，退而求其次的一种方式。<br>
配置表达式意味着需要对数据的字段和类型有一定的了解。

这里也稍微介绍一下表达式的配置。
指标查询实现的是一种时序数据查询语言 influxql，是一种类SQL的语法，一个完整的表达式如下：

``` SQL
SELECT 
	[表达式 AS 别名, ...]
FROM 指标名
WHERE 过滤条件
GROUP BY [表达式, ...]
ORDER BY [表达式 DESC, ....]
LIMIT 限制数据量;
```

```SQL
SELECT 
    field1::field,
    tag1::tag, others AS alias 
FROM metric_name // 指标名
WHERE 
    tag2::tag='xxx' AND field2::field>100
GROUP BY host_ip::tag
ORDER BY field3::tag DESC
LIMIT 100;
```

其中，除了 SELECT 和 FROM，其他部分都是可选的。

表达式支持基本的四则运算，支持一些内置的处理函数。
