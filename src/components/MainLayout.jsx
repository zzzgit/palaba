import { For, createSignal } from 'solid-js'
import { useLocation } from '@solidjs/router'
import Sidebar from './Sidebar.jsx'
import Banner from './Banner.jsx'
import '../styles/layout.css'

export default function MainLayout(props){
	const location = useLocation()
	const [sidebarCollapsed, setSidebarCollapsed] = createSignal(false)

	const getBodyClass = ()=> {
		if (sidebarCollapsed()){
			return 'holy-grail-body sidebar-collapsed'
		}

		return 'holy-grail-body'
	}

	const getBreadcrumbClass = (crumb)=> {
		if (crumb.active){
			return 'breadcrumb-item active'
		}

		return 'breadcrumb-item'
	}

	const getCurrentPage = ()=> {
		const pathname = location.pathname
		if (pathname === '/'){ return 'dashboard' }
		return pathname.slice(1)
	}

	const getBreadcrumbs = ()=> {
		const page = getCurrentPage()
		const breadcrumbs = [
			{
				label: 'Home', path: '/', pageId: 'dashboard',
			},
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
		<div class='holy-grail-layout'>
			<Banner />
			<div class={getBodyClass()}>
				<Sidebar
					activePage={getCurrentPage()}
					onCollapsedChange={setSidebarCollapsed}
				/>
				<main class='holy-grail-content'>
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
					<div class='content-wrapper'>
						{props.children}
					</div>
				</main>
			</div>
		</div>
	)
}
