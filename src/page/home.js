import React, { Component } from 'react';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Text from '../component/text';
import Navbar from '../component/navbar';
import SideMenu from '../component/sideMenu';
import SideMenuDrawer from '../component/sideMenuDrawer';
import Member from '../component/member';
import Detail from '../component/detail';
import db from '../database/db';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      members: {}
    }

    this.addNew = this.addNew.bind(this);
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    db.getMembers().then(members => this.setState({ members }));
  }

  addNew(){
    Actions.detail();
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name='ios-menu-outline' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => this.addNew()} transparent>
          <Icon name='ios-add' />
        </Button>
      </Right>
    );
    return (
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>
          <Navbar left={left} right={right} title="MEMBERS" />
          <Content>
            {this.renderMembers()}
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }

  renderMembers() {
    let mem = [];
    let members = this.state.members;
    for (var i = 0; i < members.length; i++) {
      mem.push(
        <Member key={members[i]._id} _id={members[i]._id}  code={members[i].code} 
          name={members[i].name} email={members[i].email} 
          phone={members[i].phone} website={members[i].website} />
      );
    }
    return mem;
  }

}
