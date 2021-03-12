import io from 'socket.io-client'

const socket = io('wss://chatroommess.herokuapp.com/', {transports: ['polling']})

export default socket