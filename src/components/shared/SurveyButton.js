import React from 'react';
import styled from 'styled-components';

const SurveyButton = (props) => {
    return (
        <Container>
            <SurveyBtn>서비스 피드백하러 가기</SurveyBtn>
        </Container>
    )
};

const Container = styled.div`
    position: fixed;
    top: 220px;
    left: 3.8%;
    height: inherit;
`;

const SurveyBtn = styled.div`
    background-color: #FFBB00;
    padding: 20px 40px;
    font-size: 18px;
    /* font-weight: bold; */
    color: white;
    border-radius: 40px;


`

export default SurveyButton;