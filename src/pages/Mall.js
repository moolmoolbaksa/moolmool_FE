import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import MypageTop from '../components/store/MypageTop';
import ItemGrid from '../components/store/ItemGrid';
import { Grid } from '../elements/index';
import TabBar from '../components/TabBar';

const Mall = (props) => {
    const {other_item_list, ...other_info} = useSelector(state => state.user.other);
    
    return (
        <Grid height="100%" is_column>
                <MypageTop user_info={other_info} page="mall"/>
                <ItemWrap>
                    <ItemGrid item_list={other_item_list} type="mall"/>
                </ItemWrap>
            <TabBar/>
        </Grid> 
    );
};

const ItemWrap = styled.div`
    padding: 0px 16px;
    margin-top: 40px;
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default Mall;