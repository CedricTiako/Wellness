import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Brain, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface CategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

const Category: React.FC<CategoryProps> = ({ title, description, icon, path, color }) => {
  return (
    <Link to={path}>
      <motion.div 
        className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-200"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </motion.div>
    </Link>
  );
};

export const FeaturedCategories: React.FC = () => {
  const { t } = useTranslation();
  
  const categories = [
    {
      title: t('categories.nutrition.title'),
      description: t('categories.nutrition.description'),
      icon: <Leaf size={24} className="text-white" />,
      path: '/blog?category=nutrition',
      color: 'bg-green-500',
    },
    {
      title: t('categories.physical.title'),
      description: t('categories.physical.description'),
      icon: <Heart size={24} className="text-white" />,
      path: '/blog?category=remedies',
      color: 'bg-red-500',
    },
    {
      title: t('categories.mental.title'),
      description: t('categories.mental.description'),
      icon: <Brain size={24} className="text-white" />,
      path: '/blog?category=wellness',
      color: 'bg-purple-500',
    },
    {
      title: t('categories.routines.title'),
      description: t('categories.routines.description'),
      icon: <Shield size={24} className="text-white" />,
      path: '/blog?category=prevention',
      color: 'bg-blue-500',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('categories.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('categories.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Category key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};