import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.completeTask = this.completeTask.bind(this);
  }

  completeTask() {
    // console.log(this.props.task.completedAt)
    if (this.props.task.completedAt) {
      this.props.task.completedAt = false;
      this.props.taskHandler(this.props.task, false)
    } else {
      this.props.task.completedAt = true;
      this.props.taskHandler(this.props.task, true)
    }
    // this.setState(this.state.locked.push(ID))
  }

  render() {
    console.log(this.props.task.completedAt);
    const checkedVal = this.props.task.completedAt ? 'checked' : '';
    const checkbox = this.props.unlocked ?
      <input type="checkbox" onClick={this.completeTask} checkedVal/> :
      <img className="locked-image" src="locked-1.png"/>;
    return (
      <li>
        {this.props.task.task}
        {checkbox}
      </li>
    )
  }
}

export default Task;
