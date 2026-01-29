module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      provider: 'strapi-provider-upload-local',
      providerOptions: {},
    },
  },
  seo: {
    enabled: true,
  },
  'entity-relationship-chart': {
    enabled: true,
  },
});
