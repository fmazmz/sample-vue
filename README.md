## Kanban.io

### Own functionality
Each task has a priority attached to it.
The user picks the priority initially when creating a new task, but can later also switch the priority by pressing on the priority button.
The left border and button color update accordingly through Vue style binding `:style` so the user can understand the priority by color directly.

The color codes are stored in a simple js object `PRIORITY_COLORS` and dynamically fetched through the Veu style binding that calls the function `priorityStyle` that returns the right color to the task borderLeft.

The state of the task priority is handled by `cyclePriority` function that is called when the user clicks on the priority button, it increments the priority in order, starting from `low` -> `medium` -> `high`. The cycle then wraps using the modulus operator, so that we dont get an out of bounds error.


### Future functionality
1. I would like to make use of localStorage instead of storing the data in plain Vue `data()`, that would remove the "annoyingness" of a data reset everytime the page refreshes.

2. Adding more professional styling to make the board look more professional and easy to use, specifically being able to drag and drop the tasks between the 3 status grids.
