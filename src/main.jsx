import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from "react-router-dom";
import Nav from './components/Nav.jsx';
import Home from './components/Home.jsx';
import App from './App.jsx';
import Profile from './components/Profile.jsx';
import Bibliography from './components/Bibliography.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Game" element={<App />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Bibliography" element={<Bibliography />} />
        </Routes>
        <Nav/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
