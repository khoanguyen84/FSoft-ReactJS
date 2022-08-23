import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MenuLeft from './components/MenuLeft/MenuLeft';
import StudentList from './components/StudentList/StudentList';
import SearchTab from './components/SearchTab/SearchTab';

function App() {
  return (
    <div className="container border p-3 rounded-3">
        <div className='row'>
          <div className='col-3'>
              <MenuLeft/>
          </div>
          <div className='col-9 border border-success'>
              <Routes>
                  <Route path='/student/list' element={<StudentList/>}></Route>
                  <Route path='/student/search' element={<SearchTab/>}></Route>
              </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
