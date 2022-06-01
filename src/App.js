import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { history } from './redux/configureStore';

// css
import backgroundImg from './images/moolmool_background.png';
import brandlogo from './images/brand_name.png';
import theme from './shared/theme';
import GlobalStyle from './components/shared/GlobalStyle';

// pages
import { 
  Login, 
  Signup, 
  KaKaoLogin, 
  GoogleLogin, 
  Welcome, 
  Address 
} from './pages/login/index';

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
  Scrab,
  Chatroomlist,
  ChatroomDetail,
  Decidetrade,
  TradeProposal,
  TradeCheck,
  Search,
  Banlist,
} from './pages/index';
import Test from './pages/Test';

function App() {
  if (process.env.NODE_ENV === "production") {
    // console.log = function no_console() {};
    // console.warn = function no_console() {};
  }

  return (
    <>
      <Background />
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <BrandInfo>
            <h1>똑똑한 교환생활, 물물박사</h1>
            <img src={brandlogo} alt="물물박사 로고"/>
            <a target="blank" rel="external" href="https://docs.google.com/forms/d/e/1FAIpQLSeQtgLQ76wO2sXc69QuvjwtiwdcKgK4sNe2UwU1uHyZLPxSUA/viewform?embedded=true">서비스 피드백하러 가기</a>
          </BrandInfo> 
          <GlobalStyle>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/auth/kakao/callback" component={KaKaoLogin} />
            <Route exact path="/auth/google/callback" component={GoogleLogin} />
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
            <Route exact path="/chat" component={Chatroomlist}/>
            <Route exact path="/chat/:roomid" component={ChatroomDetail}/>
            <Route exact path="/Decidetrade/:userid" component={Decidetrade}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/test" component={Test}/>
            <Route exact path="/editproduct/:itemId" component={RegisterProduct} />
            <Route exact path="/Banlist" component={Banlist} />
            <Route exact path="/editTrade/:barterId" component={Trade} />
          </GlobalStyle>
        </ThemeProvider>
      </ConnectedRouter>
    </>
  );
};

const BrandInfo = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  left: 65px;
  h1 {
    text-indent: -9999px;
  }
  a {
    display: inline-block;
    width: 300px;
    text-align: center;
    padding: 20px 0;
    margin: 30px 0 0 7px;
    font-weight: 500;
    color: white;
    border-radius: 40px;
    font-size: 18px;
    text-decoration: none;
    background-color: #FFBB00;
    box-shadow: 0px 2px 10px 5px rgb(255 187 0 / 30%);
    cursor: pointer;
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default App;
