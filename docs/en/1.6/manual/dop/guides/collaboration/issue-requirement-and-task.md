# Requirement & Task

Requirements and tasks are both issues. For more information on issues, see [Issue](issue.md).

## Requirement

Requirements are user stories, that is to describe the functions user need. A good user story contains the following elements:

* **Role**: Who needs the function.
* **Activity**: What function needs to be achieved.
* **Business value**: Why the function is needed and what value it brings.

User stories are usually expressed in the following format:
As a < Role >, I want to < Activity >, so that < Business Value >.

An example is as follows:

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/a560a61a-c6d5-42fb-9ed6-2a7bd7841cf3.png)

Go to **DevOps Platform > Projects > Project Collaboration > Requirement**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/232c5305-d662-446b-8f50-06690319a1d9.png)

1. The product manager designs, reviews and creates a requirement, then assigns it to developers.
2. The developer spilts the requirement into several tasks and change the status to completed when the tasks are finished and pass the testing run by test engineers.

A requirement can be added in the following ways:

- Create a new requirement in the requirement page.
- Drag the relevant requirement from backlog to a specified iteration.
- Create and relate a requirement in issues.
- Convert a task or bug into a requirement.
- Import in batches.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/864313ec-a110-4ee9-9a99-4e0b12eea38d.png)

The details are as follows:

* Title, content, remark and activity log
* Related merge request
* Related issues, to spilt the requirement into multiple tasks
* Status, assignee and iteration
* Priority (urgent, high, medium, low)
* Complexity (complex, medium, easy)
* Deadline, estimated time, time tracking
* Label

## Task

The developer splits the requirement into several functions, and each function corresponds to a task.

Go to **DevOps Platform > Projects > Project Collaboration > Task**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/4799ba32-ab48-4b0b-bc1a-19fc15e8e2e2.png)

1. The developer splits the requirement into several tasks.
2. The test engineer creates test cases.
3. The test engineer tests task functions.
4. Change the task status to completed when the testing passes.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/5a3639a1-bf7b-4efe-9556-580dd8cf3fa1.png)

* During the development, the test engineer will make preparations for testing. For more information on testing, see [Functional Testing](../qa-and-testing/function-test.md) and [Automated Testing](../qa-and-testing/auto-test-getting-started.md).
* Conduct daily stand-up meetings based on requirements and tasks of the iteration, which lasts about 15 minutes and everyone needs to talk.
* Merge request also can be related to tasks for better collaboration.
* The estimated workload of a task can be measured in man-day or man-hour, which will convert automatically. For example, 7 man-days will be automatically converted to 1 man-week. After the actual workload of the day is entered, the system will automatically figure out the remaining workload, to help assignees on subsequent arrangements.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/02/18/01baa22e-3823-4378-a7dc-7bab5ad78537.png)
