# Service Exception Alarm and Diagnosis

## Exception Alarm Configuration

If you want to receive alarms when exception of frequent requests occurs, try the built-in alarm strategies of Erda monitoring, which provides out-of-the-box alarm rules of application error, application transaction and more.

Go to **Microservice Platform > Alert Center > Alert Config > Alarm Strategy > New Strategy**, and configure as needed.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/736afbdb-e316-4401-bfb3-aad494b58554.png)

## Diagnosis

You can use Erda monitoring for exception diagnosis in the following ways.

### View Logs via Container Log

The most direct way is to view the log. Find the corresponding log by container log for troubleshooting.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/24/57f13ea6-2b9c-4735-ac6b-29c6806f8142.png)

### Diagnose Exceptions via Error Analysis

View errors on the error analysis page.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/e399b962-314c-4e03-9c52-cb57f4b6661f.png)

Find trace ID on the error details page and view the detailed information in tracing analysis.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/5bd01e37-4f74-4c2a-9fb9-c9a5ba6307cd.png)

### View Traces via Tracing Analysis

On the tracing analysis page, filter traces by status and view the detailed information.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/14/c5ea8dce-7a11-40ab-b2b6-39836672f7eb.png)
