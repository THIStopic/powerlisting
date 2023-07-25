import { createSlice } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    title: string;
    description: string;
    date: string;
    completed: boolean;
}

interface TodosState {
    todos: Todo[];
    filteredTodos: Todo[];
}

// Función para formatear la fecha en formato dd/mm/yy.
const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
};

const initialState: TodosState = {
    todos: [
        {
            id: 1,
            title: 'Learn React',
            description: 'Aprender a usar la biblioteca de JavaScript React para crear interfaces de usuario dinámicas y reactivas.',
            date: formatDate(new Date()),
            completed: false,
        },
        {
            id: 2,
            title: 'Learn Redux',
            description: 'Aprender a usar el gestor de estado global Redux para manejar el flujo de datos y la lógica de la aplicación.',
            date: formatDate(new Date()),
            completed: true,
        },
        {
            id: 3,
            title: 'Learn Vite',
            description: 'Aprender a usar la herramienta de desarrollo Vite para crear proyectos web modernos con una experiencia de desarrollo rápida y optimizada.',
            date: formatDate(new Date()),
            completed: false,
        },
        {
            id: 4,
            title: 'Learn TypeScript',
            description: 'Aprender a usar el lenguaje TypeScript para escribir código JavaScript con tipos estáticos y evitar errores en tiempo de ejecución.',
            date: formatDate(new Date()),
            completed: true,
        },
        {
            id: 5,
            title: 'Learn React Router',
            description: 'Aprender a usar la biblioteca React Router para gestionar la navegación y las rutas en una aplicación web basada en React.',
            date: formatDate(new Date()),
            completed: true,
        },
        {
            id: 6,
            title: 'Learn React Redux',
            description: 'Aprender a usar la biblioteca React Redux para conectar los componentes de React con el estado global de Redux y acceder a los datos y las acciones.',
            date: formatDate(new Date()),
            completed: false,
        },
    ],
    filteredTodos: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // Aquí definimos las acciones que modificarán el estado de los TODO.
        initializeTodos: (state, action) => {
            state.todos = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            state.todos.sort((a, b) => b.id - a.id);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            state.todos.sort((a, b) => b.id - a.id);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        filterTodos: (state, action) => {
            state.filteredTodos = [...action.payload];
            state.filteredTodos.sort((a, b) => b.id - a.id);
        },
        reverseOrder: (state) => {
            state.todos.reverse();
        },
        // Esta función ordena los TODO por fecha de forma descendente (del más reciente al más antiguo).
        /* sortTodos: (state) => {
            state.todos.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB.getTime() - dateA.getTime();
            });
        }, */
        clearTodos: (state) => {
            state.todos = state.todos.filter((todo) => !todo.completed);
        },
    },
});

// Se exportan las acciones creadas por createSlice para poder usarlas en los componentes.
export const { addTodo, toggleTodo, deleteTodo, reverseOrder, initializeTodos, filterTodos, clearTodos } = todosSlice.actions;

// Se exporta al reducer para poder añadirlo al store.
export default todosSlice.reducer;
