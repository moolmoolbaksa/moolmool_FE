import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '../elements/index';

const TitleBar = ({ title }) => {
    const navigate = useNavigate();

    return (
        <Container>
            <span 
                onClick={() => {navigate(-1)}}
                className="material-symbols-outlined"
            >
                arrow_back_ios
            </span>
            <Text 
                text={title}
                size="22px"
                bold="bold"
            />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 16px;
`
export default TitleBar;