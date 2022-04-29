# Bug

Bugs are system problems discovered by test engineers when running test cases.

Go to **DevOps Platform > Joined Projects > Project Collaboration > Bug**.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/9b2c868b-838b-413a-a971-bc11bd604415.png)

1. The test engineer reports bugs and assigns to developers.
2. The developer changes bug status to repeated, resolved or wontfix, adds remarks of PR link, cause and solution, then transfers it back to the test engineer.
3. The test engineer tests again. If passes, close the bug. If not, reopen it and repeat the step 2.

:::tip Tips

There is a special status for bug, namely reopen, which means that the bug can be reopened after resolved.

:::

A bug can be added in the following ways:

- Create a new bug in the bug page.
- Drag the relevant bug from backlog to a specified iteration.
- Create and relate a bug in issues.
- Convert a requirement or task into a bug.
- Import in batches.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2021/12/10/f0760183-6a5d-47e3-ab07-b792abb29f0c.png)

The details are as follows:
* Title, content, remark and activity log
* Related merge request
* Related issues
* Status, assignee and iteration
* Priority (urgent, high, medium, low)
* Severity (fatal, serious, normal, slight, suggest)
* Deadline, estimated time, time tracking
* Label
* Merge request also can be related to bugs. When a bug is fixed, the developer will close the MR first and transfer it back to test engineers for testing again.
* The estimated workload of a task can be measured in man-day or man-hour, which will convert automatically. For example, 7 man-days will be automatically converted to 1 man-week.After the actual workload of the day is entered, the system will automatically figure out the remaining workload, to help assignees on subsequent arrangements.
