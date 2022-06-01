import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { history } from '../../redux/configureStore';
import { useSelector } from 'react-redux';

import { blickSign } from '../../animation/blinkSign';

import { Grid } from '../../elements/index';
import { ReactComponent as SearchIcon } from '../../images/돋보기.svg';
import { ReactComponent as NotiIcon } from '../../images/종.svg';
import _ from 'lodash';

const MainHeader = ({dom}) => {
    const unread_noti = useSelector(state => state.notification.unread_noti);
    const [hide, setHide] = useState(false);
    const [pageY, setPageY] = useState(0);
    
    const handleScroll = () => {
        const scrollTop = dom.scrollTop;
        console.log(scrollTop)
        const deltaY = scrollTop - pageY;
        const hide = scrollTop !== 0 && deltaY >= 0;
        setHide(hide);
        setPageY(scrollTop);
    };

    const throttleScroll = _.throttle(handleScroll, 100);

    useEffect(() => {
        if(dom){
            dom.addEventListener('scroll', throttleScroll);
            
            return () => {
                dom.removeEventListener('scroll', throttleScroll)
            };
        }
    }, [dom, throttleScroll]);
    
    return (
        // <HeaderContainer>
            <HeaderWrap className={hide && 'hide'}>
                <Grid flex gap="10px">
                <SearchIcon width="24" height="24" onClick={() => {history.push('/search')}}/>
                <NotiWrap>
                    <NotiIcon
                        onClick={() => {
                            history.push('/noti');
                        }}
                    />
                    {unread_noti !== 0 && <NotiSign />}
                </NotiWrap>
                </Grid>
            </HeaderWrap>
        /* </HeaderContainer> */
    );
};

const HeaderContainer = styled.div`
    height: 48px;
    /* min-height: 48px; */
    position: relative;
`;

const HeaderWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    /* position: absolute; */
    top: 0;
    left: 0;
    z-index: 100000;
    width: 100%;
    height: 48px;
    line-height: 48px;
    padding: 10px 16px;
    transition: 0.4s ease;
    /* background-color: white; */
    &.hide {
        transform: translateY(-48px);
        /* top: -48px */
        height: 0;
        padding: 0px 16px;
        
    }
`;

const NotiWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const NotiSign = styled.div`
    position: absolute;
    top: 4px;
    right: -1px;
    width: 7px;
    height: 7px;
    background-color: red;
    border-radius: 10px;
    animation: ${blickSign} 3s infinite ease-out;
`;

export default MainHeader;
