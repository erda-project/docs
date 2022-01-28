# Artifact

## Create Artifact
Please complete the cluster setting and branch rule configuration of the project before creating an artifact.

* Go to **DevOps Platform > Joined Projects > Settings > General Settings > Cluster Settings** to set up the cluster.

* Go to **DevOps Platform > Joined Projects > Settings > Files > Branch Rule** to create branch rules.

Currently artifacts can only be created by release action.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/7726659c-67d9-432e-9b0f-f193266ab9f9.png)

1. Go to **DevOps Platform > Joined Projects > Applications > Files > Source**, create a pipeline file, add actions (task type > package and release artifact) and fill in the configuration parameters.

2. Go to **DevOps Platform > Joined Projects > Applications > Pipeline**, select the branch and pipeline, click **Add Pipeline**, and execute the pipeline after completing the build.

3. The successful execution of the pipeline means the successful creation of the artifact.

The pipeline will match the branch rules according to the branch and confirm the artifact deployment environment.

## View Artifact

Go to **DevOps Platform > Joined Projects > Applications > Artifact Management** and search for artifacts by branches or keywords.

After selecting an artifact, you can view its information including the cluster, branch, application, creator, operator, creation time, submission ID, and erda.yml.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/23b0e5ce-7f9a-44a5-adc8-ccc5b56ed147.png)

## Update Artifact

Only the artifact description can be edited, and the rest of the information cannot be modified.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/dcc28e3a-1066-4f5f-a4e0-35a0c7486efe.png)

## Delete Artifact

The erda.yml defines the Docker image information referenced by the artifact and the artifact expiration time is determined by the environment variable RELEASE_MAX_TIME_RESERVED, which is 3 days by default.

The cluster will search for undeployed artifacts that have expired and have an empty version at midnight every day, and delete the Image information stored in the artifact. If the artifact image is not used by other artifacts, it will delete the image manifest, and then delete the artifact.
