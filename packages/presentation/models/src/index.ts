
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'inactive' | 'cancelled';
}
