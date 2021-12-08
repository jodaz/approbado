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

const io = require("socket.io")(http,
   { 
  cors: {    
    origin: "*",    
    methods: ["GET", "POST"]  
  },
  allowEIO3: true 
});


io.on("connection", function(socket) {
 
  socket.on("chat_message",function(message){
    socket.broadcast.emit("new_message",message)
  })
 
  socket.on("user_conected",function(user){
  	console.log(user_conected)
    socket.broadcast.emit("users_conected",user)
  })
 
  socket.on('user_inactive', (user) => {
     socket.broadcast.emit("users_inactive",user)
  });

  socket.on('notifications', (notification) => {
     socket.broadcast.emit("notification",notification)
  });

});

//import { Socket } from 'socket.io';
//const io: Socket = req.app.locals.io;
//io.emit('notification',insert_notification.rows[0])
        
http.listen(APP_PORT, () => {
    console.log(`Server on http://localhost:${APP_PORT}`);
})

app.locals.io = io;

