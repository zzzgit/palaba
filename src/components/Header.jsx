import { For } from 'solid-js'
import '../styles/layout.css'

export default function Header(props){
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
		<header class='app-header'>
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
			<div class='header-actions'>
				<div class='user-info'>
					<div class='user-avatar'>AD</div>
					<span class='user-name'>Admin User</span>
				</div>
			</div>
		</header>
	)
}
