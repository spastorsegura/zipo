export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  // Temporarily remove encryption to access tokens
  // secrets: {
  //   encryptionKey: env('API_TOKEN_ENCRYPTION_KEY') || env('ENCRYPTION_KEY') || 'my-secret-key-1234567890123456',
  // },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
