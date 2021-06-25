const { fs, path } = require('@vuepress/shared-utils')

// const officialPlugins = fs
//   .readdirSync(path.resolve(__dirname, '../../plugin/official'))
//   .map(filename => 'official/' + filename.slice(0, -3))
//   .sort()

module.exports = {
  '/3.16/manual/': [
    '',
    'platform-design',
    {
      title: '协作',
      collapsable: true,
      children: [
        'agile/agile-info',
        'agile/best-practices'
      ]
    },
    {
      title: '部署和管理',
      collapsable: true,
      children: [
        'deploy/deploy-from-git',
        'deploy/deploy-from-image',
        'deploy/config',
        'deploy/config-center',
        'deploy/management',
        'deploy/metrics_logs.md',
        'deploy/rollback',
        'deploy/pipeline',
        'deploy/dice-yml',
        'deploy/branch-rule',
        'deploy/db-migration'
      ]
    },
    {
      title: '测试',
      collapsable: true,
      children: [
        'test/interface-test',
        'test/function-test'
      ]
    },
    //    {
    //      title: '持续集成',
    //      collapsable: true,
    //      children: [
    //        'ci/merge-request',
    //        'ci/triggers',
    //        'ci/auto-deploy',
    //        'ci/rollout',
    //        'ci/best-practices'
    //      ]
    //    },
    {
      title: '微服务',
      collapsable: true,
      children: [
        'microservice/api-gateway',
        'microservice/api-gateway-advanced1',
        'microservice/api-gateway-advanced2',
        'microservice/api-gateway-statuscode',
        'microservice/api-gateway-benchmark',
        'microservice/sign-auth',
        'microservice/api-management',
        'microservice/spring-cloud',
        'microservice/dubbo',
        'microservice/use-apm-monitor-app.md',
        'microservice/tracing.md',
        'microservice/dashboard.md',
        'microservice/dashboard-advanced.md'
      ]
    },
    {
      title: '移动开发',
      collapsable: true,
      children: [
        'mobileapp/basic',
        'mobileapp/framework',
        'mobileapp/local-environment',
        'mobileapp/howto-dev',
        'mobileapp/management',
        'mobileapp/certificates',
        'mobileapp/libraries',
        'mobileapp/ios-ci'
      ]
    },
    {
      title: '运维管理',
      collapsable: true,
      children: [
        'o_m/create-cluster',
        'o_m/resource-scale',
        'o_m/node-labels',
        'o_m/alert-config.md',
        'o_m/custom-metrics.md'
      ]
    },
    {
      title: '命令行工具',
      collapsable: true,
      children: [
        'cli/deploy-by-code',
        'cli/explain-args'
      ]
    },
    {
      title: '开发语言',
      collapsable: true,
      children: [
        'language/java',
        'language/php',
        'language/python',
        'language/nodejs',
      ]
    },
    {
      title: '安全',
      collapsable: true,
      children: [
        'safe/identity-management',
        'safe/isolation',
        'safe/enable-https',
        'safe/api-security',
        'safe/operator-system-security',
        'safe/docker-security',
        'safe/kubernets-security',
        'safe/public-cloud-security',
        'safe/private-cloud-security',
      ]
    },
    {
      title: 'Add-ons',
      collapsable: true,
      children: [
        'addons/',
        'addons/design'
      ]
    },
    {
      title: 'Actions',
      collapsable: true,
      children: [
        'actions/',
        'actions/runner'
      ]
    },
    {
      title: '问题排查和服务支持',
      collapsable: true,
      children: [
        'support/diagnostics'
      ]
    },
    // {
    //   title: '平台安装',
    //   collapsable: true,
    //   children: [
    //     'install/deployment-architecture',
    //     'install/env-requirements',
    //     'install/env-check'
    //   ]
    // }
  ],
  '/3.17/manual/': [
    '',
    'platform-design',
    {
      title: '协作',
      collapsable: true,
      children: [
        'agile/agile-info',
        'agile/best-practices'
      ]
    },
    {
      title: '部署和管理',
      collapsable: true,
      children: [
        'deploy/deploy-from-git',
        'deploy/deploy-from-image',
        'deploy/config',
        'deploy/config-center',
        'deploy/management',
        'deploy/metrics_logs.md',
        'deploy/rollback',
        'deploy/pipeline',
        'deploy/dice-yml',
        'deploy/branch-rule',
        'deploy/db-migration'
      ]
    },
    {
      title: '测试',
      collapsable: true,
      children: [
        'test/interface-test',
        'test/function-test'
      ]
    },
    //    {
    //      title: '持续集成',
    //      collapsable: true,
    //      children: [
    //        'ci/merge-request',
    //        'ci/triggers',
    //        'ci/auto-deploy',
    //        'ci/rollout',
    //        'ci/best-practices'
    //      ]
    //    },
    {
      title: '微服务',
      collapsable: true,
      children: [
        'microservice/api-gateway',
        'microservice/api-gateway-advanced1',
        'microservice/api-gateway-advanced2',
        'microservice/api-gateway-statuscode',
        'microservice/api-gateway-benchmark',
        'microservice/sign-auth',
        'microservice/api-management',
        'microservice/spring-cloud',
        'microservice/dubbo',
        'microservice/use-apm-monitor-app.md',
        'microservice/tracing.md',
        'microservice/dashboard.md',
        'microservice/dashboard-advanced.md'
      ]
    },
    {
      title: '移动开发',
      collapsable: true,
      children: [
        'mobileapp/basic',
        'mobileapp/framework',
        'mobileapp/local-environment',
        'mobileapp/howto-dev',
        'mobileapp/management',
        'mobileapp/certificates',
        'mobileapp/libraries',
        'mobileapp/ios-ci'
      ]
    },
    {
      title: '运维管理',
      collapsable: true,
      children: [
        'o_m/create-cluster',
        'o_m/resource-scale',
        'o_m/node-labels',
        'o_m/alert-config.md',
        'o_m/custom-metrics.md',
        'o_m/logs.md'
      ]
    },
    {
      title: '命令行工具',
      collapsable: true,
      children: [
        'cli/deploy-by-code',
        'cli/explain-args'
      ]
    },
    {
      title: '开发语言',
      collapsable: true,
      children: [
        'language/java',
        'language/php',
        'language/python',
        'language/nodejs',
      ]
    },
    {
      title: '安全',
      collapsable: true,
      children: [
        'safe/identity-management',
        'safe/isolation',
        'safe/enable-https',
        'safe/api-security',
        'safe/operator-system-security',
        'safe/docker-security',
        'safe/kubernets-security',
        'safe/public-cloud-security',
        'safe/private-cloud-security',
      ]
    },
    {
      title: 'Add-ons',
      collapsable: true,
      children: [
        'addons/',
        'addons/design'
      ]
    },
    {
      title: 'Actions',
      collapsable: true,
      children: [
        'actions/',
        'actions/runner'
      ]
    },
    {
      title: '问题排查和服务支持',
      collapsable: true,
      children: [
        'support/diagnostics'
      ]
    },
    // {
    //   title: '平台安装',
    //   collapsable: true,
    //   children: [
    //     'install/deployment-architecture',
    //     'install/env-requirements',
    //     'install/env-check'
    //   ]
    // }
  ],
  '/3.18/manual/': [
    '',
    'platform-design',
    {
      title: '协作',
      collapsable: true,
      children: [
        'agile/agile-info',
        'agile/best-practices'
      ]
    },
    {
      title: '部署和管理',
      collapsable: true,
      children: [
        'deploy/deploy-from-git',
        'deploy/deploy-from-image',
        'deploy/config',
        'deploy/config-center',
        'deploy/management',
        'deploy/metrics_logs.md',
        'deploy/rollback',
        'deploy/pipeline',
        'deploy/dice-yml',
        'deploy/branch-rule',
        'deploy/db-migration'
      ]
    },
    {
      title: '测试',
      collapsable: true,
      children: [
        'test/interface-test',
        'test/function-test'
      ]
    },
    //    {
    //      title: '持续集成',
    //      collapsable: true,
    //      children: [
    //        'ci/merge-request',
    //        'ci/triggers',
    //        'ci/auto-deploy',
    //        'ci/rollout',
    //        'ci/best-practices'
    //      ]
    //    },
    {
      title: '微服务',
      collapsable: true,
      children: [
        'microservice/api-gateway',
        'microservice/api-gateway-advanced1',
        'microservice/api-gateway-advanced2',
        'microservice/api-gateway-statuscode',
        'microservice/api-gateway-benchmark',
        'microservice/sign-auth',
        'microservice/api-management',
        'microservice/spring-cloud',
        'microservice/dubbo',
        'microservice/use-apm-monitor-app.md',
        'microservice/tracing.md',
        'microservice/dashboard.md',
        'microservice/dashboard-advanced.md'
      ]
    },
    {
      title: '移动开发',
      collapsable: true,
      children: [
        'mobileapp/basic',
        'mobileapp/framework',
        'mobileapp/local-environment',
        'mobileapp/howto-dev',
        'mobileapp/management',
        'mobileapp/certificates',
        'mobileapp/libraries',
        'mobileapp/ios-ci'
      ]
    },
    {
      title: '运维管理',
      collapsable: true,
      children: [
        'o_m/create-cluster',
        'o_m/resource-scale',
        'o_m/node-labels',
        'o_m/alert-config.md',
        'o_m/custom-metrics.md',
        'o_m/logs.md'
      ]
    },
    {
      title: '命令行工具',
      collapsable: true,
      children: [
        'cli/deploy-by-code',
        'cli/explain-args'
      ]
    },
    {
      title: '开发语言',
      collapsable: true,
      children: [
        'language/java',
        'language/javascript',
        'language/php',
        'language/python',
      ]
    },
    {
      title: '安全',
      collapsable: true,
      children: [
        'safe/identity-management',
        'safe/isolation',
        'safe/enable-https',
        'safe/api-security',
        'safe/operator-system-security',
        'safe/docker-security',
        'safe/kubernets-security',
        'safe/public-cloud-security',
        'safe/private-cloud-security',
      ]
    },
    {
      title: 'Add-ons',
      collapsable: true,
      children: [
        'addons/',
        'addons/design'
      ]
    },
    {
      title: 'Actions',
      collapsable: true,
      children: [
        'actions/',
        'actions/runner'
      ]
    },
    {
      title: '问题排查和服务支持',
      collapsable: true,
      children: [
        'support/diagnostics'
      ]
    },
    // {
    //   title: '平台安装',
    //   collapsable: true,
    //   children: [
    //     'install/deployment-architecture',
    //     'install/env-requirements',
    //     'install/env-check'
    //   ]
    // }
  ],
  '/3.19/manual/': [
    '',
    'platform-design',
    {
      title: '协作',
      collapsable: true,
      children: [
        'agile/agile-info',
        'agile/best-practices'
      ]
    },
    {
      title: '部署和管理',
      collapsable: true,
      children: [
        'deploy/deploy-from-git',
        'deploy/deploy-from-image',
        'deploy/config',
        'deploy/config-center',
        'deploy/management',
        'deploy/metrics_logs.md',
        'deploy/rollback',
        'deploy/pipeline',
        'deploy/dice-yml',
        'deploy/branch-rule',
        'deploy/db-migration'
      ]
    },
    {
      title: '测试',
      collapsable: true,
      children: [
        'test/interface-test',
        'test/function-test'
      ]
    },
    //    {
    //      title: '持续集成',
    //      collapsable: true,
    //      children: [
    //        'ci/merge-request',
    //        'ci/triggers',
    //        'ci/auto-deploy',
    //        'ci/rollout',
    //        'ci/best-practices'
    //      ]
    //    },
    {
      title: '微服务',
      collapsable: true,
      children: [
        'microservice/api-gateway',
        'microservice/api-gateway-advanced1',
        'microservice/api-gateway-advanced2',
        'microservice/api-gateway-statuscode',
        'microservice/api-gateway-benchmark',
        'microservice/sign-auth',
        'microservice/api-management',
        'microservice/spring-cloud',
        'microservice/dubbo',
        'microservice/use-apm-monitor-app.md',
        'microservice/tracing.md',
        'microservice/dashboard.md',
        'microservice/dashboard-advanced.md'
      ]
    },
    {
      title: '移动开发',
      collapsable: true,
      children: [
        'mobileapp/basic',
        'mobileapp/framework',
        'mobileapp/local-environment',
        'mobileapp/howto-dev',
        'mobileapp/management',
        'mobileapp/certificates',
        'mobileapp/libraries',
        'mobileapp/ios-ci'
      ]
    },
    {
      title: '运维管理',
      collapsable: true,
      children: [
        'o_m/create-cluster',
        'o_m/resource-scale',
        'o_m/node-labels',
        'o_m/alert-config.md',
        'o_m/custom-metrics.md',
        'o_m/logs.md'
      ]
    },
    {
      title: '命令行工具',
      collapsable: true,
      children: [
        'cli/deploy-by-code',
        'cli/explain-args'
      ]
    },
    {
      title: '开发语言',
      collapsable: true,
      children: [
        'language/java',
        'language/javascript',
        'language/php',
        'language/python',
      ]
    },
    {
      title: '安全',
      collapsable: true,
      children: [
        'safe/identity-management',
        'safe/isolation',
        'safe/enable-https',
        'safe/api-security',
        'safe/operator-system-security',
        'safe/docker-security',
        'safe/kubernets-security',
        'safe/public-cloud-security',
        'safe/private-cloud-security',
      ]
    },
    {
      title: 'Add-ons',
      collapsable: true,
      children: [
        'addons/design',
        'addons/out-of-the-box',
        'addons/custom'
      ]
    },
    {
      title: 'Actions',
      collapsable: true,
      children: [
        'actions/',
        'actions/runner'
      ]
    },
    {
      title: '问题排查和服务支持',
      collapsable: true,
      children: [
        'support/diagnostics',
        'support/cicd'
      ]
    },
    // {
    //   title: '平台安装',
    //   collapsable: true,
    //   children: [
    //     'install/deployment-architecture',
    //     'install/env-requirements',
    //     'install/env-check'
    //   ]
    // }
  ],
  '/3.20/manual/': [
    '',
    'platform-design',
    {
      title: '协作',
      collapsable: true,
      children: [
        'agile/agile-info',
        'agile/best-practices'
      ]
    },
    {
      title: '部署和管理',
      collapsable: true,
      children: [
        'deploy/deploy-from-git',
        'deploy/deploy-from-image',
        'deploy/config',
        'deploy/config-center',
        'deploy/management',
        'deploy/metrics_logs.md',
        'deploy/pipeline',
        'deploy/dice-yml',
        'deploy/branch-rule',
        'deploy/db-migration',
        'deploy/resource-management'
      ]
    },
    {
      title: '测试',
      collapsable: true,
      children: [
        'test/interface-test',
        'test/function-test',
        'test/auto-test',
        'test/code-quality'
      ]
    },
    //    {
    //      title: '持续集成',
    //      collapsable: true,
    //      children: [
    //        'ci/merge-request',
    //        'ci/triggers',
    //        'ci/auto-deploy',
    //        'ci/rollout',
    //        'ci/best-practices'
    //      ]
    //    },
    {
      title: '微服务',
      collapsable: true,
      children: [
        'microservice/api-gateway',
        'microservice/api-gateway-advanced1',
        'microservice/api-gateway-advanced2',
        'microservice/api-gateway-statuscode',
        'microservice/api-gateway-benchmark',
        'microservice/sign-auth',
        'microservice/api-management',
        'microservice/spring-cloud',
        'microservice/dubbo',
        'microservice/use-apm-monitor-app.md',
        'microservice/tracing.md',
        'microservice/dashboard.md',
        'microservice/dashboard-advanced.md'
      ]
    },
    {
      title: '移动开发',
      collapsable: true,
      children: [
        'mobileapp/basic',
        'mobileapp/framework',
        'mobileapp/local-environment',
        'mobileapp/howto-dev',
        'mobileapp/management',
        'mobileapp/certificates',
        'mobileapp/libraries',
        'mobileapp/ios-ci'
      ]
    },
    {
      title: '运维管理',
      collapsable: true,
      children: [
        'o_m/create-cluster',
        'o_m/resource-scale',
        'o_m/node-labels',
        'o_m/alert-config.md',
        'o_m/custom-metrics.md',
        'o_m/logs.md'
      ]
    },
    {
      title: '命令行工具',
      collapsable: true,
      children: [
        'cli/deploy-by-code',
        'cli/explain-args'
      ]
    },
    {
      title: '开发语言',
      collapsable: true,
      children: [
        'language/java',
        'language/javascript',
        'language/php',
        'language/python',
      ]
    },
    {
      title: '安全',
      collapsable: true,
      children: [
        'safe/identity-management',
        'safe/isolation',
        'safe/enable-https',
        'safe/api-security',
        'safe/operator-system-security',
        'safe/docker-security',
        'safe/kubernets-security',
        'safe/public-cloud-security',
        'safe/private-cloud-security',
      ]
    },
    {
      title: 'Add-ons',
      collapsable: true,
      children: [
        'addons/design',
        'addons/out-of-the-box',
        'addons/custom'
      ]
    },
    {
      title: 'Actions',
      collapsable: true,
      children: [
        'actions/',
        'actions/runner'
      ]
    },
    {
      title: '问题排查和服务支持',
      collapsable: true,
      children: [
        'support/diagnostics',
        'support/cicd',
        'support/container-info-debug'
      ]
    },
    // {
    //   title: '平台安装',
    //   collapsable: true,
    //   children: [
    //     'install/deployment-architecture',
    //     'install/env-requirements',
    //     'install/env-check'
    //   ]
    // }
  ],
  '/1.0/manual/': [
    '',
    'platform-design',
    {
      title: '协作',
      collapsable: true,
      children: [
        'agile/agile-info',
        'agile/best-practices'
      ]
    },
    {
      title: '部署和管理',
      collapsable: true,
      children: [
        'deploy/deploy-from-git',
        'deploy/deploy-from-image',
        'deploy/config',
        'deploy/config-center',
        'deploy/management',
        'deploy/metrics_logs.md',
        'deploy/pipeline',
        'deploy/dice-yml',
        'deploy/branch-rule',
        'deploy/db-migration',
        'deploy/resource-management'
      ]
    },
    {
      title: '测试',
      collapsable: true,
      children: [
        'test/function-test',
        // 'test/auto-test',
        'test/auto-test-getting-started',
        'test/interface-test',
        'test/code-quality'
      ]
    },
    //    {
    //      title: '持续集成',
    //      collapsable: true,
    //      children: [
    //        'ci/merge-request',
    //        'ci/triggers',
    //        'ci/auto-deploy',
    //        'ci/rollout',
    //        'ci/best-practices'
    //      ]
    //    },
    {
      title: '微服务',
      collapsable: true,
      children: [
        'microservice/service-mesh',
        'microservice/api-gateway',
        'microservice/api-gateway-advanced1',
        'microservice/api-gateway-advanced2',
        'microservice/api-gateway-statuscode',
        'microservice/api-gateway-benchmark',
        'microservice/sign-auth',
        'microservice/api-management',
        'microservice/spring-cloud',
        'microservice/dubbo',
        'microservice/use-apm-monitor-app.md',
        'microservice/tracing.md',
        'microservice/dashboard.md',
        'microservice/dashboard-advanced.md'
      ]
    },
    {
      title: '移动开发',
      collapsable: true,
      children: [
        'mobileapp/basic',
        'mobileapp/framework',
        'mobileapp/local-environment',
        'mobileapp/howto-dev',
        'mobileapp/management',
        'mobileapp/certificates',
        'mobileapp/libraries',
        'mobileapp/ios-ci'
      ]
    },
    {
      title: '边缘计算',
      collapsable: true,
      children: [
        'edge/prepare',
        'edge/site-management',
        'edge/configset-management',
        'edge/deploy-application',
      ]
    },
    {
      title: '运维管理',
      collapsable: true,
      children: [
        'o_m/create-cluster',
        'o_m/resource-scale',
        'o_m/node-labels',
        'o_m/alert-config.md',
        'o_m/custom-metrics.md',
        'o_m/logs.md'
      ]
    },
    {
      title: '命令行工具',
      collapsable: true,
      children: [
        'cli/deploy-by-code',
        'cli/explain-args'
      ]
    },
    {
      title: '开发语言',
      collapsable: true,
      children: [
        'language/java',
        'language/javascript',
        'language/php',
        'language/python',
      ]
    },
    {
      title: '安全',
      collapsable: true,
      children: [
        'safe/identity-management',
        'safe/isolation',
        'safe/enable-https',
        'safe/api-security',
        'safe/operator-system-security',
        'safe/docker-security',
        'safe/kubernets-security',
        'safe/public-cloud-security',
        'safe/private-cloud-security',
      ]
    },
    {
      title: 'Add-ons',
      collapsable: true,
      children: [
        'addons/design',
        'addons/out-of-the-box',
        'addons/custom'
      ]
    },
    {
      title: 'Actions',
      collapsable: true,
      children: [
        'actions/',
        'actions/runner'
      ]
    },
    {
      title: '问题排查和服务支持',
      collapsable: true,
      children: [
        'support/diagnostics',
        'support/cicd'
      ]
    },
    // {
    //   title: '平台安装',
    //   collapsable: true,
    //   children: [
    //     'install/deployment-architecture',
    //     'install/env-requirements',
    //     'install/env-check'
    //   ]
    // }
  ],
}
