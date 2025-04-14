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
      });
      task.appendChild(statusBtn);
  
      // Add delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = '❌';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => {
        task.remove();
      });
      task.appendChild(deleteBtn);
  
      document.getElementById('taskList').appendChild(task);
      input.value = '';
    } else {
      alert('Please enter a task.');
    }
  });