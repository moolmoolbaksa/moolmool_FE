import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Text } from '../../elements/index';
import {ReactComponent as RecommendIcon} from '../../images/추천.svg';

const DetailRecommendCategory = (props) => {
    const favored = useSelector(state => state.product.product_info.favored);
    
    if(!favored[0]){
        return null;
    };

    return (
        <Container>
            <StyledRecommendIcon width="50" height="50"/>
            <Wrap>
                <Text 
                    text="이런 물건이면 더 좋아요!"
                    size="14px"
                    bold="bold"
                />
                <Text 
                    text={favored.join(', ')}
                    size="12px"
                />
            </Wrap>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    gap: 5px;
    padding: 0px 16px 0px 7px;
    border-top: 1px #f5f5f5 solid;
`;

const Wrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    gap: 2px;
    justify-content: center;
    overflow: hidden;
`;

const StyledRecommendIcon = styled(RecommendIcon)`
    min-width: 50px;
`;

export default DetailRecommendCategory;