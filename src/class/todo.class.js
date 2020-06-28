export class Todo {

    static fromJson({ tarea, id, completado, creado }) {
        const todo = new Todo(tarea);
        todo.id = id;
        todo.completado = completado;
        todo.creado = creado;

        return todo;
    }

    constructor(tarea) {

        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date().getFullYear();
    }

}