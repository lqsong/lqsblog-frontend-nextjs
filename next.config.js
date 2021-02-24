module.exports = {
    env: {
      APP_STATIC_LIBURL: process.env.APP_STATIC_LIBURL,
      APP_API_HOST: process.env.APP_API_HOST,
      APP_SITE_NAME: process.env.APP_SITE_NAME,
    },
    async rewrites() {
      return [
        {
          source: '/article',
          destination: '/article/detail', // /article/:cname 页面针对detail做了验证
        }
      ]
    },
  }
  