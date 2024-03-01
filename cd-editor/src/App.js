import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js'
import Editor from './pages/EditorPage.js'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div>
      <Toaster position="top-right" />
      </div>
    {/* //BrowserRouter will help us to wrap the entire website in it */}
    <BrowserRouter>
    {/* routes will have the list of the route  */}
      <Routes>
        <Route path='/' element={<Home/>}></Route> {/*element will contain the path*/}
        <Route path='/editor/:roomId' element={<Editor/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
