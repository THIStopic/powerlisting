import './App.css';

import ListTodo from './components/ListTodo';

function App() {

    return (
        <div className="App font-poppins bg-slate-200 h-screen p-12">
            <h1 className="text-2xl text-center text-slate-700 font-semibold mb-8">Vite + React</h1>
            <ListTodo />
        </div>
    );
}

export default App;
