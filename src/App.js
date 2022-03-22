import './App.css';
import NavBar from './components/NavBar';
import Cnds from './components/Cnds';
import Folha from './components/Folha';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <div className="App">
          <Routes> 
            <Route exact path='/folha' element={<Folha/>}/>
            <Route exact path='/' element={<Cnds/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
