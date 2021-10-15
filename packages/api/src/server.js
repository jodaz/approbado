import express from 'express'
import { APP_PORT, cors, helmet, APP_ENV } from './config'
import routes from './routes'
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
app.use('/auth', express.static(path.join(__dirname, '../../auth/build')));
app.get('/auth/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../auth/build', 'index.html'))
})
app.use('/plans', express.static(path.join(__dirname, '../../plans/build')));
app.get('/plans/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../plans/build', 'index.html'))
})

// API routes
app.use(routes);

app.listen(APP_PORT, () => {
    console.log(`Application started on port ${APP_PORT}!`);
});
