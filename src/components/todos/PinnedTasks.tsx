// External libraries
import { useSelector } from 'react-redux';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const PinnedTasks = () => {
    const todos = useSelector((state: any) => state.todos.todos);
    const [parent] = useAutoAnimate();

    const pinnedTodos = todos.filter((todo: any) => todo.isPinned);

    return (
        <div>
            {pinnedTodos.length > 0 ? (
                <div>
                    <h1 className="mt-8 mb-4 flex justify-start font-medium">Tareas fijadas:</h1>
                    <ul ref={parent}>
                        {pinnedTodos.map((todo: any) => (
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
