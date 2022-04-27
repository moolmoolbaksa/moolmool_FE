import React from 'react';
import slider from 'react-slick/lib/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import styled from 'styled-components';
import DetailBottom from '../components/detail/DetailBottom';
import DetailContent from '../components/detail/DetailContent';
import SellerBar from '../components/detail/SellerBar';

import { Image, Grid } from '../elements/index';
import { response } from '../shared/mock';

const Detail = (props) => {
    const settings = { 
        infinite: false,
        dots: true, 
        speed: 500,
        slidesToShow: 1, 
        slidesToScroll: 1,
    };

    return (
        <Container>
            <Grid>
                <StyledSlider {...settings}>
                    {response.list.map((v ,i) => {
                        return(
                            <Image 
                                key={v.productId}
                                src={v.imageUrl}
                                shape="slide"
                                size='40'
                            />
                        )}
                    )}
                </StyledSlider>
                <SellerBar />
                <DetailContent />
            </Grid>
            <DetailBottom />
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
`;

const StyledSlider = styled(slider)`
    .slick-list {  
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    .slick-dots { 
        bottom: 20px;
    }
`;

export default Detail;