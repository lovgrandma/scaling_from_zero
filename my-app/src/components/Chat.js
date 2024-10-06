import React from 'react'

export default () => {
    const [ log, setLog ] = React.useState([])
    const [ username, setUsername ] = React.useState(null)
    const chatRef = React.useRef()

    const submitChat = value => {
        let temp = [ ...log ]
        temp.push(value)
        setLog(temp)
        chatRef.current.value = ''
    }

    const handleSendChat = React.useCallback(e => {
        if (chatRef?.current?.value) {
            submitChat(chatRef.current.value)
        }
    }, [ log, chatRef?.current ])

    const handleChatInput = React.useCallback(e => {
        // e.preventDefault()
        if (e?.key && (e.key == "Enter" || e.charCode == 13)) {
            if (chatRef?.current?.value) {
                submitChat(chatRef.current.value)
            }
        }
    })

    const handleSignIn = React.useCallback(e => {
        setUsername('MyUser')
    })

    React.useEffect(() => {
        console.log('Use Effect 1', log)
    }, [ log ])

    React.useEffect(() => {
        console.log('Use Effect 2', username)
    }, [ username ])

    const chat = React.useMemo(() => (
        <div>
            {
                log?.map((m, i) => (
                    <div key={i}>{m}</div>
                ))
            }
        </div>
    ), [ log ])

    // Add functionality to add user location info City, Country, Postal Code and paint to DOM
    // Change each chat log such that it shows the users name in normal size text and city in small text
    
    return (
        <div>
            <h1>Chat</h1>
            {
                !username
                    ? <div style={{ display: 'flex', gap: '.5rem' }}>
                        <label>Start your chat</label>
                        <button onClick={handleSignIn}>Sign In</button>
                    </div>
                    : <div>
                        {chat}
                        <input type='text' ref={chatRef} onKeyDown={handleChatInput} />
                        <button onClick={handleSendChat}>Send</button>
                    </div>
            }
        </div>
    )
}