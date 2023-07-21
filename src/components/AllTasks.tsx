import { useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, reverseOrder } from '../store/features/todos';
import Filter from './Filter';
import { Tooltip } from 'react-tooltip';

const AllTasks = () => {
    const todos = useSelector((state: any) => state.todos.todos);
    const filteredTodos = useSelector((state: any) => state.todos.filteredTodos);
    const todosToShow = filteredTodos.length > 0 ? filteredTodos : todos;
    const dispatch = useDispatch();
    const parent = useRef<HTMLUListElement>(null);

    const handleToggle = (id: number) => {
        dispatch(toggleTodo(id));
    };

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id));
    };

    const handleSorting = () => {
        dispatch(reverseOrder());
    };

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, []);

    return (
        <div>
            {todosToShow.length ? <h1 className="my-8 flex justify-start font-medium">Todas las tareas:</h1> : <h1 className="my-8 flex justify-center font-medium">¡Crea una tarea para comenzar!</h1>}
            <Filter />
            <button onClick={handleSorting}>
                <span className="material-icons-round bg-cards py-1 px-2 rounded text-primarytext mt-4">sort</span>
            </button>
            <ul ref={parent} className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todosToShow.map((todo: any) => (
                    <li key={todo.id} className="flex flex-col gap-3 w-full bg-cards shadow-xl rounded-lg py-4 px-6">
                        <div className="flex flex-col items-start truncate">
                            <span className={`text-base font-medium ${todo.completed ? 'text-slate-600 line-through' : 'w-full'} transition-all duration-200 ease-in-out truncate`}>{todo.title}</span>
                            <span className={`text-xs w-full truncate ${todo.completed ? 'text-slate-600' : ''} transition-all duration-200 ease-in-out`}>{todo.description}</span>
                            <span className={`text-xs w-full truncate ${todo.completed ? 'text-slate-600' : ''} transition-all duration-200 ease-in-out`}>{todo.date}</span>
                        </div>
                        <div className="flex items-center justify-start">
                            <div className="left_side flex items-center w-1/2">
                                <span
                                    className={`text-xs hover:bg-background transition-all duration-300 ease-in-out ${
                                        todo.completed ? 'text-orange-100' : 'text-blue-100'
                                    } bg-background font-semibold py-1 px-2 rounded cursor-pointer truncate`}
                                    onClick={() => handleToggle(todo.id)}
                                >
                                    {todo.completed ? 'Completada' : 'Pendiente'}
                                </span>
                                <Tooltip className="sampletooltip" id={todo.id.toString()} />
                            </div>
                            <div className="right_side flex justify-end items-center w-1/2">
                                <span
                                    data-tooltip-id={todo.id.toString()}
                                    data-tooltip-content="Eliminar"
                                    data-tooltip-place="left"
                                    className="material-icons-round cursor-pointer -mr-1 -mb-1 text-background rounded"
                                    onClick={() => handleDelete(todo.id)}
                                    id={todo.id.toString()}
                                >
                                    delete
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllTasks;
