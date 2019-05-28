import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Modal, ImageBackground
} from 'react-native';
import dateFormat from 'dateformat';
import LottieView from 'lottie-react-native';

export default class CampaignDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            campaign: {},
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
            }
        }
    }

    componentDidMount(){
        return fetch('http://52.79.228.214:3000/campaign/campaignViews/'+this.props.navigation.getParam('campaignId'))
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                campaign: responseJson
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
    _moveCampaignList = () => this.props.navigation.navigate('CampaignDetail');

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
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
                <View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', width:'100%'}}>
                    <View style={styles.viewTop}>
                        <Text style={{fontSize: 21, fontWeight:'bold', marginBottom:5,}}>{this.state.campaign.title}</Text>
                        <Text style={{color:'#919191', marginBottom:20,}}>{this.state.campaign.subtitle}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.itemCategory}>{this.state.category[this.state.campaign.category]}</Text>
                            <Text style={styles.point}>{this.state.campaign.point}</Text>
                            <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                        </View>
                    </View>
                    <View style={styles.viewInfo}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flexDirection:'column',width:90, paddingTop:13,}}>
                                <Text style={styles.viewInfoDate}>리뷰어 모집</Text>
                                <Text style={styles.viewInfoDate}>리뷰어 선정</Text>
                                <Text style={styles.viewInfoDate}>리뷰어 마감</Text>
                            </View>
                            <View style={{flexDirection:'column',width:90, paddingTop:13,}}>
                                <Text style={styles.viewInfoDate}>{dateFormat(this.state.campaign.startDate, "yyyy-mm-dd")}</Text>
                                <Text style={styles.viewInfoDate}>{dateFormat(this.state.campaign.selectDate, "yyyy-mm-dd")}</Text>
                                <Text style={styles.viewInfoDate}>{dateFormat(this.state.campaign.endDate, "yyyy-mm-dd")}</Text>
                            </View>
                        </View>
                        <View style={{alignSelf: 'flex-end', textAlign:'right'}}><Image source={{uri:this.state.campaign.thumbnailUrl}} style={{width: 100, height: 100}} imageStyle={{ borderRadius: 6 }}/></View>
                    </View>
                    <View style={styles.viewContent}>
                        <View style={styles.viewContentWrap}>
                            <Text style={styles.viewContentTitle}>상세내용</Text>
                            <Text>{this.state.campaign.description}</Text>
                        </View>
                        <View style={styles.viewContentWrap}>
                            <Text style={styles.viewContentTitle}>유의사항</Text>
                            <Text>{this.state.campaign.warning}</Text>
                        </View>
                        <View style={styles.viewContentWrap}>
                            <Text style={styles.viewContentTitle}>필수 삽입 해시태그</Text>
                            <Text>{this.state.campaign.hashtag}</Text>
                        </View>
                        <View style={styles.viewContentWrap}>
                            <Text style={styles.viewContentTitle}>가이드</Text>
                            <Text>{this.state.campaign.guide}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.helpContainer}>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                    style={styles.itemSubmit}>
                    <Text style={styles.helpLinkText}>신청하기</Text>
                </TouchableHighlight>
            </View>
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
    contentContainerStyle: {
        paddingVertical: 20,
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
        paddingBottom: 10,
    },
    viewContent: {
        flexDirection: 'column',
        width:'100%',
        marginTop:25,
    },
    viewContentWrap: {
        flexDirection: 'column',
        marginBottom: 30,
    },
    viewContentTitle: {
        fontSize:21,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    helpContainer: {
        width:'100%',
        backgroundColor:'#ed3847',
    },
    itemSubmit:{
        padding:15,
    },
    helpLinkText:{
        textAlign:'center',
        color:'#fff',
        fontSize:16,
    },
    modal: {
        backgroundColor: 'white',
        margin: 0, // This is the important style you need to set
        alignItems: undefined,
        justifyContent: undefined,
    },
});
