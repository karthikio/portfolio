import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import Articles from './components/Articles';
import Admin from './components/Admin';
import './styles/App.css'; 
import Footer from './components/Footer';
import ArticleDetail from './components/ArticleDetail';
import PageNotFound from './components/PageNotFound';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/articles/:id" element={<ArticleDetail/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;