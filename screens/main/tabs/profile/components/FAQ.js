import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


export class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{}
        }
    }
    componentDidMount(){
        // let _this = this;
        // return fetch('https://sisters2030.herokuapp.com/users/mypage/'+_this.state.userInfo.USER_ID)
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     this.setState({
        //         user: responseJson
        //     }, function(){
        //
        //     });
        //
        // })
        // .catch((error) =>{
        //     console.error(error);
        // });
    }
    _moveDetail = () => {
        this.props.navigation.navigate('NoticeDetail');
    };
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollStyle} contentContainerStyle={styles.contentContainer}>
                    <TouchableOpacity onPress={this._moveDetail} style={styles.getStartedContainer}>
                        <Text style={styles.titles}>FAQ로 가봅시다 !!! </Text>
                        <Text style={styles.dates}>2019-09-09</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._moveDetail} style={styles.getStartedContainer}>
                        <Text style={styles.titles}>FAQ로 가봅시다 !!! </Text>
                        <Text style={styles.dates}>2019-09-09</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._moveDetail} style={styles.getStartedContainer}>
                        <Text style={styles.titles}>FAQ로 가봅시다 !!! </Text>
                        <Text style={styles.dates}>2019-09-09</Text>
                    </TouchableOpacity>
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