/* eslint-disable comma-dangle */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BiChevronDown, BiChevronUp, BiTrash } from 'react-icons/bi';
import { GrEdit } from 'react-icons/gr';
import { MdDone } from 'react-icons/md';
import { connect } from 'react-redux';
import {
  deleteTask, doneTask, editTask, taskToBeEdited
} from '../store/actions';
import '../styles/Tasks.css';

class Tasks extends Component {
  donedTask = (id) => {
    const { tasks, dispatch } = this.props;
    const doned = tasks.find((task) => task.id === id);
    doned.done = !doned.done;
    tasks[id] = doned;
    dispatch(doneTask(tasks));
    this.forceUpdate();
  };

  moveUp = (id) => {
    const { tasks, dispatch } = this.props;
    if (id > 0) {
      const toUp = tasks[id];
      const toDown = tasks[id - 1];
      toUp.id = id - 1;
      toDown.id = id;
      tasks[id] = toDown;
      tasks[id - 1] = toUp;
      dispatch(doneTask(tasks));
      this.forceUpdate();
    }
  };

  moveDown = (id) => {
    const { tasks, dispatch } = this.props;
    if (id < tasks.length - 1) {
      const toDown = tasks[id];
      const toUp = tasks[id + 1];
      toUp.id = id;
      toDown.id = id + 1;
      tasks[id] = toUp;
      tasks[id + 1] = toDown;
      dispatch(doneTask(tasks));
      this.forceUpdate();
    }
  };

  editingTask = (id) => {
    const { tasks, dispatch } = this.props;
    const toBeEdited = tasks.find((element) => element.id === id);
    dispatch(taskToBeEdited(toBeEdited));
    dispatch(editTask());
  };

  removeTask = (id) => {
    const { tasks, dispatch } = this.props;
    const newTasks = tasks.filter((task) => task.id !== id);
    newTasks.forEach((element, index) => {
      // eslint-disable-next-line no-param-reassign
      element.id = index;
    });
    dispatch(deleteTask(newTasks));
  };

  render() {
    const { tasks } = this.props;
    return (
      <div className="tasks-container">
        {tasks.map((element) => {
          const {
            task, priority, deadline, id, done,
          } = element;
          return (
            <div
              key={id}
              className={id % 2 === 0 ? `${priority} even ${done && 'done'}` : `${priority} odd ${done && 'done'}`}
            >
              <div className="task">
                <span>{task}</span>
              </div>
              <div className="deadline">
                <span>{deadline}</span>
              </div>
              <div className="buttons-container">
                <button
                  className={id % 2 === 0 ? 'icons-btn-even' : 'icons-btn-odd'}
                  type="button"
                  onClick={() => this.donedTask(id)}
                >
                  <MdDone />
                </button>
                <button
                  className={id % 2 === 0 ? 'icons-btn-even' : 'icons-btn-odd'}
                  type="button"
                  onClick={() => this.moveUp(id)}
                >
                  <BiChevronUp />
                </button>
                <button
                  className={id % 2 === 0 ? 'icons-btn-even' : 'icons-btn-odd'}
                  type="button"
                  onClick={() => this.moveDown(id)}
                >
                  <BiChevronDown />
                </button>
                <button
                  className={id % 2 === 0 ? 'icons-btn-even' : 'icons-btn-odd'}
                  type="button"
                  onClick={() => this.editingTask(id)}
                >
                  <GrEdit />
                </button>
                <button
                  className={id % 2 === 0 ? 'icons-btn-even' : 'icons-btn-odd'}
                  type="button"
                  onClick={() => this.removeTask(id)}
                >
                  <BiTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.todoList.tasks,
});

export default connect(mapStateToProps)(Tasks);
