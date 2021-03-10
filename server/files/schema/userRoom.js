const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomsUsersSchema = new Schema({
    roomId: String,  
    userName: String,
   
    
})

const UserRoom = mongoose.model('RoomUser', RoomsUsersSchema)

module.exports = UserRoom