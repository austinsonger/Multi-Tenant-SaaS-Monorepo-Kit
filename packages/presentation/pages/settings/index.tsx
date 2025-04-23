import React from 'react';
import { Card } from '@/components/ui/card';

export function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}