import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterTodos } from '../../store/features/todosSlice';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Filter = () => {
    const todos = useSelector((state: any) => state.todos.todos);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const timeoutId = useRef<any>(null);
    const [parent] = useAutoAnimate();

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            const filteredTodos = todos.filter((todo: any) => todo.title.toLowerCase().includes(searchValue.toLowerCase()));
            dispatch(filterTodos(filteredTodos));
        }, 300);
    };

    const handleClearField = () => {
        const inputField: any = document.getElementById('filterContent');
        inputField.value = '';
    };

    return (
        <div ref={parent}>
            {todos.length > 0 ? (
                <div className="relative">
                    <input
                        id="filterContent"
                        type="text"
                        spellCheck="false"
                        onChange={handleFilter}
                        className="w-full outline-none bg-cards py-2 px-4 rounded form-input placeholder-slate-700"
                        placeholder="Buscar..."
                    />
                    <button onClick={handleClearField} className="material-icons-round absolute top-2 right-2 text-background cursor-pointer">
                        clear
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Filter;
