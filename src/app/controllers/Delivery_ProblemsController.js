import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import CancelationMail from '../jobs/CancelationMail';

import Delivery_problems from '../models/Delivery_problems';
import Package from '../models/Package';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';

class Delivery_ProblemsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().min(15).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const packageProblem = await Package.findByPk(req.params.id_package);

    if (!packageProblem) {
      return res.status(401).json({ error: 'Package not Found' });
    }

    const { description } = req.body;

    const problem = await Delivery_problems.create({
      description,
      package_id: req.params.id_package,
    });

    return res.json(problem);
  }

  async index(req, res) {
    const packageProblem = await Package.findByPk(req.params.id_package);

    if (!packageProblem) {
      return res.status(401).json({ error: 'Package not Found' });
    }

    const problems = await Delivery_problems.findAll({
      where: {
        package_id: req.params.id_package,
      },
      include: [
        {
          model: Package,
          as: 'package',
          attributes: ['id', 'recipient_id', 'couriers_id'],
        },
      ],
    });

    return res.json(problems);
  }

  async delete(req, res) {
    const problem = await Delivery_problems.findByPk(req.params.id_problem);

    if (!problem) {
      return res.status(401).json({ error: 'Problem not Found' });
    }

    const packageProblem = await Package.findByPk(problem.package_id, {
      include: [
        {
          model: Courier,
          as: 'courier',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
    });

    packageProblem.canceled_at = new Date();

    packageProblem.save();

    await Queue.add(CancelationMail.key, {
      packageProblem,
      problem,
    });

    return res.json(packageProblem);
  }
}

export default new Delivery_ProblemsController();
