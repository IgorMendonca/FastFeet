import * as Yup from 'yup';

import Courier from '../models/Courier';
import File from '../models/File';
import User from '../models/User';

class CourierController {
  async index(req, res) {
    const couriers = await Courier.findAll({
      where: {
        inactive: false,
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const courierExists = await Courier.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (courierExists) {
      return res.status(400).json({ error: 'Courier already exists' });
    }

    const userIsAdministrator = await User.findByPk(req.userId);

    if (!userIsAdministrator.administrator) {
      return res.status(400).json({ error: 'Access denied' });
    }

    const { id, name, email } = await Courier.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const userIsAdministrator = await User.findByPk(req.userId);

    if (!userIsAdministrator.administrator) {
      return res.status(400).json({ error: 'Access denied' });
    }

    const courierExists = await Courier.findOne({
      where: {
        email: req.body.email,
        inactive: false,
      },
    });

    if (courierExists) {
      return res.status(400).json({ error: 'Courier already exists' });
    }

    const courier = await Courier.findByPk(req.params.id);

    if (courier.inactive) {
      return res.status(401).json({ error: 'This courier is inactive' });
    }

    const { name, email, avatar_id } = await courier.update(req.body);

    return res.json({
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const userIsAdministrator = await User.findByPk(req.userId);

    if (!userIsAdministrator.administrator) {
      return res.status(400).json({ error: 'Access denied' });
    }

    const courier = await Courier.findByPk(req.params.id);

    if (!courier) {
      return res.status(401).json({ error: 'Courier not exists' });
    }

    if (courier.inactive) {
      return res
        .status(401)
        .json({ error: 'This courier is already inactive' });
    }

    await courier.update({
      inactive: true,
    });

    return res.json();
  }
}

export default new CourierController();
