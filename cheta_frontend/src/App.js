import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './container/Home';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} exact />
        <Route path='/*' element={<Home />} exact />
      </Routes>
    </div>
  );
}

export default App;
