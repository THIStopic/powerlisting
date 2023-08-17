import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, pinToggle } from '../../store/features/todosSlice';

const useTodoActions = () => {
    const dispatch = useDispatch();

    const handleToggle = (id: number) => {
        dispatch(toggleTodo({ id }));
    };

    const handleDelete = (id: number) => {
        dispatch(deleteTodo({ id }));
    };

    const togglePin = (id: number) => {
        dispatch(pinToggle({ id }));
    };

    return { handleToggle, handleDelete, togglePin };
};

export default useTodoActions;