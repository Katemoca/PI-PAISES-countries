/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {
  CREATE_ACTIVITY,
  GET_ACTIVITIES,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_DETAIL,
} from "../action types/actionTypes";

let initialState = {
  countries: [],
  detailCountries: [],
  activities: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_COUNTRY_BY_DETAIL:
      return {
        ...state,
        detailCountries: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
