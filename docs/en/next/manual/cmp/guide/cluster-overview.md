# Cluster Overview

The cluster overview is equivalent to the main console of an aircraft, where you can view the status of clusters and machines in the organization, and set tags for machines or get machines offline.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/77c97edb-ad82-4420-958b-5ded00eb623a.png)

* **Group**

   By default, the machines are grouped by cluster, and you can choose to group them by memory or CPU.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/27faf28e-70a4-47a6-b9ec-d8bba29184ce.png)

* **Filter**

   The platform supports multiple filter conditions, so that you can quickly find the target machine. Select in **Filter** or directly enter text to search.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/08d54182-03eb-4f77-9b9b-f784627c7f64.png)

* **Colour**

   The platform supports coloring machines by different conditions. For example, if you want to see the system load of all machines, select **System Load** in **Colour**.

   ![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/e09867d0-870f-4d55-b046-47a6bed142ea.png)

You can view detailed information of all machines here.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/500001fd-5725-4396-8584-3996a605225c.png)

* **Machines**: The basic information of each machine.
   * IP: Machine IP. Click to enter the machine overview page.
   * Instance: The number of container instances running on the current machine. Click to enter the instance list page.
   * CPU: The allocation and actual usage of CPU.
   * Memory: The allocation and actual usage of memory.
   * Disk Usage: The usage of the machine.
   * Load: The load situation of the machine.
   * Tag: The tag of the machine.
   * Operations: Set tags for the machine or get the machine offline.
* **Machine Alarm**: The alarms of all machines.

You can also click on the machine IP to view the detailed information of a single machine.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/01/12/c5699abb-44b2-4790-8e98-2a8fc3ea3187.png)

* **Machine Overview**: The running status of the machine in a specific time with multiple charts.
   * CPU Usage: The chart of CPU usage.
   * Memory Usage: The chart of memory usage.
   * Load: The chart of three loads.
   * Disk Read: The chart of disk read speed.
   * Disk Write: The chart of disk write speed.
   * Disk Usage Rate: The usage rate of the disk.
   * Disk Usage: The usage of the disk.
   * Network Send: The sending rate of the network card.
   * Network receive: The receiving rate of the network card.

* **Machine Alarm**: The alarms of a single machine.
* **Instance List**: The container instances running on a single machine.
* **Task List**: The tasks running on a single machine.
* **Machine Details**: The basic information of the machine.

* **View Cluster Details**: You can go to the page of cluster details by clicking on the cluster name.