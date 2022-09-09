/* eslint-disable camelcase */
export const OPEN_FORM = 'OPEN_FORM';
export const CLOSE_FORM = 'CLOSE_FORM';
export const ADD_TASk = 'ADD_TASK';
export const DONE_TASK = 'DONE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const TASK_TOBE_EDITED = 'TASK_TOBE_EDITED';
export const FINISH_EDIT = 'FINISH_EDIT';
export const REMOVE_TASK = 'REMOVE_TASK';

export function openForm() {
  return {
    type: OPEN_FORM,
  };
}

export function closeForm() {
  return {
    type: CLOSE_FORM,
  };
}

export function addTask(task) {
  return {
    type: ADD_TASk,
    payload: task,
  };
}

export function doneTask(tasks) {
  return {
    type: DONE_TASK,
    payload: tasks,
  };
}

export function editTask() {
  return {
    type: EDIT_TASK,
  };
}

export function taskToBeEdited(task) {
  return {
    type: TASK_TOBE_EDITED,
    payload: task,
  };
}

export function finishEdit(tasks) {
  return {
    type: FINISH_EDIT,
    payload: tasks,
  };
}

export function deleteTask(tasks) {
  return {
    type: REMOVE_TASK,
    payload: tasks,
  };
}
