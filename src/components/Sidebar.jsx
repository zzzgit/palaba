import { For, Show, createSignal } from 'solid-js'
import { Button } from './ui/Button.jsx'
import '../styles/layout.css'

export default function Sidebar(props){
	const [collapsed, setCollapsed] = createSignal(false)

	const getSidebarClass = ()=> {
		if (collapsed()){
			return 'sidebar collapsed'
		}

		return 'sidebar'
	}

	const getNavItemClass = (item)=> {
		if (props.activePage === item.id){
			return 'nav-item active'
		}

		return 'nav-item'
	}

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
		<aside class={getSidebarClass()}>
			<div class='sidebar-header'>
				<div class='sidebar-logo'>Admin Panel</div>
				<Button
					variant="ghost"
					size="sm"
					class='sidebar-toggle'
					onClick={toggleSidebar}
				>
					<Show when={collapsed()} fallback='✕'>
						☰
					</Show>
				</Button>
			</div>
			<nav class='sidebar-nav'>
				<For each={navItems}>{item=> <a
					class={getNavItemClass(item)}
					onClick={()=> props.onNavigate(item.id)}
				>
					<span class='nav-icon'>{item.icon}</span>
					<span class='nav-text'>{item.label}</span>
				</a>}</For>
			</nav>
		</aside>
	)
}
