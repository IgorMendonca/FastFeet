import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import CourierController from './app/controllers/CourierController';
import FileController from './app/controllers/FileController';
import PackageController from './app/controllers/PackageController';
import TerminationController from './app/controllers/TerminationController';
import CourierFuncController from './app/controllers/CourierFuncController';
import Delivery_ProblemsController from './app/controllers/Delivery_ProblemsController';

const upload = multer(multerConfig);
const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/courier/:id_courier/package', CourierFuncController.index);
routes.put(
  '/courier/:id_courier/package/:id_package/start',
  CourierFuncController.update
);
routes.put(
  '/courier/:id_courier/package/:id_package/end',
  upload.single('file'),
  TerminationController.update
);
routes.get('/courier/:id_courier/termination', TerminationController.index);

routes.get('/package/:id_package/problems', Delivery_ProblemsController.index);
routes.post('/package/:id_package/problems', Delivery_ProblemsController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

routes.post('/couriers', CourierController.store);
routes.put('/couriers/:id', CourierController.update);
routes.get('/couriers', CourierController.index);
routes.delete('/couriers/:id', CourierController.delete);

routes.post('/package', adminMiddleware, PackageController.store);
routes.get('/package/:id_courier', adminMiddleware, PackageController.index);
routes.put('/package/:id', adminMiddleware, PackageController.update);
routes.delete('/package/:id', adminMiddleware, PackageController.delete);

routes.delete(
  '/problem/:id_problem/cancel-delivery',
  Delivery_ProblemsController.delete
);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
