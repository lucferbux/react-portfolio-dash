import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { LanguageSelector } from '../elements/LanguageSelector';
import { House, User, Briefcase, SignOut, SignIn } from '@phosphor-icons/react';

export function Navigation() {
  const { t } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary">
              Portfolio
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <House size={20} />
                {t('nav.home')}
              </Link>
              
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <User size={20} />
                {t('nav.dashboard')}
              </Link>
              
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                >
                  <Briefcase size={20} />
                  {t('nav.admin')}
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {user?.username}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <SignOut size={16} />
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <SignIn size={16} />
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}