import React from 'react';
import {View, Text, Image, Platform, Dimensions, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class MainHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    _moveMyPage = ({navigation}) => {
        navigation.navigate('MyPage')
    };
    render() {
        return (
            <TouchableOpacity onPress={this._moveMyPage} style={{right: Platform.OS === 'ios' ? Dimensions.get("window").height < 667 ?  '10%' : '5%' : '25%', backgroundColor: 'transparent', paddingLeft: 15, marginRight:10,}}>
                <Image style={{width: 40, height: 40, borderRadius:20,}} source={{uri:'https://instagram.ficn2-1.fna.fbcdn.net/vp/f54eadce17f495e92c8fad5360f58098/5D655586/t51.2885-19/s150x150/11821094_185810741751051_1102813722_a.jpg?_nc_ht=instagram.ficn2-1.fna.fbcdn.net'}}/>
            </TouchableOpacity>
        );
    }
}