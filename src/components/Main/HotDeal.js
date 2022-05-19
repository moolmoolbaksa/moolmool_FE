import React, { useEffect } from 'react';
import styled from 'styled-components';

import HotItem from './HotItem';
import { Text } from '../../elements';
import { useDispatch, useSelector } from 'react-redux';
import { api as itemActions } from '../../redux/modules/item';

const HotDeal = (props) => {
    const dispatch = useDispatch();
    const star_item_list = useSelector(state => state.item.star_item_list);
    console.log("제대로 뜸??", star_item_list)
    useEffect(() => {
        dispatch(itemActions.getStarItemAPi());
    }, []);

    return (
        <>
            <Text 
                text="떠오르는 추천 교환"
                bold="bold"
                size="18px"
                letterSpacing="-1px"
                wordSpacing="-1px"
                margin="15px 16px"
                width="max-content"
            />
            <Container>
                {star_item_list.map((v, i) => {
                    return  <HotItem 
                                key={v.itemId}
                                rank={i+1}
                                {...v}
                            />
                })}
            </Container>
        </>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 15px;
    overflow-x: scroll;
    white-space: nowrap;
    flex-wrap: nowrap;
    padding: 0px 16px 10px;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    };

    scroll-behavior: smooth;
`;

export default HotDeal;