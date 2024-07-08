import React, { useCallback } from 'react';

import HomePages from "./pages/HomePages"
import {Routes, Route} from "react-router-dom" 
import "./App.css"
import { LoginPages } from './pages/LoginPages';
import { RegisterPages } from 'pages/RegisterPages';

  


function App() {


 
 
        return (
            <Routes>
              <Route path='/' element={ <HomePages/>} />
              <Route path='/register' element={ <RegisterPages/>} />
              <Route path='/login' element={ <LoginPages/>} />
            </Routes>
        )
  
}

export default App;


