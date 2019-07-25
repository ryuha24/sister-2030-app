import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    ImageBackground,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper'

import { connect } from "react-redux";
import { login } from '../action';

export class Login extends React.Component {


    _InstaLogin = () => this.props.navigation.navigate('InstaLogin');
    // _login = () => this.props.navigation.navigate('Main');
    _login = () => this.props.login(this.state.email, this.state.password, this.props.navigation);
    _signUp = () => this.props.navigation.navigate('SignUp');

    state = {
        email: '',
        password: ''
    };
    handleEmail = (text) => {
        this.setState({ email: text })
    };
    handlePassword = (text) => {
        this.setState({ password: text })
    };
    // login = () => this.props.login(this.state.email, this.state.password, this.props.navigation);
    render() {
        // if (this.state.showRealApp) {
        // 	return <Main />;
        // } else {
        // 	return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>;
        // }
        return (
                <ImageBackground source={require("../../../assets/images/bg3.png")} style={{flex:1, justifyContent: 'center', alignItem:'center'}}>
                    <View style={styles.bottomBtn} >
                        <TextInput style = {styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "아이디"
                                   placeholderTextColor = "#fff"
                                   autoCapitalize = "none"
                                   onChangeText = {this.handleEmail}/>

                        <TextInput style = {styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholder = "비밀번호"
                                   placeholderTextColor = "#fff"
                                   autoCapitalize = "none"
                                   secureTextEntry={true}
                                   onChangeText = {this.handlePassword}/>
                        <TouchableOpacity
                            style={styles.loginWrap}
                            onPress = {
                                () => this._login(this.state.email, this.state.password)
                            }>
                            <Text style={styles.loginBtn}>로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._signUp}>
                            <Text style={styles.joinBtn}>아직 회원이 아니신가요?</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    input:{
        flex:1,
        padding:12,
        fontSize: 15,
        color:'#fff',
        backgroundColor:'rgba(0,0,0,0.4)',
        marginBottom:10,
        borderRadius:4,
    },
    bottomBtn:{
        position:'absolute',
        bottom:0,
        flex:1,
        width: '100%',
        padding:30,
    },
    loginWrap:{
        position: 'relative',
        borderRadius:4,
        backgroundColor:'#F2D902',
        marginBottom:20,
    },
    loginBtn: {
        width: '100%',
        flex:1,
        fontSize:15,
        fontWeight:'600',
        textAlign:'center',
        color:'#391D1D',
        padding:12,
    },
    joinBtn: {
        color: '#fff',
        fontSize: 13,
        flex:1,
        textAlign:'center',
        textDecorationLine:'underline',
    },
    keyboardAvoidContainer:{
        flex: 1,
    },
});

function mapStateToProps (state) {
    return {
        screenData: state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        login: (email, password, navigation) => dispatch(login(email, password, navigation))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;