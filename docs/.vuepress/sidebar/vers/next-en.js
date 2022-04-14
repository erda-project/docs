module.exports = [
  {
    title: 'Overview',
    collapsable: true,
    children: [
      'about/intro'
    ]
  },
  {
    title: 'Install',
    collapsable: true,
    children: [
      'install/docker-install',
      {
        title: 'Deploy via Helm',
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
    title: 'Quick Start',
    collapsable: true,
    children: [
      'quick-start/premise',
      'quick-start/newbie'
    ]
  },
  {
    title: 'Cloud Management',
    collapsable: true,
    children: [
      {
        title: 'Examples',
        collapsable: true,
        children: [
          'cmp/examples/set-labels',
          'cmp/examples/check-env',
          'cmp/examples/check-workload',
        ]
      },
      'cmp/concept',
      {
        title: 'Best Practices',
        collapsable: true,
        children: [
          'cmp/practice/alert-config',
        ]
      },
      {
        title: 'Guides',
        collapsable: true,
        children: [
          'cmp/guide/cluster-overview',
          {
            title: 'Resource Management',
            collapsable: true,
            children: [
              'cmp/guide/cluster/k8s-dashboard',
              'cmp/guide/cluster/management',
              'cmp/guide/cluster/autoscaling',
              'cmp/guide/cluster/cluster-node-labels',
            ]
          },
          {
            title: ' O&M Alarms',
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
        title: 'Examples',
        collapsable: true,
        children: [
          'dop/examples/project-management',
          'dop/examples/deploy/deploy-from-git',
          'dop/examples/deploy/deploy-from-image',
          'dop/examples/deploy/deploy-from-go-build',
          'dop/examples/deploy/deploy-from-java-build',
          'dop/examples/deploy/deploy-from-caches-build',
          'dop/examples/deploy/nexus',
          'dop/examples/deploy/manage-mirror',
          // 'dop/examples/deploy/e2e-code-coverage',
        ]
      },
      {
        title: 'Concepts',
        collapsable: true,
        children: [
          ['dop/concepts/agile-info', 'Efficient Collaboration'],
          ['dop/concepts/iac', 'IaC'],
          ['dop/concepts/pipeline', 'pipeline.yml'],
          ['dop/concepts/dice-yaml', 'dice.yml'],
          // ['dop/concepts/artifact', '制品'],
          ['dop/concepts/gitflow', 'Gitflow'],
        ]
      },
      {
        title: 'Best Practices',
        collapsable: true,
        children: [
          'dop/best-practices/microservice-springcloud',
          'dop/best-practices/api-drive-develop',
          // 'dop/best-practices/autotest',
          // 'dop/best-practices/manual-test',
          // 'dop/best-practices/release',
        ]
      },
      {
        title: 'Guides',
        collapsable: true,
        children: [
          {
            title: 'Collaboration',
            collapsable: true,
            children: [
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
            title: 'Code',
            collapsable: true,
            children: [
              'dop/guides/code/code-hosting',
              'dop/guides/code/branch-and-tag',
              // 'dop/guides/code/merge-request',
            ]
          },
  //         {
  //           title: 'API',
  //           collapsable: true,
  //           children: [
  //             'dop/guides/api/api-design',
  //           ]
  //         },
          {
            title: 'Language',
            collapsable: true,
            children: [
              'dop/guides/language/java',
              'dop/guides/language/javascript',
              'dop/guides/language/php',
              'dop/guides/language/go',
            ]
          },
          {
            title: 'Deployment',
            collapsable: true,
            children: [
              'dop/guides/deploy/release',
              'dop/guides/deploy/resource-management',
              // 'dop/guides/deploy/addon-out-of-box',
              // 'dop/guides/deploy/addon-custom',
              // 'dop/guides/deploy/config',
              // 'dop/guides/deploy/config-center',
              // 'dop/guides/deploy/deploy-order',
              // 'dop/guides/deploy/deploy-by-cicd-pipeline',
              'dop/guides/deploy/db-migration',
              // 'dop/guides/deploy/metrics_logs',
              // 'dop/guides/deploy/management',
              'dop/guides/deploy/block-deploy',
            ]
          },
          {
            title: 'CI/CD Pipeline',
            collapsable: true,
            children: [
              // 'dop/guides/cicd-pipeline/pipeline-yml-config',
              // 'dop/guides/cicd-pipeline/pipeline-yml-graph',
              // 'dop/guides/cicd-pipeline/pipeline-execution',
              'dop/guides/cicd-pipeline/project-pipeline',
              'dop/guides/cicd-pipeline/pipeline-customize-and-extension',
            ]
          },
  //         {
  //           title: 'Quality Assurance and Testing',
  //           collapsable: true,
  //           children: [
  //             'dop/guides/qa-and-testing/sonar-report',
  //             'dop/guides/qa-and-testing/sonar-quality-gate',
  //             'dop/guides/qa-and-testing/unit-test',
  //             'dop/guides/qa-and-testing/auto-test-getting-started',
  //             'dop/guides/qa-and-testing/test-dashboard',
  //             'dop/guides/qa-and-testing/testing-in-cicd-pipeline',
  //             'dop/guides/qa-and-testing/e2e-code-coverage',
  //             'dop/guides/qa-and-testing/function-test',
  //             'dop/guides/qa-and-testing/project-test-report',
  //           ]
  //         },
          {
            title: 'Mobile Application',
            collapsable: true,
            children: [
              'dop/guides/mobileapp/basic',
              // 'dop/guides/mobileapp/framework',
              // 'dop/guides/mobileapp/local-environment',
              // 'dop/guides/mobileapp/howto-dev',
              // 'dop/guides/mobileapp/management',
              // 'dop/guides/mobileapp/certificates',
              // 'dop/guides/mobileapp/libraries',
              // 'dop/guides/mobileapp/ios-ci'
            ]
          },
          {
            title: 'Reference',
            collapsable: true,
            children: [
              // ['dop/guides/reference/pipeline', 'pipeline.yml'],
              ['dop/guides/reference/dice-yaml', 'dice.yml'],
            ]
          },
        ]
      },
    ]
  },
  {
    title: 'Microservice',
    collapsable: true,
    children: [
      {
        title: 'Examples',
        collapsable: true,
        children: [
          {
            title: 'Application Monitoring',
            collapsable: true,
            children: [
              // 'msp/examples/apm/service-dashboard',
              'msp/examples/apm/exception-alert',
              'msp/examples/apm/status-alert',
            ],
          },
  //         {
  //           title: 'Log Analysis',
  //           collapsable: true,
  //           children: [
  //             'msp/examples/log/java-log-rule',
  //             // 'msp/examples/log/log-alert',
  //             // 'msp/examples/log/log-dashboard',
  //           ],
  //         },
          {
            title: 'API Gateway',
            collapsable: true,
            children: [
              // 'msp/examples/apigw/config',
              // 'msp/examples/apigw/hijack',
              'msp/examples/apigw/timeout',
              // 'msp/examples/apigw/rate-limit',
              'msp/examples/apigw/custom-header',
              'msp/examples/apigw/access-limit',
              // 'msp/examples/apigw/cors',
              // 'msp/examples/apigw/openapi',
            ],
          },
        ]
      },
  //     {
  //       title: 'Concepts',
  //       collapsable: true,
  //       children: [
  //         {
  //           title: 'Application Monotoring',
  //           collapsable: true,
  //           children: [
  //             'msp/concepts/apm/observability',
  //             'msp/concepts/apm/arch',
  //             'msp/concepts/apm/concept',
  //           ],
  //         },
  //         {
  //           title: 'API Gateway',
  //           collapsable: true,
  //           children: [
  //             'msp/concepts/apigw/arch',
  //             'msp/concepts/apigw/core',
  //           ],
  //         },
  //         {
  //           title: 'Registration Center & Configuration Center',
  //           collapsable: true,
  //           children: [
  //             'msp/concepts/nc/arch',
  //             'msp/concepts/nc/core',
  //           ],
  //         },
  //       ]
  //     },
      {
        title: 'Best Practices',
        collapsable: true,
        children: [
          {
            title: 'Application Monitoring',
            collapsable: true,
            children: [
              'msp/practice/apm/service-alert',
              // 'msp/practice/apm/pressure-test-dashboard',
            ],
          },
  //         {
  //           title: 'Log Analysis',
  //           collapsable: true,
  //           children: [
  //             'msp/practice/log/log-to-diagnose-business-exception',
  //           ],
  //         },
          {
            title: 'API Gateway',
            collapsable: true,
            children: [
              'msp/practice/apigw/iac',
              // 'msp/practice/apigw/apim',
            ],
          },
          {
            title: 'Registration Center & Configuration Center',
            collapsable: true,
            children: [
              'msp/practice/nc/mse',
            ],
          },
        ]
      },
      {
        title: 'Guides',
        collapsable: true,
        children: [
          ['msp/guides/platform/msp-project', 'Project Access'],
          {
            title: 'Application Monitoring',
            collapsable: true,
            children: [
              'msp/guides/apm/apm-overview',
              'msp/guides/apm/java-agent-guide',
              // 'msp/guides/apm/service-overview',
              // 'msp/guides/apm/service-monitor',
              // 'msp/guides/apm/browser-monitor',
              'msp/guides/apm/browser-monitor-config',
              'msp/guides/apm/trace',
              // 'msp/guides/apm/checker',
              // 'msp/guides/apm/dashboard',
              // 'msp/guides/apm/dashboard-advanced',
            ]
          },
  //         {
  //           title: 'Log Analysis',
  //           collapsable: true,
  //           children: [
  //             'msp/guides/log/quickstart',
  //             'msp/guides/log/query',
  //             'msp/guides/log/rules',
  //           ]
  //         },
          {
            title: 'API Gateway',
            collapsable: true,
            children: [
              'msp/guides/apigw/policy',
              'msp/guides/apigw/auth',
              'msp/guides/apigw/bench',
              'msp/guides/apigw/status',
            ]
          },
  //         {
  //           title: 'Registration Center & Configuration Center',
  //           collapsable: true,
  //           children: [
  //             'msp/guides/nc/dubbo',
  //             'msp/guides/nc/springcloud',
  //             'msp/guides/nc/spring',
  //           ]
  //         },
        ]
      },
    ]
  },
  {
    title: 'Edge Computing',
    collapsable: true,
    children: [
      'ecp/example',
      'ecp/concept',
      'ecp/best-practice',
  //     {
  //       title: 'Guides',
  //       collapsable: true,
  //       children: [
  //         ['ecp/resource', '资源管理'],
  //         ['ecp/config-set', '配置集管理'],
  //         ['ecp/application', '应用管理'],
  //       ]
  //     },
    ]
  },
  {
    title: 'Fast Data',
    collapsable: true,
    children: [
      {
        title: 'Examples',
        collapsable: true,
        children: [
          'fdp/example/integration',
          'fdp/example/develop',
          'fdp/example/service',
          'fdp/example/om',
        ]
      },
      'fdp/concept',
      ['fdp/best-practice', 'Best Practices'],
      {
        title: 'Guides',
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
    title: 'CLI',
    collapsable: true,
    children: [
      'cli/install',
      'cli/use',
      'cli/explain-args'
    ]
  },
  {
    title: 'Ecosystem Tools',
    collapsable: true,
    children: [
      {
        title: 'Kubeprober',
        collapsable: true,
        children: [
          {
            title: 'Quick Start',
            collapsable: true,
            children: [
              ['eco-tools/kubeprober/guides/introduction', 'Overview'],
              ['eco-tools/kubeprober/guides/install', 'Quick Installation'],
              // ['eco-tools/kubeprober/guides/first_prober', '编写第一个 Prober'],
            ]
          },
          {
            title: 'Concepts',
            collapsable: true,
            children: [
              // ['eco-tools/kubeprober/concepts/arch', '系统架构'],
              ['eco-tools/kubeprober/concepts/cluster_crd', 'Cluster CRD'],
              ['eco-tools/kubeprober/concepts/prober_crd', 'Prober CRD'],
            ]
          },
          {
            title: 'Guides',
            collapsable: true,
            children: [
              ['eco-tools/kubeprober/best-practices/standalone_kubeprober', 'Kubeprober for a Single Cluster'],
              ['eco-tools/kubeprober/best-practices/muti_cluster_kubeprober', 'Kubeprober for Multiple Clusters'],
              // ['eco-tools/kubeprober/best-practices/prober_management', 'Prober 管理'],
              // ['eco-tools/kubeprober/best-practices/custom_prober', '自定义 Prober'],
              // ['eco-tools/kubeprober/best-practices/alert', '告警'],
              ['eco-tools/kubeprober/best-practices/command_tools', 'Command Line Tools'],
            ]
          },
        ]
      },
    ]
  },
  {
    title: 'FAQ',
    collapsable: true,
    children: [
      'faq/faq',
      'faq/install',
    ]
  },
]
