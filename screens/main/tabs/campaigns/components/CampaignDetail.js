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


export default class CampaignDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            campaign: {}
        }
    }

    componentDidMount(){
        return fetch('http://192.168.219.102:3000/campaign/campaignViews/'+this.props.navigation.getParam('campaignId'))
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
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', width:'100%'}}>
                    <View style={styles.viewTop}>
                        <Text style={{fontSize: 21, fontWeight:'bold', marginBottom:5,}}>제목이 나옵니다 슈르르르르르르르</Text>
                        <Text style={{color:'#919191', marginBottom:20,}}>소제목이 나옵니다 길게 길게 더더더더더더 길게 나와</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.itemCategory}>카테고리</Text>
                            <Text style={styles.point}>1000</Text>
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
                                <Text style={styles.viewInfoDate}>2019.05.30</Text>
                                <Text style={styles.viewInfoDate}>2019.06.07</Text>
                                <Text style={styles.viewInfoDate}>2019.06.22</Text>
                            </View>
                        </View>
                        <View style={{alignSelf: 'flex-end', textAlign:'right'}}><Image source={{uri:'https://s3-ap-northeast-1.amazonaws.com/file1.weble.net/campaign/data/229028/thumb200.jpg?bust=1558985348738'}} style={{width: 100, height: 100}} imageStyle={{ borderRadius: 6 }}/></View>
                    </View>
                    <View style={styles.viewContent}>
                        <View style={styles.viewContentWrap}>
                            <Text style={styles.viewContentTitle}>상세내용</Text>
                            <Text>상세 내용이 쭉 나옵니다.</Text>
                        </View>
                        <View style={styles.viewContentWrap}>
                            <Text style={styles.viewContentTitle}>유의사항</Text>
                            <Text>유의사항이 쭉 나옵니다.</Text>
                        </View>
                        <View style={styles.viewContentWrap}>
                            <Text style={styles.viewContentTitle}>필수 삽입 해시태그</Text>
                            <Text>#해시태그 #나와 #요</Text>
                        </View>
                        <View style={styles.viewContentWrap}>
                            <Text style={styles.viewContentTitle}>가이드</Text>
                            <Text>가이드 내용이 쭈룩</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.helpContainer}>
                    <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                        <Text style={styles.helpLinkText}>여기 누르면 신청하는거임</Text>
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
