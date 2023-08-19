// External libraries
import { useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Custom hooks
import useTodoActions from '../hooks/useTodoActions'; // Aquí importamos el custom hook useTodoActions.

const PinnedTasks = () => {
    const todos = useSelector((state: any) => state.todos.todos);
    const [parent] = useAutoAnimate();
    const [parent2] = useAutoAnimate();

    const pinnedTodos = todos.filter((todo: any) => todo.isPinned);
    const { togglePin } = useTodoActions();

    return (
        <div ref={parent}>
            {todos.length > 0 ? (
                <div>
                    <h1 className="mt-8 mb-4 flex justify-start font-medium">Tareas fijadas:</h1>
                    <ul ref={parent2} className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pinnedTodos.length === 0 ? (
                            <li>Fija tu primera tarea para comenzar.</li>
                        ) : (
                            pinnedTodos.map((todo: any) => (
                                <li key={todo.id} className="flex flex-col justify-center gap-3 w-full h-28 bg-cards shadow-xl rounded-lg py-4 px-6">
                                    <div className="flex justify-between items-start truncate">
                                        <span className={`text-base font-medium ${todo.completed ? 'text-slate-600 line-through' : 'w-full'} transition-all duration-200 ease-in-out truncate`}>
                                            {todo.title}
                                        </span>
                                        {!todo.isPinned ? (
                                            <button
                                                className="material-icons-round scale-75 -mr-1 rotate-45 text-background select-none transition-all duration-200 ease-in-out"
                                                onClick={() => togglePin(todo.id)}
                                                id={`${todo.id}-pin`}
                                            >
                                                push_pin
                                            </button>
                                        ) : (
                                            <button
                                                className="material-icons-round scale-75 -mr-1 rotate-45 select-none transition-all duration-200 ease-in-out"
                                                onClick={() => togglePin(todo.id)}
                                                id={`${todo.id}-pin`}
                                            >
                                                push_pin
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-start truncate">
                                        <span className={`text-xs w-full truncate ${todo.completed ? 'text-slate-600' : ''} transition-all duration-200 ease-in-out`}>{todo.description}</span>
                                        <span className={`text-xs w-full truncate ${todo.completed ? 'text-slate-600' : ''} transition-all duration-200 ease-in-out`}>{todo.displayDate}</span>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default PinnedTasks;
