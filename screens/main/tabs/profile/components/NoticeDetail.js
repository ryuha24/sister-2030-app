import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from 'axios';
import dateFormat from 'dateformat';
import HTML from "react-native-render-html";


export class NoticeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            notice:{}
        }
    }
    _onRefresh = () => {
        let _this = this;
        this.setState({refreshing: true});
        axios.get('https://admin-2030sisters.herokuapp.com/notice/api/notice/detail/'+_this.props.navigation.getParam('noticeId'))
        .then(function(result){
            _this.setState({
                refreshing: false,
                notice: result.data
            });
        })
        .catch((error) =>{
            console.error(error);
        });
    };

    componentDidMount(){
        let _this = this;
        this.setState({refreshing: true});
        axios.get('https://admin-2030sisters.herokuapp.com/notice/api/notice/detail/'+_this.props.navigation.getParam('noticeId'))
        .then(function(result){
            _this.setState({
                refreshing: false,
                notice: result.data
            });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollStyle} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.titles}>{this.state.notice.ADMIN_BOARD_TITLE}</Text>
                    <Text style={styles.dates}>{dateFormat(this.state.notice.DATA_OCCR, "yyyy-mm-dd")}</Text>
                </View>
                <View style={styles.textContent}>
                    <HTML html={this.state.notice.ADMIN_BOARD_DESCRIPTION} imagesMaxWidth={Dimensions.get('window').width.width*0.95} />
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
    },
    titles: {
        fontSize:22,
        fontWeight: 'bold',
    },
    dates: {
        fontSize: 14,
        color:'#333',
    },
    scrollStyle: {
        backgroundColor: '#f2f2f2',
    },
    textContent: {
        flex:1,
        backgroundColor:'#fff',
        fontSize:12,
        padding:20,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        flex:1,
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
        backgroundColor:'#fff',
        marginBottom:10,
        padding:20,
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


export default NoticeDetail;