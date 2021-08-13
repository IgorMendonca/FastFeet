import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://127.0.0.1:3239/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default File;
