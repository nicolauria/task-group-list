import React from 'react';
import Task from './task';

class TaskGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: []
    }

    this.taskHandler = this.taskHandler.bind(this);
  }

  componentDidMount() {
    const taskList = document.getElementById(this.props.name);
    taskList.style.display = 'none'
  }

  toggleList(divName) {
    return () => {
      const taskList = document.getElementById(divName);
      const arrowImg = document.getElementById(divName+"-arrow");
      if (taskList.style.display === 'none') {
        taskList.style.display = 'block';
        arrowImg.style.transform = 'rotate(0deg)';
      } else {
        taskList.style.display = 'none';
        arrowImg.style.transform = 'rotate(270deg)';
      }
    }
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
    const tasks = this.props.tasks.map((task) => {
      let dependencies = this.props.tasks.filter(tsk => {
        return task.dependencyIds.includes(tsk.id);
      });
      let unlocked = true;
      dependencies.forEach(dependency => {
        if (!dependency.completedAt) unlocked = false;
      })
      return (
        <Task task={task} unlocked={unlocked} taskHandler={this.taskHandler}/>
      )
    })
    const arrowId = this.props.name + "-arrow";
    return (
      <div className="task-group">
        <img className="down-arrow" id={arrowId} src="down-arrow.png"/>
        <h2 className="group-header" onClick={this.toggleList(this.props.name)}>{this.props.name}</h2>
        <div id={this.props.name}>
        <ul className="tasks-ul">{tasks}</ul>
        </div>
      </div>
    )
  }
}

export default TaskGroup;
