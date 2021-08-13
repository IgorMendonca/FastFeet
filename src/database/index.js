import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Courier from '../app/models/Courier';
import File from '../app/models/File';
import Item from '../app/models/Item';
import Package from '../app/models/Package';
import Signature from '../app/models/Signature';
import Delivery_problems from '../app/models/Delivery_problems';

import databaseConfig from '../config/database';

const models = [
  User,
  Recipient,
  Courier,
  File,
  Item,
  Package,
  Signature,
  Delivery_problems,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));

    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
