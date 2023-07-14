import { useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/features/todos';
import toast from 'react-hot-toast';

const MostRecent = () => {
    const todos = useSelector((state: any) => state.todos.todos);
    const dispatch = useDispatch();
    const parent = useRef<HTMLUListElement>(null);

    // Pendiente de añadir.
    const handleToggle = (id: number) => {
        dispatch(toggleTodo(id));
        if (todos.find((todo: any) => todo.id === id).completed) {
            toast.success('Tarea Pendiente.');
        } else {
            toast.success('Tarea Completada.');
        }
    };

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id));
        toast.success('Tarea eliminada correctamente.');
    };

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    return (
        <div>
            <h1 className="mb-4 font-medium">Todas las tareas:</h1>

            <ul ref={parent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todos.slice().reverse().map((todo: any) => (
                    <li key={todo.id} className="flex flex-col gap-3 w-full bg-cards shadow-lg rounded-lg py-4 px-6">
                        <div className="flex flex-col items-start truncate">
                            {todo.completed ? (
                                <span className="text-base font-medium line-through truncate">{todo.title}</span>
                            ) : (
                                <span className="text-base font-medium w-full truncate">{todo.title}</span>
                            )}

                            <span className="text-sm w-full truncate">{todo.description}</span>
                            <span className="text-sm w-full truncate">{todo.date}</span>
                        </div>
                        <div className="flex items-center justify-start">
                            <div className="left_side flex items-center w-1/2">
                                {todo.completed ? (
                                    <span className="text-xs border border-buttonborder text-blue-100 font-semibold py-1 px-2 rounded cursor-pointer truncate">Completada</span>
                                ) : (
                                    <span className="text-xs border border-buttonborder text-blue-100 font-semibold py-1 px-2 rounded cursor-pointer truncate">Pendiente</span>
                                )}
                            </div>
                            <div className="right_side flex justify-end items-center w-1/2">
                                <span className="material-icons-round cursor-pointer border border-buttonborder text-blue-100 py-1 px-2 rounded scale-75 ml-2" onClick={() => handleToggle(todo.id)}>
                                    check_circle_outline
                                </span>
                                <span
                                    className="material-icons-round cursor-pointer border border-buttonborder text-blue-100 py-1 px-2 rounded scale-75"
                                    onClick={() => handleDelete(todo.id)}
                                    id={todo.id.toString()}
                                >
                                    delete_outline
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostRecent;
