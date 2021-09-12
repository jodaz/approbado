import express from 'express'
import helmet from 'helmet'
import { APP_PORT, cors } from './config'
import routes from './routes'

// Set up server
const app = express()
app.use(helmet())
app.use(cors)
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(routes);

app.listen(APP_PORT, () => {
  console.log(`Application started on port ${APP_PORT}!`);
});
