# Project Management
This guide shows you how to manage the lifecycle of a requirement from design to release on the DevOps platform.

Assuming that there is a project named "Mall System", with roles of project manager, product manager, project leader, test engineer, front-end engineer, back-end engineer, etc., to achieve the requirement of registration, logout, update and viewing for users within one week. Then the iteration can be divided into the following stages:
1. Requirement analysis
2. Development
   * Task distribution
   * API design
   * Programming
3. Testing
4. Release
5. Monitoring
6. Iteration quality

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/d137fab5-d250-430e-a185-6c303bb2e9f4.png)

## Requirement Analysis
Go to **DevOps Platform > Projects > Select Project > Project collaboration**, add an iteration named "Iteration-1.0" with time of one week. The requirements, bugs and tasks created subsequently will be managed in this iteration.

For more information on iterations, requirements, tasks and bugs, see [Efficient Collaboration](../concepts/agile-info.md).

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/ff18a20a-c658-432b-b06d-dcfffab3856e.png)

The product manager creates a requirement named "User System" and puts it into "Iteration-1.0", then completes the requirement description, design and other information.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/7b377ea6-2f8f-4eba-8f9a-60414f141933.png)

Add a task named "Requirements Review" and relate it to the requirement "User System" (all relevant issues created later will be related to the requirement), conduct a requirements review online or offline with developers and test engineers to discuss its rationality, complexity and workload. The review details will be recorded in the description or remark of the task for later viewing.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/df1b33f4-ac51-4def-8f28-54137b024943.png)

## Development
After requirement analysis, it is time for development, test case design and review.

### Task Distribution
The project leader distributes tasks and assigns them to developers, for example, assign task of user adding and deleting to developer A, assign task of user modification and search to developer B.

The test engineer creates tasks of test case writing and test case review, assigns tasks and writes test cases. For details, see [Test Case](../best-practices/manual-test.md#test-case).

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/916fb132-1260-4bdc-b87c-74cf11e58f87.png)

### API Design
The back-end engineer goes to **My Application > API Design**, follows the API First principle and defines the APIs involved in the development by [API Design](../guides/api/api-design.md).

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/7c3cb460-c0e5-43e8-8a38-0126beadef09.png)

### Programming
The front-end and back-end developers finish programming, merge the code into the main branch, and deploy it to the test environment via CI/CD.

## Testing

### Smoke Testing
The test engineer creates a task of "Smoke Testing" and assigns it to the corresponding developer.

The developer runs smoke testing in the test environment according the test cases, fixes bugs occur in the process until the pass rate reaches 100%, then marks the task as finished.

### System Testing
The test engineer creates a task of "Testing Round One" for himself, and then runs testing according to the test cases.

1. If a bug occurs during testing, the test engineer marks the test case as failed, creates an issue of bug and assigns it to the developer.
2. The developer fixes the bug, marks it as resolved and transfers it back to the test engineer for testing.
3. The test engineer marks the bug as closed if the test passes and transfers it back to the developer.
4. The test engineer marks the testing task as finished when the pass rate reached 100%.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/78ed7733-463b-483c-8c23-5df64f35c6fd.png)

### Bug Tracking
Filter by "Iteration-1.0" on the **Bug** page to view the status and information of all bugs in the current iteration.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/ec4e4024-a588-4c4d-b898-e0a7cea2bdfa.png)

Developers will transfer bugs according to the following process. When the bug is marked as resolved and transferred to the test engineer, it is recommended to relate the MR that fixes the bug for later tracking.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/4d1bdd8b-527a-43f8-a592-78f1e3fe272a.png)

## Release
When all the issues in the iteration are completed, deploy the v1.0 version to the production environment via CI/CD.

It can be rolled back to the previous version with one click if any serious issue occurs.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/abb0b023-2c20-4ba6-8fd5-8db8b788d77d.png)

## Monitoring
After the application is online, go to **DevOps Platform > App Center > Environments > Service Plugin > Application Monitoring**, to check whether the application is working normally. For details, see [Global Topology](../../msp/guides/apm/topology.md).

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/16bc0912-0fff-4dbe-b71d-af0205d7bcd6.png)


## Iteration Quality
The project manager can go to **DevOps Platform > Projects > Select Project > Efficiency Measure** to view bug information such as distribution and trend.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/dae969ff-9a38-4387-a4af-4c7ac4b2f475.png)

View the overall progress of the iteration on the **Project Collaboratin > Sprint** page, or check the details of specific issues by different Kanbans, to adjust the iteration schedule timely.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/17/d86e1ce1-cc83-4eeb-9c8e-8160f2149b03.png)

