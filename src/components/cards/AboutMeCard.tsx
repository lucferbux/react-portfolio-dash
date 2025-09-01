import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User, Briefcase, MapPin, Envelope } from '@phosphor-icons/react';
import type { AboutMe } from '../../model/types';

interface AboutMeCardProps {
  aboutMe: AboutMe;
}

export function AboutMeCard({ aboutMe }: AboutMeCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User size={24} />
          {t('aboutMe.title')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{aboutMe.name}</h3>
            <p className="text-primary font-medium">{aboutMe.title}</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Briefcase size={16} />
              {aboutMe.experience} {t('aboutMe.experience')}
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {aboutMe.location}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">{t('aboutMe.bio')}</h4>
          <p className="text-muted-foreground leading-relaxed">
            {aboutMe.bio}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">{t('aboutMe.skills')}</h4>
          <div className="flex flex-wrap gap-2">
            {aboutMe.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a href={`mailto:${aboutMe.email}`}>
              <Envelope size={16} />
              {t('aboutMe.email')}
            </a>
          </Button>
          
          {aboutMe.linkedin && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <a href={aboutMe.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          )}
          
          {aboutMe.github && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <a href={aboutMe.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}