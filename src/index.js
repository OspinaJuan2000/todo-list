import './css/styles.css';

import { TodoList, Todo } from './class/index.js';
import { renderTodoHTML } from './js/componente.js';


export const listaTarea = new TodoList();

listaTarea.todos.forEach(todo => renderTodoHTML(todo));
