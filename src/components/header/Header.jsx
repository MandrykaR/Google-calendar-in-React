import React from 'react'

import './header.scss'

const Header = ({
	onPrevWeek,
	onNextWeek,
	onCurrentWeek,
	onOpenModel,
	navTextMouth,
}) => {
	return (
		<header className='header'>
			<button className='button create-event-btn' onClick={onOpenModel}>
				<i className='fas fa-plus create-event-btn__icon'></i>Create
			</button>
			<div className='navigation'>
				<button
					className='navigation__today-btn button'
					onClick={onCurrentWeek}
				>
					Today
				</button>
				<button className='icon-button navigation__nav-icon'>
					<i className='fas fa-chevron-left' onClick={onPrevWeek}></i>
				</button>
				<button className='icon-button navigation__nav-icon'>
					<i className='fas fa-chevron-right' onClick={onNextWeek}></i>
				</button>
				<span className='navigation__displayed-month'>{navTextMouth}</span>
			</div>
		</header>
	)
}

export default Header
