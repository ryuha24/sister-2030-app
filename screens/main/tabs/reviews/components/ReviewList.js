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
} from 'react-native';
import {connect} from "react-redux";


export class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    componentDidMount(){
        let _this = this;
        return fetch('http://52.79.228.214:3000/users/applications/list/'+_this.state.userInfo.USER_ID)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.data);
            this.setState({
                isLoading: false,
                applicationList: responseJson.data
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: '#fff',
                shadowColor: 'transparent',
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
                borderBottomWidth: 0,
                marginTop: 15,
                paddingBottom: 15,
            },
            headerLeft: (
            <Text style={{marginLeft: 10, fontSize: 24, fontWeight: 'bold'}}>리뷰</Text>
            ),
            headerRight: (
            <TouchableOpacity onPress={()=>navigation.navigate('MyPage')} style={{
                right: Platform.OS === 'ios' ? Dimensions.get("window").height < 667 ? '10%' : '5%' : '25%',
                backgroundColor: 'transparent',
                paddingLeft: 15,
                marginRight: 10,
            }}>
                <Image style={{width: 40, height: 40, borderRadius: 20,}}
                       source={{uri: 'https://instagram.ficn2-1.fna.fbcdn.net/vp/f54eadce17f495e92c8fad5360f58098/5D655586/t51.2885-19/s150x150/11821094_185810741751051_1102813722_a.jpg?_nc_ht=instagram.ficn2-1.fna.fbcdn.net'}}/>
            </TouchableOpacity>
            ),
        }
    };

    render() {
        return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {
                    this.state.applicationList.length>0 ? (
                        this.state.applicationList.map((application,index) => {
                            return (
                            <TouchableOpacity key={index} onPress={()=>this._moveReviewDetail(application.APPLICATION_ID)} style={styles.itemBtn}>
                                <View style={styles.itemBox}>
                                    <Text>{application.CAMPAIGN.CAMPAIGN_TITLE}</Text>
                                </View>
                            </TouchableOpacity>
                            )
                        })
                    ) : (
                        <Text>아직 지원 내역이 없습니당:)</Text>
                    )
                }

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
});

function mapStateToProps (state) {
    return {
        userData: state.data
    }
}

export default connect(mapStateToProps)(ReviewList);