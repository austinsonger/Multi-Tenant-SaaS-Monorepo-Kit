import React from 'react';
import { Card } from '@/components/ui/card';

export function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <div className="space-y-2">
            <p>Active Users: 150</p>
            <p>Total Teams: 25</p>
          </div>
        </Card>
      </div>
    </div>
  );
}