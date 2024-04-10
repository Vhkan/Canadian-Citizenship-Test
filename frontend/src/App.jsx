import './App.css';
import TopNavBar from './components/TopNavBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Test from './components/Test';
import Prepare from './components/Prepare';
import About from './components/About';
import MainPage from './components/MainPage';
// import NavigateTest from './components/NavigateTest';
// import StudyGuide from './components/StudyGuide';



function App() {

  return (
    <Router> {/* Wrap your routing-related components in BrowserRouter */}
      <div>
        <TopNavBar />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/prepare" element={<Prepare/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
