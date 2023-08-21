import { createSlice } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    isPinned: boolean;
    date?: string;
    displayDate?: string;
}

interface TodosState {
    todos: Todo[];
    filteredTodos: Todo[];
    pinnedTodos?: Todo[];
}

// Función para generar una fecha aleatoria entre un mínimo y un máximo de días.
// La función toma como parámetros el número mínimo y máximo de días.
// Devuelve un objeto con dos propiedades: date y displayDate.
function getRandomDate(minDays: number, maxDays: number): { date: string; displayDate: string } {
    const days = Math.floor(Math.random() * (maxDays - minDays + 1) + minDays);
    const date = new Date();
    date.setDate(date.getDate() + days);
    return {
        date: date.toISOString().split('T')[0],
        displayDate: date.toLocaleDateString('es-ES'),
    };
}

const initialState: TodosState = {
    todos: [
        {
            id: 1,
            title: 'Aprender React',
            description: 'Aprender a usar la biblioteca de JavaScript React para crear interfaces de usuario dinámicas y reactivas.',
            completed: true,
            isPinned: false,
            ...getRandomDate(1, 30),
        },
        {
            id: 2,
            title: 'Hacer ejercicio',
            description: 'Realizar 30 minutos de ejercicio cardiovascular para mantenerme en forma y saludable.',
            completed: true,
            isPinned: false,
            ...getRandomDate(1, 30),
        },
        {
            id: 3,
            title: 'Hacer la compra',
            description: 'Ir al supermercado a hacer la compra para la semana.',
            completed: true,
            isPinned: false,
            ...getRandomDate(1, 30),
        },
        {
            id: 4,
            title: 'Revisar correo electrónico',
            description: 'Revisar y responder correos electrónicos pendientes en el trabajo.',
            completed: false,
            isPinned: true,
            ...getRandomDate(1, 30),
        },
        {
            id: 5,
            title: 'Estudiar TypeScript',
            description: 'Aprender TypeScript para mejorar mis habilidades en el desarrollo de aplicaciones web.',
            completed: true,
            isPinned: false,
            ...getRandomDate(1, 30),
        },
        {
            id: 6,
            title: 'Pagar facturas',
            description: 'Pagar las facturas de servicios públicos y tarjetas de crédito antes de la fecha límite.',
            completed: true,
            isPinned: false,
            ...getRandomDate(1, 30),
        },
        {
            id: 7,
            title: 'Reunión con el equipo',
            description: 'Asistir a la reunión semanal con el equipo de trabajo para discutir el progreso del proyecto.',
            completed: false,
            isPinned: true,
            ...getRandomDate(1, 30),
        },
        {
            id: 8,
            title: 'Cita con el médico',
            description: 'Acudir a la cita con el médico para el chequeo anual y discutir los resultados de los análisis.',
            completed: true,
            isPinned: false,
            ...getRandomDate(1, 30),
        },
        {
            id: 9,
            title: 'Planificar vacaciones',
            description: 'Investigar destinos y planificar las próximas vacaciones familiares.',
            completed: false,
            isPinned: true,
            ...getRandomDate(1, 30),
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
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
            state.filteredTodos = state.filteredTodos.filter((todo) => todo.id !== action.payload.id);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            const filteredTodo = state.filteredTodos.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
            if (filteredTodo) {
                filteredTodo.completed = !filteredTodo.completed;
            }
        },
        pinToggle(state, action) {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            const filteredTodo = state.filteredTodos.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.isPinned = !todo.isPinned;
                console.log(`${todo.title} has been ${todo.isPinned ? 'pinned' : 'unpinned'}.`);
            }
            if (filteredTodo) {
                filteredTodo.isPinned = !filteredTodo.isPinned;
            }
        },
        filterTodos: (state, action) => {
            state.filteredTodos = [...action.payload];
        },
        reverseOrder: (state) => {
            state.todos.reverse();
            state.filteredTodos.reverse();
        },
        clearTodos: (state) => {
            state.todos = state.todos.filter((todo) => !todo.completed);
            state.filteredTodos = state.filteredTodos.filter((todo) => !todo.completed);
        },
    },
});

// Se exportan las acciones creadas por createSlice para poder usarlas en los componentes.
export const { addTodo, toggleTodo, deleteTodo, pinToggle, reverseOrder, initializeTodos, filterTodos, clearTodos } = todosSlice.actions;

// Se exporta al reducer para poder añadirlo al store.
export default todosSlice.reducer;
