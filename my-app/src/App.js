import './App.scss'
import 'sass'
import Chat from './components/Chat'

// Try to make a horizontal menu at top with Chat, About, Contact

function App() {
  return (
	<div>
		<header>
		</header>
		<body>
			<div className='container'>
				<div className='cta_container'>
					<h1>AI Chat Bot</h1>
					<p>Chat bot to answer all of your needs regarding house cleaning</p>
				</div>
				<Chat />
			</div>
		</body>
	</div>
  )
}

export default App;
