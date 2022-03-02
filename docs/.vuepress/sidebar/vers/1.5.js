module.exports = [
  {
    title: '关于 Erda',
    collapsable: true,
    children: [
      'about/intro'
    ]
  },
  {
    title: '安装配置',
    collapsable: true,
    children: [
      'install/docker-install',
      {
        title: '基于 Helm 部署',
        collapsable: true,
        children: [
          'install/helm-install/introduction',
          "install/helm-install/premise",
          "install/helm-install/helm-install-demo",
          "install/helm-install/helm-install-prod",
          'install/helm-install/high-availability',
          'install/helm-install/comp-schedule',
          'install/helm-install/configuration',
          'install/helm-install/upgrade',
          'install/helm-install/uninstall'
        ]
      },
    ]
  },
  {
    title: '快速入门',
    collapsable: true,
    children: [
      'quick-start/premise',
      'quick-start/newbie'
    ]
  },
  {
    title: '多云管理',
    collapsable: true,
    children: [
      {
        title: '场景示例',
        collapsable: true,
        children: [
          'cmp/examples/set-labels',
          'cmp/examples/check-env',
          'cmp/examples/check-workload',
        ]
      },
      'cmp/concept',
      {
        title: '最佳实践',
        collapsable: true,
        children: [
          'cmp/practice/alert-config',
        ]
      },
      {
        title: '使用指南',
        collapsable: true,
        children: [
          'cmp/guide/cluster-overview',
          {
            title: '资源管理',
            collapsable: true,
            children: [
              'cmp/guide/cluster/k8s-dashboard',
              'cmp/guide/cluster/management',
              'cmp/guide/cluster/autoscaling',
              'cmp/guide/cluster/cluster-node-labels',
            ]
          },
          {
            title: '运维告警',
            collapsable: true,
            children: [
              'cmp/guide/alert/dashboard',
              'cmp/guide/alert/report',
              'cmp/guide/alert/alarm-statistics',
              'cmp/guide/alert/alarm-strategy',
              'cmp/guide/alert/alarm-list',
              'cmp/guide/alert/alarm-custom',
            ]
          },
        ]
      },
    ]
  },
  {
    title: 'DevOps',
    collapsable: true,
    children: [
      {
        title: '场景示例',
        collapsable: true,
        children: [
          ['dop/examples/project-management', '业务项目管理'],
          'dop/examples/deploy/deploy-from-git',
          'dop/examples/deploy/deploy-from-image',
          'dop/examples/deploy/deploy-from-go-build',
          'dop/examples/deploy/deploy-from-java-build',
          'dop/examples/deploy/deploy-from-caches-build',
          'dop/examples/deploy/nexus',
          ['dop/examples/deploy/manage-mirror', '如何管理镜像'],
          'dop/examples/deploy/e2e-code-coverage',
        ]
      },
      {
        title: '设计理念',
        collapsable: true,
        children: [
          ['dop/concepts/agile-info', '高效协同'],
          ['dop/concepts/iac', 'IaC'],
          ['dop/concepts/pipeline', 'pipeline.yml'],
          ['dop/concepts/erda-yaml', 'erda.yml'],
          // ['dop/concepts/artifact', '制品'],
          ['dop/concepts/gitflow', 'Gitflow'],
        ]
      },
      {
        title: '最佳实践',
        collapsable: true,
        children: [
          'dop/best-practices/microservice-springcloud',
          'dop/best-practices/api-drive-develop',
          'dop/best-practices/autotest',
          'dop/best-practices/manual-test'
        ]
      },
      {
        title: '使用指南',
        collapsable: true,
        children: [
          {
            title: '协同',
            collapsable: true,
            children: [
              'dop/guides/collaboration/milestone',
              'dop/guides/collaboration/backlog-and-iteration',
              'dop/guides/collaboration/issue',
              'dop/guides/collaboration/issue-requirement-and-task',
              'dop/guides/collaboration/issue-bug',
              'dop/guides/collaboration/issue-dashboard',
              'dop/guides/collaboration/issue-gantt-chart',
              'dop/guides/collaboration/issue-customize-and-workflow',
              'dop/guides/collaboration/ticket',
              'dop/guides/collaboration/label',
              'dop/guides/collaboration/notification',
            ]
          },
          {
            title: '代码',
            collapsable: true,
            children: [
              'dop/guides/code/code-hosting',
              'dop/guides/code/branch-and-tag',
              'dop/guides/code/merge-request',
            ]
          },
          {
            title: 'API',
            collapsable: true,
            children: [
              'dop/guides/api/api-design',
            ]
          },
          {
            title: '开发语言',
            collapsable: true,
            children: [
              'dop/guides/language/java',
              'dop/guides/language/javascript',
              'dop/guides/language/php',
              'dop/guides/language/go',
            ]
          },
          {
            title: '部署和管理',
            collapsable: true,
            children: [
              'dop/guides/deploy/artifact-and-build',
              'dop/guides/deploy/deploy-from-artifact',
              'dop/guides/deploy/addon-out-of-box',
              'dop/guides/deploy/addon-custom',
              'dop/guides/deploy/deploy-by-cicd-pipeline',
              'dop/guides/deploy/config',
              'dop/guides/deploy/config-center',
              'dop/guides/deploy/db-migration',
              'dop/guides/deploy/management',
              'dop/guides/deploy/metrics_logs',
              'dop/guides/deploy/resource-management',
              'dop/guides/deploy/block-deploy',
            ]
          },
          {
            title: 'CI/CD 流水线',
            collapsable: true,
            children: [
              'dop/guides/cicd-pipeline/pipeline-yml-config',
              'dop/guides/cicd-pipeline/pipeline-yml-graph',
              'dop/guides/cicd-pipeline/pipeline-execution',
              'dop/guides/cicd-pipeline/pipeline-customize-and-extension',
            ]
          },
          {
            title: '质量保障和测试',
            collapsable: true,
            children: [
              'dop/guides/qa-and-testing/sonar-report',
              'dop/guides/qa-and-testing/sonar-quality-gate',
              'dop/guides/qa-and-testing/unit-test',
              'dop/guides/qa-and-testing/auto-test-getting-started',
              'dop/guides/qa-and-testing/test-dashboard',
              'dop/guides/qa-and-testing/testing-in-cicd-pipeline',
              'dop/guides/qa-and-testing/e2e-code-coverage',
              'dop/guides/qa-and-testing/function-test',
              'dop/guides/qa-and-testing/project-test-report',
            ]
          },
          {
            title: '移动开发',
            collapsable: true,
            children: [
              'dop/guides/mobileapp/basic',
              'dop/guides/mobileapp/framework',
              'dop/guides/mobileapp/local-environment',
              'dop/guides/mobileapp/howto-dev',
              // 'dop/guides/mobileapp/management',
              // 'dop/guides/mobileapp/certificates',
              // 'dop/guides/mobileapp/libraries',
              // 'dop/guides/mobileapp/ios-ci'
            ]
          },
          {
            title: '参考',
            collapsable: true,
            children: [
              ['dop/guides/reference/pipeline', 'pipeline.yml'],
              ['dop/guides/reference/erda-yaml', 'erda.yml'],
            ]
          },
        ]
      },
    ]
  },
  {
    title: '微服务治理',
    collapsable: true,
    children: [
      {
        title: '场景示例',
        collapsable: true,
        children: [
          {
            title: '应用监控',
            collapsable: true,
            children: [
              'msp/examples/apm/service-dashboard',
              'msp/examples/apm/exception-alert',
              'msp/examples/apm/status-alert',
            ],
          },
          {
            title: '日志分析',
            collapsable: true,
            children: [
              'msp/examples/log/java-log-rule',
              // 'msp/examples/log/log-alert',
              // 'msp/examples/log/log-dashboard',
            ],
          },
          {
            title: 'API 网关',
            collapsable: true,
            children: [
              'msp/examples/apigw/config',
              'msp/examples/apigw/hijack',
              'msp/examples/apigw/timeout',
              'msp/examples/apigw/rate-limit',
              'msp/examples/apigw/custom-header',
              'msp/examples/apigw/access-limit',
              'msp/examples/apigw/cors',
              'msp/examples/apigw/openapi',
            ],
          },
        ]
      },
      {
        title: '设计理念',
        collapsable: true,
        children: [
          'msp/concepts/apm',
          'msp/concepts/apigw',
          'msp/concepts/nc',
        ]
      },
      {
        title: '最佳实践',
        collapsable: true,
        children: [
          {
            title: '应用监控',
            collapsable: true,
            children: [
              'msp/practice/apm/service-alert',
              'msp/practice/apm/pressure-test-dashboard',
            ],
          },
          {
            title: '日志分析',
            collapsable: true,
            children: [
              'msp/practice/log/log-to-diagnose-business-exception',
            ],
          },
          {
            title: 'API 网关',
            collapsable: true,
            children: [
              'msp/practice/apigw/iac',
              'msp/practice/apigw/apim',
            ],
          },
          {
            title: '注册中心&配置中心',
            collapsable: true,
            children: [
              'msp/practice/nc/mse',
            ],
          },
        ]
      },
      {
        title: '使用指南',
        collapsable: true,
        children: [
          ['msp/guides/platform/msp-project', '创建项目'],
          ['msp/guides/platform/msp-overview', '平台总览'],
          ['msp/guides/platform/msp-project-list', '项目列表'],
          'msp/guides/apm/topology',
          // {
          //     title: '微服务环境',
          //     collapsable: true,
          //     children: [

          //     ]
          // },
          {
            title: '应用监控',
            collapsable: true,
            children: [
              'msp/guides/apm/service-list',
              'msp/guides/apm/service-overview',
              'msp/guides/apm/service-monitor',
              'msp/guides/apm/browser-monitor',
              'msp/guides/apm/browser-monitor-config',
              'msp/guides/apm/trace',
              'msp/guides/apm/checker',
              'msp/guides/apm/alert-config',
              'msp/guides/apm/alert-history',
              'msp/guides/apm/alert-index',
              'msp/guides/apm/alert-custom',
              'msp/guides/apm/alert-notify-channel',
              'msp/guides/apm/dashboard',
              'msp/guides/apm/dashboard-advanced',
            ]
          },
          {
            title: '日志分析',
            collapsable: true,
            children: [
              'msp/guides/log/quickstart',
              'msp/guides/log/query',
              'msp/guides/log/rules',
            ]
          },
          {
            title: 'API 网关',
            collapsable: true,
            children: [
              'msp/guides/apigw/policy',
              'msp/guides/apigw/auth',
              'msp/guides/apigw/bench',
              'msp/guides/apigw/status',
            ]
          },
          {
            title: '注册中心&配置中心',
            collapsable: true,
            children: [
              'msp/guides/nc/dubbo',
              'msp/guides/nc/springcloud',
              'msp/guides/nc/spring',
            ]
          },
        ]
      },
    ]
  },
  {
    title: '边缘计算',
    collapsable: true,
    children: [
      'ecp/example',
      'ecp/concept',
      'ecp/best-practice',
      {
        title: '使用指南',
        collapsable: true,
        children: [
          ['ecp/resource', '资源管理'],
          ['ecp/config-set', '配置集管理'],
          ['ecp/application', '应用管理'],
        ]
      },
    ]
  },
  {
    title: '快数据',
    collapsable: true,
    children: [
      {
        title: '场景示例',
        collapsable: true,
        children: [
          'fdp/example/integration',
          'fdp/example/develop',
          'fdp/example/service',
          'fdp/example/om',
        ]
      },
      'fdp/concept',
      ['fdp/best-practice', '最佳实践'],
      {
        title: '使用指南',
        collapsable: true,
        children: [
          'fdp/guide/work-space',
          'fdp/guide/data-map',
          'fdp/guide/data-om',
          'fdp/guide/data-source',
          'fdp/guide/source-data',
          'fdp/guide/data-develop',
          'fdp/guide/workflow',
          'fdp/guide/data-standard',
          'fdp/guide/notification-manage',
          'fdp/guide/configure-manage',
          'fdp/guide/data-service',
          'fdp/guide/data-permission',
          'fdp/guide/algorithm-model',
        ]
      },
    ]
  },
  {
    title: '命令行工具',
    collapsable: true,
    children: [
      'cli/explain-args'
    ]
  },
  {
    title: '生态工具',
    collapsable: true,
    children: [
      {
        title: 'Kubeprober',
        collapsable: true,
        children: [
          {
            title: '快速入门',
            collapsable: true,
            children: [
              ['eco-tools/kubeprober/guides/introduction', '概述'],
              ['eco-tools/kubeprober/guides/install', '快速安装'],
              ['eco-tools/kubeprober/guides/first_prober', '编写第一个 Prober'],
            ]
          },
          {
            title: '设计理念',
            collapsable: true,
            children: [
              ['eco-tools/kubeprober/concepts/arch', '系统架构'],
              ['eco-tools/kubeprober/concepts/cluster_crd', 'Cluster CRD'],
              ['eco-tools/kubeprober/concepts/prober_crd', 'Prober CRD'],
            ]
          },
          {
            title: '使用指南',
            collapsable: true,
            children: [
              ['eco-tools/kubeprober/best-practices/standalone_kubeprober', '单集群使用 Kubeprober'],
              ['eco-tools/kubeprober/best-practices/muti_cluster_kubeprober', '多集群使用 Kubeprober'],
              ['eco-tools/kubeprober/best-practices/prober_management', 'Prober 管理'],
              ['eco-tools/kubeprober/best-practices/custom_prober', '自定义 Prober'],
              ['eco-tools/kubeprober/best-practices/alert', '告警'],
              ['eco-tools/kubeprober/best-practices/command_tools', '使用命令行工具'],
            ]
          },
        ]
      },
    ]
  },
  {
    title: '常见问题',
    collapsable: true,
    children: [
      'faq/faq',
      'faq/install',
    ]
  },
]
