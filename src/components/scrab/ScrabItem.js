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
                    text={contents}
                />
            </Wrap>
        </Container>
    );
};

const Container = styled.div`
    /* border: 1px red solid; */
    width: 100%;
    display: flex;
    gap: 10px;
`;

const Wrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    overflow: hidden;
`;

const Image = styled.div`
    height: 100px;
    min-width: 100px;
    border-radius: 5px;
    background: url('${props => props.src}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

export default ScrabItem;