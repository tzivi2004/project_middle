import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom"
import Home from './commponents/Home'
import User from './commponents/User'
import Post from './commponents/Post';
import Todo from './commponents/Todo';

function App() {
  return ( <>
  
  <Router>
    <Home></Home>
    <Routes>
      <Route path='/' element={<h1>wellcome!!!</h1>}></Route>
      <Route path='/user' element={<User/>}></Route>
      <Route path='/post' element={<Post/>}></Route>
      <Route path='/todo' element={<Todo/>}></Route>
    </Routes>
  </Router></>
  );
}

export default App;
