import './App.css';
import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom' 
import Home from './components/Home'
import Team from './components/Team'
import Enterprise from './components/Enterprise'
import Faq from './components/Faq'
import User from './components/User'
import Search from './components/Search'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Router>
      <div className="nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>Homepage</NavLink>
          </li>
          <li>
            <NavLink to="/team" className={({ isActive }) => (isActive ? 'active' : undefined)}>Team</NavLink>
          </li>
          <li>
            <NavLink to="/enterprise" className={({ isActive }) => (isActive ? 'active' : undefined)}>Enterprise</NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? 'active' : undefined)}>FAQ</NavLink>
          </li>
          <Search getSearchTerm={(st) => setSearchTerm(st)} />
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/user/:username" element={<User searchTerm={searchTerm} />} />
        <Route path="/user/" element={<User searchTerm={searchTerm} />} />
      </Routes>
    </Router>
  );
}

export default App;