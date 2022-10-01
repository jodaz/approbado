import path from 'path'
import * as rfs from 'rotating-file-stream'

export const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, '../../logs')
})
