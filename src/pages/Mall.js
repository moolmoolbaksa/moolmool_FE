import React from 'react';
import styled from 'styled-components';
import DetailBottom from '../components/detail/DetailBottom';

import { Grid, Image, Text } from '../elements/index';
import { response } from '../shared/mock'

const Mall = (props) => {
    return (
        <>
        <Grid
            padding="0 16px"
            position="relative"
            height="100vh"
        >
            <Container>
                <Grid width="50%" flex justify="center">
                    <Image
                        type="circle"
                        size="150"
                        margin="0"
                    />
                </Grid>
                <Grid
                    width="50%"
                    is_flex
                    is_column
                    justify="space-around"
                >
                    <div>
                        <Text 
                            text="물물박사 (Lv. 박사)"
                            bold="bold"
                            size="22px"
                            letterSpacing="-1px"
                        />
                        <Text 
                            text="서울시 강동구"
                            color="gray"
                            letterSpacing="-1px"
                        />
                    </div>
                    <Text 
                        text="술과 음악을 사랑하는 물물박사입니다~!!"
                        letterSpacing="-1px"
                    />
                </Grid>
            </Container>
            <Text 
                text="물물박사님의 보따리"
                bold="bold"
                size="24px"
                letterSpacing="-1px"
            />
            <Grid gridBox margin="20px 0">
                {response.list.map(v => {
                    return  <ImageWrap 
                                shape="rectangle"
                                src={v.imageUrl}
                                key={v.productId}
                            />          
                })}
            </Grid> 
        <DetailBottom />
        </Grid>
        </>
    );
};

const Container = styled.div`
    display: flex;
    padding: 30px 0px;
    margin-bottom: 20px;
    border-bottom: 1px lightgray solid;
`;

const ImageWrap = styled.div`
    width: 120px;
    height: 120px;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export default Mall;