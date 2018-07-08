import React, { Component } from 'react';
import Text from './text';
import { Input, Picker, Item, Grid, Col, Toast, Text as NBText } from 'native-base';

export default class Field extends Component {
    render() {
        return (
            <Grid style={styles.row}>
                <Col size={1} style={{ alignSelf: 'center' }} >
                    <Text style={styles.label}>{this.props.label}</Text>
                </Col>
                <Col size={4}>
                    <Input style={styles.text}
                    {...this.props} ></Input>
                </Col>
            </Grid>
        );
    }
}

const styles = {
    row:{
        padding:5
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    text: {
        paddingLeft:15,
        fontSize: 16,
        borderWidth:1,
        borderColor:'#aaaaaa',
        borderRadius:10,
        padding:1
    }
};
