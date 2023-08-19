import './styles/App.css';
import TodoPage from './components/pages/TodoPage';

function App() {

    return (
        <div className="App font-poppins w-full md:max-w-screen-xl h-full md:h-screen p-12">
            <h1 className="text-3xl text-center text-primarytext font-handlee font-semibold mb-8">PowerListing</h1>
            <TodoPage />
        </div>
    );
}

export default App;
