import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import { history } from './redux/configureStore';
import { Login, Signup, LoginProgress, Welcome, Address } from './pages/login/index';
import {
    Detail,
    Mall,
    Trade,
    Main,
    Mypage,
    Notification,
    EditMyInfo,
    RegisterProduct,
    Tradehistory,
    Rating,
    Scrab,
    Chatroomlist,
    ChatroomDetail,
    Decidetrade,
    TradeProposal,
    TradeCheck,
    Search,
    Banlist,
} from './pages/index';
import { useDispatch } from 'react-redux';
import { api as userActions } from './redux/modules/user';
import Test from './pages/Test';

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
        };
    });

    // const is_token = localStorage.getItem('token');

    // useEffect(() => {
    //     if (is_token) dispatch(userActions.loginCheckApi());
    // }, []);

  const theme = {
    palette: {
      blue: '#0095b7',
      yellow: '#FFD467',
      gray: '#E8E8E8',
      white: '#ffffff'
    }
  };
  
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <GlobalStyle>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/auth/kakao/callback" component={LoginProgress} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/address" component={Address} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/registerproduct" component={RegisterProduct} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/scrab" component={Scrab} />
          <Route exact path="/mall/:id" component={Mall} />
          <Route exact path="/trade" component={Trade} />
          <Route exact path="/mypage" component={Mypage} />
          <Route exact path="/editmyinfo" component={EditMyInfo} />
          <Route exact path="/noti" component={Notification}/>
          <Route exact path="/trproposal/:baterid" component={TradeProposal}/>
          <Route exact path="/trcheck" component={TradeCheck}/>
          <Route exact path="/trhistory" component={Tradehistory}/>
          <Route exact path="/rating" component={Rating}/>
          <Route exact path="/chat" component={Chatroomlist}/>
          <Route exact path="/chat/:roomid" component={ChatroomDetail}/>
          <Route exact path="/Decidetrade/:userid" component={Decidetrade}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/test" component={Test}/>
          <Route exact path="/editproduct/:itemId" component={RegisterProduct} />
          <Route exact path="/Banlist" component={Banlist} />
        </GlobalStyle>
      </ThemeProvider>
    </ConnectedRouter>
  );
};
// test1
// test2
//test3
// deploy test
const GlobalStyle = styled.div`
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
