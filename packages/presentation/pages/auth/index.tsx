import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="w-full border rounded p-2" />
          </div>
          <Button className="w-full">Sign In</Button>
        </form>
      </Card>
    </div>
  );
}