import React, { PureComponent } from 'react'
import Style, { LinkStyled, Header, UserPic, LogoutButton } from './styles'

class Menu extends PureComponent {
	render() {

		const {
			user,
			initials,
			menuActive,
			isProf,
			isAdmin,
			isLab,
			editorStyle,
		} = this.props.viewstate
		// console.log(isAdmin, isLab, isProf)

		const {
			toggleMenu,
			handleShowTip,
			handleLogout,
			toggleTip,
		} = this.props.handlers

		return (
			<Style editorStyle={editorStyle} className={menuActive && `active`}
				onClick={toggleMenu}
				onMouseEnter={e => handleShowTip('menu', {x: window.innerWidth - 270, y: 50, width: e.currentTarget.offsetWidth})}
				onMouseLeave={e => toggleTip()}>

				<UserPic>{initials}</UserPic>
				<h4>{user.name}</h4>

				<hr />

				{/* <LinkStyled to='/word-list'>My Word List</LinkStyled> */}

				{
					(isAdmin) &&
					<>
						<LinkStyled to='/admin'>Admin Dashboard</LinkStyled>
					</>
				}

				{ (isLab || isAdmin) &&
					<>
						<LinkStyled to='/lab-assistant'>Lab Assistant Dashboard</LinkStyled>
						<LinkStyled to='/manage-resource'>Manage Resource</LinkStyled>
					</>
				}

				{
					!(isLab || isAdmin || isProf) &&
					<>
						<LinkStyled to='/'>Collections</LinkStyled>
					</>
				}

				<LinkStyled to='/logout'>Sign Out</LinkStyled>

				{
					(isProf || isAdmin || isLab) &&
					<>
						<Header>Collections</Header>
						<hr />
						<LinkStyled to='/'>View Collections</LinkStyled>
						<LinkStyled to='/manager'>Manage Collections</LinkStyled>
						<LinkStyled to={{ pathname: `/manager`, createCollection: true }}>Create New Collection</LinkStyled>
					</>
				}

			</Style>
		)
	}
}

export default Menu