import React from 'react';
import {View, Text, Image, Platform, Dimensions, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import {connect} from "react-redux";

export class MainHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('MyPage')}
            style={{
                right: Platform.OS === 'ios' ? Dimensions.get("window").height < 667 ? '10%' : '5%' : '25%',
                backgroundColor: 'transparent',
                paddingLeft: 15,
                marginRight: 10,
            }}>
                <Image style={{width: 40, height: 40, borderRadius: 20,}}
                       source={{uri: this.props.profile.user.profileUrl? this.props.profile.user.profileUrl : this.props.profile.userData.user.USER_PROFILE_URL}}/>
            </TouchableOpacity>
        );
    }
}


function mapStateToProps (state) {
    console.log("main header",state.data);
    return {
        profile: state.data
    }
}
export default withNavigation(connect(mapStateToProps)(MainHeader))