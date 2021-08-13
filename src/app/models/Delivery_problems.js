import Sequelize, { Model } from 'sequelize';

class Delivery_problems extends Model {
  static init(sequelize) {
    super.init(
      {
        package_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Package, {
      foreignKey: 'package_id',
      as: 'package',
    });
  }
}

export default Delivery_problems;
