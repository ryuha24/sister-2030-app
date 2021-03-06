// import {AsyncStorage} from 'react-native';
import deviceStorage from './deviceStorage';
import {AsyncStorage} from "react-native";

// const baseUri = 'http://172.20.10.2:3000';
// const baseUri = 'http://192.168.219.102:3000';
const baseUri = "https://admin-2030sisters.herokuapp.com";
async function rootApi (method, route, args) {
    try {
        switch (method) {
            case 'GET':
                return await get(route, args);
            case 'POST':
                return await post(route, args);
        }
    } catch (error) {
        throw error;
    }
}

// TODO: GET에서 args의 활용?
async function get (route, args) {
    try {
        let user_session = await AsyncStorage.getItem('user_session');
        // if(user_session) {
            let response = await fetch(
                baseUri + route,
                {
                    method: 'GET',
                    headers: {'user_session': user_session}
                }
            );
            let responseJson = await response.json();
            if (route === '/users/logout' && responseJson.status) {
                // expo secure 제거
                // await AsyncStorage.removeItem('user_id');
                await AsyncStorage.removeItem('user_id');
                await AsyncStorage.removeItem('user_session');
                await AsyncStorage.removeItem('user_email');
                await AsyncStorage.removeItem('user_profileUrl');
            }
            return responseJson;
        // } else {
        //
        // }
    } catch (error) {
        throw error;
    }
}

// Usage. When usage is added, review for post function is necessary.
// 1. Login
// 2. Sign up
async function post (route, args) {
    try {
        let response = await fetch(
            baseUri + route,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(args)
            }
        );
        let responseJson = await response.json();
        if (response.status !== 200) {
            throw responseJson.message;
        }
        if (route === '/users/login') {
            console.log("response api", responseJson);
            await AsyncStorage.setItem('user_id', responseJson.id);
            await AsyncStorage.setItem('user_session', responseJson.session);
            await AsyncStorage.setItem('user_email', responseJson.email);
            await AsyncStorage.setItem('user_profileUrl', responseJson.profileUrl);
        }
        return responseJson;
    } catch (error) {
        throw error;
    }
}

export default rootApi;