//import logo from './logo.svg';
import './App.css';
import './components/readRepos';
import { Repos } from './components/readRepos';
import { Create} from './components/createRepo';

function App() {
  return (
    <div className="App">
      <Create/>
      <Repos/>
    </div>
  );
}

export default App;
