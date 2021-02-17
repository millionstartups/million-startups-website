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
  future: {
    webpack5: true
  },
  webpack: function (config, options) {
    console.log('webpack ' + options.webpack.version); // 5.18.0
    config.experiments = {};
    return config;
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    publicExcludes: ['!studio/*', '!fonts/*',],
    sw: 'million-startups-service-worker.js',
    register: true,
    runtimeCaching
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  rewrites: () => [STUDIO_REWRITE],
 }
)