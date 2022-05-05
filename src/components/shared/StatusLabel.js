import React from 'react';
import styled from 'styled-components';

const StatusLabel = ({status}) => {
    if(status === 2){
        return (
            <Container>
                교환중
            </Container>
        ) 
    };

    if(status === 3){
        return (
            <Container>
                교환완료
            </Container>
        )
    };

    return null;
};

const Container = styled.div`
    background-color: #0095b7;
    position: absolute;
    z-index: 100;
    bottom: 13px;
    left: 16px;
    font-size: 12px;
    color: white;
    padding:5px 10px;
    border-radius: 55px;
`;

export default StatusLabel;