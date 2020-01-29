import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import {
	collectionService,
	contentService,
	interfaceService,
} from 'services'

import { ManageCollection } from 'components'

import CreateContentContainer from 'components/modals/containers/CreateContentContainer'

import { objectIsEmpty } from 'lib/util'

const ManageCollectionContainer = props => {

	const {
		collection,
		content,
		getContent,
		updateCollectionStatus,
	} = props

	const [isContent, setIsContent] = useState(true)

	useEffect(() => {
		const ids = collection.content.map(item => parseInt(item.id))
		getContent(ids)
	}, [collection.content, content, getContent])

	const togglePublish = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, collection.published ? `unpublish` : `publish`)
	}

	const createContent = () => {
		props.toggleModal({
			component: CreateContentContainer,
			collectionId: collection.id,
		})
	}

	const archive = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, `archive`)
	}

	const setTab = isContent => _e => {
		setIsContent(isContent)
	}

	if (objectIsEmpty(content) && collection.content.length) return null

	// Forces rerender when content and collection.content don't contain the same content, and when creating new content
	const contentCheck = collection.content.map(item => content[item.id])
	if (contentCheck.length > 0 && (contentCheck[0] === undefined || contentCheck[contentCheck.length - 1] === undefined))
		return null

	const viewstate = {
		collection,
		content: collection.content.map(item => content[item.id]),
		isContent,
	}

	const handlers = {
		togglePublish,
		createContent,
		archive,
		setTab,
	}

	return <ManageCollection viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	content: store.contentStore.cache,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
	toggleModal: interfaceService.toggleModal,
	updateCollectionStatus: collectionService.updateCollectionStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionContainer)
