import * as Yup from 'yup';

import Recipient from '../models/Recipient';
import User from '../models/User';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      codigo_municipio: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userIsAdministrator = await User.findByPk(req.userId);

    if (!userIsAdministrator.administrator) {
      return res.status(400).json({ error: 'Access denied' });
    }

    const {
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      codigo_municipio,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      codigo_municipio,
    });
  }
}

export default new RecipientController();
