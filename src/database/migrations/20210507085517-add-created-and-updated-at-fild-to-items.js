module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('items', 'created_at', {
        type: Sequelize.DATE,
      }),
      await queryInterface.addColumn('items', 'updated_at', {
        type: Sequelize.DATE,
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      await queryInterface.removeColumn('items', 'created_at'),
      await queryInterface.removeColumn('items', 'updated_at'),
    ]);
  },
};
