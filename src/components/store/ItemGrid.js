import React from 'react';

import { Text, Grid } from '../../elements/index';
import ItemImage from './ItemImage';

const ItemGrid = ({item_list}) => {

    return (
        <React.Fragment>
            <Text
                text="물물박사님의 보따리"
                bold="bold"
                size="24px"
                letterSpacing="-1px"
            />
            <Grid gridBox margin="20px 0">
                {item_list.map((v, i) => {
                    return  <ItemImage 
                                key={i}
                                {...v}
                            />       
                })}
            </Grid>
        </React.Fragment>
    )
}

export default ItemGrid;