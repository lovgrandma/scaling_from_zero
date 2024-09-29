import React from 'react'

export default () => {
    const [ log, setLog ] = React.useState([])
    const chatRef = React.useRef()

    const handleSendChat = React.useCallback(e => {
        if (chatRef?.current?.value) {
            const value = chatRef.current.value
            let temp = [ ...log ]
            temp.push(value)
            setLog(temp)
            chatRef.current.value = ''
        }
    }, [ log, chatRef?.current ])
    
    return (
        <div>
            <h1>Chat</h1>
            <div>
                {
                    log?.map((m, i) => (
                        <div key={i}>{m}</div>
                    ))
                }
            </div>
            <input type='text' ref={chatRef} />
            <button onClick={handleSendChat}>Send</button>
        </div>
    )
}