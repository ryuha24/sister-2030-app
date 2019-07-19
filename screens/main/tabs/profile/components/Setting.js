import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {logout} from "../../../../account/action";
import {connect} from "react-redux";

export class Setting extends React.Component {
    constructor(props) {
        super(props);
    }
    async _logout(navigation) {
        let _this = this;
        try {
            await AsyncStorage.removeItem('user_id');
            await AsyncStorage.removeItem('user_session');
            await AsyncStorage.removeItem('user_email');
            await AsyncStorage.removeItem('user_profileUrl');

            fetch('https://sisters2030.herokuapp.com/users/logout')
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson) {
                    navigation.navigate('Loading');
                }
            })
            .catch((error) =>{
                console.error(error);
            });
        } catch (error) {
            console.log("logout err");
        }
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         headerStyle: {
    //             backgroundColor: '#fff',
    //             shadowColor: 'transparent',
    //             shadowRadius: 0,
    //             shadowOffset: {
    //                 height: 0,
    //             },
    //             borderBottomWidth: 0,
    //             marginTop: 15,
    //             paddingBottom: 15,
    //         },
    //         headerLeft: (
    //         <Text style={{marginLeft: 10, fontSize: 24, fontWeight: 'bold'}}>더보기</Text>
    //         ),
    //         headerRight: (
    //         // onPress={()=>navigation.navigate('MyPage')}
    //         <TouchableOpacity style={{
    //             right: Platform.OS === 'ios' ? Dimensions.get("window").height < 667 ? '10%' : '5%' : '25%',
    //             backgroundColor: 'transparent',
    //             paddingLeft: 15,
    //             marginRight: 10,
    //         }}>
    //             {/*<Image style={{width: 40, height: 40, borderRadius: 20,}}*/}
    //             {/*       source={{uri: this.props.screenData.data.profileUrl}}/>*/}
    //         </TouchableOpacity>
    //         ),
    //     }
    // };

    render() {
        return (
            <View style={{flex:1, flexDirection: 'column',}}>
                <View style={{height:300, backgroundColor:'#fff', flexDirection:'column'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, height: 100, borderWidth: 1, borderColor: '#ebebeb',justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="md-megaphone" size={24} color="#454545" />
                            <Text style={styles.iconTitle}>공지사항</Text>
                        </View>
                        <View style={{flex: 1, height: 100, borderWidth: 0.5, borderColor: '#ebebeb',justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="ios-paper-plane" size={24} color="#454545" />
                            <Text style={styles.iconTitle}>커뮤니티</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, height: 100, borderWidth: 0.5, borderColor: '#ebebeb',justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="md-information-circle-outline" size={24} color="#454545" />
                            <Text style={styles.iconTitle}>FAQ</Text>
                        </View>
                        <View style={{flex: 1, height: 100, borderWidth: 0.5, borderColor: '#ebebeb',justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="logo-usd" size={24} color="#454545" />
                            <Text style={styles.iconTitle}>출금신청</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, height: 100, borderWidth: 0.5, borderColor: '#ebebeb',justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="md-laptop" size={24} color="#454545" />
                            <Text style={styles.iconTitle}>1:1문의</Text>
                        </View>
                        <TouchableOpacity onPress={() => this._logout(this.props.navigation)} style={{flex: 1, height: 100, borderWidth: 0.5, borderColor: '#ebebeb',justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="md-log-out" size={24} color="#454545" />
                            <Text style={styles.iconTitle}>로그아웃</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,alignItems: "center", marginTop:30,}}>
                    <View style={{alignItems: "center",}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.footerTitle}>이용약관</Text>
                            <Text style={styles.footerTitle}>개인정보처리방침</Text>
                            <Text style={styles.footerTitle}>운영정책</Text>
                        </View>
                        <Text style={{marginTop:20, color: '#444',}}>© 2030sisters 000-0000</Text>
                        <Text style={{marginTop:3, color: '#444',}}>Ver 0.043 [배타버전]</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    iconTitle: {
        color:'#898989',
        marginTop:10,
    },
    footerTitle: {
        color:'#9d9d9d',
        paddingLeft:10,
        paddingRight:10,
    }
});


function mapStateToProps (state) {
    return {
        screenData: state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        logout: (navigation) => dispatch(logout(navigation))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
