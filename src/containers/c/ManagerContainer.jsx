import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

import { roles } from 'models/User'

import { collectionService, interfaceService, adminService } from 'services'

import { Manager } from 'components'

import { CreateCollection } from 'components/modals'

import { objectIsEmpty } from 'lib/util'

/**
 * DO NOT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING
 */

const ManagerContainer = props => {

	const {
		admin,
		adminCollections,
		collectionStoreCollections,
		getCollections,
		searchCollections,
		setHeaderBorder,
		toggleModal,
	} = props

	const params = useParams()
	const location = useLocation()

	// const [collections, setCollections] = useState([])

	useEffect(() => {
		setHeaderBorder(true)
		if (location.user)
			searchCollections(location.user.id, true)
		else getCollections()

		return () => {
			setHeaderBorder(false)
		}
	}, [getCollections, searchCollections, setHeaderBorder, location.user])

	if (location.createCollection) {
		toggleModal({
			component: CreateCollection,
		})
	}

	if (location.user && !adminCollections) return null
	else if (!location.user && objectIsEmpty(collectionStoreCollections)) return null

	let collections = {}
	if (location.user) adminCollections.filter(item => item.owner === location.user.id).forEach(item => collections[item.id] = item)
	else collections = Object.values(collectionStoreCollections)

	const sideLists = {
		published: [],
		unpublished: [],
		archived: [],
	}

	Object.keys(collections).forEach(id => {
		const { archived, published, name } = collections[id]

		if (archived) sideLists.archived.push({ id, name })
		else if (published) sideLists.published.push({ id, name })
		else sideLists.unpublished.push({ id, name })
	})

	const createNew = () => {
		toggleModal({
			component: CreateCollection,
		})
	}

	const viewstate = {
		collection: collections[params.id],
		sideLists,
		admin,
		user: location.user,
	}

	const handlers = {
		createNew,
	}

	return <Manager viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	adminCollections: store.adminStore.lacache.collections,
	collectionStoreCollections: store.collectionStore.cache,
	admin: store.authStore.user.roles.includes(roles.admin),
	user: store.adminStore.
})

const mapDispatchToProps = {
	searchCollections: adminService.searchCollections,
	getCollections: collectionService.getCollections,
	setHeaderBorder: interfaceService.setHeaderBorder,
	toggleModal: interfaceService.toggleModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerContainer)
