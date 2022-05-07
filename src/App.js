import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import { history } from './redux/configureStore';
import {
  Login,
  Signup,
  LoginProgress,
  Welcome,
} from './pages/login&signup/index';
import { 
  Detail,
  Mall,
  Change,
  Main,
  Mypage,
  Notification,
  EditMyInfo,
  RegisterProduct,
  Address,
  Tradehistory,
  Rating,
  Chatroomlist,
  ChatroomDetail,
} from './pages/index';
import { useDispatch } from 'react-redux';
import { api as userActions } from './redux/modules/user';

function App() {
  const dispatch = useDispatch();

  const handleResize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  handleResize();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });

  const is_token = localStorage.getItem("token");

  useEffect(() => {
    if (is_token) dispatch(userActions.loginCheckApi());
  }, []);
  
  return (
    <ConnectedRouter history={history}>
      <Container>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/auth/kakao/callback" component={LoginProgress} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/address" component={Address} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registerproduct" component={RegisterProduct} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/mall/:id" component={Mall} />
        <Route exact path="/change" component={Change} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/editmyinfo" component={EditMyInfo} />
        <Route exact path="/noti" component={Notification}/>
        <Route exact path="/trhistory" component={Tradehistory}/>
        <Route exact path="/rating" component={Rating}/>
        <Route exact path="/chat" component={Chatroomlist}/>
        <Route exact path="/chat/:roomid" component={ChatroomDetail}/>
      </Container>
    </ConnectedRouter>
  );
};

const Container = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  width: 100%;
  background-color: white;
  max-width: 420px;
  box-shadow: 0 48px 100px 0 rgb(17 12 46 / 15%);
  margin: 0 auto;
`;

export default App;


    
