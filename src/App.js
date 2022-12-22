import logo from './logo.svg';
import './App.css';
import UniversityTable from './universitiesTable.js';
import Search from './searchPrograms.js';
import TagSearch from './searchProgramsByTag.js';

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

        <UniversityTable/>
        <div><br/><br/><br/></div>

        <Search/>
        <div><br/><br/><br/></div>
        <div><br/><br/><br/></div>

        <TagSearch/>
        <div><br/><br/><br/></div>
        <div><br/><br/><br/></div>
      </header>
    </div>
  );
}

export default App;
