import './App.css';
import NavBar from './components/NavBar';
import Cnds from './components/Cnds';
import Folha from './components/Folha';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Test from './components/Test';

function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <div className="App">
          <Routes> 
            <Route exact path='/folha' element={<Folha/>}/>
            <Route exact path='/' element={<Cnds/>}/>
            <Route exact path='/teste' element={<Test/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
