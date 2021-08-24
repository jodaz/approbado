import express, { Application } from 'express'
import helmet from 'helmet'
import { APP_PORT, cors } from './config'
import routes from './routes'

const app: Application = express()
app.use(helmet())
app.use(cors)
app.use(express.json())
app.use(routes);

app.listen(APP_PORT, () => {
  console.log(`Application started on port ${APP_PORT}!`);
});
