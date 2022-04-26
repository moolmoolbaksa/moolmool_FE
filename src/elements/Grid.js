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
	};

	if (gridBox) {
		return (
			<React.Fragment>
				<ParentsGridbox {...styles}>{children}</ParentsGridbox>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<GridBox {...styles}>{children}</GridBox>
		</React.Fragment>
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
};

const GridBox = styled.div`
	width: ${props => props.width};
    position: ${props => props.position};
	box-sizing: border-box;
	${props => (props.center ? `text-align:center` : '')};
	${props => (props.padding ? `padding:${props.padding}` : '')};
	${props => (props.margin ? `margin:${props.margin}` : '')};
	${props => (props.bg ? `background-color:${props.bg}` : '')};
	${props => (props.flex ? `display:flex; align-items:center; justify-content:space-between` : '')};
	${props => (props.height ? `height:${props.height}` : '')};
	${props => (props.align ? `align-items:${props.align}` : '')};
	${props => (props.justify ? `justify-content:${props.justify}` : '')};
	${props => (props.gap ? `gap:${props.gap}` : '')};
	${props => (props.is_column ? `flex-direction: column` : '')};
	${props => (props.is_flex ? `display:flex` : '')};
`;

const ParentsGridbox = styled.div`
	width: 100%;
	${props => (props.height ? `height:${props.height}` : '')};
	${props => (props.center ? `text-align:center` : '')};
	${props => (props.padding ? `padding:${props.padding}` : '')};
	${props => (props.margin ? `margin:${props.margin}` : '')};
	${props => (props.bg ? `background-color:${props.bg}` : '')};
	display: grid;
	row-gap: 15px;
	grid-template-columns: 120px 120px 120px;
	align-items: center;
	justify-content: space-between;
`;

export default Grid;
