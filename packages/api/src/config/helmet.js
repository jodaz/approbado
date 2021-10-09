import Helmet from 'helmet'
import { ALLOWED_ORIGINS } from './env'

export const helmet = Helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            'frame-ancestors': ["'self'", ...ALLOWED_ORIGINS]
        }
    },
    frameguard: {
        action: 'sameorigin'
    }
})
