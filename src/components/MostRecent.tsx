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
    };

    const handleDelete = (event: React.MouseEvent<HTMLSpanElement>) => {
        const id = parseInt(event.currentTarget.id);
        dispatch(deleteTodo(id));
        toast.success('Tarea eliminada correctamente.');
    };

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    return (
        <div>
            <h1 className="mb-4">Tareas recientes:</h1>

            <ul ref={parent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todos.slice(0, 3).map((todo: any) => (
                    <li key={todo.id} className="flex w-full bg-white border-slate-300 shadow-lg rounded-sm p-6">
                        <div className="w-1/2 left_content flex flex-col items-start truncate">
                            {todo.completed ? (
                                <span className="text-base font-medium text-slate-400 line-through w-full truncate">{todo.title}</span>
                            ) : (
                                <span className="text-base font-medium text-slate-800 w-full truncate">{todo.title}</span>
                            )}

                            <span className="text-sm text-slate-600 w-full truncate">{todo.description}</span>
                            <span className="text-sm text-slate-600 w-full truncate">{todo.date}</span>
                        </div>
                        <div className="w-1/2 right_content flex flex-col items-end justify-between">
                            <span className="material-icons-round cursor-pointer text-red-600 scale-75" onClick={handleDelete} id={todo.id.toString()}>
                                remove_circle_outline
                            </span>
                            {todo.completed ? (
                                <span className="text-xs bg-green-100 text-green-900 font-semibold px-2 rounded-sm truncate">Completed</span>
                            ) : (
                                <span className="text-xs bg-red-100 text-red-900 font-semibold px-2 rounded-sm truncate">Incomplete</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostRecent;