import express from 'express'
import { APP_PORT, cors, helmet, APP_ENV } from './config'
import { apiRoutes, webRoutes } from './routes'
import path from 'path'

// Set up server
const app = express()
app.use(cors)
app.use(helmet)
app.use(express.urlencoded({extended: false}));
app.use(express.json())
// Static routes
app.use('/static', express.static(path.resolve(__dirname, '../public')));

// Auth iframe
if (APP_ENV === 'testing') {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'index.html'))
    })
}

// Routes
app.use(apiRoutes);
app.use(webRoutes);

app.listen(APP_PORT, () => {
    console.log(`Application started on port ${APP_PORT}!`);
});
