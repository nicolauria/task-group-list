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
