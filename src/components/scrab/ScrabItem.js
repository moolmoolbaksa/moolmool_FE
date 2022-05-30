import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Text, Grid } from '../../elements/index';
import { useDispatch } from 'react-redux';
import { api as productActions } from '../../redux/modules/product';
import { ReactComponent as CancleIcon } from '../../images/round_cancle.svg';
import { history } from '../../redux/configureStore';

const ScrabItem = ({itemId, title, contents, image, status}) => {
    const dispatch = useDispatch();
    const [look, setLook] = useState(true);

    const onGoDetail = () => {
        if(status === 3) return;
        dispatch(productActions.getProductApi(itemId)).then(() => {history.push(`/detail/${itemId}`)});
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
                    <StyledImage src={image} status={status} /> 
                </Grid>
                <Grid is_flex is_column padding="10px 10px 15px" gap="5px">
                    <Text 
                        text={title}
                        bold="bold"
                        size="16px"
                        is_overflow
                    />
                    <Text 
                        text={contents}
                        color="#9d9d9d"
                        is_overflow
                    />
                </Grid>
            </Grid>
            <StyledCancleIcon width="22" height="22" onClick={onDelete}/>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    cursor: pointer;
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
        css`&::after {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            content: "거래완료";
            white-space: pre; // 줄바꿈이 안돼요;;;
            font-size: 14px;
            color: white;
        };`
    };
`;

const StyledCancleIcon = styled(CancleIcon)`
    position: absolute;
    z-index: 1;
    top: 2%;
    right: 2%;
    fill: ${props => props.theme.palette.yellow};
    cursor: pointer;
`;

export default ScrabItem;
