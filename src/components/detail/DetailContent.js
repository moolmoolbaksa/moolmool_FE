import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Text, Image } from '../../elements/index';
import { api as userActions } from '../../redux/modules/user';

const DetailContent = (props) => {
    const dispatch = useDispatch();
    const product_info = useSelector(state => state.product.product_info);
    
    const {
        userId,
        nickname,
        title,
        date,
        contents,
        bagImages,
        viewCnt,
    } = product_info;

    const onGoUserMall = () => {
        dispatch(userActions.getCounterUserInfoApi(userId));
    };

    return (
        <Grid
            padding="10px 16px"
        >
            <P onClick={onGoUserMall}><span>{nickname}</span>님의 보따리 구경하기</P>
            <Grid is_flex margin="10px 0 15px 0">
                {bagImages && bagImages.map((v, i) => {
                    return <Image 
                                shape="circle"
                                onClick={onGoUserMall}
                                key={i}
                                src={v}
                                margin="0 7px 0 0"
                            />
                })}
            </Grid>
            <Text 
                text={title}
                bold="bold"
                size="18px"
                margin="0 0 10px 0"
            />
            <Text 
                text={contents}
                margin="0 0 10px 0"
            />
            <Grid is_flex width="auto">
                <Text 
                    text={date}
                    size="12px"
                    letterSpacing="-1px"
                    color="lightgray"
                    width="fit-content"
                    margin="0 15px 0 0"
                />
                <Text 
                    text={`조회 ${viewCnt}`}
                    size="12px"
                    letterSpacing="-1px"
                    width="fit-content"
                    color="lightgray"
                />
            </Grid>
        </Grid>
    );
};

const P = styled.p`
    color: gray;
    letter-spacing: -1px;
    & span {
        color: black;
        font-size: 17px;
        font-weight: bold;
        letter-spacing: -2px;
    }
`;

export default DetailContent;