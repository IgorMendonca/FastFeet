import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import PackageMail from '../jobs/PackageMail';

import Package from '../models/Package';
import Item from '../models/Item';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';

class PackageController {
  async index(req, res) {
    const { page } = req.query;

    const packageCourier = await Package.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      where: {
        couriers_id: req.params.id_courier,
        canceled_at: null,
      },
    });

    return res.json(packageCourier);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      products: Yup.array(Yup.string()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const packageUpdated = await Package.findByPk(req.params.id);

    await packageUpdated.update(req.body, {
      where: {
        id: packageUpdated,
      },
    });

    return res.json(packageUpdated);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      couriers_id: Yup.number().required(),
      products: Yup.array(Yup.string()).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { id, recipient_id, couriers_id } = await Package.create(req.body);

    const { products } = req.body;

    async function insertItems(items) {
      await Item.create({
        product: items,
        package_id: id,
      });
    }

    products.forEach((index) => {
      insertItems(index);
    });

    const packageData = await Package.findByPk(id, {
      include: [
        {
          model: Courier,
          as: 'courier',
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    await Queue.add(PackageMail.key, {
      packageData,
      products,
    });

    return res.json({
      id,
      recipient_id,
      couriers_id,
      products,
    });
  }

  async delete(req, res) {
    const packageUpdated = await Package.findByPk(req.params.id);

    await packageUpdated.update({
      canceled_at: new Date(),
    });

    return res.json(packageUpdated);
  }
}

export default new PackageController();
