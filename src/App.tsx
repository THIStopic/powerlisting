import './App.css';
import AddTodo from './components/AddTodo';
import MostRecent from './components/MostRecent';
import CompletedTodos from './components/CompletedTodos';
import Separator from './components/Separator';

function App() {

    return (
        <div className="App font-poppins bg-slate-100 h-screen p-12">
            <h1 className="text-2xl text-center text-slate-700 font-semibold mb-8">Vite + React</h1>
            <AddTodo />
            <Separator />
            <MostRecent />
            <Separator />
            <CompletedTodos />
        </div>
    );
}

export default App;
