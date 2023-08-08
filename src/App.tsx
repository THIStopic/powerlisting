import './App.css';
import AddTodo from './components/todos/AddTodo';
import AllTasks from './components/todos/AllTasks';
import Separator from './components/common/Separator';

function App() {

    return (
        <div className="App font-poppins w-full md:max-w-screen-xl h-full md:h-screen p-12">
            <h1 className="text-2xl text-center text-primarytext font-semibold mb-8">PowerListing</h1>
            <AddTodo />
            <Separator />
            <AllTasks />
        </div>
    );
}

export default App;
