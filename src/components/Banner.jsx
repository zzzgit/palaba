import '../styles/layout.css'

export default function Banner(){
	return (
		<div class='app-banner'>
			<div class='banner-left'>
				<div class='banner-logo'>
					<span class='logo-icon'>📊</span>
					<span class='logo-text'>Palaba</span>
				</div>
				<span class='banner-version'>v1.0.0</span>
			</div>
			<div class='banner-right'>
				<div class='user-info'>
					<div class='user-avatar'>AD</div>
					<span class='user-name'>Admin User</span>
				</div>
			</div>
		</div>
	)
}

