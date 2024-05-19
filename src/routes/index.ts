import { Router } from "express";
import carsRouter from './cars';
import uploadsRouter from './uploads';
import usersRouter from './users';
import rentalsRouter from './rentals';

const router = Router();

router.use('/cars', carsRouter);
router.use('/uploads', uploadsRouter);
router.use('/users', usersRouter);
router.use('/rentals', rentalsRouter);

export default router;