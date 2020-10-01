export default class SubtitlesService {

	// types
	types = {
		SUBTITLES_START : `SUBTITLES_START`,
		SUBTITLES_ABORT : `SUBTITLES_ABORT`,
		SUBTITLES_CLEAN: `SUBTITLES_CLEAN`,
		SUBTITLES_CREATE: `SUBTITLES_CREATE`,
		SUBTITLES_ERROR: `SUBTITLES_ERROR`,
		SUBTITLES_GET: `SUBTITLES_GET`,
		SUBTITLES_UPDATE: `SUBTITLES_UPDATE`,
		ACTIVE_UPDATE: `ACTIVE_UPDATE`,
		SET_CONTENT_ID: `SET_CONTENT_ID`,
	}

	// action creators

	actions = {
		subtitlesStart: () => ({ type: this.types.SUBTITLES_START }),
		subtitlesAbort: () => ({ type: this.types.SUBTITLES_ABORT }),
		subtitlesClean: () => ({ type: this.types.SUBTITLES_CLEAN }),
		subtitlesCreate: (subtitles) => ({ type: this.types.SUBTITLES_CREATE, payload: { subtitles }}),
		subtitlesError: error => ({ type: this.types.SUBTITLES_ERROR, payload: { error } }),
		subtitlesGet: subtitles => ({ type: this.types.SUBTITLES_GET, payload: { subtitles } }),
		subtitlesUpdate: subtitles => ({ type: this.types.SUBTITLES_UPDATE, payload: { subtitles }}),
		activeUpdate: active => ({ type: this.types.ACTIVE_UPDATE, payload: { active }}),
		setContentId: id => ({type: this.types.SET_CONTENT_ID,payload: {id}}),
	}

	store = {
		cache: [],
		loading: false,
		lastFetched: 0,
		active: 0,
		contentId : ``,
	}

	// reducer

	reducer = (store = this.store, action) => {

		const {
			SUBTITLES_START,
			SUBTITLES_ABORT,
			SUBTITLES_CLEAN,
			SUBTITLES_CREATE,
			SUBTITLES_ERROR,
			SUBTITLES_GET,
			SUBTITLES_UPDATE,
			ACTIVE_UPDATE,
			SET_CONTENT_ID,
		} = this.types

		switch (action.type) {

		case SUBTITLES_START:
			return {
				...store,
				loading: true,
			}

		case SUBTITLES_ABORT:
			return {
				...store,
				loading: false,
			}

		case SUBTITLES_CLEAN:
			return {
				...store,
				cache: [],
			}

		case SUBTITLES_CREATE:
			return {
				...store,
				cache: {
					...store.cache,
					...action.payload.subtitles,
				},
				loading: false,
			}

		case SUBTITLES_ERROR:
			console.error(action.payload.error)
			return {
				...store,
				loading: false,
			}

		case SUBTITLES_GET:
			console.log(`??//`,action.payload.subtitles)
			return {
				...store,
				cache: action.payload.subtitles,
				loading: false,
				lastFetched: Date.now(),
			}

		case SUBTITLES_UPDATE:
			return {
				...store,
				cache:action.payload.subtitles,
				loading: false,
			}
		case ACTIVE_UPDATE:
			return {
				...store,
				active: action.payload.active,
			}
		case SET_CONTENT_ID:
			return{
				...store,
				contentId: action.payload.id,
			}
		default:
			return store
		}
	}
	setSubtitles = (content) => async (dispatch, getState, { apiProxy }) => {
		// console.log('updated content1', content)

		try {
			// TODO: Why doesn't this update to state cause it to rerender?
			// dispatch(this.actions.contentCreate(data))

			dispatch(this.actions.subtitlesUpdate(content))
		} catch (error) {
			dispatch(this.actions.subtitlesError(error))
		}

	}

	getSubtitles = (id, force = false) => async (dispatch, getState, { apiProxy }) => {
		// console.log('updated store', contentIds)
		const time = Date.now() - getState().contentStore.lastFetched

		const stale = time >= process.env.REACT_APP_STALE_TIME
		// if (stale || force) {

		dispatch(this.actions.subtitlesStart())

		try {
			const result = await apiProxy.content.getSubtitles(id)
			dispatch(this.actions.subtitlesGet(result))
			return result
		} catch (error) {
			console.error(error.message)
			dispatch(this.actions.subtitlesError(error))
			return[]
		}

		// } else dispatch(this.actions.subtitlesAbort())
	}

	createSubtitle = (subtitle) => async (dispatch, getState, { apiProxy }) => {

		// dispatch(this.actions.subtitlesStart())

		try {
			const temp = subtitle
			temp[`content`] = JSON.stringify(temp[`content`])
			const result = await apiProxy.subtitles.post(temp)
			// TODO: Why doesn't this update to state cause it to rerender?
			// dispatch(this.actions.contentCreate(data))

			// dispatch(this.actions.subtitlesAbort())
			return result
		} catch (error) {
			dispatch(this.actions.subtitlesError(error))
		}
	}

	updateSubtitle = subtitle => async (dispatch, _getState, { apiProxy }) => {

		// console.log(content)

		dispatch(this.actions.subtitlesStart())

		try {
			const tempSub = subtitle
			tempSub[`content`] = JSON.stringify(tempSub[`content`])
			await apiProxy.subtitles.edit(temp,subtitle[`id`])
		} catch (error) {
			dispatch(this.actions.subtitlesError(error))
		}
	}
	activeUpdate = active => async (dispatch, _getState, { apiProxy }) => {
		dispatch(this.actions.activeUpdate(active))
	}
	setContentId = id => async(dispatch,getState, {apiProxy}) => {
		dispatch(this.actions.setContentId(id))
	}
	deleteSubtitle = (ids) => async (dispatch, getState, { apiProxy }) => {

		dispatch(this.actions.subtitlesStart())

		try {
			await apiProxy.subtitles.delete(ids)
			// console.log(result.data)

			// TODO: Why doesn't this update to state cause it to rerender?
			// dispatch(this.actions.contentCreate(data))

			dispatch(this.actions.subtitlesAbort())
		} catch (error) {
			dispatch(this.actions.subtitlesError(error))
		}
	}
}
