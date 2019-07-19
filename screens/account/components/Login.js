import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    Dimensions,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Slideshow from 'react-native-slideshow';

import { connect } from "react-redux";
import { login } from '../action';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            interval: null,
            dataSource: [
                {
                    title: '언니들의놀이터',
                    caption: '2030언니들',
                    subcaption: '인플루언서의 집합소 트렌드를 경험하다',
                    url: require('../../../assets/images/s1.png'),
                }, {
                    title: '댓글만 달면',
                    caption: '포인트가 와르르?!',
                    subcaption: '갖고싶던 제품들도 포인트로 사자!',
                    url: require('../../../assets/images/s2.png'),
                }, {
                    title: '사용하고 싶은',
                    caption: '인플루언서 마케팅',
                    subcaption: '핫한 인플루언서들의 놀이터 2030언니들',
                    url: require('../../../assets/images/s3.png'),
                },
            ],
            arrowLeft: false,
            arrowRight: false,
        };
    }

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
        <ScrollView style = {{flex:1, backgroundColor: 'white'}} ref = 'scroll'>
            <Slideshow
            dataSource={this.state.dataSource}
            position={this.state.position}
            overlay
            onPositionChanged={position => this.setState({ position })}
            height={Dimensions.get("window").height}
            resizeMode='cover'
            />
            <KeyboardAvoidingView
            behavior='position' style = {{backgroundColor: 'white', flex: 1}}
            >
                <View style={styles.bottomBtn}>
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
            </KeyboardAvoidingView>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input:{
        flex:1,
        padding:12,
        fontSize: 15,
        color:'#fff',
        backgroundColor:'rgba(255,255,255,0.4)',
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
    }
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