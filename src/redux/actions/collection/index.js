import { ABORT_COLLECTIONS, ERROR_COLLECTIONS, START_COLLECTIONS, UPDATE_COLLECTIONS } from 'redux/actions/types'

import axios from 'axios'

const { REACT_APP_STALE_TIME, REACT_APP_YVIDEO_SERVER } = process.env

export const getCollections = (authorized = false) => {
	return async (dispatch, getState) => {

		const time = Date.now() - getState().collectionsCache.lastFetched

		const stale = time >= REACT_APP_STALE_TIME

		if (stale) {
			dispatch({ type: START_COLLECTIONS })

			const results = await axios(`${REACT_APP_YVIDEO_SERVER}/api/user/${authorized ? `privilegedCollections` : `collections`}`, { withCredentials: true })
				.catch(err => dispatch({ type: ERROR_COLLECTIONS, error: err }))

			const data = results.data.reduce((map, item) => {
				map[item.id] = item
				return map
			}, {})

			dispatch({ type: UPDATE_COLLECTIONS, payload: data })

		} else dispatch({ type: ABORT_COLLECTIONS })
	}
}
