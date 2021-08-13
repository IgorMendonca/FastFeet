module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('couriers', 'inactive', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('couriers', 'inactive');
  },
};
