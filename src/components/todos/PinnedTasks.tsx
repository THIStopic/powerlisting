// External libraries
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import autoAnimate from '@formkit/auto-animate';

const PinnedTasks = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: any) => state.todos.todos);
    const parent = useRef<HTMLDivElement>(null);

    const pinnedTodos = todos.filter((todo:any) => todo.isPinned);

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, []);

    return (
        <div>
            {pinnedTodos.length > 0 ? (
                <div>
                    <h1 className="mt-8 mb-4 flex justify-start font-medium">Tareas fijadas:</h1>
                    <ul>
                        {pinnedTodos.map((todo) => (
                            <li key={todo.id}>{todo.title}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h1 className="my-8 flex justify-center font-medium">¡No hay tareas fijadas!</h1>
            )}
        </div>
    );
};

export default PinnedTasks;
