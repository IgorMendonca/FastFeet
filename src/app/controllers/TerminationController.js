import { Op } from 'sequelize';

import Package from '../models/Package';
import Signature from '../models/Signature';

class TerminationController {
  async index(req, res) {
    const packageCourier = await Package.findAll({
      where: {
        couriers_id: req.params.id_courier,
        canceled_at: null,
        end_date: {
          [Op.not]: null,
        },
      },
    });

    return res.json(packageCourier);
  }

  async update(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'Missing the signature' });
    }

    const { originalname: name, filename: path } = req.file;

    const signature = await Signature.create({
      name,
      path,
    });

    const packageTermination = await Package.findOne({
      where: {
        id: req.params.id_package,
        couriers_id: req.params.id_courier,
        canceled_at: null,
        start_date: {
          [Op.not]: null,
        },
      },
    });

    if (!packageTermination) {
      return res
        .status(401)
        .json({ error: "This courier don't have this package" });
    }

    packageTermination.end_date = new Date();
    packageTermination.signature_id = signature.id;

    packageTermination.save();

    return res.json(packageTermination);
  }
}

export default new TerminationController();
