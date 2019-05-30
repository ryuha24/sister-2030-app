import React from 'react'
import {ActivityIndicator, StatusBar, Image, StyleSheet, Text, View, AsyncStorage} from 'react-native'
import {connect} from "react-redux";
import {getProfile} from "../action";

export class Loading extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        console.log('loading', userId);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if(userId) {
            this.props.getProfile(userId, this.props.navigation);
        } else {
            this.props.navigation.navigate('Account');
        }
    };

    render() {
        return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        screenData: state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getProfile: (userId,navigation) => dispatch(getProfile(userId, navigation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);