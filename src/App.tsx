import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/home/Hero';
import { FeaturedCategories } from './components/home/FeaturedCategories';
import { FeaturedArticles } from './components/home/FeaturedArticles';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Hero />
          <FeaturedCategories />
          <FeaturedArticles />
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;