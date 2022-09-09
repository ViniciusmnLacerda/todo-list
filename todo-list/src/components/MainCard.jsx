import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { connect } from 'react-redux';
import { openForm } from '../store/actions';
import '../styles/MainCard.css';
import Tasks from './Tasks';
import TodoForm from './TodoForm';

class MainCard extends Component {
  openFormTask = () => {
    const { dispatch } = this.props;
    dispatch(openForm());
  };

  render() {
    const { areYouAddingTask, areYouEditingTask } = this.props;
    return (
      <div className="main-card">
        <div className="top-content">
          <header>
            <h1>My tasks</h1>
            <div
              onClick={this.openFormTask}
              role="button"
              tabIndex="0"
              aria-label="open-form"
              onKeyPress={this.handleKeyPress}
              className="add"
            >
              <AiOutlinePlus />
            </div>
          </header>
        </div>
        <div className="bottom-content">
          <Tasks />
        </div>
        {areYouAddingTask ? (<TodoForm />) : (areYouEditingTask && <TodoForm />) }
      </div>
    );
  }
}

MainCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  areYouAddingTask: PropTypes.bool.isRequired,
  areYouEditingTask: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  areYouAddingTask: state.todoList.areYouAddingTask,
  areYouEditingTask: state.todoList.areYouEditingTask,
});

export default connect(mapStateToProps)(MainCard);
