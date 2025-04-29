document.getElementById('logTaskBtn').addEventListener('click', () => {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText) {
    const task = document.createElement('li');
    task.classList.add('task-item');

    // Add task text span
    const span = document.createElement('span');
    span.innerText = `🔧 ${taskText}`;
    span.classList.add('task-text');
    task.appendChild(span);

    // Add status toggle button
    const statusBtn = document.createElement('button');
    statusBtn.innerText = 'Mark Done';
    statusBtn.classList.add('status-btn');
    statusBtn.addEventListener('click', () => {
      span.classList.toggle('done');
      statusBtn.innerText = span.classList.contains('done') ? 'Mark Incomplete' : 'Mark Done';
      updateCounter();
    });
    task.appendChild(statusBtn);

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '❌';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      task.remove();
      updateCounter();
    });
    task.appendChild(deleteBtn);

    document.getElementById('taskList').appendChild(task);
    input.value = '';
    updateCounter();
  } else {
    alert('Please enter a task.');
  }
});

// counter
function updateCounter() {
  const total = document.querySelectorAll('.task-item').length;
  const completed = document.querySelectorAll('.task-text.done').length;
  document.getElementById('counter').innerText = `Total: ${total} | Completed: ${completed}`;
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(document.querySelectorAll('.task-text')).map(task => ({
    text: task.innerText.replace('🔧 ', ''),
    done: task.classList.contains('done')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskData => {
    const task = document.createElement('li');
    task.classList.add('task-item');

    const span = document.createElement('span');
    span.innerText = `🔧 ${taskData.text}`;
    span.classList.add('task-text');
    if (taskData.done) span.classList.add('done');
    task.appendChild(span);

    const statusBtn = document.createElement('button');
    statusBtn.innerText = taskData.done ? 'Mark Incomplete' : 'Mark Done';
    statusBtn.classList.add('status-btn');
    statusBtn.addEventListener('click', () => {
      span.classList.toggle('done');
      statusBtn.innerText = span.classList.contains('done') ? 'Mark Incomplete' : 'Mark Done';
      saveTasks();
    });
    task.appendChild(statusBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '❌';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      task.remove();
      saveTasks();
    });
    task.appendChild(deleteBtn);

    document.getElementById('taskList').appendChild(task);
  });
}

// Call this at page load
loadTasks();

// Filtering Tasks - show all, incomplete, complete

const taskList = document.getElementById('taskList');

// Function to filter tasks
function filterTasks(filterType) {
  const tasks = taskList.querySelectorAll('li');

  tasks.forEach(task => {
    const isDone = task.querySelector('.task-text').classList.contains('done');

    if (filterType === 'all') {
      task.style.display = 'flex'; // or 'block' if your tasks are block elements
    } else if (filterType === 'completed' && isDone) {
      task.style.display = 'flex';
    } else if (filterType === 'incomplete' && !isDone) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}

// filter button events
document.getElementById('showAllBtn').addEventListener('click', () => filterTasks('all'));
document.getElementById('showCompletedBtn').addEventListener('click', () => filterTasks('completed'));
document.getElementById('showIncompleteBtn').addEventListener('click', () => filterTasks('incomplete'));

