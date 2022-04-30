import React from 'react';
import slider from 'react-slick/lib/slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import styled from 'styled-components';

import DetailBottom from '../components/detail/DetailBottom';
import DetailContent from '../components/detail/DetailContent';
import SellerBar from '../components/detail/SellerBar';
import { Image, Grid } from '../elements/index';
import { useSelector } from 'react-redux';

const Detail = (props) => {
    const image_list = useSelector(state => state.product.product_info.images);

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
                    {image_list && image_list.map((v ,i) => {
                        return(
                            <Image 
                                key={i}
                                src={v}
                                shape="slide"
                                size='40'
                            />
                        )}
                    )}
                </StyledSlider>
                <SellerBar/>
                <DetailContent/>
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