module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('signatures', 'created_at', {
        type: Sequelize.DATE,
      }),
      await queryInterface.addColumn('signatures', 'updated_at', {
        type: Sequelize.DATE,
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      await queryInterface.removeColumn('signatures', 'created_at'),
      await queryInterface.removeColumn('signatures', 'updated_at'),
    ]);
  },
};
