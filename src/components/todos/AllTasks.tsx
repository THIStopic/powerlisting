// Librerías externas
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Acciones y slices de Redux
import { initializeTodos } from '../../store/features/todosSlice';

// Componentes
import Filter from './Filter';
import Actions from './Actions';

// Custom hooks
import useTodoActions from '../hooks/useTodoActions'; // Aquí importamos el custom hook useTodoActions.

const AllTasks = () => {
    // Hooks y estados
    const dispatch = useDispatch();
    const todos = useSelector((state: any) => state.todos.todos);
    const filteredTodos = useSelector((state: any) => state.todos.filteredTodos);
    const todosToShow = filteredTodos.length > 0 ? filteredTodos : todos;
    const sortedTodosToShow = [...todosToShow].sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Custom hook para acciones de todos
    // Aquí usamos el custom hook useTodoActions para obtener las acciones que necesitamos.
    const { togglePin, handleToggle, handleDelete } = useTodoActions();
    // Custom hook para animaciones
    const [parent] = useAutoAnimate();

    // Primero, inicializamos los todos desde sessionStorage cuando el componente se monta.
    useEffect(() => {
        const oldTodos = JSON.parse(sessionStorage.getItem('todos') || '[]');
        if (oldTodos.length > 0) {
            dispatch(initializeTodos(oldTodos));
        }
    }, [dispatch]); // Nota: Solo depende de dispatch, que no cambiará.

    // Luego, actualizamos la sessionStorage cada vez que los todos cambian.
    useEffect(() => {
        sessionStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div>
            {sortedTodosToShow.length ? (
                <h1 className="mt-8 mb-4 flex justify-start font-medium">Todas las tareas:</h1>
            ) : (
                <h1 className="my-8 flex justify-center font-medium">¡Crea una tarea para comenzar!</h1>
            )}
            <Filter />
            <Actions />
            <ul ref={parent} className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedTodosToShow.map((todo: any) => (
                    <li key={todo.id} className="flex flex-col justify-center gap-3 w-full h-36 bg-cards shadow-xl rounded-lg py-4 px-6">
                        <div className="flex justify-between items-start truncate">
                            <span className={`text-base font-medium ${todo.completed ? 'text-slate-600 line-through' : 'w-full'} transition-all duration-200 ease-in-out truncate`}>{todo.title}</span>
                            {!todo.isPinned ? (
                                <button className="material-icons-round scale-75 -mr-1 rotate-45 text-background select-none transition-all duration-200 ease-in-out" onClick={() => togglePin(todo.id)} id={`${todo.id}-pin`}>
                                    push_pin
                                </button>
                            ) : (
                                <button className="material-icons-round scale-75 -mr-1 rotate-45 select-none transition-all duration-200 ease-in-out" onClick={() => togglePin(todo.id)} id={`${todo.id}-pin`}>
                                    push_pin
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col items-start truncate">
                            <span className={`text-xs w-full truncate ${todo.completed ? 'text-slate-600' : ''} transition-all duration-200 ease-in-out`}>{todo.description}</span>
                            <span className={`text-xs w-full truncate ${todo.completed ? 'text-slate-600' : ''} transition-all duration-200 ease-in-out`}>{todo.displayDate}</span>
                        </div>
                        <div className="flex items-center justify-start">
                            <div className="left_side flex items-center w-1/2">
                                <button
                                    className={`text-xs hover:bg-background transition-all duration-300 ease-in-out ${
                                        todo.completed ? 'text-orange-100' : 'text-blue-100'
                                    } bg-background font-semibold py-1 px-2 rounded truncate`}
                                    onClick={() => handleToggle(todo.id)}
                                >
                                    {todo.completed ? 'Completada' : 'Pendiente'}
                                </button>
                                <Tooltip className="sampletooltip" id={todo.id.toString()} />
                            </div>
                            <div className="right_side flex justify-end items-center w-1/2">
                                {todo.completed ? (
                                    <button
                                        data-tooltip-id={`${todo.id}-delete`}
                                        data-tooltip-content="Eliminar"
                                        data-tooltip-place="left"
                                        className="material-icons-round scale-75 -mr-1 -mb-1 text-background select-none transition-all duration-200 ease-in-out"
                                        onClick={() => handleDelete(todo.id)}
                                        id={`${todo.id}-delete`}
                                    >
                                        delete
                                    </button>
                                ) : (
                                    <button
                                        data-tooltip-id={`${todo.id}-delete`}
                                        data-tooltip-content="Eliminar"
                                        data-tooltip-place="left"
                                        className="material-icons-round scale-75 -mr-1 -mb-1 select-none transition-all duration-200 ease-in-out"
                                        onClick={() => handleDelete(todo.id)}
                                        id={`${todo.id}-delete`}
                                    >
                                        delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllTasks;
