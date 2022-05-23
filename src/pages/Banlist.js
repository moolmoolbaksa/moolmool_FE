import React, { useState } from 'react';
// import styled from 'styled-components';
import styled from 'styled-components';
import { Text, Grid, Input, Button,Image } from '../elements/index';
import IconTabs from '../components/IconTabs';
import LocationBar from '../components/LocationBar';
import Card from '../components/banlist/Card';
// import { FaStar } from 'react-icons/fa';

// Instantiation


const Banlist = (props) => {


    return (
      
      <Base>
        <LocationBar title="차단 목록"/>
        <Cardwrap>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </Cardwrap>
      </Base>
    );
};
const Base=styled.div`

`
const Cardwrap=styled.div`
  padding:20px;
  // border:2px solid orange;

`;

export default Banlist;