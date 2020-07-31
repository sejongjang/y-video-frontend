import styled, { keyframes, css} from 'styled-components'
import { Link } from 'react-router-dom'

import translation from 'assets/translation.svg'
import captions from 'assets/captions.svg'
import annotations from 'assets/annotations.svg'

const Style = styled.div`
	padding: 2rem;

	& * {
		:focus {
			outline: none;
		}
	}
`

export default Style

const shimmer = keyframes`
	0% {
		background-position: -30rem 0;
	}
	100% {
		background-position: 30rem 0;
	}
`

export const Preview = styled.div`

	display: flex;

	& > div:nth-child(1) {
		min-width: 14rem;
		margin: 0px 2rem 0px 0px;
	}

	& > div:nth-child(2) {

		flex: 1;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0px 0px 0px 2rem;

		& .content-title {
			font-weight: 500;
			text-overflow: ellipsis;
		}

		& ul {
			margin: 0;
			padding: 0;

			display: grid;
			grid-template-columns: repeat(3, 2rem);
			grid-gap: .5rem;
		}

		& em {
			font-weight: lighter;
		}
	}

	& > div:nth-child(3) {
		display: flex;
		justify-content: flex-end;
	}
`

const TextButton = css`
	background: transparent;
	border: none;
	color: #0582CA;
	outline: none;
	height: fit-content;
	cursor: pointer;
`
export const EditButton = styled.button`
	${TextButton}

	font-size: 1.5rem;
`

export const Icon = styled.li`
	width: 2rem;
	height: 2rem;
	background-size: contain;
	list-style: none;

	&.translation {
		background: url(${translation}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}

	&.captions {
		background: url(${captions}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}

	&.annotations {
		background: url(${annotations}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}
`

export const Placeholder = styled.div`
	width: 10rem;
	height: 6.1rem;
	background-color: #eee;
	background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
	background-repeat: no-repeat;

	animation: ${shimmer} 2s linear infinite;
	animation-fill-mode: forwards;
`

export const Thumbnail = styled.div`
	width: 10rem;
	height: 6.1rem;
	background-color: #eee;
	background-size: no-repeat;
	background-size: cover;
	background-image: url(${props => props.src});
`

export const TitleEdit = styled.input`
	position: relative;
	display: inline-block;
	top: -.3rem;
	left: -.2rem;
	margin-bottom: -.6rem;
`

export const PublishButton = styled.button`
	color: ${props => props.published ? `#FFBF00` : `#0582CA`};
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;

	background: transparent;
	width: fit-content;

	border: none;
	padding: 0;

	cursor: pointer;
	outline: none;
`

export const RemoveButton = styled.button`
	color: #ff4c4c;
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;

	background: transparent;
	width: fit-content;

	border: none;
	padding-left: 20px;

	cursor: pointer;
	outline: none;
`

export const StyledLink = styled(Link)`
	${TextButton} //reuses TextButton css
`

export const InnerContainer = styled.div`
	display: grid;
	grid-gap: 2rem;
	margin-top: 10px;
	grid-template-columns: 1fr 1fr 2fr;
	padding: 2rem 1rem;
	border-radius: 5px;
	box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
	background-color: white;

	& .tags {
		display: flex;
		flex-wrap: wrap;
	}

	& .tag-input {
	}
`

export const Column = styled.div`
	margin-right: 1rem;

	& > h4 {
		align-items: center;
		border-bottom: 1px solid #c4c4c4;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr 1.8rem;
		line-height: 2rem;
		margin-bottom: 1rem;
		font-size: 1.4rem;
	}

	& textarea {
		width: 100%;
	}

	& .add-tag {
		border-radius: 10px;
    font-size: 1.3rem;
    color: white;
    background-color: var(--light-blue);
    border: 2px solid transparent;
    width: 5rem !important;
    margin: 0px auto 0px auto;
    font-weight: bold;

		:hover {
			border: 2px solid var(--navy-blue)
		}
	}
`

export const Setting = styled.div`
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr 1.8rem;
	justify-content: space-between;
	margin-bottom: .5rem;

	& > p {
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: inherit;
	}
`