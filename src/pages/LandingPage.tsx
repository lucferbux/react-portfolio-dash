import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Layout } from '../components/layout/Layout';
import { User, Briefcase, SignIn } from '@phosphor-icons/react';

export function LandingPage() {
  const { t } = useTranslation();
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple CSS animation as placeholder for Lottie
    const element = animationRef.current;
    if (element) {
      element.style.animation = 'float 3s ease-in-out infinite';
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Hero Animation */}
            <div
              ref={animationRef}
              className="mx-auto w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-8"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Layout>
  );
}