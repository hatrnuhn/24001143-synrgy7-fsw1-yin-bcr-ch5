import { Router } from "express";
import carsRouter from './cars';
import uploadsRouter from './uploads';
import usersRouter from './users';

const router = Router();

router.use('/cars', carsRouter);
router.use('/uploads', uploadsRouter);
router.use('/users', usersRouter);

export default router;