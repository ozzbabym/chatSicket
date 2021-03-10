const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors')
// const userRoom = require('./files/schema/userRoom')

const app = express()

let port = process.env.PORT || 9999

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://chatroommess.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors({origin: 'https://chatroommess.herokuapp.com'}))

const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "https://chatroommess.herokuapp.com",
      methods: ["GET", "POST"]
    }
  })

//=======================================
// mongoose.connect('mongodb+srv://Ozz:1234@cluster0.smou3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
//     useNewUrlParser: true,    
//     useUnifiedTopology: true
// }).then(() => console.log( 'Database Connected' )).catch(e=>console.error(e))


//=======================================

app.use(express.json())




const rooms = new Map()

app.get('/rooms/:id', (req, res) => {
    
    const {id: roomId} = req.params
    const obj = rooms.has(roomId)
    ?{
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()]
    }
    :{
        users: [], messages: []
    }
    res.json(obj)
})


app.post('/rooms', (req, res) => {
    const { roomId, userName } = req.body
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []]
        ]))
    }

    res.send()
})


io.on('connection', socket => {
    socket.on('ROOM:JOIN', ({roomId, userName})=> {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()]
        socket.to(roomId).emit('ROOM:SET_USERS', users)
    })

    socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text})=> {
        const obj = {
            
            userName,
            text
        }
        rooms.get(roomId).get('messages').push(obj)
        socket.to(roomId).emit('ROOM:NEW_MESSAGE', obj)
        
    })
    
    
    
    socket.on('disconnect', () =>{
        
        rooms.forEach((value, roomId) => {
            if(Object.keys(Object.fromEntries(value.get('users'))).length===1)
            {
                rooms.delete(roomId) 
            }
            if(value.get('users').delete(socket.id)){
                const users = [...value.get('users').values()]
                socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users)
            }
        })
    })
})



server.listen(port, (err) => {
    if (err) throw Error(err)
    console.log(`Сервер запущен на порту ${port}!`)
})
