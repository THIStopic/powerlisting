import { useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useSelector, useDispatch } from 'react-redux';
import { initializeTodos, toggleTodo, deleteTodo } from '../store/features/todos';
import { Tooltip } from 'react-tooltip';
import Filter from './Filter';
import Actions from './Actions';

const AllTasks = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: any) => state.todos.todos);
    const filteredTodos = useSelector((state: any) => state.todos.filteredTodos);
    const todosToShow = filteredTodos.length > 0 ? filteredTodos : todos;
    const parent = useRef<HTMLUListElement>(null);

    const handleToggle = (id: number) => {
        dispatch(toggleTodo(id));
    };

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id));
    };

    // Primero, inicializamos los todos desde sessionStorage cuando el componente se monta
    useEffect(() => {
        const oldTodos = JSON.parse(sessionStorage.getItem('todos') || '[]');
        if (oldTodos.length > 0) {
            dispatch(initializeTodos(oldTodos));
        }
    }, [dispatch]); // Nota: solo depende de dispatch, que no cambiará

    // Luego, actualizamos la sessionStorage cada vez que los todos cambian
    useEffect(() => {
        sessionStorage.setItem('todos', JSON.stringify(todos));
        parent.current && autoAnimate(parent.current);
    }, [todos]);

    return (
        <div>
            {todosToShow.length ? <h1 className="mt-8 mb-4 flex justify-start font-medium">Todas las tareas:</h1> : <h1 className="my-8 flex justify-center font-medium">¡Crea una tarea para comenzar!</h1>}
            <Filter />
            <Actions />
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
                                <button
                                    className={`text-xs hover:bg-background transition-all duration-300 ease-in-out ${
                                        todo.completed ? 'text-orange-100' : 'text-blue-100'
                                    } bg-background font-semibold py-1 px-2 rounded cursor-pointer truncate`}
                                    onClick={() => handleToggle(todo.id)}
                                >
                                    {todo.completed ? 'Completada' : 'Pendiente'}
                                </button>
                                <Tooltip className="sampletooltip" id={todo.id.toString()} />
                            </div>
                            <div className="right_side flex justify-end items-center w-1/2">
                                <button
                                    data-tooltip-id={todo.id.toString()}
                                    data-tooltip-content="Eliminar"
                                    data-tooltip-place="left"
                                    className="material-icons-round cursor-pointer -mr-1 -mb-1 text-background rounded"
                                    onClick={() => handleDelete(todo.id)}
                                    id={todo.id.toString()}
                                >
                                    delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllTasks;
