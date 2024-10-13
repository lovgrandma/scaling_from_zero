import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import 'sass'
import Components from './Components'

// Try to make a horizontal menu at top with Chat, About, Contact

export default props => {
	const [ username, setUsername ] = React.useState(null) // Sign in state
	const [ session, setSession ] = React.useState(null)

	const handleSignIn = React.useCallback(e => {
		const o = {
			username: 'MyUser'
		}
		localStorage.setItem('session', JSON.stringify(o))
        setUsername('MyUser')
    })

	React.useEffect(() => {
		if (window?.localStorage) {
			const temp = window?.localStorage?.getItem('session')
			if (temp) {
				const parsed = JSON.parse(temp)
				if (parsed?.username) {
					setUsername(parsed.username)
				}
				if (parsed) {
					setSession(parsed)
				}
			}
		}
	}, [ username ])

	// checkMobile Object ... isIos, isAndroid, model
	// canPlayVideo ... hasInteracted, iOS - HLS, Anything MpegDASH
	// EventListener Global

	return (
		<React.Fragment>
			<header>
			</header>
			<body>
				{
					!username
						? <button onClick={handleSignIn}>Sign In</button>
						: null
				}
				<Routes>
					<Route path='/' element={<Components.Main { ...props } username={username} />}/>
					<Route path='/chat' element={<Components.Chat { ...props } username={username} />}/>
					<Route path='/anime' element={<Components.Anime { ...props } username={username} />}/>
				</Routes>
			</body>
		</React.Fragment>
	)
}

