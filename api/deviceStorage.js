import { AsyncStorage } from 'react-native';

const deviceStorage = {

    async saveUser(key, value) {
        try {
            let user = value;
            // await AsyncStorage.setItem(key, value);
            await AsyncStorage.setItem('user_id', user.id);
            await AsyncStorage.setItem('user_session', user.session);
            await AsyncStorage.setItem('user_email', user.email);
            await AsyncStorage.setItem('user_profileUrl', user.profileUrl);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    async getUser(key) {
        try {
            await AsyncStorage.getItem(key);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },

    async deleteUser(key, value) {
        try {
            await AsyncStorage.removeItem(key, value);
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    }

};