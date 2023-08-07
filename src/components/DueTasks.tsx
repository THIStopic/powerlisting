import { useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { useSelector, useDispatch } from 'react-redux';

const DueTasks = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: any) => state.todos.todos);
    const parent = useRef<HTMLUListElement>(null);

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }), [todos];

    return (
        <div>
            <h1 className="flex justify-start font-medium mb-4">Tareas Fijadas:</h1>
            <ul ref={parent} className='flex flex-col gap-1'>
                {todos.map((todo: any) => (
                    <li key={todo.id} className="flex flex-col w-full bg-cards shadow-xl rounded-lg py-4 px-6">
                        <div className="flex justify-between items-start truncate">
                            <span className={`text-base font-medium ${todo.completed ? 'text-slate-600 line-through' : 'w-full'} transition-all duration-200 ease-in-out truncate`}>{todo.title}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={`text-xs font-medium ${todo.completed ? 'text-slate-600 line-through' : 'w-full'} transition-all duration-200 ease-in-out truncate`}>{todo.description}</span>
                            <div className="flex gap-2">
                                {todo.completed ? (
                                    <button className="material-icons-round scale-75 -mr-1 rotate-45 text-background" onClick={() => togglePin(todo.id)} id={`${todo.id}-pin`}>
                                        push_pin
                                    </button>
                                ) : (
                                    <button className="material-icons-round scale-75 -mr-1 rotate-45 text-background" onClick={() => togglePin(todo.id)} id={`${todo.id}-pin`}>
                                        push_pin
                                    </button>
                                )}
                                <button className="material-icons-round scale-75 text-background" onClick={() => dispatch(deleteTodo)} id={`${todo.id}-delete`}>
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

export default DueTasks;
