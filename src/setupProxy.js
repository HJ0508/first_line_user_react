const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://haejun.iptime.org:5000/',
          changeOrigin: true
      })
  )
};