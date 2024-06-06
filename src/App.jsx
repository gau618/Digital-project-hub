import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Landingpage from './pages/page1/Landingpage'
import Taskdetailpage from './pages/page2/Taskdetailpage'
import YourTaskpage from './pages/page3/YourTaskpage'
import Header from './header/header'
import Footer from './Footer/Footer'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css'
function App() {
    useEffect(() => {
          AOS.init({
            duration: 800,
          });
        }, []);    
 return<>
 <BrowserRouter>
 <Header></Header>
 <Routes>
  <Route path='/' element={<Landingpage/>}></Route>
  <Route path='/ADDTASK'element={<Taskdetailpage/>}></Route>
  <Route path='/YOURTASKS'element={<YourTaskpage/>}></Route>
 </Routes>
 <Routes>
 <Route path='/' element={<Footer></Footer>}></Route>
 </Routes>
 </BrowserRouter>
 </>
}

export default App;
