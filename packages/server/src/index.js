import express from 'express'
import { APP_PORT, cors, helmet } from './config'
import routes from './routes'
import path from 'path'

// Set up server
const app = express()
app.use(cors)
app.use(helmet)
app.use(express.urlencoded({extended: false}));
app.use(express.json())

// Routes
app.use('/public', express.static(path.resolve(__dirname, '../public')))
app.use(routes);

app.listen(APP_PORT, () => {
    console.log(`Application started on port ${APP_PORT}!`);
});
