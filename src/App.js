import logo from './logo.svg';
import './App.css';
import Example from './universitiesTable.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          UniDream
        </p>
        <p>
          Your assistance in Universities admission
        </p>

        <Example/>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
