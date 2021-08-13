module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('items', 'package_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'packages',
        key: 'id',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('items', 'package_id');
  },
};
