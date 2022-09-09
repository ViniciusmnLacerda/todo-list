/* eslint-disable comma-dangle */
/* eslint-disable camelcase */
/* eslint-disable default-param-last */
import { combineReducers } from 'redux';
import {
  ADD_TASk, CLOSE_FORM, DONE_TASK, EDIT_TASK, FINISH_EDIT, OPEN_FORM, REMOVE_TASK, TASK_TOBE_EDITED
} from '../actions';

const INITIAL_STATE = {
  areYouAddingTask: false,
  areYouEditingTask: false,
  tasks: [],
  taskToBeEdited: {
    task: '',
    priority: '',
    deadline: '',
    id: 0,
    done: false,
  },
};

function todoList(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_FORM:
      return { ...state, areYouAddingTask: true };
    case CLOSE_FORM:
      return { ...state, areYouAddingTask: false, areYouEditingTask: false };
    case ADD_TASk:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case DONE_TASK:
      return { ...state, tasks: action.payload };
    case EDIT_TASK:
      return { ...state, areYouEditingTask: true };
    case TASK_TOBE_EDITED:
      return { ...state, taskToBeEdited: action.payload };
    case FINISH_EDIT:
      return {
        ...state,
        tasks: [...action.payload],
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: [...action.payload],
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ todoList });

export default rootReducer;
