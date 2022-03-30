import { useState, useEffect } from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Home from './components/Home'
import Faq from './components/Faq'

function App() {
  const [apiData, setApiData] = useState({});
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    fetch('https://api.github.com/users/' + searchTerm)
    .then(response => response.json())
    .then((data) => { setApiData(data);}
    );
  }, [searchTerm]);

  return (
    <Router>
      <div className>
        <ul>
          <li>
            <a href="/faq">Faq</a>
          </li>
          <li>
            <a href="/home">Home</a>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/faq"  element={<Faq />} />
        <Route path="/home" element={<Home apiData={apiData} getSearchTerm={(st) => setSearchTerm(st)} searchTerm={searchTerm} />} />
      </Routes>
    </Router>
  );
}

export default App;