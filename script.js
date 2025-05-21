// Get elements from the page
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskLists');
const remainingCount = document.getElementById('remainingCount');

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  // Create a new list item
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // Add it to the list
  taskList.appendChild(li);

  // Clear the input
  taskInput.value = '';

  // Update task count
  updateCount();
}

// Function to handle click actions on edit and delete
function handleTaskListClick(e) {
  const target = e.target;

  // Delete task
  if (target.classList.contains('delete-btn')) {
    const taskItem = target.closest('li');
    taskItem.remove();
    updateCount();
  }

  // Edit task
  if (target.classList.contains('edit-btn')) {
    const taskItem = target.closest('li');
    const span = taskItem.querySelector('.task-text');
    const currentText = span.textContent;

    // Ask the user for new task text
    const newText = prompt('Edit your task:', currentText);

    // If the user didn't cancel and didn't leave it empty
    if (newText !== null && newText.trim() !== '') {
      span.textContent = newText.trim();
    }
  }
}

// Function to update the count of remaining tasks
function updateCount() {
  const totalTasks = taskList.querySelectorAll('li').length;
  remainingCount.textContent = totalTasks;
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

taskList.addEventListener('click', handleTaskListClick);
