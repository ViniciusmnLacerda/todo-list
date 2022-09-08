/* eslint-disable camelcase */
export const OPEN_FORM = 'OPEN_FORM';
export const CLOSE_FORM = 'CLOSE_FORM';
export const ADD_TASk = 'ADD_TASK';

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
