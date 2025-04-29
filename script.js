// Select form and task list
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const counter = document.getElementById('counter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to update counters
function updateCounter() {
    const total = tasks.length;
    const inProgress = tasks.filter(task => task.status === 'In Progress').length;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    counter.innerText = `Total: ${total} | In Progress: ${inProgress} | Completed: ${completed}`;
}

// Function to save tasks
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a task item
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item priority-' + task.priority;

    const taskName = document.createElement('strong');
    taskName.innerText = task.name;

    const details = document.createElement('div');
    details.innerText = `Type: ${task.type} | Due: ${task.dueDate} | Assigned to: ${task.assignedTo}`;

    const startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.onclick = function () {
        task.status = 'In Progress';
        saveTasks();
        updateCounter();
    };

    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.onclick = function () {
        task.status = 'Completed';
        saveTasks();
        updateCounter();
    };

    // const removeButton = document.createElement('button');
    // removeButton.innerText = 'Remove';
    // removeButton.onclick = function () {
    //     task.status = 'Removed';
    //     saveTasks();
    //     updateCounter();
    // }

    li.appendChild(taskName);
    li.appendChild(details);
    li.appendChild(startButton);
    li.appendChild(completeButton);

    taskList.appendChild(li);
}

// Function to render all tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => createTaskElement(task));
    updateCounter();
}

// Event listener for adding a task
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTask = {
        name: document.getElementById('task-name').value,
        type: document.getElementById('job-type').value,
        priority: document.getElementById('priority').value,
        dueDate: document.getElementById('due-date').value,
        assignedTo: document.getElementById('assigned-to').value,
        status: 'Not Started'
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskForm.reset();
});

// On page load
renderTasks();
