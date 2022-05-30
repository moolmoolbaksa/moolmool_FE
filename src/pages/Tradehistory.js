import React, { useState } from 'react';
import styled from 'styled-components';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Tradecard from '../components/tradehistory/Tradecard';
import LocationBar from '../components/LocationBar';
import { HistoryAPI } from '../shared/api';
import { useDispatch, useSelector } from 'react-redux';
import { setHistory } from '../redux/modules/tradehistory';
import TabBar from '../components/TabBar';
import { setOppentisTrade } from '../redux/modules/tradehistory';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {ReactComponent as CheckIcon} from '../images/check_icon.svg';
import {ReactComponent as Round} from '../images/Ellipse_grey.svg';

const Tradehistory = props => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('recived');
    const [tradeState,setTradeState]=useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const myid=useSelector(state=>state.user.user_info.userId);
    const receivedlist = useSelector(state=>state.tradehistory.Recivedhistory);
    const Sentlist = useSelector(state=>state.tradehistory.Senthistory);
    let sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
    let client = Stomp.over(sock);
    const message = '';
    React.useEffect(() => {
        client.connect({ Authorization: `${localStorage.getItem('token')}` }, function () {
            console.log('connected');
            console.log(client.ws.readyState);
            client.subscribe(
                `/sub/barter/${myid}`,
                function (messagefs) {
                    console.log(client.ws.readyState);
                    console.log(messagefs.body);
                    const messageFromServer = JSON.parse(messagefs.body);
                    console.log(messageFromServer);
                    console.log(messageFromServer.isTrade);
                    messageFromServer.isTrade &&
                        dispatch(setOppentisTrade({
                            barterId: messageFromServer.barterId,
                            myPosition: messageFromServer.myPosition,
                            userIsTrade: messageFromServer.isTrade,
                            status: messageFromServer.status,
                        }));
                    messageFromServer.isTrade
                        ? window.alert('상대방이 교환을 완료하였습니다.')
                        : window.alert('상대방이 교환을 완료하지않았습니다.');
                },
                { Authorization: localStorage.getItem('token') },
            );
        });

        return () => {
          client.disconnect(
            () => {
                client.unsubscribe('sub-0');
            },
            { Authorization: `${localStorage.getItem('token')}` },
        );
        };
    }, []);
    React.useEffect(() => {
        HistoryAPI.getMyhistory()
            .then(res => {
                console.log(res);
                dispatch(setHistory(res.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const trade_list=[
      {state:1, value:"교환 대기중"},
      {state:2, value:"교환중"},
      {state:3, value:"교환 완료"},
  ]
    const ReceivedTrade = () => {
        //api
        console.log('received data set');
        //setTradelist
    };

    const handleTrade=(e)=>{
      setTradeState(e.target.value);
  }

    return (
        <Container>
            <LocationBar title="나의 교환내역" />
            <TabContext value={value} sx={{ flexGrow: "1"}}>
                <TabList
                    onChange={handleChange}
                    value={value}
                    aria-label="Tabs where selection follows focus"
                    selectionFollowsFocus>
                    <Tab
                        sx={{ background: 'white', width: '50%', fontWeight: 'bold', color: '#2B9ECF', fontSize: '16px' }}
                        label="받은 교환"
                        // onClick={ReceivedTrade}
                        value="recived"
                    />
                    <Tab
                        sx={{ background: 'white', width: '50%', fontWeight: 'bold', color: '#2B9ECF', fontSize: '16px' }}
                        label="신청한 교환"
                        // onClick={SentTrade}
                        value="sent"
                    />
                </TabList>
                <SecondTab>
                {trade_list.map((p,idx)=>{
                    return (
                    <div key={`wrap_trade_${p.state}`}>
                      <input  state={p.state} key={`trade_input_${p.value}`} name="trade" id={p.value} type="radio" value={p.state} 
                      defaultChecked={tradeState.includes(p.state)}
                      onClick={handleTrade}
                      style={{display:'none'}}
                      />
                    <label key={`trade_label_${p.state}`} htmlFor={p.value}>
                      <div style={{display:'flex',alignItems: 'center'}}>{tradeState.includes(p.state)?<><CheckIcon width="1rem" height="1rem" fill="#2B9ECF"/><p>{p.value}</p></>:<><Round width="1rem" height="1rem"/><p style={{color:'lightgrey'}}>{p.value}</p></>}   </div>   
                      </label>
                    </div>)
                 
                  })}
                  </SecondTab>

                <TabPanel sx={{ 
                  '&::-webkit-scrollbar': { width: '0' },
                  padding: '0', flexGrow: '1', overflowY: 'auto' }} value="recived">
                    {receivedlist.slice().sort((a,b)=>a.status-b.status).map((p, idx) => {
                        return p.status==tradeState && <Tradecard key={`trade_${p.barterId}`} {...p} />;
                    })}
                </TabPanel>
                <TabPanel
                    sx={{
                        '&::-webkit-scrollbar': { width: '0' },
                        padding: '0',
                        flexGrow: '1',
                        overflowY: 'auto',
                    }}
                    value="sent">
                    {Sentlist.slice().sort((a,b)=>a.status-b.status).map((p, idx) => {
                        return p.status==tradeState && <Tradecard key={`trade_${p.barterId}`} {...p} messageFromServer={message} />;
                    })}
                </TabPanel>
            </TabContext>
            <TabBar />
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    display: flex; 
    flex-flow: column nowrap;
    background: #E8E8E8;
    
`;
const SecondTab=styled.div`
  background: white;
  // height:50px;
  padding:16px 16px;
  width:100%;
  display: flex;
  overflow:auto;
  // background-color:green;
  border-bottom: 1px solid lightgrey;
  // border-top: 3px solid grey;
  & > div {
  display:flex;
  margin:0 10px 0 0;
  font-size:0.8rem;
}
`

export default Tradehistory;
