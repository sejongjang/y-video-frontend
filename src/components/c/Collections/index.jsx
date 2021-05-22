import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import {
	ListCollection,
	BlockCollection,
} from 'components/bits'

import {
	PublicListCollectionContainer,
} from 'containers'

import Style, { ViewToggle, Help, TabHeader, Selector, Search, SearchIcon } from './styles'

import helpIcon from 'assets/manage-collection-help-circle.svg'

export default class Collections extends PureComponent {

	render() {

		const {
			isProf,
			isAdmin,
			displayBlocks,
			collections,
			isMobile,
			publicCollections,
			isContentTap,
			searchQuery,
		} = this.props.viewstate

		const {
			toggleCollectionsDisplay,
			handleShowHelp,
			handleShowTip,
			toggleTip,
			setTab,
			handleSearchQuerySubmit,
			handleSearchTextChange,
		} = this.props.handlers

		collections.sort((a, b) => a.name > b.name ? 1 : -1)

		const setNoCollections = () => {
			setTimeout(() => {
				if(document.getElementById(`message`) !== null)
					document.getElementById(`message`).innerHTML = `There are no collections`
			}, 2000)
		}

		return (
			<Style>
				<header>
					<div>
						<h3>Collections &nbsp;&nbsp;&nbsp;
							<Help id='collections-help-documentation'
								src={helpIcon} onClick={handleShowHelp}
								onMouseEnter={e => handleShowTip(`help`, {x: e.target.offsetLeft, y: e.target.offsetTop, width: e.currentTarget.offsetWidth})}
								onMouseLeave={e => toggleTip()}
							/></h3>
					</div>
					<div>
						{
							(isProf || isAdmin) &&
							<Link to={`/manager`} onClick={toggleTip} onMouseEnter={e => handleShowTip(`manage-collections`, {x: e.target.offsetLeft, y: e.target.offsetTop, width: e.currentTarget.offsetWidth})} onMouseLeave={e => toggleTip()}>Manage Collections</Link>
						}
						{
							!isMobile && <ViewToggle displayBlocks={displayBlocks} onClick={toggleCollectionsDisplay} onMouseEnter={e => handleShowTip(`list-block`, {x: e.target.offsetLeft, y: e.target.offsetTop, width: e.currentTarget.offsetWidth})} onMouseLeave={toggleTip}/>
						}
					</div>
				</header>
				<div className='list'>

					{ Object.keys(collections).length > 0 ? (
						<>
							{
								isMobile ? Object.keys(collections).map(key => <ListCollection key={key} collection={collections[key]}/>) :
									displayBlocks ?
										Object.keys(collections).map(key => <BlockCollection key={key} collection={collections[key]}/>)
										:
										Object.keys(collections).map(key => <ListCollection key={key} collection={collections[key]}/>)
							}
						</>
					) : (
						<>
							<h1 id='message'>Loading</h1>
							{	setNoCollections()}
						</>
					) }
				</div>

				<header>
					<div>
						<TabHeader>
							<button className={`public-collections-tab`} onClick={setTab(true)}><h4>Public Collections</h4></button>
							<button className={`byu-collections-tab`} onClick={setTab(false)}><h4>BYU Collections</h4></button>

							<Help id='collections-help-documentation'
								src={helpIcon} onClick={handleShowHelp}
								onMouseEnter={e => handleShowTip(`help`, {x: e.target.offsetLeft, y: e.target.offsetTop, width: e.currentTarget.offsetWidth})}
								onMouseLeave={e => toggleTip()}
							/>
							<Selector isContentTap={isContentTap} />
						</TabHeader>

					</div>
					<Search className='resource-search-submit' id='searchSubmit' onSubmit={handleSearchQuerySubmit}>
						<SearchIcon />
						<input className='resource-search-input' type='search' placeholder={`search more public collections`} onChange={handleSearchTextChange} value={searchQuery} />
						<button type='submit'>Search</button>
					</Search>

				</header>
				<div className='public-collections-list'>
					{isContentTap ?
						Object.keys(publicCollections).length > 0 ? (
							<>
								{
									Object.keys(publicCollections).map(key =>
										<PublicListCollectionContainer key={key} collection={publicCollections[key]}/>,
									)
								}
							</>
						) : <>Public Collection is empty.</>

						:
						(<>BYU Collection is empty.</>)
					}
				</div>
			</Style>
		)
	}
}