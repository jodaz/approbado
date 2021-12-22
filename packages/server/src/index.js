import express from 'express'
import { APP_PORT, cors, helmet } from './config'
import routes from './routes'
import path from 'path'
import cors_ from 'cors'
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
});

http.listen(APP_PORT, () => {
    console.log(`Server on http://localhost:${APP_PORT}`);
})

app.locals.io = io;

