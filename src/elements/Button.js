import React from "react";
import styled, { css } from 'styled-components';
import { darken } from 'polished';

const Button = ({children, onClick,...rest}) => {

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
                &:active {
                    background: ${darken(0.1, selected)};
                }
            `;
        }}

        /* 조정 스타일 */
        height: ${props => props.height ? props.height : '100%'};
        font-size: ${props => props.size ? props.size : '20px'};
        color: ${props => props.color ? props.color : 'black'};
        border-radius: ${props => props.radius ? props.radius : '0px'};
    `;

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

export default Button;
