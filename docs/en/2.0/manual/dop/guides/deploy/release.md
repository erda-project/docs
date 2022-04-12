# Artifact

## Type

Artifacts can be classified from different dimensions.

### Application and Project

An application artifact contains everything you need to deploy an application, including images, dependent addons, and various configuration information.

A project artifact consists of one or more application artifacts in a certain deployment order. When deploying a project artifact, the platform will deploy the application artifacts referenced in that artifact in batches according to the deployment order you define.

### Temporary and Non-Temporary

When an application artifact is created via pipeline, it is a non-temporary artifact if the artifact version or code branch meets one of the following conditions, otherwise, it is a temporary artifact:

- Fill in `tag_version` in the release action.

- The code branch conforms to the following format (i.e., prefixed with `release/` and the suffix meeting the [Semantic Versioning 2.0.0](https://semver.org/) specification).

   ```text
   release/{[v]major version}.{minor version}[.patch version][-pre-release][+build metadata]
   ```

The platform carries out daily garbage collection and collects temporary artifacts and their images that are created 72 hours ago and are not currently referenced, while non-temporary artifacts will not be collected.

When creating a project artifact, only non-temporary artifacts can be referenced, and the project artifact is also a non-temporary artifact.

Go to **DevOps Platform > Projects > App Center > Artifact** to view and manage all non-temporary artifacts under the project.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/07/f9a03394-bc03-44e6-916d-afee3e771908.png)

Temporary artifacts can only be viewed through the release action link on the pipeline where the artifact is created.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/07/651efbe3-ec9f-4694-920f-f00f951a8f49.png)

### Formal and Informal

All artifacts are created as informal and can be converted to formal in **App Center > Artifacts**. The converted artifact is the formal artifact.

Formal artifact means that the artifact is a formal version and cannot be modified (including edited, deleted, or converted).

## Creation
Please complete the cluster setting and branch rule configuration of the project before creating an artifact.

* Go to **DevOps Platform > Projects > Settings > General Settings > Project Info** to set up the cluster.

* Go to **DevOps Platform > Projects > Settings > Files > Branch Rule** to create branch rules.

### Create Application Artifact

Currently, application artifacts can only be created by release action.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/07/9df35d59-832d-4e1b-b3af-769e323e420b.png)

1. Go to **App Center > App > Source**, create a pipeline file, add an action (task type > package and release artifact) and fill in the configuration parameters.

2. Go to **App Center > App > Pipeline**, select the branch and pipeline, click **Add Pipeline**, and execute the pipeline after completing the build.

3. The successful execution of the pipeline means the successful creation of the artifact.

The pipeline will match the branch rules according to the branch and select the artifact deployment environment.

### Create Project Artifact

Project artifacts can be created by selecting application artifacts or uploading files.

Go to **DevOps Platform > Projects > App Center > Artifact > Project Release**, click **New Artifact** in the upper right corner, and select the creation method.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/07/ad36510f-df45-4f7f-9694-04e660d46f25.png)

* **Select Application Artifacts**

   1. Enter the version. The version is a unique identifier of the project artifact under the project, and cannot be duplicated with others, composed of English letters, numbers, underscores (_), hyphens (-), and periods (.).

   2. Select application artifacts (which need to be created in advance under the application of this project). You can group application artifacts. During deployment, application artifacts in the same group are not sequential, and that in different groups are deployed according to the numbering order.

      For example, if application artifact A depends on application artifact B, then you can set B as the first group and A as the second, so that B will be deployed before A. In addition, artifacts under the same application cannot be selected repeatedly.

   3. Fill in the content. It is a description of the project artifact, which can be a changelog or remarks, and supports markdown syntax.

   4. Click **Submit** to complete the project artifact creation.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/07/367eed49-8dc2-4467-81c2-59fa09ad7a5d.png)

* **Upload Files**

   This method is used to meet the scenario of importing project artifacts from one project to another. If you choose to upload a file, you need to download the project artifact package (in ZIP format) to the local (see [Download](#Download) for details) in advance, and then upload the file to the target project.

   The platform will automatically resolve the version of the project artifact and the information of related application artifacts.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/07/774560a5-17b1-42f4-a8d2-d45df69aa0b8.png)

   :::tip Tips

   * The application corresponding to the application artifact referenced in the uploaded project artifact must exist in the project, otherwise, the upload will fail.
   * If there is no application artifact referenced by the uploaded project artifact in this project, the platform will automatically create an application artifact based on the artifact package. If an application artifact with the same version already exists, it will be referenced directly rather than create a new one. If the dice.yml of the application artifact in the artifact package is different from that of the existing application artifact with the same name, the former will be ignored.

   :::

## Operations

On the artifact page, you can perform operations such as delete, download, edit, and more.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/07/368cb634-414a-4e44-a208-d341ec7c2b19.png)

Informal artifacts support batch operations of conversion to formal version and deletion.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/07/fefd1df3-013e-4afc-955b-4ec2f422a9ef.png)

### Delete

* **Application artifact**

   The application artifact to be deleted must meet the following conditions:

   * No runtime deployed by the application artifact.
   * Not referenced by any project artifact.
   * The application artifact is informal.

   When an application artifact is deleted, its image will also be deleted from the image repository.

* **Project artifact**

   Informal project artifacts can all be deleted.

### Download

For project artifacts only.

Click **Download** and you will get a ZIP file containing information about the project artifact and the application artifact it references. You can upload the artifact package in another project environment on the platform to create a new project artifact.

### Edit

For non-temporary and informal artifacts only.

* **Application artifact**: Version and content are editable.
* **Project artifact**: Version, application artifact, and content are editable.

### Convert to Formal

For non-temporary and informal artifacts only.

Once an application artifact or project artifact is converted to formal, it cannot be modified (including edited, deleted, or converted).

If a project artifact is converted to formal, its referenced informal application artifacts will also be automatically converted formal.

### View Referenced Artifacts

For project artifacts only.

When you click **Referenced Releases**, the page will jump to application artifact and show all application artifacts referenced by the project artifact.
