// External libraries
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import autoAnimate from '@formkit/auto-animate';

const PinnedTasks = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: any) => state.todos.todos);
    const parent = useRef<HTMLDivElement>(null);

    const hasPinnedTodos = todos.some((todo: any) => todo.isPinned);
    const pinnedTodos = todos.filter((todo: any) => todo.isPinned);

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, []);

    return (
        <div>
            {hasPinnedTodos ? <h1 className="mt-8 mb-4 flex justify-start font-medium">Tareas ancladas:</h1> : <h1 className="my-8 flex justify-center font-medium">¡No hay tareas ancladas!</h1>}
            {pinnedTodos.length > 0 ? (
                <div>
                    <ul>
                        {pinnedTodos.map((todo) => (
                            <li key={todo.id}>{todo.title}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h1 className="my-8 flex justify-center font-medium">¡No hay tareas ancladas!</h1>
            )}
        </div>
    );
};

export default PinnedTasks;
