
import React from 'react'
import './Chat.css'
import socket from './socket'





export default function Chat({users, messages, userName, roomId, onAddMessage}) {
    const [messageValue, setMessageValue] = React.useState('')
    const messagesRef = React.useRef(null)

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue
        })
        onAddMessage({userName, text: messageValue})
        setMessageValue('')
        
    }
    
    React.useEffect(() => { 
            messagesRef.current.scrollTo(0, 99999)
    }, [messages])

    return (
        <div className='container' style={{width: '100%', maxWidth: '1000px', minWidth: '300px', height: '80%'}}>
            <div className='containerChat'>

                <div className='row' >

                    <div className='col-4' style={{backgroundColor: '#F5F5F5', padding: '10px', overflow: 'hidden', }}>
                        Комната: <b>{roomId}</b>
                        <hr/>
                        <h6><div className='badge bg-secondary'>Online({users.length}):</div></h6>
                        <ul>
                           {users.map((name, index)=><li key={index} style={{listStyle: 'none'}}><div className='badge bg-success'>{name}</div></li> ) }
                        </ul>
                    </div>

                    <div className='col-8'>
                        <div ref={messagesRef} className='row' style={{height:'600px', overflow: 'auto', margin: '5px'}}>
                            <div>
                                {messages.map((messages, index) => 
                                    <div key={index} className='messages' style={{width: '100%'}}>
                                        <div  style={{float: 'right', color: 'white', paddingRight: '10px'}}>
                                            <span>{messages.userName}</span>
                                        </div>
                                        <p className='p-3 mb-2 bg-primary text-white' style={{borderRadius: '10px', width: "80%", marginLeft: "20%"}}>
                                            {messages.text}
                                        </p>
                                        
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col'>
                        <div className="input-group mb-3">
                            <input value={messageValue} onChange={e=>setMessageValue(e.target.value)} type="text" className="form-control" placeholder="your message" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button onClick={onSendMessage} className="btn btn-primary" type="button" id="button-addon2">SEND</button>
                        </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
                                                            
    )
}
