# 特殊状态码说明

特定含义的状态码及应答如下：

状态码|应答 Body | 含义
:------|:---------|:-----
401    | {"message":"No authenticate credentials found"}  | 请求未携带授权凭证 
403    | {"message":"Invalid authentication credentials"}  | 授权凭证鉴权失败
404    | {"message":"no route and no  API  found with those values"} | 访问的 API 不存在
429    | {"message":" API  rate limit exceeded"} | 请求次数超过 API 流控限制

