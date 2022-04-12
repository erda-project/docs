# Code Hosting

## Add a Repository

Code hosting on Erda supports both built-in and external Git repositories, which can be selected when creating an application.

Go to **DevOps Platform > Projects > App Center > App > Add Application**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/38699adf-82d0-4b01-b98f-15e3ea615bf0.png)

If you choose external repository, fill in the information such as repository address, username and password.

:::tip Tips

If you choose external repository, the DevOps platform will no longer provide online features such as code browsing, commit history viewing, branch management, and merge requests, while other features such as pipeline and deployments will not be affected.

:::

Once you have finished creating an application, click it to go to the **How to Start** page by default, where you can learn some Git commands.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/b179adec-542b-4c04-8742-0aa2dcd85a3c.png)

Or click the **?** icon in the upper right corner to see the introduction.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/9800fe83-7ca4-4ed7-9286-2196df6ebd5b.png)

## Code Browsing

Go to **DevOps Platform > Projects > App > Source**, and click **Repo Address** in the upper right corner to view the repository address, username and token.

You can use the built-in Git and token to clone code, or the username and password used to log in to Erda.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/0e6dbbfc-6b1f-46fb-897c-9307dd8aa591.png)

## Add a Branch

Click **New Branch** in the upper right corner to create a new branch.

On the **Add Branch** page, you can create branches based on branch, tag, and commit SHA sources.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/73db705b-f6d2-4429-a883-954d3ddd17d2.png)

After creating a branch, click the branch drop-down box to view all branches, and select one to switch.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/332ec3d0-dea5-4ca7-8f03-2757d39223b8.png)

### Add a File and Folder

Click **Add** in the upper right corner to create a new file or folder.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/33198d04-3c31-4e3e-a44f-387933c5c8a6.png)

Fill in the file name, content and submit information, and click **Save**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/0cfc719c-abb3-4b8c-9858-9fc23b743b08.png)

### View File Content

On the file content page, you can view the file content, submitter, and submission history.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/6ac0ed50-58db-4195-a6c4-933ef5300f3a.png)

### Modify and Delete Files

Click the edit and delete icons shown below to modify and delete the file.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/c4fa55a7-4aa4-4dbf-975f-e956523fcf66.png)

### View the Latest Submission

On the source page, you can see the latest submission of the current directory. Click a submission to see its detailed information.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/8bf8ebe6-a717-4c11-9866-66ced6a9e888.png)

## Commit History

Go to **DevOps Platform > Projects > App > Commits**, and you can view the commit history and filter records by branch name or committed message.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/f625d476-8f42-4396-bf92-183489c5e89e.png)

Click a record to view its detailed information, including the changed files and content.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/89f73954-9db3-411d-b553-e74cadf564d9.png)

Click **Single Line** or **Side by Side** in the upper right corner to switch the viewing mode.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/54bcc112-bdaf-4cdf-b17a-0343f5b0c6bc.png)

As shown in the picture, click **...** to view the file content forward and backward.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/10c5a45b-6fd2-48a3-a5ef-b0256f6d4c4e.png)

## Pipeline

Go to **My Application > Select Application > Pipeline**.

The platform supports visualized editing of the pipeline, which can also be triggered after code update. For details, see [Pipeline](../cicd-pipeline/pipeline-yml-graph.md).

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/5c2e37b0-fa2c-4f36-bd0d-3988719b41f0.png)

Click the button below to switch between visualized editing and text editing.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/628839e3-9934-4908-a9e0-69538146a7c4.png)

## dice.yml

The dice.yml file, written in YAML syntax, is a description file for microservice application deployment. For details, see [dice.yml](../reference/dice-yaml.md).

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/22/0ce099b1-239b-48be-b49a-4b9575806cb5.png)
