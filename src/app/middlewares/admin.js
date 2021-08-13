import User from '../models/User';

export default async (req, res, next) => {
  const userIsAdministrator = await User.findByPk(req.userId);

  if (!userIsAdministrator.administrator) {
    return res.status(400).json({ error: 'Access denied' });
  }

  return next();
};
