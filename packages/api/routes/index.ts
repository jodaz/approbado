import { Router } from 'express';
import usersRouter from './user.routes';
import authRouter from './auth.routes'
import { isAuthorizedMiddleware } from '../config'
import { Request, Response, NextFunction } from "express";

const routes = Router();

routes.use('/api/users', isAuthorizedMiddleware, usersRouter)
routes.use('/api/auth', authRouter)

export default routes;
