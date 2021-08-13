module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('packages', 'signature_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'signatures',
          key: 'id',
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL',
        },
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([
      await queryInterface.removeColumn('packages', 'signature_id'),
    ]);
  },
};
