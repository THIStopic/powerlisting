import { clearTodos } from '../../store/features/todosSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Actions = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: any) => state.todos.todos);
    const [parent] = useAutoAnimate();

    const handleClear = () => {
        dispatch(clearTodos());
    };

    return (
        <div ref={parent} className="actions flex gap-2">
            <Tooltip className="sampletooltip2" id="sort" />
            {todos.length > 0 ? (
                <button
                    data-tooltip-id="sort"
                    data-tooltip-content="Limpiar"
                    data-tooltip-place="right"
                    onClick={handleClear}
                    aria-label="Ordenar"
                    className="material-icons-round bg-cards py-1 px-2 rounded text-primarytext mt-4 cursor-pointer"
                >
                    delete_sweep
                </button>
            ) : (
                null
            )}
        </div>
    );
};

export default Actions;
