import React from 'react';
import styled from 'styled-components';

import { Grid, Image, Text } from '../../elements/index';

const MypageTop = (props) => {
    return (
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
    )
}

const Container = styled.div`
    display: flex;
    padding: 30px 0px;
    margin-bottom: 20px;
    border-bottom: 1px lightgray solid;
`;

export default MypageTop;