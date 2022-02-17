# Data Service

## API Management

It is used to provide an interface to the outside world, through which the external can access the internal data of the system without changing the source code.

Go to **Data Service > API Management**, click **New API** and fill in the information required.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/6bbe5c0f-fb20-42c8-b48e-3597f411bc19.png)

If you are concerned about data security, you can encrypt the data information in the field configuration.

1. Go to **Data Integration > Field Configuration**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/c3fb3e16-424b-4b3d-8b96-3d02ce17def8.png)

1. Click **New Configuration**.

3. Select the data source and data model.

4. Configure rules.

5. Click **Sure** to save the configuration.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/b92b5058-4028-412b-94eb-c1baa24efd2b.png)

## Consumer Management

You can group the APIs by setting consumers and manage access permissions by authorizing the AccessKey and SecretKey.

1. Go to **Data Service > Consumer Management** to add a consumer.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/60aa2410-e0d2-450f-ba91-db7acbb0b3de.png)

2. Click **Authorization** and select the APIs to be authorized in the pop-up list.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/83e9381d-8d80-439d-b9a0-da03db3574dd.png)

3. Click the consumer name in the list to view the details, copy the AccessKey and SecretKey and provide them to the accessor.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/15/bba59a56-a96b-4ee8-a881-830e7fb4513b.png)