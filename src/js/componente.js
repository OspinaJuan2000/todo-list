import { Todo } from "../class/index.js";
import { listaTarea } from '../index.js';

//Referencias en el HTMl.
const divTodoList = document.querySelector('.todo-list'),
    nuevoTodo = document.querySelector('.new-todo'),
    btnEliminar = document.querySelector('.clear-completed'),
    filtros = document.querySelector('.filters'),
    listaPendientes = document.querySelector('.todo-count > strong');

export const renderTodoHTML = (todo) => {

    const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.appendChild(div.firstElementChild);

    listaPendientes.innerHTML = listaTarea.listaPendientes().length;

    return div.firstElementChild;
}

nuevoTodo.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value.length > 0) {
        const nuevoTodo = new Todo(event.target.value);

        listaTarea.nuevoTodo(nuevoTodo);

        renderTodoHTML(nuevoTodo);

        event.target.value = '';
    }
});


divTodoList.addEventListener('click', (event) => {
    const elementoTarea = event.target.parentElement.parentElement;
    const idElementoTarea = Number(elementoTarea.dataset.id);

    if (event.target.classList.contains('toggle')) {
        listaTarea.marcarCompletado(idElementoTarea);
        elementoTarea.classList.toggle('completed');
    }

    if (event.target.classList.contains('destroy')) {
        listaTarea.borrarTodo(idElementoTarea);
        elementoTarea.remove();
    }

    listaPendientes.innerHTML = listaTarea.listaPendientes().length;
});

btnEliminar.addEventListener('click', () => {
    if (document.querySelectorAll('.completed').length !== 0) {
        listaTarea.eliminarCompletados();

        const todoCompletadas = document.querySelectorAll('.completed');

        todoCompletadas.forEach((todo) => {
            todo.remove();
        });

    }
});

filtros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if (!filtro || divTodoList.querySelectorAll('li').length === 0) {
        return;

    } else {
        const todoList = divTodoList.querySelectorAll('li');

        switch (filtro) {
            case 'Pendientes':
                todoList.forEach((todo) => {
                    todo.classList.remove('hidden');
                    if (todo.classList.contains('completed')) {
                        todo.classList.add('hidden');
                    }
                });
                break;
            case 'Completados':
                todoList.forEach((todo) => {
                    todo.classList.remove('hidden');
                    if (!todo.classList.contains('completed')) {
                        todo.classList.add('hidden');
                    }
                });
                break;
            case 'Todos':
                todoList.forEach((todo) => todo.classList.remove('hidden'));
        }
    }
});
