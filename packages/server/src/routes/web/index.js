import express from 'express'
import path from 'path'
import { Router } from 'express';

const webRouter = Router();

/**
 * Serve auth content for iframe
 */
webRouter.use('/', express.static(path.join(__dirname, '../../../../frames/build')));
webRouter.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../../frames/build', 'index.html'))
})

export default webRouter;
