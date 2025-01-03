import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Bmob 文档中心",
  description: "Bmob 开发文档、API 文档、SDK 使用指南",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'API 指南', link: '/bmob-api-guide' },
      { text: 'API 文档', link: '/api/' }
    ],
    
    sidebar: {
      '/api/': [
        {
          text: 'API 文档',
          items: [
            { text: '简介', link: '/api/' },
            { text: '数据操作', link: '/api/data' },
            { text: '查询操作', link: '/api/query' },
            { text: '用户管理', link: '/api/users' },
            { text: '文件管理', link: '/api/files' },
            { text: '云函数', link: '/api/functions' },
            { text: '实时数据', link: '/api/realtime' },
            { text: '错误处理', link: '/api/errors' },
            { text: '安全指南', link: '/api/security' }
          ]
        }
      ],
      '/': [
        {
          text: '指南',
          items: [
            { text: 'API 开发指南', link: '/bmob-api-guide' },
            { text: '示例代码', link: '/api-examples' }
          ]
        }
      ]
    }
  }
}) 