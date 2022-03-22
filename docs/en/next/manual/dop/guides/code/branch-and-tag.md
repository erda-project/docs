# Branch and Tag Management

## Branches

The built-in code repository supports branch management.

Go to **My Application > Select Application > Branch**. The repository takes the first branch pushed as default branch by default, which is the target branch for creating a merge request. Click **...** to modify.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/87e8562e-9fed-4105-b117-2083a4e7cde5.png)

## Delete Branch

Click **Delete** to delete branches and the default branch cannot be deleted.

## Branch Comparison

Click **Compare** to compare the differences between two branches, based on **source** or **target branch**. View the commit history of the branch on the current page.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/d679f273-261f-4044-bcd1-fa814f6547ab.png)

Or view the differences of changed files.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/717c511b-ac29-467e-b431-1dd157032382.png)

## Branch Rule for Project

The platform manages branches and environments strictly, with four built-in deployment environments: DEV, TEST, STAGING and PROD. It provides built-in configurations of best practices and also supports customization. For more information on branch management, see [Gitflow](../../concepts/gitflow.md).

You can set deployment environments for pipeline and artifact here.

Go to **DevOps Platform > Projects > Settings > Files > Branch Rule** to set environments.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/8994d122-e2a4-4721-804c-01c9c4d648b9.png)

## Branch Rule for Application

The branch rules for application are set for branch protection and continuous integration. Please set as needed.

* Continuous integration: Triggered by code change.

* Branch protection: Once enabled, only the application owner and leader can operate, and other members need to submit codes by MR.

Go to **My Application > Select Application > Setting > Repository > Branch Rule** to add rules.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/afdaa764-c777-4ed2-9776-fdc02f7f654c.png)

## Tags

The built-in code repository supports tag management, and the source code package can be downloaded on the tag page.

Go to **My Application > Select Application > Branch > Tags**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/387fa956-d553-4319-afeb-8a39cae8b8e4.png)

Click **Add Label** in the upper right corner and select source type of Branch or commit SHA.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/6c34227e-0563-47c7-a213-e0a141ef8b26.png)

