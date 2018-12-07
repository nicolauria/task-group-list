import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.completeTask = this.completeTask.bind(this);
  }

  completeTask() {
    if (this.props.task.completedAt) {
      this.props.task.completedAt = false;
      this.props.taskHandler(this.props.task, false)
    } else {
      this.props.task.completedAt = true;
      this.props.taskHandler(this.props.task, true)
    }
  }

  render() {
    console.log(this.props.task.completedAt);
    const checkedVal = this.props.task.completedAt ? 'checked' : '';
    const checkbox = this.props.unlocked ?
      <input className="list-checkbox" type="checkbox" onClick={this.completeTask} checkedVal/> :
      <img className="locked-image" src="locked-1.png"/>;
    return (
      <li className="task">
        {checkbox}
        {this.props.task.task}
      </li>
    )
  }
}

export default Task;
