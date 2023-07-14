import './App.css';
import AddTodo from './components/AddTodo';
import MostRecent from './components/MostRecent';
import Separator from './components/Separator';

function App() {

    return (
        <div className="App font-poppins w-full md:max-w-screen-xl h-full md:h-screen p-12">
            <h1 className="text-2xl text-center text-primarytext font-semibold mb-8">TodoTS + Redux</h1>
            <AddTodo />
            <Separator />
            <MostRecent />
        </div>
    );
}

export default App;
