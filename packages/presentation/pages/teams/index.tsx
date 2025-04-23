import React from 'react';
import { Card } from '@/components/ui/card';

export function TeamsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Team Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Current Team</h2>
          <div className="space-y-2">
            <p>Team Name: Development Team</p>
            <p>Members: 5</p>
          </div>
        </Card>
      </div>
    </div>
  );
}