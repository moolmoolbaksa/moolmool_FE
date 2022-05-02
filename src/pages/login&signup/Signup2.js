import React from 'react';
import styled from 'styled-components';
import KakaoMap from '../../components/shared/KakaoMap';
import { Grid, Text } from '../../elements/index';

const Signup2 = (props) => {
    return (
        <Grid
            is_flex
            is_column
            padding="0 16px"
            height="100vh"
            justify="center"
        >
            <Text 
                text="회원가입"
                textAlign="center"
                size="24px"
                lineHeight="100px"
                letterSpacing="-0.6px"
                bold="bold"
                flex
            />
            <KakaoMap />
        </Grid>
    );
};


export default Signup2;