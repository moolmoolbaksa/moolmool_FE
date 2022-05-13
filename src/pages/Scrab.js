import React from 'react';
import styled from 'styled-components';

import { Grid } from '../elements/index';
import LocationBar from '../components/LocationBar';
import ScrabItem from '../components/scrab/ScrabItem';
import { useSelector } from 'react-redux';
import Loading from '../components/shared/Loading';

const Scrab = (props) => {
    const scrab_list = useSelector(state => state.product.scrab_list);
    console.log(scrab_list);
    return(
        <Grid
            height="100%"
        >
            <LocationBar title="찜목록"/>
            <Grid
                padding="12px 16px"
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
            </Grid>
        </Grid>
    );
};

export default Scrab;