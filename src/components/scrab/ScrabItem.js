import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Text } from '../../elements/index';
import { useDispatch } from 'react-redux';
import { api as productActions } from '../../redux/modules/product';

const ScrabItem = ({itemId, title, contents, image}) => {
    const dispatch = useDispatch();

    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
    };
    
    return (
        <Container>
            <Image 
                onClick={onGoDetail}
                src={image}
            />
            <Wrap>
                <Text
                    onClick={onGoDetail}
                    text={title}
                    size="18px"
                    bold="bold"
                />
                <Text
                    multi="2"
                    text={contents}
                    color="#9D9D9D"
                />
            </Wrap>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    padding: 0 5px;
    border-bottom: 2px #9D9D9D solid;
    padding-bottom: 15px;
`;

const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-top: 5px;
    overflow: hidden;
`;

const Image = styled.div`
    height: 90px;
    min-width: 90px;
    border-radius: 5px;
    background: url('${props => props.src}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

export default ScrabItem;