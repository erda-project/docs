# 大盘系统进阶（指标查询语言）

指标查询语言目前支持了一些内置函数，基本语法为：
```sql
SELECT 
    field1::field, tag1::tag, others AS alias 
FROM metric_name 
WHERE 
    tag2::tag='xxx' AND field2::field>100 
GROUP BY host_ip::tag 
ORDER BY field3::tag DESC 
LIMIT 100;
```

默认 SELECT 中的列为 field, 可以省略 ::field 后缀。<br>
默认 WHERE 中的字段为 tag, 可以省略 ::tag 后缀。<br>
默认 GROUP BY 中的字段为 tag, 可以省略 ::tag 后缀。<br>
默认 ORDER BY 中的字段为 field, 可以省略 ::field 后缀。<br>

>自定义函数目前以查询关键字与自定义类型区分。

## SELECT
### 聚合函数
* max(field), 求 field  的最大值
* min(field), 求 field 的最小值
* avg(field), 求 field  的平均值
* mean(field), 求 field  的平均值
* sum(field), 求 field  的总和
* count(field|tag), 求存在 field 或 tag 的数据条数
* distinct(field|tag), 求 field 或 tag 的去重数
* percentiles(field,percent) , 求 field 的分位数<br>
	 field type : float/int<br>
	 percent type : float/int<br>
	 percent range : 0<=percent<=100
* etc.

### 常量函数
* interval(unit), 根据指定的单位，返回时间间隔，不符合限定单位返回error<br>
 unit type:string<br>
 unit:"ns"、"us"、"µs"、"μs"、"ms"、"s"、"m"、"h"、"day"
* now(), 返回当前时间戳，单位为纳秒
* now_sec(), 返回当前时间戳，单位为秒
* now_ms(), 返回当前时间戳，单位为纳秒
* unix(), 返回当前时间戳，单位为秒
* unix_ns(), 返回当前时间戳，单位为纳秒
* date(), 返回字符串形式的日期，比如："2020-10-10“
* max_uint8()
* max_uint16()
* max_uint32()
* max_uint64()
* max_int8()
* max_int16()
* max_int32()
* max_int64()
* max_float32()
* max_float64()
* min_int8()
* min_int16()
* min_int32()
* min_int64()
* etc.

### 类型转换
* int(value) 将value转化为int64，不符合限定类型返回error<br>
	   value type:bool、int、uint、float、string、time.Duration、time.Time
  
* bool(value) 将value转化为bool，不符合限定类型返回error<br>
       value type:bool、int、uint、float、string、time.Duration、time.Time
	   
* float(value) 将value转化为float，不符合限定类型返回error<br>
       value type:bool、int、uint、float、string、time.Duration、time.Time
	   
* string(value) 将value转化为string，转换失败返回错误<br>
       value type:interface{}
	   
* duration(value) 将value转化为time.Duration，不符合限定类型返回error<br>
       value type:bool、int、uint、float、string、time.Duration

* etc.

### 关系运算函数
* eq(value1, value2), 等价于 value1 == value2，返回boolean
* neq(value1, value2), 等价于 value1 != value2，返回boolean
* gt(value1, value2), 等价于 value1 > value2，返回boolean
* gte(value1, value2), 等价于 value1 >= value2，返回boolean
* lt(value1, value2), 等价于 value1 < value2，返回boolean
* lte(value1, value2), 等价于 value1 <= value2，返回boolean

### 条件运算函数
* if(cond, true_expression, false_exprission), 等价于 cond ? true_expression : false_exprission

### 逻辑运算函数
* andf(bool1,bool2,bool3) 与运算函数，等价于 bool1 && bool2 && bool3 ，返回bool
* orf(bool1,bool2,bool3) 或运算函数，等价于 bool1 || bool2 || bool3 ，返回bool

example:
> andf(eq(field1,field2),neq(field2,field3))

### 其他函数
* include(key, value1, value2...), 等价于 key IN (value1, value2), 返回 boolean
* max_value(value1, value2), 返回两个值中的最大值
* min_value(value1, value2), 返回两个值中的最小值
* substring(string, start, end) 字符串切片，取下标start-end的值，默认值“”
* tostring(interface{}) 转换为string,默认值“”
* format(temp, args...), 类似于 c语言中的 printf
* parse_time(string, layout)  解析字符串为时间类型
* format_time(time, layout), 格式化时间为字符串
* format_bytes(bytes), 格式化字节数
* format_duration(duration), 格式化 Duration
* trim(str, cutset) 删除字符串的头尾空白符，返回string
* trim_left(str, cutset) 删除字符串的头空白符，返回string
* trim_right(str, cutset) 删除字符串的尾空白符，返回string
* trim_space(str) 删除字符串的空白符，返回string
* trim_prefix(str, prefix)
* trim_suffix(str, suffix)
* map(value,k,v...)根据value值转换为k对应的v<br>
		value type : int64、uint64、float64、bool、string、time.Time、time.Duration<br>
		k type : int64、uint64、float64、bool、string、time.Time、time.Duration<br>
		v type : interface{}<br>
		example:
```sql
			SELECT map(health_status::field, 0,'健康',1,'警告',2,'部分故障',3,'严重故障')
			FROM leaf_component_status;
```
* etc.


## WHERE
* include 类似于SQL in方法，include(field,1,2,3)
* etc.
