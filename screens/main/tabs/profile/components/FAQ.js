import React from 'react';
import {
    Image,
    Platform, RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import dateFormat from 'dateformat';

export class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            faqs: []
        }
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        fetch('https://sisters2030.herokuapp.com/notice/api/faq')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                refreshing: false,
                faqs: responseJson
            }, function(){

            });

        })
    };
    componentDidMount(){
        return fetch('https://sisters2030.herokuapp.com/notice/api/faq')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                faqs: responseJson
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });
    }
    _moveFaqDetail = faqId => {
        this.props.navigation.navigate('FaqDetail', {
            faqId: faqId
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        />
                    }
                >
                    {
                        this.state.faqs.map((faq,index) => {
                            return (
                                <TouchableOpacity onPress={()=>this._moveFaqDetail()} style={styles.getStartedContainer}>
                                    <Text style={styles.titles}>{faq.ADMIN_BOARD_TITLE}</Text>
                                    <Text style={styles.dates}>{dateFormat(faq.DATA_OCCR, 'yyyy-mm-dd')}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    scrollStyle:{
        width:'100%',
    },
    titles: {
        fontSize:22,
        fontWeight: 'bold',
    },
    dates: {
        fontSize: 14,
        color:'#333',
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
    getStartedContainer: {
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingLeft:20,
        paddingBottom: 20,
        marginBottom: 20,
    },
});


export default FAQ;