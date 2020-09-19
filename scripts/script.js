'use strict';
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [];
let json;

const render = function () {

    todoList.textContent = '';
    todoCompleted.textContent = '';


    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        const btnTodoDelete = li.querySelector('.todo-remove');

        btnTodoDelete.addEventListener('click', function () {
            btnTodoDelete.parentNode.parentNode.remove();
            let index = todoData.indexOf(item);
            todoData.splice(index, 1);
            render();

        });
    });

    json = JSON.stringify(todoData);
    localStorage.json = json;
};


todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    if (headerInput.value === '') {
        return;
    }

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);

    headerInput.value = '';
    console.log(todoData);
    render();
});

todoData.length = 0;
console.log(todoData);
json = JSON.parse(localStorage.json);
// localStorage.clear();
for (let key in json) {
    todoData.push(json[key]);
}


render();