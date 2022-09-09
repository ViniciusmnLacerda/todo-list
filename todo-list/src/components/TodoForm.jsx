import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IoClose } from 'react-icons/io5';
import { connect } from 'react-redux';
import { addTask, closeForm, finishEdit } from '../store/actions';
import '../styles/TodoForm.css';

class TodoForm extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      priority: 'low',
      deadline: '',
      isDisabled: true,
    };
  }

  componentDidMount() {
    const { areYouEditingTask, taskToBeEdited } = this.props;
    if (areYouEditingTask) {
      this.setState({
        task: taskToBeEdited.task,
        priority: taskToBeEdited.priority,
        deadline: taskToBeEdited.deadline,
        isDisabled: false,
      });
    }
  }

  closeFormTask = () => {
    const { dispatch } = this.props;
    dispatch(closeForm());
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validate);
  };

  saveTask = () => {
    const {
      dispatch, tasks, taskToBeEdited, areYouEditingTask,
    } = this.props;
    const { task, priority, deadline } = this.state;
    if (areYouEditingTask) {
      taskToBeEdited.task = task;
      taskToBeEdited.priority = priority;
      taskToBeEdited.deadline = deadline;
      tasks[taskToBeEdited.id] = taskToBeEdited;
      dispatch(finishEdit(tasks));
      dispatch(closeForm());
    } else {
      const taskObj = {
        task, priority, deadline, id: tasks.length, done: false,
      };
      dispatch(addTask(taskObj));
      dispatch(closeForm());
    }
  };

  validate = () => {
    const { task, priority, deadline } = this.state;
    const isTaskValid = [
      task.length > 2,
      priority.length > 0,
      deadline.length > 0,
    ].every(Boolean);
    this.setState({ isDisabled: !isTaskValid });
  };

  render() {
    const {
      task, priority, deadline, isDisabled,
    } = this.state;
    const { areYouEditingTask } = this.props;
    return (
      <div className="todo-form">
        <div className="todo-content">
          <header>
            <h1>{areYouEditingTask ? 'Edit task' : 'Add task'}</h1>
            <div
              className="close"
              onClick={this.closeFormTask}
              role="button"
              tabIndex="0"
              aria-label="open-form"
              onKeyPress={this.handleKeyPress}
            >
              <IoClose />
            </div>
          </header>
          <div className="form">
            <form>
              <label className="input-select" htmlFor="priority">
                <span>Priority</span>
                <select
                  name="priority"
                  id="priority"
                  value={priority}
                  onChange={this.handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
              <label className="input-select" htmlFor="deadline">
                <span>Dead-line</span>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={deadline}
                  onChange={this.handleChange}
                />
              </label>
              <label className="newtask" htmlFor="task">
                <span>Task</span>
                <input
                  type="text"
                  value={task}
                  onChange={this.handleChange}
                  name="task"
                />
              </label>
              <button
                className="form-btn"
                type="button"
                onClick={this.saveTask}
                disabled={isDisabled}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

TodoForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  areYouEditingTask: PropTypes.bool.isRequired,
  taskToBeEdited: PropTypes.shape({
    task: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  areYouAddingTask: state.todoList.areYouAddingTask,
  areYouEditingTask: state.todoList.areYouEditingTask,
  tasks: state.todoList.tasks,
  taskToBeEdited: state.todoList.taskToBeEdited,
});

export default connect(mapStateToProps)(TodoForm);
