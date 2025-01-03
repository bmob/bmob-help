import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Bmob 文档中心",
  description: "Bmob 开发文档、API 文档、SDK 使用指南",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'API 文档', link: '/api/' }
    ],
    
    sidebar: {
      '/api/': [
        {
          text: 'API 文档',
          items: [
            { text: '简介', link: '/api/' },
            { text: '数据表操作', link: '/api/table' },
            { text: '用户管理', link: '/api/users' },
            { text: '文件管理', link: '/api/files' },
            { text: '云函数', link: '/api/functions' },
            { text: '数据实时功能', link: '/api/realtime' }
          ]
        }
      ]
    }
  }
}) 