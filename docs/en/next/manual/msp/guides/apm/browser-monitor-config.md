# Front-End Monitoring Access

## SPA (Single Page Application)

1. Add the activation code of TA.js to the `head` of the frame page (usually index.html).

   ```html
   <script src="/ta"></script>
   <script>
     var _taConfig = window._taConfig;
     if (_taConfig && _taConfig.enabled) {
       !function(e,n,r,t,a,o,c){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e.onerror=function(n,r,t,o,c){e[a]("sendExecError",n,r,t,o,c)},n.addEventListener("error",function(n){e[a]("sendError",n)},!0),o=n.createElement(r),c=n.getElementsByTagName(r)[0],o.async=1,o.src=t,c.parentNode.insertBefore(o,c)}(window,document,"script",_taConfig.url,"$ta");
       $ta('start', { udata: { uid: 0 }, ak: _taConfig.ak, url: _taConfig.collectorUrl });
     }
   </script>
   ```
2. Add `/ta` in `nginx.conf` to return the configuration of TA.js. Environment variables will be injected by default in Erda.

   ```bash
       set $taEnabled ${TERMINUS_TA_ENABLE};
       set $taUrl ${TERMINUS_TA_URL};
       set $collectorUrl ${TERMINUS_TA_COLLECTOR_URL};
       set $terminusKey ${TERMINUS_KEY};
       location /ta {
           default_type application/javascript;
           return 200 'window._taConfig={enabled:$taEnabled,ak:"$terminusKey",url:"$taUrl",collectorUrl:"$collectorUrl"}';
       }

3. To collect user ID to add user-dimensional statistics, set `userId` to TA.js cache at the location where the front-end user queries.

   ```js
   if (typeof window.$ta !== 'undefined') window.$ta('setUser', [userId])
   ```
## Spring MVC
1. Add the `Config` class to read TA.js environment variables, which will be injected by default in Erda.

   ```java
   @Component
   @Data
   public class TaConfig {
       @Value("${terminus.ta.collector.url}")
       private String terminusTaCollectorURL;

       @Value("${terminus.ta.enable}")
       private boolean terminusTaEnable;

       @Value("${terminus.ta.url}")
       private String terminusTaURL;

       @Value("${terminus.key}")
       private String terminusKey;
   }
   ```
2. Add `Controller` to return TA.js configuration.

   ```java
   @Slf4j
   @RestController
   @RequestMapping("/api/ta")
   public class TaController {

       @Autowired
       private TaConfig config;

       @RequestMapping(produces = "application/javascript")
       @ResponseBody
       public String ta() {
           return String.format("window._taConfig={enabled:%b,ak:\"%s\",url:\"%s\",collectorUrl:\"%s\"}", config.isTerminusTaEnable(), config.getTerminusKey(), config.getTerminusTaURL(), config.getTerminusTaCollectorURL());
       }
   }
   ```
3. Add the TA.js activation code in the `head` of the page to be monitored.

   ```html
   <head>
       <script src="/api/ta"></script>
       <script>
           var _taConfig = window._taConfig;
           if (_taConfig && _taConfig.enabled) {
               !function (e, n, r, t, a, o, c) {
                   e[a] = e[a] || function () {
                       (e[a].q = e[a].q || []).push(arguments)
                   }, e.onerror = function (n, r, t, o, c) {
                       e[a]("sendExecError", n, r, t, o, c)
                   }, n.addEventListener("error", function (n) {
                       e[a]("sendError", n)
                   }, !0), o = n.createElement(r), c = n.getElementsByTagName(r)[0], o.async = 1, o.src = t, c.parentNode.insertBefore(o, c)
               }(window, document, "script", _taConfig.url, "$ta");
               $ta('start', {udata: {uid: 0}, ak: _taConfig.ak, url: _taConfig.collectorUrl});
           }
       </script>
   </head>
   ```
## Herd
1. Add `terminus-key.js`.

   ```html
   module.exports = () => async (ctx, next) => {
     ctx.herdContext['_TERMINUS_KEY_'] = process.env.TERMINUS_KEY;
     ctx.herdContext['_TA_ENABLE_'] = process.env.TERMINUS_TA_ENABLE || false;
     ctx.herdContext['_TA_URL_'] = process.env.TERMINUS_TA_URL || '//static.terminus.io/ta.js';
     ctx.herdContext['_TA_COLLECT_URL_'] = process.env.TERMINUS_TA_COLLECTOR_URL || '//analytics.terminus.io/collect';
     await next();
   }
   ```
2. Add TA.js Script to the `head` of `layout.hbs`.

   ```html
    <head>
       <script>
           {{#if _TA_ENABLE_}}
             !function(e,t,n,s,a,c,i){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},c=t.createElement(n),i=t.getElementsByTagName(n)[0],c.async=1,c.src=s,i.parentNode.insertBefore(c,i)}(window,document,"script","{{_TA_URL_}}","$ta");
             $ta('start',{ udata: { uid: {{#if _USER_}}{{_USER_.id}}{{else}}0{{/if}} }{{#if _TERMINUS_KEY_}}, ak: '{{_TERMINUS_KEY_}}'{{/if}} , url: '{{_TA_COLLECT_URL_}}' })
           {{/if}}
       </script>
     </head>
   ```
3. To collect user ID to add user-dimensional statistics, set `userId` to TA.js cache at the location where the front-end user queries.

   ```js
   if (typeof window.$ta !== 'undefined') window.$ta('setUser', [userId])
   ```
