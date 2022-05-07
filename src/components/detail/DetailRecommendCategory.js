import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Text } from '../../elements/index';
import {ReactComponent as RecommendIcon} from '../../images/추천.svg';

const DetailRecommendCategory = (props) => {
    const favored = useSelector(state => state.product.product_info.favored);
    
    return (
        <Container>
            <RecommendIcon width="50" height="50"/>
            <Grid
                padding="5px 0 0 0"
            >
                <Text 
                    text="이런 물건이면 더 좋아요!"
                    size="16px"
                    bold="bold"
                    letterSpacing="-0.67px"
                />
                <Text 
                    text={favored.join(', ')}
                />
            </Grid>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 5px;
    margin-bottom: 86px;
    padding: 5px 16px 0;
    border-top: 1px #f5f5f5 solid;
`;

export default DetailRecommendCategory;