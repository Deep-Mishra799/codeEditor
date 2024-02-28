import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js'
import Editor from './pages/EditorPage.js'

function App() {
  return (
    //BrowserRouter will help us to wrap the entire website in it
    <BrowserRouter>
    {/* routes will have the list of the route  */}
      <Routes>
        <Route path='/' element={<Home/>}></Route> {/*element will contain the path*/}
        <Route path='/editor/:roomId' element={<Editor/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
