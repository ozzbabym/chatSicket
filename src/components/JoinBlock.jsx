import React from 'react'
import axios from 'axios'



function JoinBlock({onLogin}) {
    const [roomId, setRoomId] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)

    const onEnter = async () => {
        if(!userName || !roomId){
            return alert('неверные данные')
        }
        const obj = {
            roomId,
            userName
        }
        setLoading(true)
        await axios.post('https://chatroommess.herokuapp.com/rooms', obj)
        onLogin(obj)
    }

    return (
        <div>
            <div className='joinBlock'>
                <input className='form-control' placeholder='Room ID' value={roomId} onChange={e => setRoomId(e.target.value)}></input>
                <br />
                <input className='form-control' placeholder='Your Name' value={userName} onChange={e => setUserName(e.target.value)}></input>
                <br />
                <button disabled={isLoading} className='btn btn-success' onClick={onEnter}>
                   {isLoading ? 'ВХОД....' : 'ВОЙТИ'}
                    </button>
            </div>
        </div>
    )
}


export default JoinBlock