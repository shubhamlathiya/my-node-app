const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.className = task.completed ? 'completed' : '';
        li.dataset.index = index;

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.style.marginLeft = '10px';
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText) {
        tasks.push({text: taskText, completed: false});
        saveTasks();
        renderTasks();
        input.value = '';
    }
});


list.addEventListener('click', (e) => {
    const index = e.target.parentElement.dataset.index;
    console.log(index)
    if (e.target.tagName === 'LI') {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    } else if (e.target.tagName === 'BUTTON') {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
});

renderTasks();
