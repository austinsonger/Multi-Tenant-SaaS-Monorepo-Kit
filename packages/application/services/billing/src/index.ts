
export interface BillingInfo {
  customerId: string;
  plan: string;
  status: 'active' | 'inactive';
}

export class BillingService {
  async createSubscription(customerId: string, plan: string) {
    // Implementation
  }

  async cancelSubscription(customerId: string) {
    // Implementation
  }
}
