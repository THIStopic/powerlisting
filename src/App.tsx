import './App.css';
import AddTodo from './components/AddTodo';
import ListTodo from './components/ListTodo';

function App() {

    return (
        <div className="App font-poppins bg-slate-100 h-screen p-12">
            <h1 className="text-2xl text-center text-slate-700 font-semibold mb-8">Vite + React</h1>
            <AddTodo />
            <ListTodo />
        </div>
    );
}

export default App;
