import { For } from 'solid-js'
import { useLocation } from '@solidjs/router'
import '../styles/layout.css'

export default function Header(){
	const location = useLocation()

	const getBreadcrumbClass = (crumb)=> {
		if (crumb.active){
			return 'breadcrumb-item active'
		}

		return 'breadcrumb-item'
	}

	const getCurrentPage = ()=> {
		const pathname = location.pathname
		if (pathname === '/') return 'dashboard'
		return pathname.slice(1)
	}

	const getBreadcrumbs = ()=> {
		const page = getCurrentPage()
		const breadcrumbs = [
			{ label: 'Home', path: '/', pageId: 'dashboard' },
		]

		if (page !== 'dashboard'){
			const pageLabels = {
				customers: 'Customer Management',
				sales: 'Sales Management',
			}
			breadcrumbs.push({
				label: pageLabels[page], path: `/${page}`, pageId: page, active: true,
			})
		} else {
			breadcrumbs[0].active = true
		}

		return breadcrumbs
	}

	return (
		<header class='app-header'>
			<div class='breadcrumbs'>
				<For each={getBreadcrumbs()}>
					{(crumb, index)=> <>
						{index() > 0 && <span class='breadcrumb-separator'>/</span>}
						<a
							class={getBreadcrumbClass(crumb)}
							href={crumb.path}
						>
							{crumb.label}
						</a>
					</>}
				</For>
			</div>
			<div class='header-actions'>
				<div class='user-info'>
					<div class='user-avatar'>AD</div>
					<span class='user-name'>Admin User</span>
				</div>
			</div>
		</header>
	)
}
