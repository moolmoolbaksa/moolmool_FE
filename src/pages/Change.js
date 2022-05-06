import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from '../elements/index';
import { useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';

const Change = (props) => {
    const {myImages, ...opponent_info} = useSelector(state => state.product.barter_info);
    console.log(myImages, opponent_info)
    return (
        <Grid
            height="100%"
            position="relative"
        >
            <LocationBar title="교환신청" />
            
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
    @media screen and (max-width: 400px) {
        width: 170px;
        height: 170px;
    }
`;

export default Change;