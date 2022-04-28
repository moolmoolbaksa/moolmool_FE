import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/configureStore';
import { Login, Signup, Detail, Mall, Change, Main, FirstSet, Mypage, Notification } from './pages/index';
import RegisterProduct from './pages/RegisterProduct';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/firstset" component={FirstSet} />
        <Route exact path="/registerproduct" component={RegisterProduct} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/mall" component={Mall} />
        <Route exact path="/change" component={Change} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/noti" component={Notification}/>
      </Switch>
    </ConnectedRouter>
  );
};

export default App;


    
