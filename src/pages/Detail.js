import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import styled from 'styled-components';

import {
    DetailBottom, 
    DetailContent, 
    DetailRecommendCategory, 
    OpponentInfo, 
    TransMethod
} from '../components/detail/index';
import { Image, Grid } from '../elements/index';
import { useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';
import StatusLabel from '../components/shared/StatusLabel';
import Drawer from '../components/modal/Drawer';
import { ReactComponent as ReportIcon } from '../images/report.svg';
import ReportModal from '../components/modal/ReportModal';
import LoginModal from '../components/modal/LoginModal';
import DeleteModal from '../components/modal/DeleteModal';
import AlertModal from '../components/modal/AlertModal';

const Detail = (props) => {
    const {images, status, itemId, nickname} = useSelector(state => state.product.product_info);
    const is_login = useSelector(state => state.user.is_login);
    const my_nickname = useSelector(state => state.user.user_info.nickname);

    const settings = { 
        infinite: false,
        dots: true, 
        speed: 500,
        slidesToShow: 1, 
        slidesToScroll: 1,
    };
    
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <>
        <Container>
            <LocationBar transparent />
            {is_login && nickname !== my_nickname && <StyledReportIcon width="36" height="36" onClick={() => {setIsOpen(!isOpen)}}/>}
            <Grid
                position="relative"
            >
                <StyledSlider {...settings}>
                    {images.length && images.map((v ,i) => {
                        return(
                            <Image 
                                key={i}
                                src={v}
                                shape="slide"
                            />
                        )}
                    )}
                </StyledSlider>
                <StatusLabel status={status}/>
                <TransMethod />
            </Grid>
            <Wrap>
                <OpponentInfo/>
                <DetailContent/>
                <DetailRecommendCategory/>
            </Wrap>
            <DetailBottom />
        </Container>
        {isOpen &&  <Drawer 
                        location="detail" 
                        itemId={itemId} 
                        onclose={() => {setIsOpen(!isOpen)}}
                    />
        }
        <ReportModal />
        <LoginModal />
        <DeleteModal itemId={itemId} />
        <AlertModal>{status === 2 ? '교환 진행 중인 상품입니다.' : '교환 완료된 상품입니다.'}</AlertModal>
        </>
    );
};

const Container = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
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

const StyledReportIcon = styled(ReportIcon)`
    cursor: pointer;
    position: absolute;
    right: 7px;
    top: 7px;
    z-index: 200;
`;

export default Detail;