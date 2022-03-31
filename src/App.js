import './App.css';
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom' 
import Home from './components/Home'
import Team from './components/Team'
import Enterprise from './components/Enterprise'
import Faq from './components/Faq'
import User from './components/User'
import Search from './components/Search'

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Homepage</NavLink>
          </li>
          <li>
            <NavLink to="/team" className={({ isActive }) => (isActive ? 'active' : '')}>Team</NavLink>
          </li>
          <li>
            <NavLink to="/enterprise" className={({ isActive }) => (isActive ? 'active' : '')}>Enterprise</NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? 'active' : '')}>FAQ</NavLink>
          </li>
          <Search />
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;