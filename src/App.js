import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Usuario from './Usuario.js'
import Comprar from './Comprar'
import Home from './Home.js'
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <Router >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/usuarios' element={<Usuario />} />
          <Route path='/comprar' element={<Comprar />} />
        </Routes>
      </Router >
    </>
  );
}

export default App;
