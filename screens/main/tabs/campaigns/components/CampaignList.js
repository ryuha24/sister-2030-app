import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Dimensions,
    ImageBackground,
} from 'react-native';

export default class CampaignList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns: [],
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
        return fetch('http://52.79.228.214:3000/campaign/campaignList')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                isLoading: false,
                campaigns: responseJson
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
            <Text style={{marginLeft: 10, fontSize: 24, fontWeight: 'bold'}}>셀럽들의 놀이터</Text>
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
        if(this.state.isLoading){
            return(
            <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </View>
            )
        }

        return (
            // onPress={this._moveCampaignDetail} 디테일 페이지 고고쓰
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', paddingLeft:7, paddingRight:7,}}>
                    {
                        this.state.campaigns.map((campaign,index) => {
                            return (
                                <TouchableOpacity key={index} onPress={()=>this._moveCampaignDetail(campaign.id)} style={styles.itemBtn}>
                                    <View style={styles.itemBox}>
                                        <ImageBackground source={{uri:campaign.thumbnail}} style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 6 }}></ImageBackground>
                                        <View style={{flexDirection:'row', marginTop:12,}}>
                                            <Text style={styles.itemCategory}>{this.state.category[campaign.category]}</Text>
                                            <Text style={styles.point}>{campaign.point}</Text>
                                            <Image style={styles.itemIcon} source={require('../../../../../assets/images/micon.png')} />
                                        </View>
                                        <Text style={styles.itemTitle}>{campaign.title}</Text>
                                        <Text style={styles.itemSubTitle}>{campaign.subtitle}</Text>
                                        <View style={{flexDirection:'row', marginTop:12,}}>
                                            <Text style={styles.itemUsers}>신청 {campaign.userAppliedCount}</Text>
                                            <Text style={styles.itemUsersMax}>/ {campaign.applyCount} 명</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
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
    _moveCampaignDetail = campaignId => {
        this.props.navigation.navigate('CampaignDetail', {
            campaignId: campaignId
        });
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
