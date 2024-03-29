# 数据服务

## 概述

数据服务旨在为企业搭建统一的数据服务总线，帮助企业统一管理API服务。数据服务为您提供快速将数据表生成API的能力，同时支持您进行统一的管理和发布。数据清洗，萃取处理后的数据，可以以数据服务的形式将数据提供业务系统，或赋予数据报表、可视化大屏等多种数据应用数据能力，供业务人员使用及展示与分享大数据分析、处理后的成果。

## 新增 API 管理

**操作步骤：**

1. 选择数据服务平台->API管理，点击右上角进行新增API。
2. 填写新增API名称、路径、请求方式等基础信息，填写完成后点击下一步进行参数配置。

3. 进入参数填写页面，对API数据源，数据模型，字段等参数进行配置。

4. 参数填写完毕后，点击一下步，进行相关值配置。

5. 上述步骤配置完成后，点击开始测试，可查看返回结果。

6. 最后点击确认按钮，完成新建API。

7. 已完成创建的API，可在下方列表中，进行发布，编辑等管理。

| **步骤**   | **参数**                                 | **说明**                           | **是否必填项** |
| ---------- | ---------------------------------------- | ---------------------------------- | -------------- |
| 步骤一     | API类型                                  | 平台默认选项                       | 是             |
| 配置模式   | 选择向导模式/脚本模式                    | 是                                 |                |
| API名称    | API名称                                  | 是                                 |                |
| API路径    | API路径（命名以斜线/开始）               | 是                                 |                |
| API描述    | API描述                                  | 否                                 |                |
| 请求方式   | 目前平台仅支持GET                        | 是                                 |                |
| 返回类型   | 目前平台仅支持JSON                       | 是                                 |                |
| 步骤二     | 选择数据源                               | 访问数据所在数据源，与命名空间对应 | 是             |
| 选择数据表 | 访问数据所在数据源下的数据表             | 是                                 |                |
| 输入参数   | 对参数进行命名、选择操作符对数据进行过滤 | 是                                 |                |
| 输出参数   | 选择API所需返还的参数及填写参数说明      | 是                                 |                |
| 步骤三     | 值                                       | 填写对数据进行过滤值               | 是             |

8. 演示操作。

![img](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/329178/1629787666535-51ec567a-f6b2-4aeb-9323-ecf9cf0f365d.gif)

## 调用方管理

**操作步骤：**

1. 选择数据服务平台->调用方管理，点击右上角进行新增调用方。

2. 输入调用方名称，点击确定。

3. 已创建的调用方，可在下面列表进行授权、编辑等操作管理。

4. 点击授权，勾选所要进行授权的API，点击确认按钮，也可在调用方中点击添加按钮，进行API授权。

5. 通过授权AccessKey和SecretKey的方式，控制API的访问权限。

6. 演示操作。

![img](https://intranetproxy.alipay.com/skylark/lark/0/2021/gif/329178/1629787701216-06093c39-cab2-4398-b901-5af802b0e163.gif)

