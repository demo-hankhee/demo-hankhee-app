
import React, { Component } from 'react';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Colors from '../Colors';
import Text from '../component/text';
import Navbar from '../component/navbar';
const axios = require('axios');
const db = require('../database/db');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'user115',
      password: 'pass115'
    };
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name='ios-search-outline' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <Navbar left={left} right={right} title="LOGIN" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50 }}>
          <View style={{ marginBottom: 35, width: '100%' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor }}>Welcome back, </Text>
            <Text style={{ fontSize: 18, textAlign: 'left', width: '100%', color: '#687373' }}>Login to continue </Text>
          </View>
          <Item>
            <Icon active name='ios-person' style={{ color: "#687373" }} />
            <Input placeholder='Username' onChangeText={(text) => this.setState({ name: text })} placeholderTextColor="#687373" value={this.state.name}></Input>
          </Item>
          <Item>
            <Icon active name='ios-lock' style={{ color: "#687373" }} />
            <Input placeholder='Password' onChangeText={(text) => this.setState({ password: text })} value={this.state.password} secureTextEntry={true} placeholderTextColor="#687373" />
          </Item>
          {this.state.hasError ? <Text style={{ color: "#c0392b", textAlign: 'center', marginTop: 10 }}>{this.state.errorText}</Text> : null}
          <View style={{ alignItems: 'center' }}>
            <Button onPress={() => this.login()} style={{ backgroundColor: Colors.navbarBackgroundColor, marginTop: 20 }}>
              <Text style={{ color: '#fdfdfd' }}>Login</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }

  login() {
    axios.post('https://demo-hankhee.herokuapp.com/api/login',
      {
        name: this.state.name,
        password: this.state.password
      })
      .then(response => {
        db.setToken(response.data.token);
        console.log('token', response.data.token);
      })
      .catch(err => {
        console.log('err', err);
      });
  }
}
