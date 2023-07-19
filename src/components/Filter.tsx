import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterTodos } from '../store/features/todos';

const Filter = () => {
    const todos = useSelector((state: any) => state.todos.todos);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const timeoutId = useRef<any>(null);

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

    return (
        <div>
            <input type="text" autoCorrect='off' onChange={handleFilter} className="w-full outline-none bg-cards py-2 px-4 rounded form-input placeholder-slate-700" placeholder="Buscar..." />
        </div>
    );
};

export default Filter;
