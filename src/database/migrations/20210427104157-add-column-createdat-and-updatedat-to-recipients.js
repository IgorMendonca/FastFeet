module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('recipients', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      await queryInterface.addColumn('recipients', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      await queryInterface.removeColumn('recipients', 'created_at'),
      await queryInterface.removeColumn('recipients', 'updated_at'),
    ]);
  },
};
