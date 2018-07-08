import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './sideMenu';

export default class SideMenuDrawer extends Component {
  render() {
    return(
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<SideMenu />}
        tapToClose={true}
        type="overlay"
        openDrawerOffset={0.3}
        onCloseStart={() => Keyboard.dismiss()}
        >
          {this.props.children}
      </Drawer>
    );
  }

  close() {
    this._drawer.close();
  }

  open() {
    this._drawer.open();
  }

}
