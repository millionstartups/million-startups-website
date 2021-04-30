const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html',
}
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
runtimeCaching[0].handler = 'StaleWhileRevalidate'

module.exports = withPWA({  
  images: {
    domains: ['cdn.sanity.io'],
  },
  rewrites: () => [STUDIO_REWRITE],
 }
)