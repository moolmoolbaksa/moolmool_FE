import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import styled from 'styled-components';

import DetailBottom from '../components/detail/DetailBottom';
import DetailContent from '../components/detail/DetailContent';
import SellerBar from '../components/detail/SellerBar';
import { Image } from '../elements/index';
import { useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';

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
                <LocationBar transparent/>
                <StyledSlider {...settings}>
                    {image_list && image_list.map((v ,i) => {
                        return(
                            <Image 
                                key={i}
                                src={v}
                                shape="slide"
                            />
                        )}
                    )}
                </StyledSlider>
                <Wrap>
                    <SellerBar/>
                    <DetailContent/>
                </Wrap>
            <DetailBottom />
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
`;

const StyledSlider = styled(Slider)`
    .slick-list { 
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    .slick-dots { 
        bottom: 20px;
    }
`;

const Wrap = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export default Detail;