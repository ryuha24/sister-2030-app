import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableHighlight,
    View,
    Modal,
    TextInput,
    Clipboard,
    RefreshControl
} from 'react-native';
import dateFormat from 'dateformat';
import {connect} from "react-redux";
import axios from "axios";
import LottieView from "lottie-react-native";

export class ReviewDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            userInfo: props.userData.userData.user,
            modalVisible: false,
            application: {
                CAMPAIGN: {}
            },
            hashtag: "",
            category: {
                product: "제품",
                consumer: "체험단",
                reporters: "기자단",
                comment: "댓글"
            },
            status: {
                waiting: "대기중",
                proceeding: "선정중",
                recruiting: "모집중",
                endcampaign: "종료",
                review: "리뷰중",
                dontuser: "미달"
            },
            resultUrl: "",
            endYN: false,
            clipboardContent: null,
        }
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        c
    };

    readFromClipboard = async () => {
        const clipboardContent = await Clipboard.getString();
        this.setState({ clipboardContent });
    };

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.text);
        alert('복사 되었습니다.');
    };

    componentDidMount(){
        return fetch('https://admin-2030sisters.herokuapp.com/users/applied/'+this.props.navigation.getParam('applicationId'))
        .then((response) => response.json())
        .then((responseJson) => {
            let today = (new Date()).getTime();
            let endDate = new Date(responseJson.data.CAMPAIGN.CAMPAIGN_ED_DT).getTime();
            let YN = today >= endDate;
            let hashtags = responseJson.data.CAMPAIGN.CAMPAIGN_HASH_TAG.split(',');
            let hashtagWithHash = hashtags.map(hashtag => {
                return ('#'+hashtag);
            });
            this.setState({
                application: responseJson.data,
                hashtag: hashtagWithHash.toString(),
                endYN: YN
            }, function(){

            });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    setModalVisible(visible) {
        let _this = this;
        _this.setState({modalVisible: visible});
        let data = {
            applicationId: _this.state.application.APPLICATION_ID,
            result: _this.state.resultUrl ? _this.state.resultUrl : _this.state.application.APPLICATION_RESULT
        };
        axios.post('https://admin-2030sisters.herokuapp.com/apply/submit/result',data)
        .then(function(result){
            let data = result.data;
            if(data) {
                setTimeout(function(){
                    _this.setState({modalVisible: false});
                    _this.props.navigation.navigate('ReviewList');
                }, 1000);
            } else {
                _this.setState({modalVisible: false});
                Alert.alert('문제 생김!');
            }
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    handleUrlResult = (text) => {
        this.setState({resultUrl: text});
    };

    render() {
        return (
        <View style={styles.wrap}>
            <Modal
            isVisible={true}
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            style={styles.modal}
            onBackdropPress={this.onRequestClose}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
                <View style={{flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LottieView
                    source={require('../../../../../assets/images/Check_Mark_Success_Data.json')}
                    autoPlay = {true}
                    loop = {false}
                    style={{width:100, height:100,}}
                    onAnimationFinish = {() => this._moveCampaignList}
                    />
                </View>
            </Modal>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                    />
                }
            >
                <View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', width:'100%'}}>
                    <View style={styles.viewTop}>
                        <Text style={{fontSize: 21, fontWeight:'bold', marginBottom:5,}}>{this.state.application.CAMPAIGN.CAMPAIGN_TITLE}</Text>
                        <Text style={{color:'#919191', marginBottom:20,}}>{this.state.application.CAMPAIGN.CAMPAIGN_SUB_TITLE}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.itemCategory}>마감 {dateFormat(this.state.application.CAMPAIGN.CAMPAIGN_ED_DT, "yyyy-mm-dd")}</Text>
                            <Text style={styles.point}>{this.state.application.CAMPAIGN.CAMPAIGN_POINT}</Text>
                            <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                        </View>
                    </View>
                    <View style={styles.viewTop}>
                        <View style={{flexDirection:'row', width:'100%'}}>
                            <Text style={styles.RDTitle}>해시태그</Text>
                            <TouchableHighlight onPress={this.writeToClipboard} style={{position:'absolute',top:0, right:0}}>
                                <Text style={styles.heshBtn}>복사하기</Text>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => this.setState({ text })}
                                value={this.state.hashtag}
                                placeholder=""
                            />
                        </View>
                    </View>
                    <View style={styles.viewTop}>
                        <View style={{flexDirection:'row', width:'100%'}}>
                            <Text style={styles.RDTitle}>가이드</Text>
                        </View>
                        <View>
                            <Text>{this.state.application.CAMPAIGN.CAMPAIGN_GUIDE}</Text>
                        </View>
                    </View>
                    {this.state.endYN ? (
                        <View style={styles.viewTop}>
                            <Text style={styles.RDTitle}>인스타 게시물 URL</Text>
                            <Text style={{width:'100%',fontSize:15, borderWidth:1, borderColor:'#ebebeb',padding:15,}}>
                                {this.state.application.APPLICATION_RESULT}
                            </Text>
                            <View style={{backgroundColor: "#b8b8b8"}}>
                                <Text style={styles.submitBtnGrey}>캠페인 끝</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.viewTop}>
                            <Text style={styles.RDTitle}>인스타 게시물 URL</Text>
                            <TextInput
                                style={{width:'100%',fontSize:15, borderWidth:1, borderColor:'#ebebeb',padding:15,}}
                                placeholder="인스타 게시글 URL주소를 넣어주세요."
                                value={this.state.application.APPLICATION_RESULT}
                                onChangeText = {this.handleUrlResult}
                            />
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}>
                                <Text style={styles.submitBtn}>리뷰 등록</Text>
                            </TouchableHighlight>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex:1,
    },
    container: {
        width:'100%',
        flex: 1,
        backgroundColor: '#fff',
        padding:10,
        paddingBottom:80,
    },
    viewTop: {
        paddingBottom: 25,
        marginBottom: 25,
        borderBottomColor:'#ebebeb',
        borderBottomWidth: 1,
        flexDirection: 'column',
        width:'100%',
    },
    itemCategory: {
        flex:1,
        textAlign: 'left',
        paddingTop:2,
        color:'#ed3847',
    },
    point: {
        textAlign: 'right',
        justifyContent: 'flex-end',
        paddingTop:1,
        paddingRight:3,
        fontWeight: '600',
    },
    itemIcon: {
        width: 17,
        height: 17,
        justifyContent: 'flex-end',
    },
    viewInfo: {
        flexDirection: 'row',
        width:'100%',
        paddingBottom: 25,
        marginBottom: 25,
        borderBottomColor:'#ebebeb',
        borderBottomWidth: 1,
    },
    viewInfoDate: {
        paddingBottom: 5,
    },
    viewContent: {
        flexDirection: 'column',
        width:'100%',
        marginTop:25,
    },
    viewContentWrap: {
        flexDirection: 'column',
        marginBottom: 25,
    },
    viewContentTitle: {
        fontSize:21,
        fontWeight: 'bold',
    },
    helpContainer: {
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
        backgroundColor:'#ed3847',
        padding:15,
    },
    RDTitle:{
        fontSize:21,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    heshBtn:{
        fontSize:12,
        fontWeight: 'bold',
        marginBottom: 10,
        padding:5,
        backgroundColor:'#ed3847',
        color:'#fff',
        alignSelf: 'flex-end',
        textAlign:'right',
    },
    submitBtn: {
        fontSize:18,
        fontWeight:'bold',
        padding:15,
        backgroundColor:'#ed3847',
        color:'#fff',
        textAlign:'center',
    },
    submitBtnGrey: {
        fontSize:18,
        fontWeight:'bold',
        padding:15,
        backgroundColor:'#b8b8b8',
        color:'#4b4b4b',
        textAlign:'center',
    },
});

function mapStateToProps (state) {
    return {
        userData: state.data
    }
}

export default connect(mapStateToProps)(ReviewDetail)