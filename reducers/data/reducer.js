import initialState from '../initialState';

const dataReducer = (state = initialState.data, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        user: action.data
      };
    case 'UPDATE_USER' :
      return {
        ...state,
        instagram: action.data
      };
    case 'SET_MAIN_NAVIGATION':
      return {
        ...state,
        navigation: action.navigation
      };
    default:
      return state;
  }
};

export default dataReducer;