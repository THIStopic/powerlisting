import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../store/features/todos';
import toast from 'react-hot-toast';

const AddTodo = () => {
    const [isTaskFocused, setIsTaskFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [taskValue, setTaskValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const todos = useSelector((state: any) => state.todos.todos);

    const handleTaskFocus = () => setIsTaskFocused(true);
    const handleTaskBlur = () => setIsTaskFocused(false);
    const handleTaskChange = (e: any) => setTaskValue(e.target.value);

    const handleDescriptionFocus = () => setIsDescriptionFocused(true);
    const handleDescriptionBlur = () => setIsDescriptionFocused(false);
    const handleDescriptionChange = (e: any) => setDescriptionValue(e.target.value);

    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (taskValue && descriptionValue) {
            dispatch(
                addTodo({
                    id: todos.length + 1,
                    title: taskValue,
                    description: descriptionValue,
                    date: new Date().toLocaleDateString(),
                    completed: false,
                })
            );
            setTaskValue('');
            setDescriptionValue('');
            const firstName = document.getElementById('form-input-first-name') as HTMLInputElement;
            const description = document.getElementById('form-input-description') as HTMLInputElement;
            firstName.value = '';
            description.value = '';
        }
        toast.success('Tarea añadida correctamente.');
    };

    const handleClearTodos = () => {
        setTaskValue('');
        setDescriptionValue('');
        const firstName = document.getElementById('form-input-first-name') as HTMLInputElement;
        const description = document.getElementById('form-input-description') as HTMLInputElement;
        firstName.value = '';
        description.value = '';
    };

    const taskLabelStyle = `absolute text-primarytext left-3 top-1.5 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isTaskFocused || taskValue ? '-ml-2 px-2 transform -translate-y-4 text-sm text-primarytext' : 'text-slate-600'
    }`;

    const descriptionLabelStyle = `absolute text-primarytext left-3 top-1.5 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isDescriptionFocused || descriptionValue ? '-ml-2 px-2 transform -translate-y-4 text-sm' : 'text-slate-600'
    }`;

    return (
        <>
            <h1 className="mb-4">Añadir una tarea nueva</h1>
            <div className="container flex flex-col md:flex-row gap-4">
                <div className="left_side flex flex-col justify-center w-full md:w-2/3 gap-4">
                    <div className="flex relative">
                        <input
                            type="text"
                            spellCheck="false"
                            onFocus={handleTaskFocus}
                            onBlur={handleTaskBlur}
                            onChange={handleTaskChange}
                            id="form-input-first-name"
                            className="bg-cards rounded px-3 py-3 w-full text-sm text-slate-500 outline-none"
                        />
                        <label className={taskLabelStyle}>Tarea</label>
                    </div>
                    <div className="flex relative">
                        <textarea
                            spellCheck="false"
                            onFocus={handleDescriptionFocus}
                            onBlur={handleDescriptionBlur}
                            onChange={handleDescriptionChange}
                            id="form-input-description"
                            className="bg-cards rounded px-3 py-3 w-full text-sm text-slate-500 outline-none"
                        />
                        <label className={descriptionLabelStyle}>Descripción</label>
                    </div>
                </div>
                <div className="right_side w-full md:w-1/3">
                    <div className="flex flex-col gap-4 w-full bg-cards shadow-2xl rounded-lg py-4 px-6">
                        <div className="flex flex-col items-start truncate">
                            <span className="text-base font-medium w-full truncate">{taskValue == '' ? 'Titulo' : taskValue}</span>
                            <span className="text-sm w-full truncate">{descriptionValue == '' ? 'Descripción' : descriptionValue}</span>
                            <span className="text-sm w-full truncate">{taskValue == '' && descriptionValue == '' ? 'Fecha' : new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="left_side flex items-center w-1/2">
                            <span className="text-xs border border-buttonborder text-blue-100 font-semibold py-1 px-2 rounded cursor-pointer truncate">Pendiente</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button_container flex gap-4">
                <button onClick={handleAddTodo} className="mt-4 w-36 text-sm border border-buttonborder text-blue-100 font-semibold rounded px-4 py-1 transition-all duration-300 ease-in-out">
                    Añadir tarea
                </button>
                <button onClick={handleClearTodos} className="mt-4 w-36 text-sm border border-buttonborder text-blue-100 font-semibold rounded px-4 py-1 transition-all duration-300 ease-in-out">
                    Limpiar tareas
                </button>
            </div>
        </>
    );
};

export default AddTodo;
