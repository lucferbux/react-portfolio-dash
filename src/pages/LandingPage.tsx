import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Layout } from '../components/layout/Layout';
// Switched from @phosphor-icons/react to lucide-react due to proxy export issue
import { User, Briefcase, LogIn as SignIn } from 'lucide-react';
import { LandingAnimation3D } from '../components/elements/LandingAnimation3D';

export function LandingPage() {
  const { t } = useTranslation();
  // 3D animation handled by LandingAnimation3D

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Hero Animation */}
            <div className="mb-8">
              <LandingAnimation3D size={240} padding={20} label={t('landing.title') || 'Landing animation'} />
            </div>

            {/* Hero Content */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                {t('landing.title')}
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
                {t('landing.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="flex items-center gap-2 min-w-[160px]">
                  <User size={20} />
                  {t('landing.aboutButton')}
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 min-w-[160px]"
                >
                  <Briefcase size={20} />
                  {t('landing.projectsButton')}
                </Button>
              </Link>
              
              <Link to="/login">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2 min-w-[160px]"
                >
                  <SignIn size={20} />
                  {t('landing.loginButton')}
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <User size={32} className="mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{t('dashboard.aboutMe')}</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about my background, skills, and experience
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Briefcase size={32} className="mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{t('dashboard.projects')}</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore my latest projects and technical work
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <SignIn size={32} className="mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{t('nav.login')}</h3>
                  <p className="text-sm text-muted-foreground">
                    Access admin features and portfolio management
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}