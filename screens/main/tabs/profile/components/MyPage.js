import React from 'react';
import {
    Image, ImageBackground, KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from "react-redux";
import axios from "axios";


export class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
            modalVisible: false,
            userInfo: props.profile.user
        }
    }
    componentDidMount(){
        let _this = this;
        axios.get('https://admin-2030sisters.herokuapp.com/users/mypage/'+_this.state.userInfo.id)
        .then(function(result){
            let data = result.data;
            console.log("state",_this.state.userInfo.id);
            if(data) {
                _this.setState({
                    user: data.data
                });
            }
        }).catch((error) =>{
            console.error(error);
        });
    }

    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;
        return (
        <View style={styles.container}>
            <ScrollView style={styles.root}>
                <View style={styles.content}>
                    <ImageBackground source={{uri:this.state.userInfo.profileUrl}} imageStyle={{borderRadius: 50}} style={styles.profileImg}/>
                    <Text style={styles.instaNick}>{this.state.userInfo.instagram}</Text>
                    <View style={styles.flexView}>
                        <View style={styles.flexViewIn}>
                            <Text style={{textAlign:'center'}}>
                                게시물
                                <Text style={{fontWeight:'bold'}}> {this.state.userInfo.post}</Text>
                            </Text>
                        </View>
                        <View style={styles.flexViewIn}>
                            <Text style={{textAlign:'center'}}>
                                팔로워
                                <Text style={{fontWeight:'bold'}}>{this.state.userInfo.follower}</Text>
                            </Text>
                        </View>
                        <View style={styles.flexViewIn}>
                            <Text style={{textAlign:'center'}}>
                                팔로우
                                <Text style={{fontWeight:'bold'}}>{this.state.userInfo.following}</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.textBottom}>
                        <View style={styles.textBottomView}><Text style={styles.textBottom_title}>회원정보</Text></View>
                        <View style={styles.textBottomViewBorder}>
                            <View style={styles.bottomBox}>
                                <View style={{flex:1,flexDirection: 'row', alignContent:'stretch',}}>
                                    <View><Image style={styles.icons} source={require('../../../../../assets/images/icons8-name-32.png')}></Image></View>
                                    <View style={{paddingTop:2,}}>
                                        <Text style={styles.bottomWrap}>
                                            <Text style={styles.bottomText}> 아이디</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={{alignItems: 'flex-end',paddingTop:2,}}>
                                    <Text style={{color:'#fff', fontWeight:'bold'}}>{this.state.userInfo.email}</Text>
                                </View>
                            </View>
                            <View style={styles.bottomBox}>
                                <View style={{flex:1,flexDirection: 'row', alignContent:'stretch',}}>
                                    <View><Image style={styles.icons} source={require('../../../../../assets/images/icons8-badge-32.png')}></Image></View>
                                    <View style={{paddingTop:2,}}>
                                        <Text style={styles.bottomWrap}>
                                            <Text style={styles.bottomText}> 닉네임</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={{color:'#fff', fontWeight:'bold'}}>{this.state.userInfo.name}</Text>
                                </View>
                            </View>
                            <View style={styles.bottomBox}>
                                <View style={{flex:1,flexDirection: 'row', alignContent:'stretch',}}>
                                    <View><Image style={styles.icons} source={require('../../../../../assets/images/icons8-instagram-50.png')}></Image></View>
                                    <View style={{paddingTop:2,}}>
                                        <Text style={styles.bottomWrap}>
                                            <Text style={styles.bottomText}> 인스타 아이디</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={{color:'#fff', fontWeight:'bold'}}>{this.state.userInfo.instagram}</Text>
                                </View>
                            </View>
                            <View style={styles.bottomBox}>
                                <View style={{flex:1,flexDirection: 'row', alignContent:'stretch',}}>
                                    <View><Ionicons name="logo-usd" size={20} color="#fff" style={styles.icons}/></View>
                                    <View style={{paddingTop:2,}}>
                                        <Text style={styles.bottomWrap}>
                                            <Text style={styles.bottomText}> 포인트</Text>
                                        </Text>
                                    </View>
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text style={{color:'#fff', fontWeight:'bold'}}>{this.state.userInfo.point}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
        alignItems: 'center',
        width:'100%',
        padding: 20,
    },
    profileImg:{
        marginTop:30,
        width: 100,
        height: 100,
    },
    instaNick: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    flexView: {
        flexDirection: 'row',
        alignContent:'stretch',
        width: '100%',
    },
    flexViewIn: {
        flex:1,
        textAlign: 'center',
    },
    textBottom: {
        width:'100%',
        borderRadius: 6,
        backgroundColor:'#ed3847',
        color:'#fff',
        margin:20,
        padding:20,
        flexDirection: 'column',
        alignItems: 'stretch',
    },

    bottomBox: {
        flexDirection: 'row',
        marginBottom:5,
    },
    textBottomView: {
        width: '100%',
        marginBottom: 18,
    },
    textBottomViewBorder: {
        width: '100%',
        marginBottom: 15,
        borderWidth:1,
        borderColor:'#fb606d',
        borderStyle: "dashed",
        padding:15,
    },
    textBottom_title: {
        width: '100%',
        fontSize: 18,
        color:'#fff',
        fontWeight:'bold',
    },
    textBottomIn: {
        width: '100%',
        color:'#fff',
    },
    bottomWrap: {
        position:'relative'
    },
    icons: {
        width:20,
        height:20,
    },
    bottomText: {
        textAlign:'left',
        fontSize:15,
        color:'#fff',
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
    console.log(state.data);
    return {
        profile: state.data
    }
}

export default connect(mapStateToProps)(MyPage);