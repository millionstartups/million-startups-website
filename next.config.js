const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html',
}
const withPWA = require('next-pwa')

module.exports = withPWA({  
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    publicExcludes: ['!studio/*',],
    sw: 'million-startups-service-worker.js',
    register: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  rewrites: () => [STUDIO_REWRITE],
 }
)