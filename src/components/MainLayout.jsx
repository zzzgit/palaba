import { For, createSignal } from 'solid-js'
import Sidebar from './Sidebar.jsx'
import Banner from './Banner.jsx'
import '../styles/layout.css'

export default function MainLayout(props){
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

	const getBreadcrumbs = ()=> {
		const page = props.currentPage || 'dashboard'
		const breadcrumbs = [
			{ label: 'Home', path: 'dashboard' },
		]

		if (page !== 'dashboard'){
			const pageLabels = {
				customers: 'Customer Management',
				sales: 'Sales Management',
			}
			breadcrumbs.push({
				label: pageLabels[page], path: page, active: true,
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
					activePage={props.currentPage}
					onNavigate={props.onNavigate}
					onCollapsedChange={setSidebarCollapsed}
				/>
				<main class='holy-grail-content'>
					<div class='breadcrumbs'>
						<For each={getBreadcrumbs()}>
							{(crumb, index)=> <>
								{index() > 0 && <span class='breadcrumb-separator'>/</span>}
								<a
									class={getBreadcrumbClass(crumb)}
									onClick={()=> !crumb.active && props.onNavigate(crumb.path)}
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
