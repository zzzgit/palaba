import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './lib/chartSetup.js'
import App from './App.jsx'
import './styles/global.css'
import './styles/layout.css'

const theme = extendTheme({
	config: {
		initialColorMode: 'light',
		useSystemColorMode: false,
	},
	styles: {
		global: {
			body: {
				bg: '#f6f6f8',
				color: '#0f172a',
			},
		},
	},
	components: {
		Modal: {
			baseStyle: {
				dialog: {
					bg: '#ffffff',
					borderColor: '#e2e8f0',
					border: '1px solid',
					borderRadius: '12px',
					boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
				},
				header: {
					color: '#0f172a',
					fontSize: '17px',
					fontWeight: '700',
					paddingBottom: '0',
				},
				body: {
					color: '#475569',
				},
				footer: {
					paddingTop: '8px',
				},
			},
		},
		Input: {
			defaultProps: {
				variant: 'outline',
			},
			baseStyle: {
				field: {
					borderColor: '#e2e8f0',
					bg: '#ffffff',
					color: '#0f172a',
					_placeholder: { color: '#94a3b8' },
					_focus: {
						borderColor: '#1152d4',
						boxShadow: '0 0 0 1px #1152d4',
					},
				},
			},
		},
		Select: {
			defaultProps: {
				variant: 'outline',
			},
			baseStyle: {
				field: {
					borderColor: '#e2e8f0',
					bg: '#ffffff',
					color: '#0f172a',
					_focus: { borderColor: '#1152d4' },
				},
			},
		},
		Textarea: {
			defaultProps: {
				variant: 'outline',
			},
			baseStyle: {
				borderColor: '#e2e8f0',
				bg: '#ffffff',
				color: '#0f172a',
				_focus: { borderColor: '#1152d4', boxShadow: '0 0 0 1px #1152d4' },
			},
		},
		Button: {
			baseStyle: {
				fontWeight: '600',
				borderRadius: '8px',
			},
			defaultProps: {
				colorScheme: 'blue',
			},
		},
		FormLabel: {
			baseStyle: {
				color: '#475569',
				fontSize: '14px',
				fontWeight: '500',
				marginBottom: '6px',
			},
		},
	},
	colors: {
		blue: {
			500: '#1152d4',
			600: '#0e44b3',
		},
	},
})

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</StrictMode>,
)
