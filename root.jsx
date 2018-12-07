import React from 'react';
import TaskGroup from './task-group.jsx';
import Task from './task';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const taskGroups = {};
    this.props.tasks.forEach(task => {
      if (taskGroups[task.group]) {
        taskGroups[task.group].push(task);
      } else {
        taskGroups[task.group] = [];
        taskGroups[task.group].push(task);
      }
    });
    const groupsList = [];
    Object.keys(taskGroups).forEach(group => {
      groupsList.push(
        <TaskGroup name={group} tasks={taskGroups[group]} />
      )
    })
    return (
      <div id="to-do-list">
        <h1 id="list-header">Things to do</h1>
        <ul>
          {groupsList}
        </ul>
      </div>
    )
  }
}

export default Root;
