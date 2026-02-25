import { render } from 'solid-js/web'
import { Navigate, Route, Router } from '@solidjs/router'
import MainLayout from './components/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CustomerManagement from './pages/CustomerManagement.jsx'
import SalesManagement from './pages/SalesManagement.jsx'
import Confirm from './components/Confirm.jsx'
import './styles/tailwind.css'
import './styles/global.css'
import './styles/layout.css'

function App(){
	return (
		<>
			<Router>
				<Route path='/' component={MainLayout}>
					<Route path='/' component={()=> <Navigate href='/dashboard' />} />
					<Route path='/dashboard' component={Dashboard} />
					<Route path='/customers' component={CustomerManagement} />
					<Route path='/sales' component={SalesManagement} />
				</Route>
			</Router>
			<Confirm />
		</>
	)
}

render(()=> <App />, document.querySelector('#root'))
