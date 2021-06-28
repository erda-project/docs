const { fs, path } = require('@vuepress/shared-utils')

// const officialPlugins = fs
//   .readdirSync(path.resolve(__dirname, '../../plugin/official'))
//   .map(filename => 'official/' + filename.slice(0, -3))
//   .sort()

module.exports = {
  '/1.0/manual/': [
    // '',
    {
      title: '关于 Erda',
      collapsable: true,
      children: [
        'about/intro',
        'about/why-erda'
      ]
    },
    {
      title: '快速入门',
      collapsable: true,
      children: [
        'quick-start/premise',
        'quick-start/create-org',
        'quick-start/create-project',
        'quick-start/create-application',
        'quick-start/agile-cooperation',
        'quick-start/agile-dev',
        'quick-start/auto-test',
        'quick-start/microservice',
        'quick-start/edge-publish',
      ]
    },
    {
      title: '部署配置',
      collapsable: true,
      children: [
        'install/requirement',
        'install/step-by-step',
        'install/upgrade'
      ]
    },
    {
      title: '多云管理平台',
      collapsable: true,
      children: [
        'cmp/intro',
        'cmp/cluster-overview',
        'cmp/cluster-management',
        'cmp/cloud-resource',
        'cmp/domain-management',
        'cmp/service-list',
        'cmp/addon-list',
        'cmp/job-list',
        'cmp/dashboard',
        'cmp/report',
        'cmp/alarm-statistics',
        'cmp/alarm-list',
        'cmp/alarm-strategy',
        'cmp/alarm-custom',
      ]
    },
    {
      title: 'DevOps 平台',
      collapsable: true,
      children: [
        'dop/intro',
        'dop/workBench/my-project',
        'dop/workBench/my-application',
        'dop/workBench/api-market',
        'dop/workBench/endpoint-management',
        'dop/workBench/my-endpoint',
        'dop/workBench/addon',
        'dop/workBench/my-approvement',
        'dop/workBench/my-request-approve',
        'dop/workBench/public-project',
        {
          title: '项目',
          collapsable: true,
          children: [
            'dop/project/application-list',
            'dop/project/issues',
            'dop/project/test-case',
            'dop/project/data-bank',
            'dop/project/test-plan',
            'dop/project/params-config',
            'dop/project/dashboard',
            'dop/project/addon',
            'dop/project/resource',
            'dop/project/ticket',
            'dop/project/setting',
          ]
        },
        {
          title: '应用',
          collapsable: true,
          children: [
            'dop/application/code',
            'dop/application/commit',
            'dop/application/branch',
            'dop/application/merge',
            'dop/application/pipeline',
            'dop/application/apim',
            'dop/application/deploy',
            'dop/application/runtime',
            'dop/application/test-quality',
            'dop/application/test-issues',
            'dop/application/test-result',
            'dop/application/release',
            'dop/application/setting',
          ]
        },
      ]
    },
    {
      title: '微服务治理平台',
      collapsable: true,
      children: [
        'msp/intro',
        'msp/topology',
        'msp/monitor-service',
        'msp/monitor-browser',
        'msp/monitor-mobile',
        'msp/error-analysis',
        'msp/trace',
        'msp/service-status',
        'msp/alarm',
        'msp/custom-alarm',
        'msp/alarm-history',
        'msp/dashboard',
        'msp/addon-info',
      ]
    },
    {
      title: '边缘计算平台',
      collapsable: true,
      children: [
        'ecp/intro',
        'ecp/application',
        'ecp/resource',
        'ecp/config-set',
      ]
    },
    {
      title: '管理中心',
      collapsable: true,
      children: [
        'org-center/intro',
        'org-center/project',
        'org-center/certificate',
        'org-center/approve',
        'org-center/announcement',
        'org-center/audit',
        'org-center/setting',
      ]
    },
    {
      title: '平台后台',
      collapsable: true,
      children: [
        'admin/intro',
        'admin/org',
        'admin/user',
        'admin/audit',
        'admin/config',
        'admin/cluster',
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
    // {
    //   title: '开发语言',
    //   collapsable: true,
    //   children: [
    //     'language/java',
    //     'language/javascript',
    //     'language/php',
    //     'language/python',
    //   ]
    // },
    // {
    //   title: '安全',
    //   collapsable: true,
    //   children: [
    //     'safe/identity-management',
    //     'safe/isolation',
    //     'safe/enable-https',
    //     'safe/api-security',
    //     'safe/operator-system-security',
    //     'safe/docker-security',
    //     'safe/kubernets-security',
    //     'safe/public-cloud-security',
    //     'safe/private-cloud-security',
    //   ]
    // },
    // {
    //   title: 'Add-ons',
    //   collapsable: true,
    //   children: [
    //     'addons/design',
    //     'addons/out-of-the-box',
    //     'addons/custom'
    //   ]
    // },
    // {
    //   title: 'Actions',
    //   collapsable: true,
    //   children: [
    //     'actions/',
    //     'actions/runner'
    //   ]
    // },
    // {
    //   title: '问题排查和服务支持',
    //   collapsable: true,
    //   children: [
    //     'support/diagnostics',
    //     'support/cicd'
    //   ]
    // },
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
