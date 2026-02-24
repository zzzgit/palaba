import { For, createSignal } from 'solid-js'
import '../styles/layout.css'

export default function Sidebar(props){
	const [collapsed, setCollapsed] = createSignal(false)

	const toggleSidebar = ()=> {
		setCollapsed(!collapsed())
		if (props.onCollapsedChange){
			props.onCollapsedChange(!collapsed())
		}
	}

	const navItems = [
		{
			id: 'dashboard', label: 'Dashboard', icon: '📊',
		},
		{
			id: 'customers', label: 'Customers', icon: '👥',
		},
		{
			id: 'sales', label: 'Sales', icon: '💰',
		},
	]

	return (
		<aside class={`sidebar ${collapsed() ? 'collapsed' : ''}`}>
			<div class='sidebar-header'>
				<div class='sidebar-logo'>Admin Panel</div>
				<button class='sidebar-toggle' onClick={toggleSidebar}>
					{collapsed() ? '☰' : '✕'}
				</button>
			</div>
			<nav class='sidebar-nav'>
				<For each={navItems}>{item=> <a
					class={`nav-item ${props.activePage === item.id ? 'active' : ''}`}
					onClick={()=> props.onNavigate(item.id)}
				>
					<span class='nav-icon'>{item.icon}</span>
					<span class='nav-text'>{item.label}</span>
				</a>}</For>
			</nav>
		</aside>
	)
}
