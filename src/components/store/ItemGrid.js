import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from '../../elements/index';
import { history } from '../../redux/configureStore';
import ItemImage from './ItemImage';

const ItemGrid = ({item_list}) => {
    const onGoCreateItem = () => {
        history.push('/registerproduct')
    };
    console.log(item_list)
    return (
        <React.Fragment>
            <Text
                text="나의 보따리"
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
                {item_list.length !== 9 && <PlusItem onClick={onGoCreateItem}>+</PlusItem>}
            </Grid>
        </React.Fragment>
    )
};

const PlusItem = styled.div`
    width: 100%;
    height: 100%;
    border: 1px gray solid;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
`

export default ItemGrid;