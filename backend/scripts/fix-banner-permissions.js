'use strict';

module.exports = {
  /**
   * Fix permissions for Banner content type
   */
  bootstrap: async ({ strapi }) => {
    try {
      console.log('🔧 Fixing Banner permissions...');

      // Get the public role
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (!publicRole) {
        console.error('❌ Public role not found');
        return;
      }

      console.log('✅ Found public role:', publicRole.id);

      // Get all available permissions for banner
      const allPermissions = await strapi.query('plugin::users-permissions.permission').findMany({
        where: {
          action: {
            $in: [
              'api::banner.banner.find',
              'api::banner.banner.findOne',
              'api::banner.banner.create',
              'api::banner.banner.update',
              'api::banner.banner.delete'
            ]
          }
        }
      });

      console.log('📋 Available permissions:', allPermissions.map(p => p.action));

      // Remove existing banner permissions for public role
      await strapi.query('plugin::users-permissions.permission').deleteMany({
        where: {
          role: publicRole.id,
          action: {
            $startsWith: 'api::banner.banner.'
          }
        }
      });

      console.log('🗑️ Removed existing banner permissions');

      // Create new permissions for public role
      const permissionsToCreate = [
        {
          action: 'api::banner.banner.find',
          role: publicRole.id,
        },
        {
          action: 'api::banner.banner.findOne',
          role: publicRole.id,
        }
      ];

      const createdPermissions = await strapi.query('plugin::users-permissions.permission').createMany({
        data: permissionsToCreate,
      });

      console.log('✅ Created banner permissions:', createdPermissions.length);

      // Get the admin role
      const adminRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'admin' },
      });

      if (adminRole) {
        console.log('✅ Found admin role:', adminRole.id);

        // Remove existing admin banner permissions
        await strapi.query('plugin::users-permissions.permission').deleteMany({
          where: {
            role: adminRole.id,
            action: {
              $startsWith: 'api::banner.banner.'
            }
          }
        });

        // Create full admin permissions for banner
        const adminPermissions = [
          {
            action: 'api::banner.banner.find',
            role: adminRole.id,
          },
          {
            action: 'api::banner.banner.findOne',
            role: adminRole.id,
          },
          {
            action: 'api::banner.banner.create',
            role: adminRole.id,
          },
          {
            action: 'api::banner.banner.update',
            role: adminRole.id,
          },
          {
            action: 'api::banner.banner.delete',
            role: adminRole.id,
          }
        ];

        await strapi.query('plugin::users-permissions.permission').createMany({
          data: adminPermissions,
        });

        console.log('✅ Created admin banner permissions:', adminPermissions.length);
      }

      // Create content-manager permissions
      const contentManagerPermissions = [
        {
          action: 'plugin::content-manager.explorer.create',
          subject: 'api::banner.banner',
          role: adminRole?.id,
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.read',
          subject: 'api::banner.banner',
          role: adminRole?.id,
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.update',
          subject: 'api::banner.banner',
          role: adminRole?.id,
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.delete',
          subject: 'api::banner.banner',
          role: adminRole?.id,
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.publish',
          subject: 'api::banner.banner',
          role: adminRole?.id,
          properties: {},
          conditions: [],
        },
        {
          action: 'plugin::content-manager.explorer.unpublish',
          subject: 'api::banner.banner',
          role: adminRole?.id,
          properties: {},
          conditions: [],
        }
      ];

      await strapi.service('admin::permission').createMany({
        data: contentManagerPermissions,
      });

      console.log('✅ Created content-manager permissions');

      console.log('🎉 Banner permissions fixed successfully!');

    } catch (error) {
      console.error('❌ Error fixing banner permissions:', error);
    }
  },
};
