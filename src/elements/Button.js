import React from "react";
import styled, { css } from 'styled-components';

const Button = ({children, onClick,...rest}) => {
    return (
        <StyledButton
            {...rest}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
};

Button.defaultProps = {
    background: "#fff",
    onClick: () => {},
};

const StyledButton = styled.button`
        
    /* 공통 스타일 */
    flex: auto;
    line-height: inherit;
    outline: none;
    border: none;
    font-weight: bold;
    letter-spacing: -0.67px;
    cursor: pointer;

    /* 배경 색상 */
    ${props => {
        const selected = props.theme.palette[props.background];
        return css`
            background: ${selected};
        `;
    }}

    /* 조정 스타일 */
    width: ${props => props.width ? props.width : '100%'};
    height: ${props => props.height ? props.height : '100%'};
    font-size: ${props => props.size ? props.size : '20px'};
    color: ${props => props.color ? props.color : 'black'};
    border-radius: ${props => props.radius ? props.radius : '0px'};
`;

export default Button;
