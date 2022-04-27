import React, { useState } from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddIcon from '@mui/icons-material/Add';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
export default function IconTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (e, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
        <Tab icon={<HomeOutlinedIcon />} aria-label="phone" style={{minWidth:"20%"}}/>
        <Tab icon={<SearchOutlinedIcon />} aria-label="favorite" style={{minWidth:"20%"}} />
        <Tab icon={<AddIcon />} aria-label="person" style={{minWidth:"20%"}} />
        <Tab icon={<ChatOutlinedIcon />} aria-label="favorite"  style={{minWidth:"20%"}}/>
        <Tab icon={<PeopleAltOutlinedIcon />} aria-label="phone" style={{minWidth:"20%"}} />

      </Tabs>
    );
  }