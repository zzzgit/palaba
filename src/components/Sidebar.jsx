import { NavLink } from 'react-router-dom'

const navItems = [
	{ id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
	{ id: 'customers', label: 'Customers', icon: 'group', path: '/customers' },
	{ id: 'sales', label: 'Sales', icon: 'shopping_bag', path: '/sales' },
]

export default function Sidebar(){
	return (
		<aside className='sidebar'>
			<div className='sidebar-brand'>
				<div className='sidebar-brand-icon'>
					<span className='material-symbols-outlined'>admin_panel_settings</span>
				</div>
				<div className='sidebar-brand-text'>
					<h1>Palaba</h1>
					<p>Admin Dashboard</p>
				</div>
			</div>

			<nav className='sidebar-nav'>
				{navItems.map(item=> (
					<NavLink
						key={item.id}
						to={item.path}
						className={({ isActive })=> isActive ? 'nav-item active' : 'nav-item'}
					>
						<span className={`material-symbols-outlined${item.id === 'customers' ? ' filled' : ''}`}
							style={item.id === 'customers' ? { fontVariationSettings: "'FILL' 1" } : undefined}
						>
							{item.icon}
						</span>
						{item.label}
					</NavLink>
				))}

				<div className='nav-section-label' style={{ marginTop: '16px' }}>Settings</div>
				<a className='nav-item' href='#'>
					<span className='material-symbols-outlined'>settings</span>
					Configuration
				</a>
			</nav>

			<div className='sidebar-footer'>
				<div className='sidebar-user'>
					<div className='sidebar-user-avatar'>AD</div>
					<div className='sidebar-user-info'>
						<div className='sidebar-user-name'>Admin User</div>
						<div className='sidebar-user-role'>Super Admin</div>
					</div>
					<button className='sidebar-logout-btn' title='Log out'>
						<span className='material-symbols-outlined' style={{ fontSize: '18px' }}>logout</span>
					</button>
				</div>
			</div>
		</aside>
	)
}
