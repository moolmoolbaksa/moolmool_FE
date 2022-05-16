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
                    size="16px"
                    bold="bold"
                />
                <Text
                    multi="2"
                    size="12px"
                    text={contents}
                    color="#9D9D9D"
                />
            </Wrap>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    gap: 10px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.2);
`;

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    overflow: hidden;
`;

const Image = styled.div`
    height: 90px;
    min-width: 90px;
    border-radius: 10px 0px 0px 10px;
    background: url('${props => props.src}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

export default ScrabItem;