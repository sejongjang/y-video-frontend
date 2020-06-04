import styled from 'styled-components'

export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
  background-size: 18px 18px;
  height: 4rem;
  width: 4rem;
`

export const Style = styled.div`

	width: 100%;
	height: auto;

	& .events {
		width: 100% !important;
		border-bottom: 1px dashed var(--light-blue);
		display: flex;
		height: 45px;
		position: relative;

	}

	& .layer-event {
		border: 1px solid var(--light-blue) !important;
		border-radius: 3px;
		height: 46px !important;
		padding: 1px;
		min-width: 1%;
		overflow: hidden !important;
		display: flex !important;
		background-color: white;
		box-shadow: 2px 2px 3px rgba(0,0,0, 0.2), -2px -2px 3px rgba(0,0,0, 0.2);

		&	p {
			font-size: 1.3rem;
			text-align: left;
			margin: auto 0px auto 2px;
			padding: 1px 2px 1px 2px;
			background-color: transparent;

		}
		&	div{
			text-align: right;
			margin: 0px;
			padding: 0px 3px 0px 3px;
		}
	}

	& .active-event {
		background-color: rgba(106, 199, 252, 0.3);
	}
`