import io from 'socket.io-client'

const socket = io('wss://chatroommess.herokuapp.com/', {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  })


export default socket