# Wonderschool Coding Challenge

* The node_modules folder has been gitignored. The js/jsx files were bundled with Webpack.

## Part 1 (React UI)
I separated the task list into 3 main components:
* Root
* Task Group
* Task

I put the seed data into a separate file and added it as props to my Root component.
I then filtered the tasks into their respective groups and assigned each to a TaskGroup component.
Each Task component has access to a taskHandler function which is passed down from the Root component.
This taskHandler function updates the state of the Root component upon task completion/uncompletion and
causes a rerender of the task elements.

## Part 2 (SQL Schema)
note: dependencyIds column is structured according to PostgreSQL array definition
```
CREATE TABLE tasks (
  id PRIMARY KEY,
  group VARCHAR(100) NOT NULL,
  task VARCHAR(255) UNIQUE NOT NULL,
  dependencyIds integer[],
  completedAt INTEGER DEFAULT 0
)
```
Id is assigned upon task creation<br />
To assign dependencies we use a dropdown of already created tasks,
each task selected as a dependency will have its id added to the dependency array<br />

Unique constraint on task assures no duplicated entries<br />

The completedAt stores a date timestamp integer created using Date.now().<br />
If we want to convert it to a string on the front end we can use Date(obj.completedAt);<br />
completedAt defaults to 0, we use this value on the frontend to check for completion

## Part 3 (HTTP API)
This API is for checking/unchecking a task (model inside request is mongoDB).<br />
On the client side we can use Axios to make an AJAX request:<br />
```
const updateTask = (task) => (
    axios.put(`/api/tasks/${task.id}`, task)
)
```
On the server side we can use express to handle the request. I didn't include all the config:
```
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.put('/api/tasks/:taskId', (req, res) => {
  Task.findByIdAndUpdate(req.params.taskId, {
    group: req.body.group,
    task: req.body.task,
    dependencyIds: req.body.dependencyIds,
    completedAt: req.body.completedAt
  })
  .then(task => res.json(task)
  .catch(err => res.status(404).json({noTaskFound: 'No task found'}))
})

```
This update function could be used to change any property of a task.
