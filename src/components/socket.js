import io from 'socket.io-client'

const socket = io('ws://chatroommess.herokuapp.com')


export default socket