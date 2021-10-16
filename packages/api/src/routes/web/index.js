import express from 'express'
import path from 'path'
import { Router } from 'express';

const webRouter = Router();

/**
 * Serve auth content for iframe
 */
webRouter.use('/auth', express.static(path.join(__dirname, '../../../../auth/build')));
webRouter.get('/auth/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../auth/build', 'index.html'))
})

/**
 * Serve plans content for iframe
 */
webRouter.use('/plans', express.static(path.join(__dirname, '../../../../plans/build')));
webRouter.get('/plans/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../plans/build', 'index.html'))
})

export default webRouter;
