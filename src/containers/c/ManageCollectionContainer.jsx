import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import {
	collectionService,
	contentService,
	interfaceService,
} from 'services'

import { ManageCollection } from 'components'

import { CreateContent } from 'components/forms'

import { objectIsEmpty } from 'lib/util'

/**
 * DO NOT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU'RE DOING
 */

const ManageCollectionContainer = props => {

	const {
		collection,
		content,
		getContent,
		updateCollectionStatus,
	} = props

	const [isContent, setIsContent] = useState(true)

	console.log(collection.content)

	useEffect(() => {
		if (objectIsEmpty(content)) {
			const ids = collection.content.map(item => parseInt(item.id))
			getContent(ids)
		}
	}, [collection.content, content, getContent])

	const togglePublish = e => {
		e.preventDefault()
		updateCollectionStatus(collection.id, collection.published ? `unpublish` : `publish`)
	}

	const createContent = () => {
		props.toggleModal({
			component: CreateContent,
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
	collections: store.collectionStore.cache,
})

const mapDispatchToProps = {
	getContent: contentService.getContent,
	toggleModal: interfaceService.toggleModal,
	updateCollectionStatus: collectionService.updateCollectionStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionContainer)
