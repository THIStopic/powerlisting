import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos';

const store = configureStore({
    reducer: {
        todos : todosReducer,
    },
});

export default store;