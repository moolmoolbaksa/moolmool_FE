import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from '../elements/index';
import { response } from '../shared/mock'
import TouchSlide from '../shared/TouchSlide';
import DetailBottom from '../components/detail/DetailBottom';

const Change = (props) => {
    return (
        <Grid
            padding="30px 16px"
            height="100vh"
            position="relative"
        >
            <Text 
                text="범인은나야님의 보따리"
                bold="bold"
                size="24px"
                letterSpacing="-1px"
            />
            <Grid height="390px" margin="20px 0 40px 0">
                <Grid gridBox>
                    {response.list.map((v, i) => {
                        return  <ImageWrap 
                                    shape="rectangle"
                                    src={v.imageUrl}
                                    key={i}
                                />          
                    })}
                </Grid>
            </Grid>
            <Text 
                text="물물박사님의 보따리"
                bold="bold"
                size="24px"
                margin="0 0 10px 0"
                letterSpacing="-1px"
            />
            <TouchSlide />
            <DetailBottom change/>
        </Grid>
    );
};

const ImageWrap = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 5px;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export default Change;