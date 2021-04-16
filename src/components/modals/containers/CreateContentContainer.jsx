import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
	contentService,
	collectionService,
	interfaceService,
	adminService,
	resourceService,
} from 'services'

import CreateContent from 'components/modals/components/CreateContent'

const CreateContentContainer = props => {

	const {
		adminContent,
		adminCreateContent,
		adminGetCollectionContent,
		createContent,
		modal,
		toggleModal,
		getCollections,
		resourceContent,
		searchResource,
	} = props

	const [tab, setTab] = useState(`url`)
	const [hideResources, setHide] = useState(true)
	const [searchQuery, setSearchQuery] = useState(``)
	const [selectedResource, setSelectedResource] = useState(``)
	const [isResourceSelected, setIsResourceSelected] = useState(false)
	const [languages, setLanguages] = useState([])
	const [isTyping, setIsTyping] = useState(false)
	const [isCalled, setIsCalled] = useState(false)

	const [data, setData] = useState({
		url: ``,
		resourceId: ``,
		contentType: `video`,
		title: ``,
		description: ``,
		resource: {
			keywords: [],
		},
		thumbnail: ``,
		targetLanguages: ``,
	})

	useEffect(() => {
		if(resourceContent[selectedResource] !== undefined && isResourceSelected){
			const langs = resourceContent[selectedResource].allFileVersions.split(`;`)
			const finalLanguages = []
			langs.forEach((element, i) => {
				if(element === ``)
					delete langs[i]
				else {
					const newLetter = element[0].toUpperCase()
					element = newLetter + element.slice(1)
					finalLanguages.push(element)
				}
			})
			setLanguages(finalLanguages)
		}

		if(isTyping){
			setTimeout(() => {
				setIsTyping(false)
				setIsCalled(false)
			}, 1000)
		} else{
			if (searchQuery.length > 0 && searchQuery.match(/^[0-9a-zA-Z]+$/) && !isTyping) {
				if(!isCalled){
					searchResource(searchQuery)
					setHide(false)
					setIsCalled(true)
				}
			}else
				setHide(true)
		}

	}, [resourceContent, selectedResource, searchQuery, isTyping])

	const changeTab = e => {
		setTab(e.target.name)
	}

	const onKeyPress = e => {
		if (e.which === 13) {
			e.preventDefault()
			addKeyword(e.target)
		}
	}

	const handleTextChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)

		if(isResourceSelected && value === ``)
			setIsResourceSelected(false)

		if(!isTyping)
			setIsTyping(true)
	}

	const handleSelectResourceChange = (e, name) => {
		const { target } = e
		setSelectedResource(target.value)
		setIsResourceSelected(true)
		setSearchQuery(name)
		setHide(true)
	}

	const handleTypeChange = e => {
		const contentType = e.target.dataset.type
		setData({
			...data,
			contentType,
		})
	}

	const addKeyword = element => {
		if (element.id !== `keyword-datalist-input` || element.value === ``) return

		setData({
			...data,
			resource: {
				keywords: [...data.resource.keywords, element.value],
			},
		})

		document.getElementById(`create-content-form`).reset()
	}

	// TODO: need to add create content from the resource
	const handleSubmit = async (e) => {
		e.preventDefault()
		let tags = ``

		if(data.resource.keywords.length !== 0){
			data.resource.keywords.forEach((element, i) => {
				if(i !== data.resource.keywords.length -1)
					tags += `${element}; `
				else
					tags += `${element}`
			})
		}

		const videoId = new URL(data.url).search.split(`=`)[1]

		const backEndData = {
			"allow-definitions": true,
			"url": data.url,
			"allow-captions": true,
			"content-type": data.contentType,
			"resource-id": `00000000-0000-0000-0000-000000000000`,
			tags,
			"thumbnail": `https://i.ytimg.com/vi/${videoId}/default.jpg`,
			"file-version": ``,
			"collection-id": modal.collectionId,
			"published": true,
			"views": 0,
			"annotations": ``,
			"title": data.title,
			"allow-notes": true,
			"description": data.description,
			"words": ``,
			"clips": ``,
		}

		if(modal.isLabAssistantRoute){
			await adminCreateContent(backEndData)
			adminGetCollectionContent(modal.collectionId, true)
		} else{
			await createContent(backEndData)
			getCollections(true)
		}
		toggleModal()
	}

	const handleAddResourceSubmit = async (e) => {
		e.preventDefault()

		if(data.targetLanguages === ``){
			alert(`Please, select a valid language`)
			return
		}

		// CONTENT FROM RESOURCE WILL HAVE AN EMPTY STRING IN THE URL
		// EVERY VIDEO HAS A FILE PATH BUT WE NEED TO GET A FILE KEY IN ORDER TO BE ABLE TO STREAM A VIDEO
		// THE FILE KEY WILL ACT AS PART OF THE URL WHERE WE WILL GET THE VIDEO URL: /api/media/stream-media/{file-key}

		const backEndData = {
			"allow-definitions": true,
			"url": ``,
			"allow-captions": true,
			"content-type": data.contentType,
			"resource-id": selectedResource,
			"tags": ``,
			"clips": ``,
			"words": ``,
			"thumbnail": `empty`,
			"file-version": data.targetLanguages,
			"collection-id": modal.collectionId,
			"published": true,
			"views": 0,
			"annotations": ``,
			"title": data.title,
			"allow-notes": true,
			"description": data.description,
		}

		if(modal.isLabAssistantRoute){
			await adminCreateContent(backEndData)
			adminGetCollectionContent(modal.collectionId, true)
		} else{
			await createContent(backEndData)
			getCollections(true)
		}
		toggleModal()
	}

	const remove = e => {
		const badkeyword = e.target.dataset.keyword
		setData({
			...data,
			resource: {
				keywords: data.keywords.filter(keyword => keyword !== badkeyword),
			},
		})
	}

	const viewstate = {
		adminContent,
		data,
		searchQuery,
		tab,
		resourceContent,
		hideResources,
		selectedResource,
		languages,
		isResourceSelected,
	}

	const handlers = {
		changeTab,
		handleAddResourceSubmit,
		handleSearchTextChange,
		handleSelectResourceChange,
		handleSubmit,
		handleTextChange,
		handleTypeChange,
		onKeyPress,
		remove,
		toggleModal,
	}

	return <CreateContent viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	admin: store.authStore.user.roles === 0,
	adminContent: store.adminStore.data,
	resourceContent: store.resourceStore.cache,
	modal: store.interfaceStore.modal,
	collections: store.collectionStore.cache,
})

const mapDispatchToProps = {
	adminCreateContent: adminService.createContent,
	adminGetCollectionContent: adminService.getCollectionContent,
	adminCreateContentFromResource: adminService.createContentFromResource,
	createContent: contentService.createContent,
	toggleModal: interfaceService.toggleModal,
	search: adminService.search,
	searchResource: resourceService.search,
	getCollections: collectionService.getCollections,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContentContainer)