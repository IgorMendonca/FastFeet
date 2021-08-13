module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('couriers', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'files',
        key: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('couriers', 'avatar_id');
  },
};
