import React, { useEffect } from 'react';
import styled from 'styled-components';

import { api as ProductActions } from '../redux/modules/product';
import LocationBar from '../components/LocationBar';
import ScrabItem from '../components/scrab/ScrabItem';
import { useDispatch, useSelector } from 'react-redux';

const Scrab = (props) => {
    const dispatch = useDispatch();
    const scrab_list = useSelector(state => state.product.scrab_list);
    
    useEffect(() => {
        dispatch(ProductActions.getMyScrabListApi());
    }, []);
    
    return(
        <Container>
            <LocationBar title="찜목록"/>
            <ScrabWrap
                padding="16px 16px 0"
                is_flex
                is_column
                gap="10px"            
            >
                {scrab_list.map(v => {
                    return  <ScrabItem 
                                key={v.itemId}
                                {...v}
                            />
                })}  
            </ScrabWrap>
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    background-color: #f5f5f5;
`;

const ScrabWrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    padding: 10px 16px 0px;
    gap: 10px; 
    height: calc(100% - 70px);
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
`;

export default Scrab;