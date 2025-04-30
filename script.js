// Get references to the form, task list and counter display elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const counter = document.getElementById('counter');

// Load tasks from localStorage or initialize an empty array if none found
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save the current state of tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update the task counter showing Total, In Progress and Completed tasks
function updateCounter() {
    const total = tasks.length;
    const inProgress = tasks.filter(task => task.status === 'In Progress').length;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    counter.innerText = `Total: ${total} | In Progress: ${inProgress} | Completed: ${completed}`;
}

// Create and display a single task element in the list
function createTaskElement(task, index) {
    // Create a list item and assign a class based on priority
    const li = document.createElement('li');
    li.className = 'task-item priority-' + task.priority;

    // Show the task name in bold
    const taskName = document.createElement('strong');
    taskName.innerText = task.name;

    // Show task details like type, due date, assigned person and status
    const details = document.createElement('div');
    details.innerText = `Type: ${task.type} | Due: ${task.dueDate} | Assigned to: ${task.assignedTo} | Status: ${task.status}`;

    // Create a label and textarea for the user to add notes
    const noteLabel = document.createElement('label');
    noteLabel.innerText = 'Notes:';

    const noteArea = document.createElement('textarea');
    noteArea.value = task.note || '';
    noteArea.placeholder = 'Add your notes here...';
    noteArea.rows = 3;

    // When the user types in the note area, update the task and save to storage
    noteArea.addEventListener('input', function () {
        tasks[index].note = noteArea.value;
        saveTasks();
    });

    // Create a Start button to mark the task as "In Progress"
    const startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.onclick = function () {
        task.status = 'In Progress';
        saveTasks();
        renderTasks(); // Re-render the list with updated status
    };

    // Create a Pause button to mark the task as "Paused"
    const pauseButton = document.createElement('button');
    pauseButton.innerText = 'Pause';
    pauseButton.onclick = function () {
        task.status = 'Paused';
        saveTasks();
        renderTasks();
    };

    // Create a Complete button to mark the task as "Completed"
    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.onclick = function () {
        task.status = 'Completed';
        saveTasks();
        renderTasks();
    };

    // Create a Delete button, but only allow deleting if the task is Completed
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function () {
        if (task.status === 'Completed') {
            tasks.splice(index, 1); // Remove the task from the array
            saveTasks();
            renderTasks(); // Refresh the task list
        } else {
            alert('Only completed tasks can be deleted.');
        }
    };

    // Add all elements to the task list item
    li.appendChild(taskName);
    li.appendChild(details);
    li.appendChild(noteLabel);
    li.appendChild(noteArea);
    li.appendChild(startButton);
    li.appendChild(pauseButton);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    // Add the task item to the task list in the DOM
    taskList.appendChild(li);
}

// Render all tasks in the task list
function renderTasks() {
    taskList.innerHTML = ''; // Clear the existing list
    tasks.forEach((task, index) => createTaskElement(task, index)); // Re-create all tasks
    updateCounter(); // Update the counter at the top
}

// Handle the form submission to add a new task
taskForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Create a new task object with values from the form
    const newTask = {
        name: document.getElementById('task-name').value,
        type: document.getElementById('job-type').value,
        priority: document.getElementById('priority').value,
        dueDate: document.getElementById('due-date').value,
        assignedTo: document.getElementById('assigned-to').value,
        note: '', // Start with an empty note
        status: 'Not Started' // Default status
    };

    tasks.push(newTask);   // Add the new task to the array
    saveTasks();           // Save the updated task list
    renderTasks();         // Refresh the display
    taskForm.reset();      // Clear the form fields
});

// On page load, render any tasks saved in localStorage
renderTasks();
