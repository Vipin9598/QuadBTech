
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Summary from './pages/Summary';

function App() {


  return (
    <div className=''>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route path='/details' element={<Summary/>}/>
      </Routes>

    </div>
  );
}

export default App;
