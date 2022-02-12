import express from 'express'
import { APP_PORT, cors, helmet } from './config'
import routes from './routes'
import path from 'path'
import { get_schedules } from './controllers/ScheduleController'
import cors_ from 'cors'
import cron from 'node-cron'
// Set up server
const app = express()
app.use(cors_())
app.use(helmet)
app.use(express.urlencoded({extended: false}));
app.use(express.json())

// Routes
app.use('/public', express.static(path.resolve(__dirname, '../public')))
app.use(routes);

let http = require("http").Server(app);

const io = require("socket.io")
(http,{
  cors: {
    origin: "*",
   methods: ["GET", "POST"]
  },
  allowEIO3: true
});

io.on("connection", function(socket) {
  socket.on("room", async function (data) {
    socket.broadcast.emit("room-"+data.token,data)
  })

  socket.on("user_conected", async function (user) {
  	socket.broadcast.emit("users_conected",user)
  })

  socket.on("finished", async function (user) {
    console.log("finished"+ user.token+" "+user.id)
    socket.broadcast.emit("user_finished-"+user.token,user)
  })
});

http.listen(APP_PORT, () => {
    console.log(`Server on http://localhost:${APP_PORT}`);
})

cron.schedule('* * * * *',async function () {
  await get_schedules()
})

app.locals.io = io;
