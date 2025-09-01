import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/layout/Layout';
import { AboutMeCard } from '../components/cards/AboutMeCard';
import { ProjectCard } from '../components/cards/ProjectCard';
import { LoadingSpinner } from '../components/elements/LoadingSpinner';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useFetchData } from '../hooks/useFetchData';
import { useProject } from '../context/ProjectContext';
import { api } from '../api/mockData';
import { Briefcase, User } from '@phosphor-icons/react';

export function DashboardPage() {
  const { t } = useTranslation();
  const { setSelectedProject } = useProject();

  const {
    data: aboutMe,
    loading: aboutLoading,
    error: aboutError,
    reload: reloadAbout,
  } = useFetchData(api.getAboutMe);

  const {
    data: featuredProjects,
    loading: projectsLoading,
    error: projectsError,
    reload: reloadProjects,
  } = useFetchData(api.getFeaturedProjects);

  const isLoading = aboutLoading || projectsLoading;
  const hasError = aboutError || projectsError;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center space-y-4">
            <LoadingSpinner size="lg" />
            <p className="text-muted-foreground">{t('common.loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (hasError) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <Alert variant="destructive">
              <AlertDescription>
                {aboutError || projectsError || t('common.error')}
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => {
                reloadAbout();
                reloadProjects();
              }}
            >
              {t('common.retry')}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.welcome')}, {aboutMe?.name}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* About Me Section */}
          <div className="lg:col-span-2">
            {aboutMe && <AboutMeCard aboutMe={aboutMe} />}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <User size={20} />
                {t('dashboard.stats')}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {t('dashboard.projects')}
                  </span>
                  <span className="font-semibold">
                    {featuredProjects?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {t('aboutMe.experience')}
                  </span>
                  <span className="font-semibold">
                    {aboutMe?.experience} years
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {t('aboutMe.skills')}
                  </span>
                  <span className="font-semibold">
                    {aboutMe?.skills.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Briefcase size={24} />
              {t('projects.featured')}
            </h2>
          </div>

          {featuredProjects && featuredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t('projects.noProjects')}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}