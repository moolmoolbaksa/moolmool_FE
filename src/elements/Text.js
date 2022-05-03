import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
    const { 
        size,
        bold,
        color,
        lineHeight,
        letterSpacing,
        wordSpacing,
        text,
        padding,
        margin,
        width,
        textAlign,
        borderB,
        onClick,
    } = props;

    const styles = {
        size,
        bold,
        color,
        lineHeight,
        letterSpacing,
        wordSpacing,
        padding,
        margin,
        width,
        textAlign,
        borderB,
    }
    return (
        <ElText 
            {...styles}
            onClick={onClick}
        >
            {text ? text : ""}
        </ElText>
    );
};

Text.defaultProps = {
    size: "14px",
    bold: "normal",
    color: "#333",
    lineHeight: "initial",
    letterSpacing: "normal",
    padding: false,
    margin: false,
    width: "100%",
    textAlign: "auto",
    borderB: "none",
    onClick: () => {},
};

const ElText = styled.div`
    font-size: ${props => props.size};
    font-weight: ${props => props.bold};
    color: ${props => props.color};
    line-height: ${props => props.lineHeight};
    letter-spacing: ${props => props.letterSpacing};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    width: ${props => props.width};
    text-align: ${props => props.textAlign};
    border-bottom: ${props => props.borderB};
    ${props => (props.wordSpacing ? `word-spacing:${props.wordSpacing}` : '')};
`;
        
export default Text;