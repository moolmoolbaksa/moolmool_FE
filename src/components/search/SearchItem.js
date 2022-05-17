import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Text, Grid } from '../../elements';
import { api as productActions } from '../../redux/modules/product';

const SearchItem = ({image, contents, title, itemId}) => {
    const dispatch = useDispatch();

    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
    };

    return (
        <Container onClick={onGoDetail}>
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
    display: flex;
    overflow: hidden;
    flex-direction: column;
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

export default SearchItem;