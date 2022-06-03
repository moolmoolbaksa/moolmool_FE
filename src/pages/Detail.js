import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import {
    DetailBottom, 
    DetailContent, 
    DetailRecommendCategory, 
    OpponentInfo, 
    TransMethod
} from '../components/detail/index';
import { Grid } from '../elements/index';
import { useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';
import StatusLabel from '../components/shared/StatusLabel';
import Drawer from '../components/modal/Drawer';
import { ReactComponent as ReportIcon } from '../images/report.svg';
import ReportModal from '../components/modal/ReportModal';
import LoginModal from '../components/modal/LoginModal';
import DeleteModal from '../components/modal/DeleteModal';
import AlertModal from '../components/modal/AlertModal';
import NoneModal from '../components/modal/NoneModal';
import Slide from '../components/detail/Slide';

const Detail = (props) => {
    const {status, itemId, nickname} = useSelector(state => state.product.product_info);
    const is_login = useSelector(state => state.user.is_login);
    const my_nickname = useSelector(state => state.user.user_info.nickname);
   
    const [ isOpen, setIsOpen ] = useState(false);
   
    return (
        <>
        <Container >
            <LocationBar type="detail"/>
            {is_login && nickname !== my_nickname && <StyledReportIcon width="36" height="36" onClick={() => {setIsOpen(!isOpen)}}/>}
            <Grid
                position="relative"
            >
                <Slide/>
                <StatusLabel status={status}/>
                <TransMethod/>
            </Grid>
            <Wrap>
                <OpponentInfo/>
                <DetailContent/>
                <DetailRecommendCategory/>
            </Wrap>
            <DetailBottom />
        </Container>
        {status === 6 && <NoneModal />}
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