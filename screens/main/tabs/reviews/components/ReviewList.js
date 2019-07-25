import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions, ImageBackground,
    RefreshControl, AsyncStorage
} from 'react-native';
import {connect} from "react-redux";
import dateFormat from "dateformat";
import axios from "axios";


export class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            userInfo: props.userData.user,
            applicationList : [],
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
        let _this = this;
        axios.get('https://admin-2030sisters.herokuapp.com/users/applications/list/'+_this.state.userInfo.id)
        .then(function(result) {
            let data = result.data;
            let applicationLists = data.data;
            if(data) {
                console.log(data);
                _this.setState({
                    refreshing: false,
                    applicationList: applicationLists
                });

            }
        })
    };
    componentDidMount(){
        let _this = this;
        axios.get('https://admin-2030sisters.herokuapp.com/users/applications/list/'+_this.state.userInfo.id)
        .then(function(result) {
            let data = result.data;
            let applicationLists = data.data;
            if(data) {
                _this.setState({
                    refreshing: false,
                    applicationList: applicationLists
                });

            }
        })
    }

    render() {
        return (
        <View style={styles.container}>
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
                <View style={{flex:1, flexDirection: 'column',paddingLeft: 10,paddingRight: 10,}}>

                {
                    this.state.applicationList.length>0 ? (
                        this.state.applicationList.map((application,index) => {
                            return (
                                <TouchableOpacity key={index} onPress={()=>this._moveReviewDetail(application.APPLICATION_ID)} style={styles.itemBtn}>
                                    <View style={{paddingTop:5,paddingBottom: 5,borderRadius:6}}>
                                        <ImageBackground
                                            source={{uri: application.CAMPAIGN.CAMPAIGN_THUMB_IMAGE}}
                                            style={styles.backgroundImage}
                                            imageStyle={{ borderRadius: 6 }}
                                        >
                                            <Text style={styles.reviewTitle}>{application.CAMPAIGN.CAMPAIGN_TITLE}</Text>
                                            <Text style={styles.reviewSubTitle}>{application.CAMPAIGN.CAMPAIGN_SUB_TITLE}</Text>
                                            <Text style={styles.reviewEndDate}>마감 {dateFormat(application.CAMPAIGN.CAMPAIGN_ED_DT, "yyyy-mm-dd")}</Text>
                                            <Text style={styles.reviewEndDate}>리뷰 {application.APPLICATION_RESULT ? '리뷰등록 완료' : '리뷰를 등록해주세요'}</Text>
                                            <View style={styles.blackBg}></View>
                                        </ImageBackground>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    ) : (
                        <Text style={styles.nodata}>아직 지원 내역이 없습니다 :)</Text>
                    )
                }
                </View>
            </ScrollView>
        </View>
        );
    }
    _moveReviewDetail = applicationId => {
        this.props.navigation.navigate('ReviewDetail', {
            applicationId: applicationId
        });
    };
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
    nodata: {
        flex:1,
        fontWeight:'bold',
        fontSize: 15,
        textAlign: 'center'
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
    itemBtn: {
        position:'relative',
        borderRadius:6,
    },
    backgroundImage: {
        flex: 1,
        width:'100%',
        height:200,
        justifyContent: "center",
        alignItems: "center",
    },
    blackBg: {
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius:6,
    },
    reviewTitle: {
        color:'#fff',
        fontSize:20,
        fontWeight: 'bold',
        position: 'relative',
        zIndex: 9999,
        marginBottom:6,
    },
    reviewSubTitle: {
        color:'#fff',
        fontSize:16,
        position:'relative',
        zIndex: 9999,
        marginBottom:10,
    },
    reviewEndDate: {
        marginTop:10,
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        position:'relative',
        zIndex: 9999,
    }
});

function mapStateToProps (state) {
    return {
        userData: state.data
    }
}

export default connect(mapStateToProps)(ReviewList);