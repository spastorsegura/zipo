export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  secrets: {
    encryptionKey: 'zipo-secret-key-123',
  },
  // Disable unused features to save memory
  flags: {
    nps: false,
    promoteEE: false,
  },
});
