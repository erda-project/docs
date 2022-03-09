# Gitflow

Gitflow, the Git workflow first published and made popular by Vincent Driessen at [nvie](http://nvie.com/posts/a-successful-git-branching-model/), is now considered best practice for continuous software development and DevOps practices. It defines a strict branch model designed for project release, which is suitable for projects with a scheduled release cycle and continuous delivery.

An example of standard Gitflow is as follows:

<img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/63182c72-d730-4690-8d09-bc1d8959a137.png" style="zoom:50%;" />

The overall flow of Gitflow is as follows:
1. A develop branch is created from master.
2. A release branch is created from develop.
3. Feature branches are created from develop.
4. When a feature is complete it is merged into the develop branch.
5. When the release branch is done it is merged into develop and master.
6. If an issue in master is detected a hotfix branch is created from master.
7. Once the hotfix is complete it is merged to both develop and master.

## Develop/Master Branch

<img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/5ba6cca2-d6ac-42b0-839a-22550cc963ee.png" style="zoom:80%;" />

Gitflow uses two branches to record the history of the project. The master branch stores the official release history, and the develop branch serves as an integration branch for features. The develop branch interacts with each feature branch as the completed feature is integrated into develop, and new branch is branched off of develop for new features.

It's also convenient to tag commits in the master branch with a version number and then release to the production environment.

## Feature Branch

<img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/b7400cec-f674-4814-9821-d8574ab4591d.png" style="zoom:80%;" />

Each new feature should reside in its own branch.

Feature branches are generally created off to the latest develop branch. When a feature is complete, it gets merged back into develop. Features should never interact directly with master.

## Release Branch

<img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/7d73a92b-a5f4-4687-86e2-b16456ab8235.png" style="zoom:80%;" />

Once develop has acquired enough features (or a predetermined release date is approaching), it is time for a release. Fork a release branch off of develop, which indicates the end of this release cycle and starts the next release cycle. Then no new features can be added after this point.

Only bug fixes, documentation generation, and other release-oriented tasks should go in this branch.

For bugfix on the release branch, a new branch should be branched off and get merged into release and develop after the bug is fixed and verified.

Once it's ready to ship, the release branch gets merged into master and tagged with a version number.

## Hotfix Branch

<img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/08/02/ce4125be-7826-4fd0-987b-d5db9a51c705.png" style="zoom:80%;" />

Hotfix branches are used to quickly patch production releases. When a bug occurs, a hotfix branch is forked off of main. As soon as the fix is complete, it should be merged into both master and develop, and master should be tagged with an updated version number.

