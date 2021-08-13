import { isBefore, isAfter, setHours, setMinutes, setSeconds } from 'date-fns';
import { Op } from 'sequelize';

import Package from '../models/Package';

class CourierFuncController {
  async index(req, res) {
    const packageCourier = await Package.findAll({
      where: {
        couriers_id: req.params.id_courier,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(packageCourier);
  }

  async update(req, res) {
    const retreatPackage = await Package.findOne({
      where: {
        id: req.params.id_package,
        couriers_id: req.params.id_courier,
        canceled_at: null,
        start_date: null,
      },
    });

    if (!retreatPackage) {
      return res
        .status(401)
        .json({ error: "This courier don't have this package" });
    }

    const start = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const end = setSeconds(setMinutes(setHours(new Date(), 18), 0), 0);

    const retreatRealized = await Package.findAll({
      where: {
        couriers_id: req.params.id_courier,
        start_date: {
          [Op.between]: [start, end],
        },
      },
    });

    if (retreatRealized.length >= 5) {
      return res
        .status(401)
        .json({ error: 'Courier reached the retreat limit today' });
    }

    const hour = new Date();

    if (isBefore(hour, start) || isAfter(hour, end)) {
      return res
        .status(401)
        .json({ error: 'A retreat can only be made during business hours' });
    }

    retreatPackage.start_date = await new Date();

    retreatPackage.save();

    return res.json(retreatPackage);
  }
}

export default new CourierFuncController();
