# 统一化数据服务

完成数据集成后，需对上层 BI 应用及对外提供服务。数据服务旨在为企业搭建统一的数据服务总线，帮助企业统一管理 API 服务，可快速将数据表生成 API，同时支持 API 的统一管理和发布。

## API 管理

1. 进入 **数据服务 > API 管理**，点击 **新增 API**。

2. 完成基础信息填写（包括 API 名称、路径、请求方式等）、参数配置（API 数据源、数据模型、字段等）以及相关值配置。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/9ae7c17a-8737-4a5f-a586-f2aa99be09aa.png)

   <table>
   	<tr>
   	    <th>参数</th>
   	    <th>说明</th>  
         <th>是否必填</th>  
   	</tr >
   	<tr >
   	    <td>API 类型</td>
   	    <td>平台默认选项</td>
         <td>是</td>
   	</tr>
   	<tr>
   	    <td>配置模式</td>
   	    <td>选择向导模式/脚本模式</td>
         <td>是</td>
   	</tr>
   	<tr>
   	    <td>API 名称</td>
   	    <td>API 名称</td>
         <td>是</td>
   	</tr>
   	<tr>
   	    <td>API 路径</td>
   	    <td>API 路径（命名以 / 开始）</td>
         <td>是</td>
   	</tr>
   	<tr>
   	    <td>API 描述</td>
   	    <td>API 描述</td>
         <td>否</td>
   	</tr>
     <tr>
   	    <td>请求方式</td>
   	    <td>当前仅支持 GET</td>
         <td>是</td>
   	</tr>
     <tr>
   	    <td>返回类型</td>
   	    <td>当前仅支持 JSON</td>
         <td>是</td>
   	</tr>
     <tr >
   	    <td>选择数据源</td>
   	    <td>访问数据所在数据源</td>
         <td>是</td>
   	</tr>
     <tr>
   	    <td>选择数据表</td>
   	    <td>访问数据所在数据源下的数据表</td>
         <td>是</td>
   	</tr>
     <tr>
   	    <td>输入参数</td>
   	    <td>命名参数，选择操作符过滤数据</td>
         <td>是</td>
   	</tr>
     <tr>
   	    <td>输出参数</td>
   	    <td>选择 API 所需返还的参数及说明</td>
         <td>是</td>
   	</tr>
     <tr >
   	    <td>值</td>
   	    <td>过滤值</td>
         <td>是</td>
   	</tr>
   </table>

2. 点击 **开始测试**，可查看其返回结果。

6. 点击 **确认**，完成 API 创建。

7. 完成创建后，可在 API 管理页面进行发布、编辑等操作。

## 调用方管理

1. 进入 **数据服务 > 调用方管理**，点击 **新增调用方**。

2. 输入调用方名称，点击 **确定**。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/f0b74ae2-6511-4832-8757-02e5961cd3d3.png)

3. 完成创建后，可在调用方管理页面进行授权、编辑等操作。

4. 点击 **授权**，勾选需授权的 API，点击 **确认**，或在调用方详情中点击 **添加**，进行 API 授权。

5. 通过授权 AccessKey 和 SecretKey 控制 API 的访问权限。

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/cf1a04af-9e2c-4e43-84ef-5dc28c9195c8.png)

