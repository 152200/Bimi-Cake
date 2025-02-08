import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Customize from './routes/Customize';
import Shape from './routes/customize/Shape';
import Flavor from './routes/customize/Flavor';
import Color from './routes/customize/Color';
import Toppings from './routes/customize/Toppings'
import Write from './routes/customize/Write';
import Collection from './routes/Collection';

function App() {
  return (
    <Router basename='/Bimi-Cake'>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:collectionName" element={<Collection />} />
          <Route path="/customize" element={<Customize />}>
            <Route index element={<Navigate to="shape" replace />} />
            <Route path="shape" element={<Shape />} />
            <Route path="flavor" element={<Flavor />} />
            <Route path="color" element={<Color />} />
            <Route path="toppings" element={<Toppings />} />
            <Route path="write" element={<Write />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;