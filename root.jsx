import React from 'react';
import TaskGroup from './task-group.jsx';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: []
    }
    this.updateCompletedTasks = this.updateCompletedTasks.bind(this);
  }

  // function to trigger rerender of root component
  updateCompletedTasks(task, complete = true) {
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
    // separate tasks into a groups object
    const taskGroups = {};
    this.props.tasks.forEach(task => {
      if (taskGroups[task.group]) {
        taskGroups[task.group].push(task);
      } else {
        taskGroups[task.group] = [];
        taskGroups[task.group].push(task);
      }
    });
    // use the groups object to create TaskGroup components
    const groupsList = [];
    Object.keys(taskGroups).forEach(group => {
      groupsList.push(
        // each taskGroup needs access to allTasks to check dependencies
        <TaskGroup name={group}
                   groupTasks={taskGroups[group]}
                   allTasks={this.props.tasks}
                   updateCompletedTasks={this.updateCompletedTasks}/>
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
