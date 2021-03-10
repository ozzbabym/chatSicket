import io from 'socket.io-client'

const socket = io('wss://chatroommess.herokuapp.com/')


export default socket