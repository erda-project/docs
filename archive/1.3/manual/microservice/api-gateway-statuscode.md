# API 网关状态码

## 特定含义的状态码和应答

状态码|应答body | 含义
:-----:|:--------:|:----:
401    | {"message":"No authenticate credentials found"}  | 请求没有携带授权凭证
403    | {"message":"Invalid authentication credentials"}  | 授权凭证鉴权失败
404    | {"message":"no route and no  API  found with those values"} | 访问的 API 不存在
429    | {"message":" API  rate limit exceeded"} | 请求次数超过 API 流控限制

