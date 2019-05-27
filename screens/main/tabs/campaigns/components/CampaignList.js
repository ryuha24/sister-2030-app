import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
} from 'react-native';
import { WebBrowser } from 'expo';

export default class CampaignList extends React.Component {
    constructor(props) {
        super(props);
    }
    _moveMyPage = () => {
        this.props.navigation.navigate('MyPage');
    };
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
            },
            borderBottomWidth: 0,
            marginTop:15,
            paddingBottom:15,
        },
        headerLeft: (
            <Text style={{marginLeft: 10, fontSize:24, fontWeight: 'bold'}}>셀럽들의 놀이터</Text>
        ),
        headerRight:(
            <TouchableOpacity onPress={this._moveMyPage} style={{right: Platform.OS === 'ios' ? Dimensions.get("window").height < 667 ?  '10%' : '5%' : '25%', backgroundColor: 'transparent', paddingLeft: 15, marginRight:10,}}>
                <Image style={{width: 40, height: 40, borderRadius:20,}} source={{uri:'https://instagram.ficn2-1.fna.fbcdn.net/vp/f54eadce17f495e92c8fad5360f58098/5D655586/t51.2885-19/s150x150/11821094_185810741751051_1102813722_a.jpg?_nc_ht=instagram.ficn2-1.fna.fbcdn.net'}}/>
            </TouchableOpacity>
        ),
    };

    render() {
        return (
            // onPress={this._moveCampaignDetail} 디테일 페이지 고고쓰
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', paddingLeft:7, paddingRight:7,}}>
                    <TouchableOpacity onPress={this._moveCampaignDetail} style={styles.itemBtn}>
                        <View style={styles.itemBox}>
                            <ImageBackground source={{uri:'https://s3-ap-northeast-1.amazonaws.com/file1.weble.net/campaign/data/229028/thumb200.jpg?bust=1558985348738'}} style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 6 }}></ImageBackground>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemCategory}>카테고리</Text>
                                <Text style={styles.point}>1000</Text>
                                <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                            </View>
                            <Text style={styles.itemTitle}>제목이 들어갑니...</Text>
                            <Text style={styles.itemSubTitle}>서브제목이 짜르르 들어가 ...</Text>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemUsers}>신청 0</Text>
                                <Text style={styles.itemUsersMax}>/ 10 명</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._moveCampaignDetail} style={styles.itemBtn}>
                        <View style={styles.itemBox}>
                            <ImageBackground source={{uri:'https://s3-ap-northeast-1.amazonaws.com/file1.weble.net/campaign/data/229028/thumb200.jpg?bust=1558985348738'}} style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 6 }}></ImageBackground>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemCategory}>카테고리</Text>
                                <Text style={styles.point}>1000</Text>
                                <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                            </View>
                            <Text style={styles.itemTitle}>제목이 들어갑니...</Text>
                            <Text style={styles.itemSubTitle}>서브제목이 짜르르 들어가 ...</Text>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemUsers}>신청 0</Text>
                                <Text style={styles.itemUsersMax}>/ 10 명</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._moveCampaignDetail} style={styles.itemBtn}>
                        <View style={styles.itemBox}>
                            <ImageBackground source={{uri:'https://s3-ap-northeast-1.amazonaws.com/file1.weble.net/campaign/data/229028/thumb200.jpg?bust=1558985348738'}} style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 6 }}></ImageBackground>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemCategory}>카테고리</Text>
                                <Text style={styles.point}>1000</Text>
                                <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                            </View>
                            <Text style={styles.itemTitle}>제목이 들어갑니...</Text>
                            <Text style={styles.itemSubTitle}>서브제목이 짜르르 들어가 ...</Text>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemUsers}>신청 0</Text>
                                <Text style={styles.itemUsersMax}>/ 10 명</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._moveCampaignDetail} style={styles.itemBtn}>
                        <View style={styles.itemBox}>
                            <ImageBackground source={{uri:'https://s3-ap-northeast-1.amazonaws.com/file1.weble.net/campaign/data/229028/thumb200.jpg?bust=1558985348738'}} style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 6 }}></ImageBackground>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemCategory}>카테고리</Text>
                                <Text style={styles.point}>1000</Text>
                                <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                            </View>
                            <Text style={styles.itemTitle}>제목이 들어갑니...</Text>
                            <Text style={styles.itemSubTitle}>서브제목이 짜르르 들어가 ...</Text>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemUsers}>신청 0</Text>
                                <Text style={styles.itemUsersMax}>/ 10 명</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._moveCampaignDetail} style={styles.itemBtn}>
                        <View style={styles.itemBox}>
                            <ImageBackground source={{uri:'https://s3-ap-northeast-1.amazonaws.com/file1.weble.net/campaign/data/229028/thumb200.jpg?bust=1558985348738'}} style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 6 }}></ImageBackground>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemCategory}>카테고리</Text>
                                <Text style={styles.point}>1000</Text>
                                <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                            </View>
                            <Text style={styles.itemTitle}>제목이 들어갑니...</Text>
                            <Text style={styles.itemSubTitle}>서브제목이 짜르르 들어가 ...</Text>
                            <View style={{flexDirection:'row', marginTop:12,}}>
                                <Text style={styles.itemUsers}>신청 0</Text>
                                <Text style={styles.itemUsersMax}>/ 10 명</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        );
    }
    _moveCampaignDetail = () => {
        this.props.navigation.navigate('CampaignDetail');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemBtn: {
        width:'50%',
        height: 290,
        padding:0,
        margin:0,
    },
    itemBox: {
        width: '100%',
        height: 170,
        padding:7,
        flexDirection:'column',
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
    itemTitle: {
        color:'#000',
        marginTop:10,
        fontSize: 16,
    },
    itemSubTitle: {
        color:'#919191',
        marginTop:3,
    },
    itemUsers: {
        color: '#000',
        fontWeight: '500',
    },
    itemUsersMax: {
        color:'#919191',
    }
});
