const withPWA = require('next-pwa')

const runtimeCaching = require('next-pwa/cache')
runtimeCaching[0].handler = 'StaleWhileRevalidate'

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    publicExcludes: ['!studio/'],
    register: false,
    skipWaiting: false,
    runtimeCaching,
    sw: 'millionstartups-service-worker.js',
  },
  images: {
    domains: ['cdn.sanity.io','assets.vercel.com'],
  },
})
  