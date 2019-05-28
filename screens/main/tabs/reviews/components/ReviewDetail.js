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


export class ReviewDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            userInfo: props.userData.user,
            modalVisible: false,
            application: {
                CAMPAIGN: {}
            },
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
            clipboardContent: null,
        }
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        fetch('http://52.79.228.214:3000/users/applied/'+this.props.navigation.getParam('applicationId'))
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                refreshing: false,
                application: responseJson.data
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });
    }

    readFromClipboard = async () => {
        const clipboardContent = await Clipboard.getString();
        this.setState({ clipboardContent });
    };

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.text);
        alert('복사 되었습니다.');
    };

    componentDidMount(){
        return fetch('http://52.79.228.214:3000/users/applied/'+this.props.navigation.getParam('applicationId'))
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                application: responseJson.data
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
        <View style={styles.wrap}>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
                <View style={{flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View
                        style={{
                            width: 300,
                            height: 300
                        }}
                    >
                        <Text>신청쓰!!!!!</Text>

                        <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
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
                            <Text style={styles.itemCategory}>마감 {dateFormat(this.state.application.CAMPAIGN.CAMPAIGN_END_DATE, "yyyy-mm-dd")}</Text>
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
                                value={'#해시태그 #타기타기 #테테'}
                                placeholder=""
                            />
                        </View>
                    </View>
                    <View style={styles.viewTop}>
                        <View style={{flexDirection:'row', width:'100%'}}>
                            <Text style={styles.RDTitle}>가이드</Text>
                        </View>
                        <View>
                            <Text>가이드가 쭈르르르륵 나옵니다.</Text>
                        </View>
                    </View>
                    <View style={styles.viewTop}>
                        <Text style={styles.RDTitle}>인스타 게시물 URL</Text>
                        <TextInput style={{width:'100%',fontSize:15, borderWidth:1, borderColor:'#ebebeb',padding:15,}} placeholder="인스타 게시글 URL주소를 넣어주세요."/>
                        <TouchableHighlight
                            onPress={() => {
                                this.setModalVisible(true);
                            }}>
                            <Text style={styles.submitBtn}>리뷰 등록</Text>
                        </TouchableHighlight>
                    </View>
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
});

function mapStateToProps (state) {
    return {
        userData: state.data
    }
}

export default connect(mapStateToProps)(ReviewDetail)