import { ACTIONS } from "./actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        userSession: action.payload,
      };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
