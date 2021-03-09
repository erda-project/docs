# 操作系统安全加固

Dice 针对操作系统进行了加固。具体内容如下：

## 账号和口令

#### 禁用特殊账号
* 检查空口令和 root 权限账号，确保系统中不存在异常账号
* 检查无用账号，原则上除了系统账号之外应该只存在 root 以及 dice

#### 添加口令策略
加强口令的复杂度等，降低被猜解的可能性。
* 设置用户密码最长使用天数为1年，密码到期前7天提醒用户修改密码。
* 设置用户的的密码复杂度为14位密码 + 数字 + 大小写 + 特殊字符。
* 设置连续输错三次密码，账号锁定五分钟。

#### 限制超级用户权限

* 限制 root 用户直接登录。
* 限制普通用户可以 su 到 root 用户，必须使用 sudo 来提升权限。

## 服务

#### 关闭不必要的服务

关闭不必要的服务（如普通服务和 xinetd 服务），降低风险，默认关闭的服务列表如下：

tftp, sendmail, ypbind, kshell, lpd, printer, ident, time, ntalk, bootps, chargen, nfs, daytime, nfslock, echo, discard, klogin

#### SSH服务安全
* 不允许 root 账号直接登录系统，设置 PermitRootLogin 的值为 no。
* 修改SSH使用的协议版本，设置 Protocol 的版本为 2。
* 修改允许密码错误次数（默认6次），设置 MaxAuthTries 的值为 3。

## 文件系统
#### 设置umask值
设置默认的 umask 值 027， 即新创建的文件属主拥有读写执行权限，同组用户拥有读和执行权限，其他用户无权限。
#### 设置登录超时
设置系统登录后，连接超时时间是10分钟，即10分钟内没有任何操作，服务器主动断开 SSH 连接，增强安全性。

## 日志记录
通过脚本代码实现记录所有用户的登录操作日志，防止出现安全事件后无据可查，DICE优化了服务器的的history显示，为所有操作都增加了用户和时间的显示，具体优化脚本如下：
```bash
 USER=`whoami`
 USER_IP=`who -u am i 2>/dev/null| awk '{print $NF}'|sed -e 's/[()]//g'`
 if [ "$USER_IP" = "" ]; then
 USER_IP=`hostname`
 fi
 if [ ! -d /var/log/history ]; then
 mkdir /var/log/history
 chmod 777 /var/log/history
 fi
 if [ ! -d /var/log/history/${LOGNAME} ]; then
 mkdir /var/log/history/${LOGNAME}
 chmod 300 /var/log/history/${LOGNAME}
 fi
 export HISTSIZE=4096
 DT=`date +"%Y%m%d_%H:%M:%S"`
 export HISTFILE="/var/log/history/${LOGNAME}/${USER}@${USER_IP}_$DT"
 chmod 600 /var/log/history/${LOGNAME}/*history* 2>/dev/null
```




