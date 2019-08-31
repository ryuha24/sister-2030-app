import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert,TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView,Platform,} from 'react-native';
import { crawlingInfo } from "../action";
import { connect } from "react-redux";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            repassword: null,
            nickname: null,
            instaId: null
        }
    }

    joinEmail = (email) => this.setState({ email: email });
    joinPw = (password) => this.setState({ password:password });
    joinRePw = (repassword) => this.setState({ repassword:repassword });
    joinNickname = (nickname) => this.setState({ nickname:nickname });
    joinInstaId = (instaId) => this.setState({ instaId:instaId });

    nextStep = () => {
        if (this.state.password === this.state.repassword) {
            this.props.crawlingInfo(this.state.nickname, this.state.email, this.state.password,this.state.instaId, this.props.navigation);
            // Alert.alert('ok');
            // this.props.navigation.navigate('Account');

            // signUp(this.state.uid, this.state.password, this.state.nickname)
            // 	.then(() => this.props.navigation.navigate('Account'))
            // 	.catch((error) => Alert.alert('ERROR', error));
            // this.props.navigation.navigate('InstagramCheck');
        } else {
            Alert.alert('ERROR', 'Password mismatch!');
        }
    };
    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;
        return (

        <ScrollView style={styles.root} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.content}>
                    <TextInput style = {styles.inputStyle}
                               underlineColorAndroid = "transparent"
                               placeholder = "메일주소"
                               placeholderTextColor = "rgba(0, 0, 0, 0.5)"
                               autoCapitalize = "none"
                               keyboardType= "default"
                               returnKeyType="next"
                               onChangeText = {this.joinEmail}/>
                    <TextInput style = {styles.inputStyle}
                               underlineColorAndroid = "transparent"
                               placeholder = "비밀번호"
                               placeholderTextColor = "rgba(0, 0, 0, 0.5)"
                               autoCapitalize = "none"
                               returnKeyType="next"
                               keyboardType= "default"
                               secureTextEntry={true}
                               onChangeText = {this.joinPw}/>
                    <TextInput style = {styles.inputStyle}
                               underlineColorAndroid = "transparent"
                               placeholder = "비밀번호 확인"
                               placeholderTextColor = "rgba(0, 0, 0, 0.5)"
                               autoCapitalize = "none"
                               returnKeyType="next"
                               keyboardType= "default"
                               secureTextEntry={true}
                               onChangeText = {this.joinRePw}/>
                    <TextInput style = {styles.inputStyle}
                               underlineColorAndroid = "transparent"
                               placeholder = "닉네임"
                               placeholderTextColor = "rgba(0, 0, 0, 0.5)"
                               keyboardType= "default"
                               autoCapitalize = "none"
                               onChangeText = {this.joinNickname}/>
                    <TextInput style = {styles.inputStyle}
                               underlineColorAndroid = "transparent"
                               placeholder = "인스타 아이디"
                               placeholderTextColor = "rgba(0, 0, 0, 0.5)"
                               autoCapitalize = "none"
                               keyboardType= "default"
                               returnKeyType="next"
                               onChangeText = {this.joinInstaId}/>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                    style={styles.footerBtnWrap}
                    onPress={this.nextStep}
                    >
                        <Text style={styles.footerBtn}>다음</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    root: {
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    content: {
        flex: 1,
        width:'100%',
        height:'100%',
        padding: 20,
    },
    inputStyle: {
        width:'100%',
        height: 50,
        padding:12,
        fontSize: 15,
        color:'#000',
        backgroundColor:'rgba(255,255,255,0.4)',
        marginBottom:10,
        borderRadius:4,
        borderWidth:1,
        borderColor:'#E0E0E0',
    },
    keyboardStyle: {
        flex: 1,
        justifyContent: 'space-between',
    },
    footer: {
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
    },
    footerBtnWrap:{
        width:'100%',
        backgroundColor:'#F2D902',
    },
    footerBtn: {
        width: '100%',
        fontSize:15,
        fontWeight:'600',
        textAlign:'center',
        color:'#391D1D',
        padding:16,
        height:50,
    },
});

function mapStateToProps (state) {
    return {
        screenData: state.account
    }
}

function mapDispatchToProps (dispatch) {
    return {
        crawlingInfo: (nickname, email, password, instaId, navigation) => dispatch(crawlingInfo(nickname, email, password, instaId, navigation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignUp;