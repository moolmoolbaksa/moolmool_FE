import React, { useState } from 'react';
// import styled from 'styled-components';
import { styled, alpha } from '@mui/material/styles';
import { Text, Grid, Input, Button,Image } from '../elements/index';
import IconTabs from '../components/IconTabs';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Tradecard from '../components/tradehistory/Tradecard';
import LocationBar from '../components/LocationBar';
import { ItemAPI } from '../shared/api';
// Instantiation


const Tradehistory = (props) => {
    const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [tradelist,setTradelist]=React.useState([]);


  React.useEffect(()=>{
    ItemAPI.getMyhistory()
    .then((res)=>{
        console.log(res);
    })
    .catch((error)=>{
        console.log(error);
    })

  },[])
const ReceivedTrade=()=>{
    //api
    console.log('received data set');
    //setTradelist
}

const SentTrade=()=>{
    //api
    console.log('Sent data set');
    //setTradelist
}
    const tooltip='교환중'
    return (
        <React.Fragment>
            <LocationBar title="나의 교환내역" />
            <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where selection follows focus"
                selectionFollowsFocus
            >
                <Tab sx={{width:'50%', fontWeight:'bold'}}label="받은 교환" onClick={ReceivedTrade} />
                <Tab sx={{width:'50%', fontWeight:'bold'}} label="신청한 교환" onClick={SentTrade} />        
            </Tabs>
            {/* map함수 tradelist.map */}
            <Tradecard/>
            <Tradecard/>
            <Tradecard/>

            
            <IconTabs/>
        </React.Fragment>
        
        
        

    );
};


export default Tradehistory;