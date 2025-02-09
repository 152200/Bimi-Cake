import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Customize from './routes/Customize';
import Shape from './routes/customize/Shape';
import Flavor from './routes/customize/Flavor';
import Color from './routes/customize/Color';
import Toppings from './routes/customize/Toppings'
import Write from './routes/customize/Write';
import Collection from './routes/Collection';
import Cart from './routes/Cart';
import Favorites from './routes/Favorites';
import { LoginForm } from './routes/LoginForm';
import { SignupForm } from './routes/SignupForm';
import AddNewCake from './routes/admin/AddNewCake';
import ManageOrders from './routes/admin/ManageOrders';

function App() {
  return (
    <Router basename='/Bimi-Cake'>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:collectionName" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/admin/add-new-cake" element={<AddNewCake />}/>
          <Route path="/admin/manage-orders" element={<ManageOrders />}/>
          <Route path="/customize" element={<Customize />}>
            <Route index element={<Navigate to="shape" replace />} />
            <Route path="shape" element={<Shape />} />
            <Route path="flavor" element={<Flavor />} />
            <Route path="color" element={<Color />} />
            <Route path="toppings" element={<Toppings />} />
            <Route path="write" element={<Write />} />
          </Route>
        </Routes>
        <Toaster 
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
            error: {
              duration: 3000,
              theme: {
                primary: '#ff4b4b',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;