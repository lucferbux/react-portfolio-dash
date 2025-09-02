import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Cog as Gear, Users, BarChart as ChartBar } from 'lucide-react';

export function AdminPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('admin.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('admin.subtitle')}
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Briefcase size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Page Views
                  </p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <ChartBar size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Messages
                  </p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <Users size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Skills
                  </p>
                  <p className="text-2xl font-bold">10</p>
                </div>
                <Gear size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase size={20} />
                {t('admin.projects')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Manage your portfolio projects, add new ones, or update existing projects.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Add New Project
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Edit Projects
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Project Analytics
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                {t('admin.users')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Manage user accounts and permissions for your portfolio.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  View Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  User Permissions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Activity Logs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear size={20} />
                {t('admin.settings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure portfolio settings, themes, and preferences.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Profile Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Theme Options
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  SEO Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Session</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">User</p>
                  <p className="font-semibold">{user?.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <p className="font-semibold capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Login</p>
                  <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}