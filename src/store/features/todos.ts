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
            description: 'Hola Mundo',
            date: formatDate(new Date()),
            completed: false,
        },
        {
            id: 2,
            title: 'Learn Redux',
            description: 'Hola Mundo',
            date: '03/06/23',
            completed: true,
        },
        {
            id: 3,
            title: 'Learn Vite',
            description: 'Hola Mundo',
            date: '01/06/23',
            completed: false,
        },
        {
            id: 4,
            title: 'Learn TypeScript',
            description: 'Hola Mundo',
            date: '02/06/23',
            completed: true,
        },
        {
            id: 5,
            title: 'Learn React Router',
            description: 'Hola Mundo',
            date: '03/06/23',
            completed: true,
        },
        {
            id: 6,
            title: 'Learn React Redux',
            description: 'Hola Mundo',
            date: '01/06/23',
            completed: false,
        },
    ],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // Aquí definimos las acciones que modificarán el estado de los TODO.
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            date: formatDate(new Date());
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
    },
});

// Se exportan las acciones creadas por createSlice para poder usarlas en los componentes.
export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;

// Se exporta al reducer para poder añadirlo al store.
export default todosSlice.reducer;
