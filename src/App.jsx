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
				<Route path='/' element={<MainLayout />}>
					<Route index element={<Navigate to='/dashboard' replace />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='customers' element={<CustomerManagement />} />
					<Route path='sales' element={<SalesManagement />} />
				</Route>
			</Routes>
			<Confirm />
		</BrowserRouter>
	)
}
