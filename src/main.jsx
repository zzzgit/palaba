import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import './lib/chartSetup.js'
import App from './App.jsx'
import './styles/global.css'
import './styles/layout.css'

const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				blue: {
					500: { value: '#1152d4' },
					600: { value: '#0e44b3' },
				},
			},
		},
	},
})

const content = (
	<StrictMode>
		<ChakraProvider value={system}>
			<App />
		</ChakraProvider>
	</StrictMode>
)

createRoot(document.querySelector('#root')).render(content)
