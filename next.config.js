const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html',
}
const withPWA = require('next-pwa')
const runTimeCache = require('next-pwa/cache')
module.exports = withPWA({  
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    publicExcludes: ['!studio/*', '!fonts/*',],
    sw: 'million-startups-service-worker.js',
    register: true,
    runTimeCache,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  rewrites: () => [STUDIO_REWRITE],
 }
)