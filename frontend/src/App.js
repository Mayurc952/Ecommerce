import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Webfont from 'webfontloader';
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home";

function App() {

  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  },[])
  return (
   
    <Router>
   <Header />
   <Routes>
   <Route path="/" element={<Home />} />
   </Routes>

{/* <Route extact path="/" component={Home}/> */}
   <Footer/>
    </Router>
   
  );
}

export default App;
