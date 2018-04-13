// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();


// Load all event listeners
function loadEventListeners() {
  // Add task event
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
    document.addEventListener('DOMContentLoaded', getTasks);
}

// Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

    tasks.forEach(function(task){
        const li = document.createElement('li');
li.className = 'collection-item';
// Create Text node and append to li
li.appendChild(document.createTextNode(task));
// Create new link element (x)
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML = '<i class = "fa fa-remove"></i>';
// append the link to li
li.appendChild(link);
// Append the li to ul
taskList.appendChild(li);
    })
}


// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

//   Create LI element
const li = document.createElement('li');
li.className = 'collection-item';
// Create Text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
// Create new link element (x)
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML = '<i class = "fa fa-remove"></i>';
// append the link to li
li.appendChild(link);
// Append the li to ul
taskList.appendChild(li);
// Store to local storage
storeTask(taskInput.value);
// clear input
taskInput.value = '';

  e.preventDefault();
}

// Removing tasks
function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')) {
        
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
    if(localStorage.getItem('tasks') === null){
        tasks =[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks function

function clearTasks(){
    taskList.innerHTML= '';
    clearTasksFromLocalStorage();
}

// Clear tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }


function storeTask(task){
    if(localStorage.getItem('tasks') === null){
        tasks =[]
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(tasks));
}