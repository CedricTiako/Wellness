import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navItems = [
    { name: t('navigation.home'), path: '/' },
    { name: t('navigation.blog'), path: '/blog' },
    { name: t('navigation.shop'), path: '/shop' },
    { name: t('navigation.about'), path: '/about' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-primary-500 dark:text-primary-400">Wellness</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                  location.pathname === item.path
                    ? 'text-primary-500'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="rounded-full p-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle language"
            >
              <Globe size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="rounded-full p-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <Link to="/dashboard">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    icon={<User size={16} />}
                  >
                    {user?.first_name || t('navigation.dashboard')}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">{t('navigation.login')}</Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="primary" size="sm">{t('navigation.signup')}</Button>
                </Link>
              </div>
            )}

            <button
              onClick={toggleMenu}
              className="md:hidden rounded-md p-1.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden py-4 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-500'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {!isAuthenticated ? (
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">{t('navigation.login')}</Button>
                </Link>
                <Link to="/auth/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full">{t('navigation.signup')}</Button>
                </Link>
              </div>
            ) : (
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">{t('navigation.dashboard')}</Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  {t('navigation.logout')}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
};