import React from 'react';
import Task from './task';

class TaskGroup extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const tasks = this.props.groupTasks.map((task) => {
      let dependencies = this.props.allTasks.filter(tsk => {
        return task.dependencyIds.includes(tsk.id);
      });
      let unlocked = true;
      dependencies.forEach(dependency => {
        if (!dependency.completedAt) unlocked = false;
      })
      return (
        <Task task={task} unlocked={unlocked} taskHandler={this.props.taskHandler}/>
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
