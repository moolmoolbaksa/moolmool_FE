import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import MypageTop from '../components/store/MypageTop';
import ItemGrid from '../components/store/ItemGrid';
import { Grid } from '../elements/index';
import TabBar from '../components/TabBar';
import LocationBar from '../components/LocationBar';

const Mall = (props) => {
    const {other_item_list, ...other_info} = useSelector(state => state.user.other);
    
    return (
        <Grid height="100%" is_flex is_column>
            <LocationBar title={`${other_info.nickname}님의 보따리`}/>   
            <Container>
                <MypageTop user_info={other_info}/>
                <ItemWrap>
                    <ItemGrid item_list={other_item_list} type="mall"/>
                </ItemWrap>
            </Container>
            <TabBar position/>
        </Grid> 
    );
};

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    padding: 0 16px;
    flex-grow: 1;
    overflow: hidden;
    
`;

const ItemWrap = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default Mall;