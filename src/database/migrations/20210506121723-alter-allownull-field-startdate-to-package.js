module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('packages', 'start_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('packages', 'start_date', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
