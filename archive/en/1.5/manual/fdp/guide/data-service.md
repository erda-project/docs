# Data Service

## API Management

It is used to provide an interface to the outside world, through which the external can access the internal data of the system without changing the source code.

Go to **Data Service > API Management**, click **New API** and fill in the information required.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/64cbf7ba-8fe8-416c-9a09-810bd3ecd7ae.png)

If you are concerned about data security, you can encrypt the data information in the field configuration.

1. Go to **Data Integration > Field Configuration**.

2. Click **New Configuration**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/b35a0288-07e6-438e-b978-149125077947.png)

3. Select the data source and data model.

4. Configure rules.

5. Click **OK** to save the configuration.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/f4cad33b-b6be-4070-b2b6-2f7cbf5acacb.png)

## Consumer Management

You can group the APIs by setting consumers and manage access permissions by authorizing the AccessKey and SecretKey.

1. Go to **Data Service > Consumer Management** to add a consumer.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/10720443-aded-4350-a263-fa73e47c4fcc.png)

2. Click **Authorization** and select the APIs to be authorized in the pop-up list.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/55e1a131-1423-4061-97b3-4e3096954453.png)

3. Click the consumer name in the list to view the details, copy the AccessKey and SecretKey and provide them to the accessor.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/17/b364a9ec-066c-40d6-ba58-a14beae88b35.png)