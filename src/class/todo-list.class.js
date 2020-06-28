import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        this.cargarTodosLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarTodosLocalStorage();
    }

    borrarTodo(id) {
        const todo = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(todo, 1);
        this.guardarTodosLocalStorage();
    }

    marcarCompletado(id) {
        const todo = this.todos.find((todo) => todo.id === id);
        todo.completado = !todo.completado;
        this.guardarTodosLocalStorage();
    }

    listaPendientes() {
        const pendientes = this.todos.filter((todo) => !todo.completado);

        return pendientes;
    }

    eliminarCompletados() {
        this.todos = this.todos.filter((todo) => !todo.completado);
        this.guardarTodosLocalStorage();
    }

    guardarTodosLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarTodosLocalStorage() {

        if (localStorage.getItem('todo')) {
            this.todos = JSON.parse(localStorage.getItem('todo'));
            this.todos = this.todos.map((todo) => Todo.fromJson(todo));

        } else {
            this.todos = [];
        }
    }
}