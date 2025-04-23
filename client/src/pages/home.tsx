import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderTreeIcon, GitBranchIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-800 flex items-center">
            <FolderTreeIcon className="h-6 w-6 text-primary mr-2" />
            Monorepo Setup Guide
          </h1>
          <Button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition">
            <GitBranchIcon className="h-4 w-4 mr-2" />
            Get Started
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Monorepo Setup Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-700 mb-6">
              This guide walks you through setting up a production-ready
              monorepo structure for your project. The structure follows clean
              architecture principles with a focus on modularity, scalability,
              and maintainability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                <div className="text-primary text-xl mb-2">
                  <FolderTreeIcon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-1">
                  Modular Architecture
                </h3>
                <p className="text-sm text-neutral-600">
                  Clean separation of concerns with presentation, application,
                  domain, and infrastructure layers
                </p>
              </div>
              <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                <div className="text-primary text-xl mb-2">
                  <GitBranchIcon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-1">
                  Package Management
                </h3>
                <p className="text-sm text-neutral-600">
                  PNPM workspace configuration for efficient dependency
                  management
                </p>
              </div>
              <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                <div className="text-primary text-xl mb-2">
                  <GitBranchIcon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-1">
                  Developer Experience
                </h3>
                <p className="text-sm text-neutral-600">
                  Integrated TypeScript, ESLint, Prettier, and CI/CD workflows
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Directory Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The monorepo follows a structured organization that separates
                concerns into distinct packages. Each package has its own
                responsibility and can be developed and tested independently.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To get started with this monorepo template, clone the repository
                and install dependencies with PNPM. The setup includes all
                necessary configuration files for a smooth development
                experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-neutral-800 text-neutral-300 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-white mb-2">
                Monorepo Setup Guide
              </h2>
              <p className="text-sm"></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
