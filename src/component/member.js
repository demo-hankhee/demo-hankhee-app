import React, { Component } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Text from './text';

export default cla./ textber extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress(_id) {
    Actions.detail({ _id });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.onPress(this.props._id)}
          activeOpacity={0.9}
        >
          <View style={{ padding: 25 }}>
            <View style={styles.overlay} />
            <View style={styles.border} />
            <Text >{this.props.code}</Text>
            <View style={{ padding: 15 }}>
              <Text style={[styles.text, { padding: 0, fontWeight: "bold", fontSize: 24, color: 'blue' }]}>{this.props.name}</Text>
            </View>
            <Text>{this.props.email}</Text>
            <Text>{this.props.phone}</Text>
            <Text>{this.props.website}</Text>
          </View>
          <View style={styles.image}>
            <Icon name='ios-contact' style={{ fontSize: 100, color: '#aaaaaa' }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  text: {
    width: Dimensions.get('window').width,
    height: 40,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: '#FAFCF6'
  },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: '#C3C3C3'
  },
  image: {
    padding: 35,
    height: 180,
    width: null,
    position: 'absolute',
    alignSelf: 'flex-end'
  }
};
