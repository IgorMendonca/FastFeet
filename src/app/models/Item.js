import Sequelize, { Model } from 'sequelize';

class Item extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        package_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Package, { foreignKey: 'package_id', as: 'package' });
  }
}

export default Item;
