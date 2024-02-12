import logo from './logo.svg';
// import './App.css';
import Form from './components/Form';
import UserList from './components/UserList';
import Login from './components/Login';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user-list" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
