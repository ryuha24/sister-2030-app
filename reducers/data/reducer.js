import initialState from '../initialState';

const dataReducer = (state = initialState.data, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return action.data;
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