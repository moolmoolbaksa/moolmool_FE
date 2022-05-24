import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { history } from './redux/configureStore';

// css
import backgroundImg from './images/moolmool_background.png';
import SurveyButton from './components/shared/SurveyButton';

// page import
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
        <Background>
          <SurveyButton/>
        </Background>
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
            <Route exact path="/chat" component={Chatroomlist}/>
            <Route exact path="/chat/:roomid" component={ChatroomDetail}/>
            <Route exact path="/Decidetrade/:userid" component={Decidetrade}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/test" component={Test}/>
            <Route exact path="/editproduct/:itemId" component={RegisterProduct} />
            <Route exact path="/Banlist" component={Banlist} />
          </GlobalStyle>
        {/* </Background> */}
      </ThemeProvider>
    </ConnectedRouter>
  );
};

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

const GlobalStyle = styled.div`
  position: absolute;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-color: white;
  box-shadow: 0 48px 100px 0 rgb(17 12 46 / 15%);

  @media screen and (min-width: 420px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media screen and (min-width: 900px) {
    top: 50%;
    left: 50%;
    transform: translate(-15%, -50%);
  }

  @media screen and (min-width: 1120px) {
    top: 50%;
    left: 50%;
    transform: translate(30%, -50%);
  }

  @media screen and (min-width: 1700px) {
    top: 50%;
    left: 50%;
    transform: translate(40%, -50%);
  }

  @media screen and (min-width: 2000px) {
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%); 
  }
`;

export default App;
