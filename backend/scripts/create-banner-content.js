'use strict';

module.exports = {
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap: async ({ strapi }) => {
    // Create Banner content type
    const bannerContentType = await strapi.contentType('api::banner.banner').create({
      data: {
        name: 'Banner',
        description: 'Banner rotativo para el homepage',
        displayName: 'Banner',
        pluralName: 'Banners',
        kind: 'collectionType',
        options: {
          draftAndPublish: true,
        },
        attributes: {
          title: {
            type: 'string',
            required: true,
            maxLength: 100,
          },
          description: {
            type: 'text',
            required: false,
          },
          image: {
            type: 'media',
            multiple: false,
            required: true,
            allowedTypes: ['images'],
          },
          link: {
            type: 'string',
            required: false,
          },
          link_text: {
            type: 'string',
            required: false,
            maxLength: 50,
          },
          position: {
            type: 'integer',
            required: true,
            default: 1,
          },
          is_active: {
            type: 'boolean',
            required: true,
            default: true,
          },
        },
      },
    });

    // Create permissions for Banner
    await strapi.service('admin::permission').createMany({
      data: [
        {
          action: 'plugin::content-manager.explorer.create',
          subject: 'api::banner.banner',
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.read',
          subject: 'api::banner.banner',
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.update',
          subject: 'api::banner.banner',
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.delete',
          subject: 'api::banner.banner',
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.publish',
          subject: 'api::banner.banner',
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.unpublish',
          subject: 'api::banner.banner',
          properties: {},
          conditions: [],
        },
      ],
    });

    // Create API roles permissions
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      await strapi.query('plugin::users-permissions.permission').createMany({
        data: [
          {
            action: 'api::banner.banner.find',
            role: publicRole.id,
          },
          {
            action: 'api::banner.banner.findOne',
            role: publicRole.id,
          },
        ],
      });
    }

    console.log('✅ Banner content type created successfully');
    console.log('✅ Permissions configured for Banner content type');
  },
};
