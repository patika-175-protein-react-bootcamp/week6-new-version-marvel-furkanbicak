import './App.css';
import Header from './components/header/header';
import Main from './components/main/main'
import Pagination from './components/pagination/pagination'
import Search from './components/search/search';
import Details from './components/details/detail'

import { Routes, Route, Link } from "react-router-dom";


function App() {
  
  return (
    <div className="App">
     

      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/:id" element={<Details />} />
        
      </Routes>
     
  
    </div>
  );
}

export default App;
