# Instructions for Special Status Code


The status codes and responses with specific meanings are as follows:

 Status Code | Response Body | Description 
:------|:---------|:-----
 401 | {"message":"No authenticate credentials found"} | The request does not carry authorization certificates. 
 403 | {"message":"Invalid authentication credentials"} | Invalid authentication certificate. 
 404 | {"message":"no route and no  API  found with those values"} | The API accessed does not exist. 
 429 | {"message":" API  rate limit exceeded"} | The number of requests exceeds the API traffic control limit. 

