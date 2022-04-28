import React from 'react';
import styled from 'styled-components';

import { Text } from '../elements/index';
import { history } from '../redux/configureStore';

const TitleBar = ({ title }) => {
    return (
        <Container>
            <span 
                onClick={() => {history.push(-1)}}
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