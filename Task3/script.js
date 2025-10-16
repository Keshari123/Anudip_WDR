let tasks = [];
let filter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearBtn = document.getElementById('clearBtn');
const filterBtns = document.querySelectorAll('.filter');

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => e.key === 'Enter' && addTask());
clearBtn.addEventListener('click', clearCompleted);
filterBtns.forEach(btn => btn.addEventListener('click', setFilter));

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.push({ id: Date.now(), text, completed: false });
    taskInput.value = '';
    render();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    render();
}

function setFilter(e) {
    filter = e.target.dataset.filter;
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    render();
}

function render() {
    const filtered = tasks.filter(t => 
        filter === 'all' || 
        (filter === 'active' && !t.completed) || 
        (filter === 'completed' && t.completed)
    );
    
    taskList.innerHTML = filtered.map(t => `
        <li class="task-item ${t.completed ? 'completed' : ''}">
            <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask(${t.id})">
            <span class="task-text">${t.text}</span>
            <button class="delete-btn" onclick="deleteTask(${t.id})">Delete</button>
        </li>
    `).join('');
    
    const remaining = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
}

render();