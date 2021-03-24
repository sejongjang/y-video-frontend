import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from '../../../../components/modals/containers/HighlightWordsContainer'
import { Select, Button } from '../../../../components/modals/components/HighlightWords/styles'
import { Provider } from 'react-redux'
import * as testutil from '../../../testutil/testutil'

const props = {
	toggleModal: jest.fn(),
}

describe(`HighlightWordsContainer test`, () => {
	it(`simulate click`, () => {
		let wrapper = mount(
			<Provider store={testutil.store}>
				<Container {...props}/>
			</Provider>,
		)
		let button = wrapper.find('h2').simulate('click')
		expect(button).toBeDefined()
		button = wrapper.find(Select).simulate('change', { target: { value: `0` }})
		expect(button).toBeDefined()
		button = wrapper.find(Select).simulate('change', { target: { value: `1` }})
		expect(button).toBeDefined()
		button = wrapper.find('input').at(0).simulate('change', { target: { value: `word` }})
		expect(button).toBeDefined()
		button = wrapper.find('input').at(1).simulate('change', { target: { value: `english` }})
		expect(button).toBeDefined()
		button = wrapper.find(Button).at(0).simulate('click')
		expect(button).toBeDefined()
		button = wrapper.find('input').at(2).simulate('change')
		expect(button).toBeDefined()
		button = wrapper.find(Button).at(1).simulate('click')
		expect(button).toBeDefined()
	})
	test('when subtitlesObjects is undefined ', () => {
		let wrapper = mount(
			<Provider store={testutil.emptyStore}>
				<Container {...props}/>
			</Provider>,
		)
		let button = wrapper.find(Select).simulate('change')
		expect(button).toBeDefined()
	})
	test('when subtitlesObjects is undefined ', () => {
		let wrapper = mount(
			<Provider store={testutil.subStore}>
				<Container {...props}/>
			</Provider>,
		)
		expect(wrapper).toBeDefined()
	})

})