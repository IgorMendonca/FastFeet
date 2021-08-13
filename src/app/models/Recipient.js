import Sequelize, { Model } from 'sequelize';
import brm from 'br-masks';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        rua: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        estado: Sequelize.STRING,
        cidade: Sequelize.STRING,
        codigo_municipio: Sequelize.VIRTUAL,
        cep: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (recipient) => {
      if (recipient.codigo_municipio) {
        recipient.cep = await brm.cep(recipient.codigo_municipio);
      }
    });
  }
}

export default Recipient;
