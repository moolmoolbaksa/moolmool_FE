import React, { useState } from 'react';
// import styled from 'styled-components';
import styled from 'styled-components';
import { Text, Grid, Input, Button,Image } from '../elements/index';
import IconTabs from '../components/IconTabs';
import LocationBar from '../components/LocationBar';
import Card from '../components/banlist/Card';
import { ChatAPI } from '../shared/api';
import { useDispatch, useSelector } from 'react-redux';
import { setBanList } from '../redux/modules/chat';
import user from '../redux/modules/user';


const Banlist = (props) => {
  const dispatch=useDispatch();
  const BanList=useSelector(state=>state.chat.BanList);
  React.useEffect(()=>{

    ChatAPI.getBanUser()
    .then((res)=>{
      console.log(res);
      console.log('차단확인');
      dispatch(setBanList(res.data));
    })
    .catch((error)=>{
      console.log(error);
    })


    return ()=>{}
  },[])

    return (
      
      <Base>
        <LocationBar title="차단 목록"/>
        
        <Cardwrap>
        {BanList.map((user,idx)=>{
          return <Card key={user.userId} {...user}></Card>
        })}
          {/* <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/> */}
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