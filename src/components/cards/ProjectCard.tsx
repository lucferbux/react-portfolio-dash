import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import type { Project } from '../../model/types';
import { GithubLogo, Globe } from '@phosphor-icons/react';

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          {project.featured && (
            <Badge variant="secondary" className="ml-2">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex space-x-2 pt-4">
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <GithubLogo size={16} />
                {t('projects.viewCode')}
              </a>
            </Button>
          )}
          
          {project.liveUrl && (
            <Button
              variant="default"
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Globe size={16} />
                {t('projects.viewLive')}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}