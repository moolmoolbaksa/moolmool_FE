import React from 'react';
import styled from 'styled-components';

import { Grid, Text, Image } from '../../elements/index';
import { response } from '../../shared/mock';

const DetailContent = (props) => {
    return (
        <Grid
            padding="10px 16px"
        >
            <P><span>범인은나야</span>님의 보따리 구경하기</P>
            <Grid is_flex margin="10px 0 15px 0">
                {response.list.map(v => {
                    return <Image 
                                shape="circle"
                                key={v.productId}
                                src={v.imageUrl}
                                margin="0 7px 0 0"
                            />
                })}
            </Grid>
            <Text 
                text="포켓몬 스티커 교환하실분"
                bold="bold"
                size="18px"
                margin="0 0 10px 0"
            />
            <Text 
                text="피카츄랑 라이츄 교환 원해요 스티커 아니어도 됩니다. 다른 물건 제시 가능 부담 갖지 말고 채팅주세요!"
                margin="0 0 10px 0"
            />
            <Grid is_flex width="auto">
                <Text 
                    text="3일전"
                    size="12px"
                    letterSpacing="-1px"
                    color="lightgray"
                    width="fit-content"
                    margin="0 15px 0 0"
                />
                <Text 
                    text="조회 6,132회"
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