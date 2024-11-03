import React from 'react'

export default props => {
    const [ log, setLog ] = React.useState([])
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
    
    console.log('Props', props)
    return (
        <div className='container'>
            <div className='cta_container'>
                <h1>AI Chat Bot</h1>
                <p>Chat bot to answer all of your needs regarding house cleaning</p>
            </div>
            <div>
                <h1>Chat</h1>
                {
                    !props.username
                        ? <div>
                            <label>Sign in to use the chat</label>
                        </div>
                        : <div>
                            {chat}
                            <input type='text' ref={chatRef} onKeyDown={handleChatInput} />
                            <button onClick={handleSendChat}>Send</button>
                        </div>
                }
            </div>
        </div>
    )
}