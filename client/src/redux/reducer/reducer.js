/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {
  GET_ALL_ACTIVITIES,
  GET_ACTIVITY_DETAIL,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_DETAIL,
  PUT_ACTIVITY,
  CLEAN_DETAIL,
} from "../action types/actionTypes";

let initialState = {
  countries: [],
  allCountries: [],
  detailCountries: [],
  activities: [],
  allActivities: [],
  activityDetail: {},
  filterActivity: "ALL",
  fitlerContinent: "ALL",
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

    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_ACTIVITY_DETAIL:
      return {
        ...state,
        activityDetail: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        activityDetail: {},
      };

    case PUT_ACTIVITY:
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
