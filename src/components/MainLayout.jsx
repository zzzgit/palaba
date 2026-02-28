import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Banner from './Banner.jsx'

export default function MainLayout(){
	return (
		<div className='app-layout'>
			<Sidebar />
			<div className='main-area'>
				<Banner />
				<div className='content-wrapper'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
