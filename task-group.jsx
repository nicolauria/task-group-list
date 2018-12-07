class TaskGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: []
    }

    this.taskHandler = this.taskHandler.bind(this);
  }

  toggleList(divName) {
    return () => {
      const taskList = document.getElementById(divName);
      if (taskList.style.display === 'none') {
        taskList.style.display = 'block';
      } else {
        taskList.style.display = 'none';
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
    console.log('rendered');
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
    return (
      <div>
        <h2 className="group-header" onClick={this.toggleList(this.props.name)}>{this.props.name}</h2>
        <div id={this.props.name}>{tasks}</div>
      </div>
    )
  }
}

export default TaskGroup;
