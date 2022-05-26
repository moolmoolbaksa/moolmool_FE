import React from 'react';
import styled from 'styled-components';

const Grid = props => {
	const { 
		flex, 
		gridBox,
		width, 
		margin, 
		padding, 
		bg, 
		children, 
		center, 
		height, 
		position,
		justify,
		is_column,
		gap,
		align,
		is_flex,
		cursor,
		overflow,
		borderB,
		onClick,
		grow,
	} = props;

	const styles = {
		flex,
		width,
		margin,
		padding,
		bg,
		center,
		gridBox,
		height,
        position,
		justify,
		is_column,
		gap,
		align,
		is_flex,
		cursor,
		overflow,
		borderB,
		grow,
	};

	if (gridBox) {
		return (
			<React.Fragment>
				<ParentsGridbox {...styles}>{children}</ParentsGridbox>
			</React.Fragment>
		);
	}

	return (
		<GridBox {...styles} onClick={onClick}>{children}</GridBox>
	);
};

Grid.defaultProp = {
	children: null,
	flex: false,
	width: '100%',
	padding: false,
	margin: false,
	bg: false,
	center: false,
	gridBox: false,
	height: false,
    position: "static",
	justify: false,
	is_column: "row",
	is_flex: false,
	is_overflow: false,
	borderB: false,
	onClick: () => {},
};

const GridBox = styled.div`
	width: ${props => props.width};
    position: ${props => props.position};
	${props => (props.center ? `text-align:center` : '')};
	${props => (props.padding ? `padding:${props.padding}` : '')};
	${props => (props.margin ? `margin:${props.margin}` : '')};
	${props => (props.bg ? `background-color:${props.bg}` : '')};
	${props => (props.flex ? `display:flex; align-items:center; justify-content:space-between` : '')};
	${props => (props.height ? `height:${props.height}` : '')};
	${props => (props.align ? `align-items:${props.align}` : '')};
	${props => (props.justify ? `justify-content:${props.justify}` : '')};
	${props => (props.gap ? `gap:${props.gap}` : '')};
	${props => (props.is_column ? `display: flex; flex-flow: column nowrap;` : '')};
	${props => (props.is_flex ? `display:flex` : '')};
	${props => (props.cursor ? `cursor:pointer` : '')};
	${props => (props.overflow ? `overflow: hidden` : '')};
	${props => (props.borderB ? `border-bottom: ${props.borderB}` : '')};
	${props => (props.grow ? `flex-grow: 1` : '')};
`;

const ParentsGridbox = styled.div`
	width: 100%;
	${props => (props.height ? `height:${props.height}` : '')};
	${props => (props.center ? `text-align:center` : '')};
	${props => (props.padding ? `padding:${props.padding}` : '')};
	${props => (props.margin ? `margin:${props.margin}` : '')};
	${props => (props.bg ? `background-color:${props.bg}` : '')};
	display: grid;
	gap: 15px;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: 1fr;
	align-items: center;
	justify-content: space-between;
`;

export default Grid;
