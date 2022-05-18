import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Text, Grid } from '../../elements';
import { api as productActions } from '../../redux/modules/product';
import { ReactComponent as Medal } from '../../images/메달.svg';

const HotItem = ({image, contents, title, itemId, rank}) => {
    const dispatch = useDispatch();
  
    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
    };
   
    return (
        <Container onClick={onGoDetail}>
            <RankLabel>
                <Grid position="relative" flex>
                    <StyledMedal className={`rank-${rank}`}/>
                    <span>{rank}</span>
                </Grid>
            </RankLabel>
            <StyledImage src={image} />
            <Grid is_flex is_column padding="10px 10px 15px" gap="5px">
                <Text 
                    text={title}
                    bold="bold"
                    size="16px"  
                />
                <Text 
                    text={contents}
                    color="#9d9d9d"
                />
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
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

const RankLabel = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 2%;
    top: 2%;

    span {
        position: absolute;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: white;
        font-weight: bold;
        font-size: 18px;
    };
`;

const StyledMedal = styled(Medal)`
    &.rank-2 {
        path {
            fill: #CDCDCD;
        };
        circle {
            fill: #8D8C8C;
        };
    };
    &.rank-3 {
        path {
            fill: #E2B357;
        };
        circle {
            fill: #C07A27;
        };
    }
`;

export default HotItem;