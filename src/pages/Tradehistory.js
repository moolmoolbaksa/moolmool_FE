import React, { useState } from 'react';
// import styled from 'styled-components';
import { styled, alpha } from '@mui/material/styles';
import { Text, Grid, Input, Button,Image } from '../elements/index';
import IconTabs from '../components/IconTabs';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Tradecard from '../components/tradehistory/Tradecard';
// Instantiation


const Tradehistory = (props) => {
    const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


    return (
        <React.Fragment>
            <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where selection follows focus"
                selectionFollowsFocus
            >
                <Tab label="Item One" />
                <Tab label="교환 완료" />        
            </Tabs>
            <Tradecard/>
            <Tradecard/>
            <Tradecard/>

            
            <IconTabs/>
        </React.Fragment>
        
        
        

    );
};


export default Tradehistory;