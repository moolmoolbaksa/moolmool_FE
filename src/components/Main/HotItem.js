import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from '../../elements';

const HotItem = ({image}) => {
    return (
        <Container>
            <StyledImage src={image} />
            <Grid is_flex is_column padding="10px 10px 15px" gap="5px">
                <Text 
                    text="새차 내놓습니다."
                    bold="bold"
                    size="16px"  
                />
                <Text 
                    text="새차 내놓습니다. 다른 차가 생겨서 필요가 없네우,,"
                    color="#9d9d9d"
                />
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 55%;  
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.2);
`;

const StyledImage = styled.div`
    width: 100%;
    height: 0;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding-bottom: calc(10 / 10 * 100%);
    border-radius: 10px 10px 0 0;
`;

export default HotItem;