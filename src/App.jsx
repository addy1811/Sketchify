import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './format/Home';
import Jpeg from './format/Jpeg';
import Png from './format/Png';
import Eps from './format/eps';
import Gif from './format/Gif';
import Tiff from './format/Tiff';
import Psd from './format/Psd';
import Pdf from './format/Pdf';
import Ai from './format/Ai';
import Indd from './format/Indd';
import Raw from './format/Raw';
import Gallery from './components/Gallery';
import SignUp from './Loginup/SignUp';
import SignIn from './Loginup/SignIn';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/jpeg" element={<Jpeg />} />
          <Route path="/png" element={<Png />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/eps' element={<Eps />} />
          <Route path='/gif' element={<Gif />} />
          <Route path='/tiff' element={<Tiff />} />
          <Route path='/psd' element={<Psd />} />
          <Route path='/pdf' element={<Pdf />} />
          <Route path='/ai' element={<Ai />} />
          <Route path='/indd' element={<Indd />} />
          <Route path='/raw' element={<Raw />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
