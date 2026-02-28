export default function Banner(){
	return (
		<header className='app-header'>
			<div className='header-search'>
				<div className='search-wrapper'>
					<span className='material-symbols-outlined search-icon'>search</span>
					<input
						className='search-box'
						type='text'
						placeholder='Search analytics...'
					/>
				</div>
			</div>

			<div className='header-actions'>
				<button className='btn-icon' title='Notifications'>
					<span className='material-symbols-outlined' style={{ fontSize: '20px' }}>notifications</span>
				</button>
				<button className='btn-icon' title='Messages'>
					<span className='material-symbols-outlined' style={{ fontSize: '20px' }}>chat_bubble</span>
				</button>

				<div className='header-divider' />

				<div className='header-user'>
					<div className='header-user-info'>
						<div className='header-user-name'>Admin User</div>
						<div className='header-user-role'>Super Admin</div>
					</div>
					<div className='header-avatar' />
				</div>
			</div>
		</header>
	)
}
