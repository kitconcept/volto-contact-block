/**
 * contactform reducer.
 * @module reducers/contactform/contactform
 */

import {
  CONTACTFORM_TICKET,
  CONTACTFORM_SUBMIT,
  CONTACTFORM_RESET,
} from '../../actions/contactform/contactform';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
};

/**
 * contactform reducer.
 * @function contactform
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function contactform(state = initialState, action = {}) {
  switch (action.type) {
    case `${CONTACTFORM_TICKET}_SUCCESS`:
      return {
        ...state,
        ticket: action.result.ticket,
      };
    case `${CONTACTFORM_TICKET}_FAIL`:
      return {
        ...state,
        ticket: null,
        error: action.error,
      };
    case `${CONTACTFORM_SUBMIT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${CONTACTFORM_SUBMIT}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${CONTACTFORM_SUBMIT}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    case `${CONTACTFORM_RESET}`:
      return {};
    default:
      return state;
  }
}
