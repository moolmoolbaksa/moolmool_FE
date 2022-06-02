import React from 'react';
import styled from 'styled-components';

const Grid = ({children, onClick, gridBox,...styles}) => {

	if(gridBox){
		return (
			<React.Fragment>
				<ParentsGridbox {...styles}>{children}</ParentsGridbox>
			</React.Fragment>
		);
	};

	return (
		<GridBox {...styles} onClick={onClick}>{children}</GridBox>
	);
};

Grid.defaultProp = {
	onClick: () => {},
};

const GridBox = styled.div`
	/* 조정 스타일 */
	${props => (props.width && `width: ${props.width};`)}
	${props => (props.height && `height:${props.height};`)};
	${props => (props.padding && `padding:${props.padding};`)};
	${props => (props.margin && `margin:${props.margin};`)};
	${props => (props.flex && `display:flex; align-items:center; justify-content:space-between;`)};
	${props => (props.is_column && `display: flex; flex-flow: column nowrap;`)};
	${props => (props.is_flex && `display:flex;`)};
	${props => (props.align && `align-items:${props.align};`)};
	${props => (props.justify && `justify-content:${props.justify};`)};
	${props => (props.grow && `flex-grow: 1;`)};
	${props => (props.gap && `gap:${props.gap};`)};
	${props => (props.center && `text-align:center;`)};
	${props => (props.bg && `background-color:${props.bg};`)};
	${props => (props.borderB && `border-bottom: ${props.borderB};`)};
	${props => (props.cursor && `cursor:pointer;`)};
    ${props => (props.position && `position: ${props.position};`)};
	${props => (props.is_overflow && `overflow: hidden;`)};
`;

const ParentsGridbox = styled.div`
	/* 공통 스타일 */
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: 1fr;
	gap: 15px;
	align-items: center;
	justify-content: space-between;

	/* 조정 스타일 */
	${props => (props.height && `height:${props.height};`)}
	${props => (props.center && `text-align:center;`)}
	${props => (props.padding && `padding:${props.padding};`)}
	${props => (props.margin && `margin:${props.margin};`)}
	${props => (props.bg && `background-color:${props.bg};`)}
`;

export default Grid;
