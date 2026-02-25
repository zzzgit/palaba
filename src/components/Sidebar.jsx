import { For, Show, createSignal } from 'solid-js'
import { A } from '@solidjs/router'
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
			id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard',
		},
		{
			id: 'customers', label: 'Customers', icon: '👥', path: '/customers',
		},
		{
			id: 'sales', label: 'Sales', icon: '💰', path: '/sales',
		},
	]

	return (
		<aside class={getSidebarClass()}>
			<div class='sidebar-header'>
				<div class='sidebar-logo'>Admin Panel</div>
				<Button
					variant='ghost'
					size='sm'
					class='sidebar-toggle'
					onClick={toggleSidebar}
				>
					<Show when={collapsed()} fallback='✕'>
						☰
					</Show>
				</Button>
			</div>
			<nav class='sidebar-nav'>
				<For each={navItems}>{item=> <A
					class={getNavItemClass(item)}
					href={item.path}
				>
					<span class='nav-icon'>{item.icon}</span>
					<span class='nav-text'>{item.label}</span>
				</A>}</For>
			</nav>
		</aside>
	)
}
