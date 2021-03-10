const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors')
// const userRoom = require('./files/schema/userRoom')

const app = express()


const server = require('http').Server(app)
const io = require('socket.io')(server)

//=======================================
// mongoose.connect('mongodb+srv://Ozz:1234@cluster0.smou3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
//     useNewUrlParser: true,    
//     useUnifiedTopology: true
// }).then(() => console.log( 'Database Connected' )).catch(e=>console.error(e))


//=======================================

app.use(express.json())
app.use(cors())

let port = process.env.PORT || 9999

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
