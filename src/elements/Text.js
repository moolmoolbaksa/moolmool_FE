import React from 'react';
import styled from 'styled-components';

const Text = ({text, onClick, multiLine, ...styles}) => {
   
    if(multiLine ){
       return (
            <MultiLine
                {...styles}
                onClick={onClick}
            >
                {text}
            </MultiLine>
       ); 
    }
    return (
        <ElText 
            {...styles}
            onClick={onClick}
        >
            {text}
        </ElText>
    );
};

Text.defaultProps = {
    onClick: () => {},
};

const ElText = styled.div`
    /* 조정 스타일 */
    ${props => (props.size ? `font-size:${props.size};` : `font-size: 14px;`)}
    ${props => (props.bold ? `font-weight:${props.bold};` : ``)}
    ${props => (props.color ? `color:${props.color};` : ``)}
    ${props => (props.lineHeight ? `line-height:${props.size};` : ``)}
    ${props => (props.padding ? `padding:${props.padding};` : ``)}
    ${props => (props.margin ? `margin:${props.margin};` : ``)}
    ${props => (props.width ? `width:${props.width};` : ``)}
    ${props => (props.textAlign ? `text-align:${props.textAlign};` : ``)}
    ${props => (props.borderB ? `border-bottom:${props.borderB};` : ``)}
    ${props => (props.letterSpacing ? `letter-spacing:${props.letterSpacing}` : `letter-spacing: -0.67px`)};
    ${props => (props.wordSpacing ? `word-spacing:${props.wordSpacing}` : `word-spacing: -0.67px`)};
    ${props => (props.maxWidth ? `max-width:${props.maxWidth}` : '')};
    ${props => (props.is_overflow ? `overflow: hidden; white-space: nowrap; text-overflow: ellipsis;` : '')}; 
`;

const MultiLine = styled.div`
    /* 공통 스타일 */
    display: -webkit-box;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;

    /* 조정 스타일 */
    ${props => (props.size ? `font-size:${props.size};` : 'font-size: 14px;')}
    ${props => (props.bold ? `font-weight:${props.bold};` : ``)}
    ${props => (props.color ? `color:${props.color};` : ``)}
    ${props => (props.letterSpacing ? `letter-spacing:${props.letterSpacing}` : `letter-spacing: -0.67px`)};
    ${props => (props.wordSpacing ? `word-spacing:${props.wordSpacing}` : `word-spacing: -0.67px`)};
    ${props => (props.multi ? `-webkit-line-clamp:${props.multi}` : ``)};
`;
        
export default Text;