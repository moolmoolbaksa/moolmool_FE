import React from "react";
import styled from 'styled-components';

const Button = (props) => {
    const {
        margin,
        onClick,
        width,
        height,
        size,
        color,
        bold,
        background,
        text,
        lineHeight,
        radius,
        border,
        padding,
    } = props;
    
    const styles = {
        margin,
        width,
        height,
        size,
        color,
        bold,
        background,
        lineHeight,
        radius,
        border,
        padding,
    }
   
    return (
        <Btn
            {...styles}
            onClick={onClick}
        >
            {text}
        </Btn>
    );
};

Button.defaultProps = {
    background: "#fff",
    margin: false,
    width: "100%",
    height: "100%",
    size: "14px",
    color: "black",
    bold: false,
    radius: null,
    lineHeight: "initial",
    border: "none",
    padding: false,
}

const Btn = styled.button`
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: ${props => props.size};
    color: ${props => props.color};
    font-weight: ${props => props.bold};
    background: ${props => props.background};
    line-height: ${props => props.lineHeight};
    border-radius: ${props => props.radius};
    border: ${props => props.border};
    letter-spacing: -1px;
    cursor: pointer;
`;

export default Button;
