export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', true),
  },
  url: env('PUBLIC_URL', env('URL_DEPLOY', 'http://localhost:1337')),
  // Optimize for low memory
  http: {
    serverOptions: {
      keepAliveTimeout: 65000,
      headersTimeout: 66000,
    },
  },
});
