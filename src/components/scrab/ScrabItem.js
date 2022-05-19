import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Text, Grid } from '../../elements/index';
import { useDispatch } from 'react-redux';
import { api as productActions } from '../../redux/modules/product';

const ScrabItem = ({itemId, title, contents, image, status}) => {
    const dispatch = useDispatch();
    const [look, setLook] = useState(true);

    const onGoDetail = () => {
        if(status === 3) return;
        dispatch(productActions.getProductApi(itemId));
    };
    
    const onDelete = () => {
        dispatch(productActions.setProductScrabApi(itemId));
        setLook(!look)
    };

    if(!look){
        return null
    };

    return (
        <Container>
            <Grid onClick={onGoDetail}>
                <Grid position="relative">
                    <StyledImage src={image} /> 
                </Grid>
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
            </Grid>
            <DeleteLabel onClick={onDelete}>
                <span 
                    className="material-symbols-outlined"
                >
                    close
                </span>
            </DeleteLabel>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.2);
`;

const StyledImage = styled.div`
    width: 100%;
    height: 0;
    background-image: ${props => props.status === 3 && 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),'} url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding-bottom: calc(10 / 10 * 100%);
    border-radius: 10px 10px 0 0;

    ${props => props.status === 3 &&
        css`&::before {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            content: "거래완료";
            white-space: pre; // 줄바꿈이 안돼요;;;
            font-size: 14px;
            color: white;
        };`
    };
`;

const DeleteLabel = styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 3%;
    right: 3%;
    width: 20px;
    height: 20px;
    background-color: ${props => props.theme.palette.yellow};
    border-radius: 50%;
    cursor: pointer;
    span {
        font-size: 15px;
        font-weight: bold;
    };
`;

export default ScrabItem;
