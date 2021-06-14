import styled from 'styled-components'

const Style = styled.div`

	background-color: white;
	overflow: hidden;

	padding-top: var(--navbar-height);
	height: calc(100vh - var(--navbar-height));
	z-index: 0;

	display: flex;

	& > span {

		flex: 1;

		display: flex;
		flex-direction: column;
	}

	* {
		&:focus {
			outline: none;
		}
	}
`
export default Style
export const Timeline = styled.div`

	--scale: ${props => props.scale};

	--timeline-start: 16rem;
	--header-height: 5rem;
	/*
	--dark-gray: #303030;
	--light-gray: #4F4F4F;
	--lighter-gray: #565656;
	color: #5F5F5F; */

	position: relative;
	height: ${props => props.minimized ? `0vh` : `30vh`};
	box-sizing: border-box;
	transition: height .5s cubic-bezier(0, 0, 0, 1.07);
	cursor: ${props => props.cursor};
  	background-color: transparent;
	z-index: 0;
	overflow-y: scroll;
	overflow-x: hidden;

	& .zoom-controls {
		width: calc(100% - 35rem);
		height: 40px;
		display: flex;
		left: 0px;
		background-color: white;
		border-bottom: 1px solid black;
		border-top: 1px solid black;
		position: fixed;
		bottom: 0px;

		& .zoom-factor {
			margin: auto;
			width: 140px;
			height: 50%;
			border-radius: 10px;
			background-color: rgba(220, 220, 220, 0.5);
			position: relative;

			& .zoom-indicator {
				width: 2rem !important;
				height: 100% !important;
				background-color: var(--light-blue);
				border-radius: 20px;
				cursor: move;
			}
		}

		& .zoom-scroll {
			width: calc(100% - 161px);
			height: calc(100%);
			border-left: 1px solid black;
			display: flex;
			flex-direction: column;
			overflow-x: scroll;

			& .zoom-scroll-container {
				margin: auto;
				width: 90%;
				height: 50%;
				border-radius: 10px;
				background-color: rgba(220, 220, 220, 0.5);
				position: relative;
				overflow: hidden;

				& .zoom-scroll-indicator {
					position: absolute;
					min-width: 5%;
					width: ${props => props.zoom !== 0 ? `${props.zoom}%` : `100%`} !important;
					height: 100% !important;
					background-color: var(--light-blue);
					border-radius: 20px;
				}
			}

			& #time-indicator-container {
				height: 27vh;
				width: calc(100% - 162px);
				position: absolute;
				overflow-x: scroll;
				overflow-y: hidden;
				pointer-events: none;
				bottom: 0px;

				& #layer-time-indicator {
					height: 10px;
					position: absolute;
					background-color: transparent;

					& #layer-time-indicator-line {
						position: absolute;
						height: calc(27vh - 40px);
						background-color: transparent;
						border-right: 2px solid red;
						z-Index: 20;
						/* border-right: 2px dotted red; */
					}
				}


			}
		}
	}

	& > section {
		width: 100%;
		box-sizing: border-box;
		overflow-y: scroll;
	}

	& .event-layers {
		height: 100%;
		display: block;
	}

	& .layer {
		display: flex;
		width: 100%;
		height: 46px;
	}

	& .handle {
		width: 162px !important;
		min-width: 162px;
		height: 46px;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		position: relative;
		cursor: pointer;
		border-bottom: 1px solid #555;
		border-right: 1px solid var(--light-blue);
		transition: .5s;

		& p {
			padding-left: 2rem;
			color: black;
			font-size: 1.5rem;
			& .layer-delete {
				margin: auto auto -3px 15px;
				opacity: 0.3;

				transition: .5s ease;
				:hover {
					opacity: 1;
				}
			}
		}
	}
`
export const AnnotationMessage = styled.div`
	position: fixed;
	margin-top: calc(40vh - 150px);
	margin-left: calc(60vw - 400px);
	width: 400px;
	height: 150px;
	z-index: 30;
	background-color: var(--light-blue);
	display: flex;
	border: 5px solid var(--light-blue);
	border-radius: 25px;

	transition: 1s ease;

	& h2 {
		margin: auto;
		color: white;
		font-size: 2.5rem;
	}
`
export const SideEditor = styled.div`
	--minimized: ${props => props.minimized};

	width: ${props => props.minimized !== false ? `4rem` : `35rem`};
	height: calc(100vh - var(--navbar-height));
	background: ${props => props.minimized !== false ? `var(--navy-blue)` : `white !important`};
	transition: .5s;
	z-index: 20;
	//overflow: hidden;
	overflow-y: scroll;
	border-left: 1px solid black;

	& .center {
		width: 100%;
		display: flex;
		font-size: 1.5rem;

		& .sideTabInput {
			margin: auto 10px auto auto !important;
			padding: 0px 10px;
			width: 120px;
			height: 4rem;
			margin: 10px;
			border: 1px solid var(--royal-blue);
		}

		& label {
			margin: 15px auto 15px auto;
			width: 150px;
			text-align: left;
		}
	}
	& > header {
		height: 5rem;
		background: var(--navy-blue);

		border-bottom: 5px solid var(--light-blue);

		& > .carat {
			float: left;
			margin: auto 0px auto 1rem;
			align-items: center;
			padding-right: 1rem;
		}

		/* & > .tab {
			display: ${props => props.minimized !== false ? `none` : `visible`}
			height: 5rem;
			width: 7rem;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.5rem;

			font-weight: 500;

			&.active {
				background: var(--light-blue);
			}
		} */

		& > .save {
			position: relative;
			float: right;
			margin-right: 20px;
			width: 10rem;
			height: 100%;

			& button {
				width: 100%;
				height: 100%;
				font-size: 1.7rem;
				display: flex;
				border: none;
				background-color: transparent;
				color: white;
				cursor: pointer;
				transition: .5s ease;

				:hover {
					background-color: var(--light-blue)
				}

				& span, img {
					margin: auto;
				}
			}
		}
	}

	& > .breadcrumbs {
		display: ${props => props.minimized !== false ? `none` : `flex`}

		height: 5rem;

		position: relative;

		box-sizing: border-box;

		border-bottom: 1px solid #555;

		color: black;
		font-weight: 500;

		& > span {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.5rem;

			border: none;
			padding: 0;
			margin: 0;

			&.carat {
				position: absolute;
				left: 6.5rem;
				top: 1.9rem;
				height: 1rem;
				width: 1rem;
				transform: rotate(45deg);
				border-top: 1px solid #555;
				border-right: 1px solid #555;
				background-color: white;
			}

			&.current {
				flex: 1;
				justify-content: flex-start;
				padding-left: 2rem;
				border-left: 1px solid #555;
			}
		}
	}

	& > .eventsList {
		display: ${props => props.minimized !== false ? `none` : `visible`}
		padding: 3rem;
	}
	& .subCard {
		padding-left: 3rem;
		padding-right: 3rem;
	}

	& .deleteEventButton {
		width: 100px;
		height: 30px;
		margin: auto 10px auto auto;
		border: 2px solid #eb6e79;
		background-color: #eb6e79;
		color: white;
		font-size: 1.5rem;
		font-weight: 500;
		border-radius: 5px;
		cursor: pointer;

		&:active{
			background-color: white;
			color: #eb6e79;
			border: 2px solid #eb6e79 !important;
			outline: none;
		}
	}
	& .sideButton {
		width: 50%;
		margin-left: 25%;
		margin-top: 25px;
		border: none;
		background-color: var(--light-blue);
		height: 40px;
		color: white;
		border-radius: 5px;
		transition: .5s ease-out;
		cursor: pointer;

		&:active {
			border-radius: 5px;
			border: none;
			background-color: var(--navy-blue);
		}
	}
	& .clipButton {
		width: 75%;
		margin-left: 15%;
		margin-top: 10px;
		border: none;
		height: 40px;
		color: white;
		border-radius: 2px;
		cursor: pointer;
		font-weight: 500;
		font-size: 1.75rem;
	}
	& .createButton {
		background-color: #9dccfa;
		& :hover {
			opacity: 0.5;
		}
	}
	& .savedClip {
		background-color: var(--navy-blue);
		& :hover {
			opacity: 0.5;
		}
	}
	& .deletedClip {
		background-color: #e62c2c;
		& :hover {
			opacity: 0.5;
		}
	}
	& .unsavedClip {
		background-color: #faf575;
		color: black;
		& :hover {
			opacity: 0.5
		}
	}
	& .layer {
		display: flex;
		width: 100%;
		height: 46px;
	}
	& .handle {
		width: 162px !important;
		min-width: 162px;
		height: 46px;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
		position: relative;
		cursor: pointer;
		border-bottom: 1px solid #555;
		border-right: 1px solid var(--light-blue);
		transition: .5s;

		& p {
			padding-left: 2rem;
			color: black;
			font-size: 1.5rem;
			& .layer-delete {
				margin: auto auto -3px 15px;
				opacity: 0.3;

				transition: .5s ease;
				:hover {
					opacity: 1;
				}
			}
		}
	}

`