import './App.css';
import TopNavBar from './components/TopNavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Test from './components/Test';

function App() {

  return (
    <Router> {/* Wrap your routing-related components in BrowserRouter */}
      <div>
        <TopNavBar />
        <div>
          <h2>Canadian Citizenship Test</h2>
        </div>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path='/test' element={<Test/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
