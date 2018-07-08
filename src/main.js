import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Home from './page/home';
import Login from './page/login';
import Detail from './component/detail';

export default class Main extends Component {
  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="home" component={Home} hideNavBar />
            <Scene key="login" component={Login} hideNavBar />
            <Scene  key="detail" component={Detail} hideNavBar  />
          </Scene>
        </Router>
      </Root>
    );
  }

}
