module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('files', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('files', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('files', 'updated_at'),
      queryInterface.removeColumn('files', 'created_at'),
    ]);
  },
};
