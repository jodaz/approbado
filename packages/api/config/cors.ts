import Cors from 'cors'
import { ALLOWED_ORIGINS } from './env'

const options: Cors.CorsOptions = {
    origin: ALLOWED_ORIGINS
};

const cors = Cors(options)
  
export { cors }
