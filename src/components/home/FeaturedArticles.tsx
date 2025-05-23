import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { formatDate, calculateReadingTime } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

const articles = [
  {
    id: '1',
    title: 'Les bienfaits du Moringa : le super-aliment africain',
    excerpt: 'Découvrez pourquoi le Moringa est considéré comme un trésor nutritionnel et comment l\'intégrer dans votre alimentation quotidienne.',
    coverImage: 'https://images.pexels.com/photos/4750260/pexels-photo-4750260.jpeg',
    category: 'nutrition',
    author: 'Dr. Fatou Diallo',
    authorImage: 'https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg',
    publishedAt: '2024-02-15',
    readingTime: 8,
  },
  {
    id: '2',
    title: 'Guide des plantes médicinales essentielles',
    excerpt: 'Un guide complet des plantes médicinales traditionnelles africaines et leurs utilisations pour différents maux.',
    coverImage: 'https://images.pexels.com/photos/6942376/pexels-photo-6942376.jpeg',
    category: 'remedies',
    author: 'Pr. Amadou Sy',
    authorImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    publishedAt: '2024-02-10',
    readingTime: 12,
  },
  {
    id: '3',
    title: 'Prévention du paludisme : méthodes naturelles',
    excerpt: 'Des solutions naturelles et efficaces pour se protéger du paludisme, combinant sagesse traditionnelle et conseils modernes.',
    coverImage: 'https://images.pexels.com/photos/8460373/pexels-photo-8460373.jpeg',
    category: 'prevention',
    author: 'Dr. Aisha Koné',
    authorImage: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg',
    publishedAt: '2024-02-05',
    readingTime: 10,
  }
];

export const FeaturedArticles: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {isEnglish ? 'Latest Health Articles' : 'Derniers Articles Santé'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isEnglish 
                ? 'Expert advice and traditional wisdom for your well-being' 
                : 'Conseils d\'experts et sagesse traditionnelle pour votre bien-être'}
            </p>
          </div>
          <Link 
            to="/blog" 
            className="text-primary-500 hover:text-primary-600 font-medium hidden md:block"
          >
            {isEnglish ? 'View all articles' : 'Voir tous les articles'} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/blog/${article.id}`}>
                <Card hoverable className="h-full">
                  <div className="aspect-[16/9] relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-sm font-medium bg-white dark:bg-gray-900 text-primary-500 rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="line-clamp-2 hover:text-primary-500 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={article.authorImage}
                          alt={article.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {article.author}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(article.publishedAt)}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {article.readingTime} min
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/blog" 
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            {isEnglish ? 'View all articles' : 'Voir tous les articles'} →
          </Link>
        </div>
      </div>
    </section>
  );
};