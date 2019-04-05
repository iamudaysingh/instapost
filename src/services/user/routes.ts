import { Router } from 'express';
import userController from './Controller';

const router = Router();

router

  .get(
    '/',
    userController.get,
  )
  .post(
    '/',
    userController.post,
  )
  .put(
    '/',
    userController.put,
  )
  .delete(
    '/:id',
    userController.delete,
  );

export default router;
