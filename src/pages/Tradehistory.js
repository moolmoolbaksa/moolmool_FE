import React, { useState } from 'react';
// import styled from 'styled-components';

// import { Text, Grid, Input, Button,Image } from '../elements/index';
import IconTabs from '../components/IconTabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Tradecard from '../components/tradehistory/Tradecard';
import LocationBar from '../components/LocationBar';
import { HistoryAPI } from '../shared/api';
import {useDispatch,useSelector} from 'react-redux';
import {setHistory} from '../redux/modules/tradehistory';
import TabBar from '../components/TabBar';
import {  acceptTrade, setOppentisTrade} from '../redux/modules/tradehistory';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const Tradehistory = (props) => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState("recived");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const myid=useSelector(state=>state.user.user_info.userId);
    const receivedlist = useSelector(state=>state.tradehistory.Recivedhistory);
    const Sentlist = useSelector(state=>state.tradehistory.Senthistory);
    let sock = new SockJS('https://langho968.shop/wss-stomp');
    let client = Stomp.over(sock);
    const message=''
    React.useEffect(()=>{
      client.connect({"Authorization": `${localStorage.getItem('token')}`},function() {
        console.log("connected");
        console.log(client.ws.readyState);
        client.subscribe(`/sub/barter/${myid}`, function(messagefs) {
          console.log(client.ws.readyState);
          console.log(messagefs.body);
          const messageFromServer=JSON.parse(messagefs.body);
          console.log(messageFromServer);
          messageFromServer.isTrade===true&&(setOppentisTrade({barterId:messageFromServer.barterId,myPosition:messageFromServer.myPosition,userIsTrade:messageFromServer.isTrade}));
          // window.alert('상대방이 교환을 완료하였습니다.')

      }, {"Authorization": localStorage.getItem('token')}
      );
      });
 
  
      return()=>{
          client.disconnect(()=>{client.unsubscribe('sub-0')},{"Authorization": `${localStorage.getItem('token')}`});   
  }
  },[])
    React.useEffect(()=>{
        HistoryAPI.getMyhistory()
            .then((res)=>{
                console.log(res);
                dispatch(setHistory(res.data));

            })
            .catch((error)=>{
                console.log(error);
            })
    }, []);
    
    const ReceivedTrade=()=>{
        //api
        console.log('received data set');
        //setTradelist
    };

    const SentTrade=()=>{
        //api
        console.log('Sent data set');
        //setTradelist
    };

    return (
        <div style={{height: "100%"}}>
            <LocationBar title="나의 교환내역" />
            <TabContext value={value}>
                <TabList 
                    onChange={handleChange}
                    value={value}
                    aria-label="Tabs where selection follows focus"
                    selectionFollowsFocus
                >
                    <Tab sx={{width:'50%', fontWeight:'bold', color: '#2B9ECF', fontSize: "16px"}} label="받은 교환" onClick={ReceivedTrade} value="recived"/>
                    <Tab sx={{width:'50%', fontWeight:'bold', color: '#2B9ECF', fontSize: "16px"}} label="신청한 교환" onClick={SentTrade} value="sent"/>        
                </TabList>       
                <TabPanel sx={{padding: '0', height: 'calc(100% - 170px)', overflowY: 'auto'}} value="recived">
                    {receivedlist.map((p,idx) => {
                        return  <Tradecard 
                                    key={`trade_${p.barterId}`} 
                                    {...p} 
                                /> 
                    })}
                </TabPanel>
                <TabPanel sx={{'&::-webkit-scrollbar': {width: '0'},'&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    }, padding: '0', height: 'calc(100% - 170px)', overflowY: 'auto'}} value="sent">
                    {Sentlist.map((p,idx) => { 
                        return  <Tradecard 
                                    key={`trade_${p.barterId}`} 
                                    {...p}
                                    messageFromServer={message}
                                /> 
                    })}
                </TabPanel>
            </TabContext>     
            <TabBar />
        </div>
    );
};

export default Tradehistory;