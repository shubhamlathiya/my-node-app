const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (!taskText) return;

    // Create list item
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => {
        const newTask = prompt('Edit your task:', span.textContent);
        if (newTask !== null && newTask.trim() !== '') {
            span.textContent = newTask.trim();
        }
    });
    li.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => li.remove());
    li.appendChild(deleteBtn);

    // Add to list
    todoList.appendChild(li);
    input.value = '';
});
