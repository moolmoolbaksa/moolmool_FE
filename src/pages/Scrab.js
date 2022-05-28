import React, { useEffect } from 'react';
import styled from 'styled-components';

import { api as ProductActions } from '../redux/modules/product';
import LocationBar from '../components/LocationBar';
import ScrabItem from '../components/scrab/ScrabItem';
import { useDispatch, useSelector } from 'react-redux';
import TabBar from '../components/TabBar';

const Scrab = (props) => {
    const dispatch = useDispatch();
    const scrab_list = useSelector(state => state.product.scrab_list);
    console.log(scrab_list)
    useEffect(() => {
        dispatch(ProductActions.getMyScrabListApi());
    }, []);
    
    return(
        <Container>
            <LocationBar title="찜목록"/>
            <ScrabContainer>
                <ScrabWrap>
                    {scrab_list.map(v => {
                        return  <ScrabItem 
                                    key={v.itemId}
                                    {...v}
                                />
                    })}  
                </ScrabWrap>
            </ScrabContainer>
            <TabBar/>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    background-color: #f5f5f5;
`;

const ScrabContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    padding: 16px 16px 0px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none; 
    };
`;

const ScrabWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px 10px;
    padding-bottom: 10px;
`;

export default Scrab;