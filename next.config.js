const withPWA = require('next-pwa')

  module.exports = withPWA({  
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      register: true,
      sw: 'ms-service-worker.js',
      publicExcludes: ['!/studio']
    },
    images: {
      domains: ['cdn.sanity.io','assets.vercel.com'],
    }
   })
  