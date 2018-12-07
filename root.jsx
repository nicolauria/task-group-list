import React from 'react';
import TaskGroup from './task-group.jsx';
import Task from './task';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: []
    }
    this.taskHandler = this.taskHandler.bind(this);
  }

  taskHandler(task, complete = true) {
    if (complete) {
      this.state.completed.push(task);
      this.setState({completed: this.state.completed});
    } else {
      let indexedTask = this.state.completed.indexOf(task);
      this.state.completed.splice(indexedTask, 1);
      this.setState({completed: this.state.completed});
    }
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
        <TaskGroup name={group}
                   groupTasks={taskGroups[group]}
                   allTasks={this.props.tasks}
                   taskHandler={this.taskHandler}/>
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
