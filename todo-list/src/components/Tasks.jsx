import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BiChevronDown, BiChevronUp, BiTrash } from 'react-icons/bi';
import { GrEdit } from 'react-icons/gr';
import { MdDone } from 'react-icons/md';
import { connect } from 'react-redux';
import '../styles/Tasks.css';

class Tasks extends Component {
  render() {
    const { tasks } = this.props;
    return (
      <div className="tasks-container">
        {tasks.map((element) => {
          const {
            task, priority, deadline, id,
          } = element;
          return (
            <div key={id} className={id % 2 === 0 ? `${priority} even` : `${priority} odd`}>
              <div className="task">
                <span>{task}</span>
              </div>
              <div className="deadline">
                <span>{deadline}</span>
              </div>
              <div>
                <button
                  className="icons-btn"
                  type="button"
                >
                  <MdDone />
                </button>
                <button
                  className="icons-btn"
                  type="button"
                >
                  <BiChevronUp />
                </button>
                <button
                  className="icons-btn"
                  type="button"
                >
                  <BiChevronDown />
                </button>
                <button
                  className="icons-btn"
                  type="button"
                >
                  <GrEdit />
                </button>
                <button
                  className="icons-btn"
                  type="button"
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
};

const mapStateToProps = (state) => ({
  tasks: state.todoList.tasks,
});

export default connect(mapStateToProps)(Tasks);
