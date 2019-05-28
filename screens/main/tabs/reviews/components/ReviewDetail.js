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
    Modal, ImageBackground,
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
            }
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
        <View style={styles.container}>
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
                            <Text style={styles.itemCategory}>{this.state.category[this.state.application.CAMPAIGN.CAMPAIGN_CATEGORY]}</Text>
                            <Text style={styles.point}>{this.state.application.CAMPAIGN.CAMPAIGN_POINT}</Text>
                            <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                        </View>
                    </View>
                    <View style={styles.viewInfo}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flexDirection:'column',width:90, paddingTop:20,}}>
                                <Text style={styles.viewInfoDate}>리뷰어 모집</Text>
                                <Text style={styles.viewInfoDate}>리뷰어 선정</Text>
                                <Text style={styles.viewInfoDate}>리뷰어 마감</Text>
                            </View>
                            <View style={{flexDirection:'column',width:90, paddingTop:20,}}>
                                <Text style={styles.viewInfoDate}>{dateFormat(this.state.application.CAMPAIGN.CAMPAIGN_ST_DT, "yyyy-mm-dd")}</Text>
                                <Text style={styles.viewInfoDate}>{dateFormat(this.state.application.CAMPAIGN.CAMPAIGN_SELECT_DATE, "yyyy-mm-dd")}</Text>
                                <Text style={styles.viewInfoDate}>{dateFormat(this.state.application.CAMPAIGN.CAMPAIGN_END_DATE, "yyyy-mm-dd")}</Text>
                            </View>
                        </View>
                        <View style={{alignSelf: 'flex-end', textAlign:'right'}}><Image source={{uri:this.state.application.CAMPAIGN.CAMPAIGN_THUMB_IMAGE}} style={{width: 100, height: 100}} imageStyle={{ borderRadius: 6 }}/></View>
                    </View>
                </View>

                <View style={styles.helpContainer}>
                    <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                        <Text style={styles.helpLinkText}>여기 누르면 리뷰 남김</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:7,
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
        width:'100%',
        position:'absolute',
        left:0,
        bottom:0,
        padding:15,
    },
});

function mapStateToProps (state) {
    return {
        userData: state.data
    }
}

export default connect(mapStateToProps)(ReviewDetail)