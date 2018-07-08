import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, Container, Content, Button, Left, Right, Icon, Grid, Col, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Text from '../component/text';
import Navbar from '../component/Navbar';
import db from '../database/db';
import Field from './field';


export default class Detail extends Component {

    constructor(props) {
        super(props);

        this.id = props._id;
        this.isNew = (!this.id);
        this.isUpdate = !(!this.id);

        this.state = {
            member: {
            }
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    componentWillMount() {
        if (this.isUpdate) {
            db.getMember(this.props._id)
                .then(member => {
                    console.log("Member", member);
                    this.setState({ member });
                });
        }
    }

    delete() {
        Alert.alert(
            `Delete - ${this.state.member.name}`,
            'Are you sure?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes', onPress: () => {
                        db.deleteMember(this.id)
                            .then(() => {
                                Alert.alert("Record deleted");
                                Actions.home();
                            })
                            .catch(err => {
                                Alert.alert("Deleted fail." + err);
                            });
                    }
                }
            ],
            { cancelable: false }
        )
    }

    save() {
        if (this.isNew) {
            db.addMember(this.state.member)
                .then(() => {
                    Actions.home()
                });
        }
        else {
            db.saveMember(this.state.member)
                .then(() => {
                    Actions.home()
                });
        }
    }

    cancel() {
        Actions.home();
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
                <Button onPress={() => this.delete()} transparent>
                    <Icon style={{ color: 'red' }} name='ios-trash-outline' />
                </Button>
            </Right>
        );

        let member = this.state.member;

        return (
            <Container style={{ backgroundColor: '#fdfdfd' }}>
                <Navbar left={left} right={right} title='Add/Update member' />
                <Content style={{ paddingTop: 10 }}>
                    <View style={{
                        backgroundColor: '#fdfdfd'
                        , paddingBottom: 10, paddingLeft: 12, paddingRight: 12, alignItems: 'center'
                    }}>
                        <Field label='Name' value={member.name} onChangeText={value => this.setState({ member: { ...this.state.member, name: value } })} />
                        <Field label='Email' value={member.email} onChangeText={value => this.setState({ member: { ...this.state.member, email: value } })} />
                        <Field label='Tel' value={member.phone} onChangeText={value => this.setState({ member: { ...this.state.member, phone: value } })} />
                        <Field label='Website' value={member.website} onChangeText={value => this.setState({ member: { ...this.state.member, website: value } })} />
                        <Grid style={{ paddingTop: 20 }}>
                            <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
                                <Button onPress={() => this.save()} style={{ borderWidth: 1 }} block iconRight transparent>
                                    <Text >Save</Text>
                                </Button>
                            </Col>
                            <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
                                <Button onPress={() => this.cancel()} style={{ borderWidth: 1 }} block iconRight transparent>
                                    <Text >Cancel</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
    row: {
        padding: 5
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    text: {
        paddingLeft: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#aaaaaa',
        borderRadius: 10,
        padding: 1
    }
};
