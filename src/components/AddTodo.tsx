import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../store/features/todos';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTodo = () => {
    const [isTaskFocused, setIsTaskFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [taskValue, setTaskValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const todos = useSelector((state: any) => state.todos.todos);
    const [selectedDate, setSelectedDate] = useState(new Date());

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
                    date: selectedDate.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' }),
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
    };

    const taskLabelStyle = `absolute text-primarytext left-3 top-1.5 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isTaskFocused || taskValue ? '-ml-2 px-2 transform -translate-y-4 text-sm text-primarytext' : 'text-slate-600'
    }`;

    const descriptionLabelStyle = `absolute text-primarytext left-3 top-1.5 transition-all duration-300 ease-in-out text-sm pointer-events-none ${
        isDescriptionFocused || descriptionValue ? '-ml-2 px-2 transform -translate-y-4 text-sm' : 'text-slate-600'
    }`;

    useEffect(() => {}, [selectedDate]);

    return (
        <>
            <h1 className="mb-4 font-medium">Añadir una tarea nueva</h1>
            <div className="container flex flex-col md:flex-row justify-between md:justify-between gap-8 md:gap-4 mb-4 md:mb-0">
                <div className="left_side flex flex-col justify-between shadow-xl w-full md:w-2/3 gap-8 md:gap-4 mb-4">
                    <div className="flex gap-4 items-center w-full">
                        <div className="flex w-full relative">
                            <input
                                type="text"
                                spellCheck="false"
                                onFocus={handleTaskFocus}
                                onBlur={handleTaskBlur}
                                onChange={handleTaskChange}
                                id="form-input-first-name"
                                className="bg-cards rounded-lg px-3 py-4 w-full text-sm text-slate-700 outline-none"
                            />
                            <label className={taskLabelStyle}>Tarea</label>
                        </div>
                        <DatePicker
                            portalId="root"
                            selected={selectedDate}
                            onChange={(date: Date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="flex justify-center items-center w-full md:w-96 bg-cards rounded-lg shadow-xl px-3 py-4 text-sm text-slate-500 outline-none"
                        />
                    </div>
                    <div className="flex relative">
                        <textarea
                            spellCheck="false"
                            onFocus={handleDescriptionFocus}
                            onBlur={handleDescriptionBlur}
                            onChange={handleDescriptionChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTodo();
                                }
                            }}
                            id="form-input-description"
                            className="bg-cards rounded-lg px-3 py-4 w-full text-sm text-slate-700 resize-none outline-none"
                        />
                        <label className={descriptionLabelStyle}>Descripción</label>
                        <button onClick={handleAddTodo} className="absolute bottom-0 right-1">
                            <span className="material-icons-round text-slate-700 hover:text-slate-600 transition-all duration-200 ease-in-out p-1">send</span>
                        </button>
                    </div>
                </div>
                <div className="right_side w-full md:w-1/3">
                    <div className="flex flex-col gap-4 w-full bg-cards shadow-xl rounded-lg py-4 px-6">
                        <div className="flex flex-col items-start truncate">
                            <span className="text-base font-medium w-full truncate">{taskValue == '' ? 'Titulo de la tarea.' : taskValue}</span>
                            <span className="text-sm w-full truncate">{descriptionValue == '' ? 'Descripción de la tarea.' : descriptionValue}</span>
                            <span className="text-sm w-full truncate">
                                {taskValue === '' && descriptionValue === '' && selectedDate === new Date()
                                    ? new Date(0).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })
                                    : selectedDate.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="left_side flex justify-between">
                            <span className="text-xs border border-buttonborder text-blue-100 font-semibold py-1 px-2 rounded cursor-pointer truncate">Pendiente</span>
                            <span className="text-xs self-end text-blue-100 font-semibold">Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTodo;
