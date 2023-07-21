import {reverseOrder } from '../store/features/todos';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';

const Actions = () => { 

    const dispatch = useDispatch();

    const handleSorting = () => {
        dispatch(reverseOrder());
    };

    return (
        <div className="actions flex gap-2">
            <Tooltip className="sampletooltip2" id="sort" />
            <button 
            data-tooltip-id="sort"
            data-tooltip-content="Ordenar"
            data-tooltip-place="right"
            onClick={handleSorting} aria-label="Ordenar" className="material-icons-round bg-cards py-1 px-2 rounded text-primarytext mt-4 cursor-pointer">
                sort
            </button>
        </div>
    );
};

export default Actions;
