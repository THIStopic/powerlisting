import { createSlice } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    isPinned: boolean;
    date?: string;
}

interface TodosState {
    todos: Todo[];
    filteredTodos: Todo[];
    pinnedTodos?: Todo[];
}

const initialState: TodosState = {
    todos: [
        {
            id: 1,
            title: 'Learn React',
            description: 'Aprender a usar la biblioteca de JavaScript React para crear interfaces de usuario dinámicas y reactivas.',
            completed: false,
            isPinned: false,
            date: new Date().toLocaleDateString('es-ES'),
        },
        {
            id: 2,
            title: 'Learn Redux',
            description: 'Aprender a usar el gestor de estado global Redux para manejar el flujo de datos y la lógica de la aplicación.',
            completed: true,
            isPinned: false,
            date: new Date().toLocaleDateString('es-ES'),
        },
        {
            id: 3,
            title: 'Learn Vite',
            description: 'Aprender a usar la herramienta de desarrollo Vite para crear proyectos web modernos con una experiencia de desarrollo rápida y optimizada.',
            completed: false,
            isPinned: false,
            date: new Date().toLocaleDateString('es-ES'),
        },
        {
            id: 4,
            title: 'Learn TypeScript',
            description: 'Aprender a usar el lenguaje TypeScript para escribir código JavaScript con tipos estáticos y evitar errores en tiempo de ejecución.',
            completed: true,
            isPinned: false,
            date: new Date().toLocaleDateString('es-ES'),
        },
        {
            id: 5,
            title: 'Learn React Router',
            description: 'Aprender a usar la biblioteca React Router para gestionar la navegación y las rutas en una aplicación web basada en React.',
            completed: true,
            isPinned: false,
            date: new Date().toLocaleDateString('es-ES'),
        },
        {
            id: 6,
            title: 'Learn React Redux',
            description: 'Aprender a usar la biblioteca React Redux para conectar los componentes de React con el estado global de Redux y acceder a los datos y las acciones.',
            completed: false,
            isPinned: false,
            date: new Date().toLocaleDateString('es-ES'),
        },
    ],
    filteredTodos: [],
    pinnedTodos: [],
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
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
            state.todos.sort((a, b) => b.id - a.id);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        pinToggle(state, action) {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            if (todo) {
                // Se invertirá el valor de la propiedad isPinned.
                todo.isPinned = !todo.isPinned;
                console.log(`${todo.title} has been ${todo.isPinned ? 'pinned' : 'unpinned'}.`);
            }
        },
        filterTodos: (state, action) => {
            state.filteredTodos = [...action.payload];
            state.filteredTodos.sort((a, b) => b.id - a.id);
        },
        reverseOrder: (state) => {
            state.todos.reverse();
        },
        clearTodos: (state) => {
            state.todos = state.todos.filter((todo) => !todo.completed);
        },
    },
});

// Se exportan las acciones creadas por createSlice para poder usarlas en los componentes.
export const { addTodo, toggleTodo, deleteTodo, pinToggle, reverseOrder, initializeTodos, filterTodos, clearTodos } = todosSlice.actions;

// Se exporta al reducer para poder añadirlo al store.
export default todosSlice.reducer;
