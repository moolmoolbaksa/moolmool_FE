import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { api as productActions } from '../../redux/modules/product';

import { Text, Grid } from '../../elements';
import { ReactComponent as GoldMedal } from '../../images/gold_medal.svg';
import { ReactComponent as SilverMedal } from '../../images/silver_medal.svg';
import { ReactComponent as BronzeMedal } from '../../images/bronze_medal.svg';

const HotItem = ({image, contents, title, itemId, rank}) => {
    const dispatch = useDispatch();
  
    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
    };
   
    return (
        <Container onClick={onGoDetail}>
            <RankLabel>
                {rank === 1 
                    ?   <GoldMedal />
                    :   rank === 2 
                            ?   <SilverMedal />
                            :   <BronzeMedal />
                }
            </RankLabel>
            <StyledImage src={image} />
            <Grid is_column padding="10px 10px 15px" gap="5px">
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
    min-width: 53%;
    max-width: 53%;
    border-radius: 10px;
    box-shadow: 4px 3px 9px 0px rgba(0, 0, 0, 0.09);
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
`;

export default HotItem;
