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
    RefreshControl
} from 'react-native';

export default class CampaignList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            refreshing: false,
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
            },
            all: [],
            product: [],
            consumer: [],
            reporters: [],
            comment: [],
            selectedCategory:""
        };
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        let _this = this;
        fetch('https://admin-2030sisters.herokuapp.com/campaign/campaignList')
        .then((response) => response.json())
        .then((responseJson) => {
            let consumer = responseJson.filter(function(campaign){
                return campaign.category === "consumer";
            });
            let product = responseJson.filter(function(campaign){
                return campaign.category === "product";
            });
            let reporters = responseJson.filter(function(campaign){
                return campaign.category === "reporters";
            });
            let comment = responseJson.filter(function(campaign){
                return campaign.category === "comment";
            });
            _this.setState({
                isLoading: false,
                campaigns: responseJson,
                consumer: consumer,
                product: product,
                reporters: reporters,
                comment: comment
            });

        })
    };
    componentDidMount(){
        let _this = this;

        return fetch('https://admin-2030sisters.herokuapp.com/campaign/campaignList')
        .then((response) => response.json())
        .then((responseJson) => {
            let consumer = responseJson.filter(function(campaign){
                return campaign.category === "consumer";
            });
            let product = responseJson.filter(function(campaign){
                return campaign.category === "product";
            });
            let reporters = responseJson.filter(function(campaign){
                return campaign.category === "reporters";
            });
            let comment = responseJson.filter(function(campaign){
                return campaign.category === "comment";
            });

            _this.setState({
                isLoading: false,
                campaigns: responseJson,
                all: responseJson,
                consumer: consumer,
                product: product,
                reporters: reporters,
                comment: comment
            });
        })
        .catch((error) =>{
            console.error(error);
        });
    }
    topNav(category) {
        if (category === "all") {
            this.setState({
                selectedCategory: "",
                campaigns: this.state.all
            });
        } else {
            this.setState({
                selectedCategory: category,
                campaigns: this.state[category]
            });
        }
    }

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
            <View style={styles.topnav}>
                <TouchableOpacity onPress={()=>this.topNav('all')} style={this.state.selectedCategory === "" ? styles.selectedBox : styles.topnavbox}>
                    <Text>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.topNav('consumer')} style={this.state.selectedCategory === "consumer" ? styles.selectedBox : styles.topnavbox}>
                    <Text>체험단</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.topNav('product')} style={this.state.selectedCategory === "product" ? styles.selectedBox : styles.topnavbox}>
                    <Text>제품</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.topNav('reporters')} style={this.state.selectedCategory === "reporters" ? styles.selectedBox : styles.topnavbox}>
                    <Text>기자단</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.topNav('comment')} style={this.state.selectedCategory === "comment" ? styles.selectedBox : styles.topnavbox}>
                    <Text>댓글</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', paddingLeft:7, paddingRight:7,}}>
                    {
                        this.state.campaigns.length>0 ?
                            this.state.campaigns.map((campaign,index) => {
                                return (
                                <TouchableOpacity key={index} onPress={()=>this._moveCampaignDetail(campaign.id)} style={styles.itemBtn}>
                                    <View style={styles.itemBox}>
                                        <ImageBackground source={{uri:campaign.thumbnail}} style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 6 }} />
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
                        :
                        <View style={styles.itemBox}>
                            <Text style={styles.noCampaignText}>캠페인이 없습니다.</Text>
                        </View>
                    }
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
        width:'100%',
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
    },
    topnav: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topnavbox: {
        alignItems: 'center',
        flex:1,
        paddingBottom: 15
    },
    selectedBox: {
        alignItems: 'center',
        flex:1,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#ed3847'
    },
    noCampaignText: {
        color: "#ed3847",
        fontSize: 18,
        fontWeight: '500',

    }
});
