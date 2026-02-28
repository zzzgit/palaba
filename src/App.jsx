import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CustomerManagement from './pages/CustomerManagement.jsx'
import SalesManagement from './pages/SalesManagement.jsx'
import Confirm from './components/Confirm.jsx'

export default function App(){
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />} path='/'>
					<Route element={<Navigate replace to='/dashboard' />} index />
					<Route element={<Dashboard />} path='dashboard' />
					<Route element={<CustomerManagement />} path='customers' />
					<Route element={<SalesManagement />} path='sales' />
				</Route>
			</Routes>
			<Confirm />
		</BrowserRouter>
	)
}
