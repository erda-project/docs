# Unified Data Service

After data integration, it is necessary to provide services to the upper-level BI application and to the outside world. Data service aims to build a unified data service bus for enterprises to help them manage API services in a unified manner, which can quickly generate APIs from data tables and support unified management and release of APIs.

## API Management

1. Go to **Data Service > API Management**, click **New API** and fill in the information required.

2. Complete the basic information (including API name, path, request method, etc.), parameter configuration (API data source, data model, fields, etc.) and related value configuration.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/1f653efd-2a02-4cca-bad1-1fb6198c8735.png)

   <table>
      	<tr>
      	    <th>Parameter</th>
      	    <th>Description</th>  
            <th>Required</th>  
      	</tr >
      	<tr >
      	    <td>API type</td>
      	    <td>Default option provided by the platform</td>
            <td>Yes</td>
      	</tr>
      	<tr>
      	    <td>Setting mode</td>
      	    <td>Select wizard mode or script mode</td>
            <td>Yes</td>
      	</tr>
      	<tr>
      	    <td>API name</td>
      	    <td>Name the API</td>
            <td>Yes</td>
      	</tr>
      	<tr>
      	    <td>API path</td>
      	    <td>API path (starts with /) </td>
            <td>Yes</td>
      	</tr>
      	<tr>
      	    <td>API description</td>
      	    <td>Describe the API</td>
            <td>No</td>
      	</tr>
        <tr>
      	    <td>Request method</td>
      	    <td>Currently only supports GET</td>
            <td>Yes</td>
      	</tr>
        <tr>
      	    <td>Response type</td>
      	    <td>Currently only supports JSON</td>
            <td>Yes</td>
      	</tr>
        <tr >
      	    <td>Choose data source</td>
      	    <td>Access the data source where the data is located</td>
            <td>Yes</td>
      	</tr>
        <tr>
      	    <td>Choose data table</td>
      	    <td>Access the data table under the data source where the data is located</td>
            <td>Yes</td>
      	</tr>
        <tr>
      	    <td>Input parameters</td>
      	    <td>Name the parameter, and select the operator to filter the data</td>
            <td>Yes</td>
      	</tr>
        <tr>
      	    <td>Output parameters</td>
      	    <td>Select the parameters to be returned for the API and description</td>
            <td>Yes</td>
      	</tr>
        <tr >
      	    <td>Value</td>
      	    <td>Filter value</td>
            <td>Yes</td>
      	</tr>
      </table>


2. Click **Start Testing** to see its returned results.

6. Click **Sure** to complete the API creation.

7. After the API creation, you can perform operations such as publishing and editing on the API management page.

## Consumer Management

1. Go to **Data Service > Consumer Management** and click **Add Caller**.

2. Enter the caller name and click **OK**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/16/da93f117-411e-4293-9110-09af7a71da7f.png)

3. After the consumer creation, you can perform operations such as authorization and editing on the consumer management page.

4. Click **Authorization**, check the API to be authorized and click **OK**, or click **Add to** in the caller details for API authorization.

5. Manage API access by authorizing the AccessKey and SecretKey.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/bba59a56-a96b-4ee8-a881-830e7fb4513b.png)

