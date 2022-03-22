# Tracing Analysis

With the expansion of business scale and depth, the business in microservices may span multiple applications and rely on more and more addons, and a problem at any node may cause fluctuations or exceptions of the entire business request.

Because of the intricate relationships between services and the fact that most projects are not well managed, the troubleshooting process will become extremely complicated once an error occurs.

Tracing analysis is used to solve such problems, as it can capture the business records of multiple nodes in a distributed manner and connect the records of each node in a request process with a unified request ID to facilitate troubleshooting business bottlenecks or anomalies in the request process.

Please go to **Microservice Governance Platform > Diagnostic Analysis > Tracing** for operations.

## Tracing Query

### Concepts

A trace can be considered as a directed acyclic graph (DAG) of spans.
```
Causal relationships between spans in a single trace：
        [Span A]  ←←←(the root span)
            |
     +------+------+
     |             |
 [Span B]      [Span C] ←←←(Span C is a ChildOf Span A)
     |             |
 [Span D]      +---+-------+
               |           |
           [Span E]    [Span F] >>> [Span G] >>> [Span H]
                                       ↑
                                       ↑
                                       ↑
                         (Span G FollowsFrom Span F)
```
Sometimes it is easier to visualize traces with a time axis as in the diagram below.
```
Temporal relationships between spans in a single trace：
––|–––––––|–––––––|–––––––|–––––––|–––––––|–––––––|–––––––|–> time
 [Span A···················································]
   [Span B··············································]
      [Span D··········································]
    [Span C········································]
         [Span E·······]        [Span F··] [Span G··] [Span H··]
```

* **Trace**: A trace represents a potentially distributed system with parallel data or parallel execution traces (potentially distributed and parallel). A trace can be considered as a directed acyclic graph (DAG) of multiple spans.

* **Span**: A span represents a logical unit of operation in a system with a start time and an execution duration. Logical causality is established between spans by nesting or sequencing. A node or step in a call is similar to a layer of stack information. There is a parent-child or parallel relationship between spans to indicate the life cycle of span throughout the call.

* **Operation Name**: Each span has an operation name that is simple and highly readable (for example, an RPC method name, a function name, or the name of a subtask or stage within a larger computation). The operation name of a span should be an abstract and generic identifier, a clear and statistically significant name. For more detailed subtype descriptions, please use tags.

* **Inter-Span References**: A span can have a causal relationship with one or more spans. Erda follows the two relationships defined by OpenTracing: ChildOf and FollowsFrom. These two reference types represent a direct causal relationship between the child node and the parent node.

   * **ChildOf References**: A span may be the ChildOf a parent span. In a ChildOf reference, the parent span depends on the child span in some capacity. All of the following would constitute ChildOf relationships:

      * A span representing the server side of an RPC may be the ChildOf a span representing the client side of that RPC.

      * A span representing a SQL insert may be the ChildOf a span representing an ORM save method.

      * Many spans doing concurrent (perhaps distributed) work may all individually be the ChildOf a single parent span that merges the results for all children that return within a deadline.

      These could all be valid timing diagrams for children that are the ChildOf a parent:

      ```
          [-Parent Span---------]
               [-Child Span----]
          [-Parent Span--------------]
               [-Child Span A----]
                [-Child Span B----]
              [-Child Span C----]
               [-Child Span D---------------]
               [-Child Span E----]
      ```

   * **FollowsFrom References**: Some parent spans do not depend in any way on the result of their child spans. In these cases, the child span FollowsFrom the parent span in a causal sense. There are many distinct FollowsFrom reference sub-categories.

      These can all be valid timing diagrams for children that FollowFrom a parent:

      ```
          [-Parent Span-]  [-Child Span-]
          [-Parent Span--]
           [-Child Span-]
          [-Parent Span-]
                      [-Child Span-]
      ```
### Practices

For data access, see [Java Agent Usage](java-agent-guide.md).

For Java services, Erda adopts the agent auto probe to collect trace information. You can integrate the agent by simply deploying the service via the action in the pipeline provided by Erda. The tracing data auto collected can be viewed via tracing query.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/17/15cee90f-2889-4f84-9864-45551a99c3a9.png)

Supported queries are as follows:
- Duration
- Tracing status
- Filter rules
   - Service name
   - Tracing ID
   - RPC method
   - HTTP path

Click to view detailed tracing information.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/17/fc5cb639-603c-47e9-8de5-23b172372fdb.png)

:::tip Tips

Click the span node in the tracing diagram to view key information, such as attributes, events, and associated services.
* Attributes: Labels and fields of the span.
* Events: Some span events, such as time consumption.
* Associated services: View the core service-related metrics currently collected by the span.

:::

A span is generated every time a service interacts with the outside world. For example, a service receives a request, a service initiates an RPC call, and a service initiates a DB call.

As shown above:

* Service A receives a request and generates span 1.
* Service A initiates an RPC request to call service B to generate a span 2, whose parent span is span 1.
* Service B receives the RPC request from service A and generates span 3, whose parent span is span 2. The start/end time difference between the two is the network time-consuming.
* Service A receives the RPC response and initiates a DB call to generate another span 4, whose parent span is span 1 and its brother span is span 2.

## Tracing Debugging

Use tracing debugging together with tracing query. For example, when an exceptional trace is found via tracing query, some data may have been lost after the exception occurred. In this case, you can quickly restore a new trace via tracing debugging and continue to locate the issue.

![](http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/paas-doc/2022/03/17/979d11dd-7583-4996-9b1a-c84b5fb4a302.png)
