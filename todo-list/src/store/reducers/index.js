/* eslint-disable camelcase */
/* eslint-disable default-param-last */
import { combineReducers } from 'redux';
import { ADD_TASk, CLOSE_FORM, OPEN_FORM } from '../actions';

const INITIAL_STATE = {
  areYouAddingTask: false,
  tasks: [],
};

function todoList(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_FORM:
      return { ...state, areYouAddingTask: true };
    case CLOSE_FORM:
      return { ...state, areYouAddingTask: false };
    case ADD_TASk:
      return { ...state, tasks: [...state.tasks, action.payload] };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ todoList });

export default rootReducer;
