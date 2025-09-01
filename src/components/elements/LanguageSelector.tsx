import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Globe } from '@phosphor-icons/react';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe size={16} />
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </Button>
  );
}