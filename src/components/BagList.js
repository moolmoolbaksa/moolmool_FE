import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from '../elements/index';
import { response } from '../shared/mock'

const BagList = (props) => {
    return (
        <React.Fragment>
            <Text 
                text="물물박사님의 보따리"
                bold="bold"
                size="24px"
                letterSpacing="-1px"
            />
            <Grid gridBox margin="20px 0">
                {response.list.map(v => {
                    return  <ImageOutter key={v.productId}>
                                <ImageInner 
                                    src={v.imageUrl} 
                                />  
                            </ImageOutter>        
                })}
            </Grid>
        </React.Fragment>
    )
}

const ImageOutter = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
`;

const ImageInner = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    cursor: pointer;

    &:active {
        background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url('${props => props.src}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
`;

export default BagList;