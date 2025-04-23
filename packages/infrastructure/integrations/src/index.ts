import { Client as RetracedClient } from '@retracedhq/retraced';

// Audit log service interface
export interface AuditLogService {
  log(options: {
    action: string;
    group: string;
    actor: {
      id: string;
      name?: string;
    };
    target?: {
      id: string;
      name?: string;
      type: string;
    };
    description?: string;
    isAnonymous?: boolean;
    fields?: Record<string, any>;
  }): Promise<void>;
}

// Retraced audit log service implementation
export class RetracedAuditLogService implements AuditLogService {
  private client: RetracedClient;

  constructor(
    options: {
      endpoint: string;
      projectId: string;
      apiKey: string;
    }
  ) {
    this.client = new RetracedClient({
      endpoint: options.endpoint,
      projectId: options.projectId,
      apiKey: options.apiKey,
    });
  }

  async log(options: {
    action: string;
    group: string;
    actor: {
      id: string;
      name?: string;
    };
    target?: {
      id: string;
      name?: string;
      type: string;
    };
    description?: string;
    isAnonymous?: boolean;
    fields?: Record<string, any>;
  }): Promise<void> {
    const targetObject = options.target
      ? {
          id: options.target.id,
          name: options.target.name || options.target.id,
          type: options.target.type,
        }
      : undefined;

    try {
      await this.client.reportEvent({
        action: options.action,
        group: {
          id: options.group,
          name: options.group,
        },
        created: new Date(),
        actor: {
          id: options.actor.id,
          name: options.actor.name || options.actor.id,
        },
        target: targetObject,
        description: options.description,
        is_anonymous: options.isAnonymous || false,
        fields: options.fields,
      });
    } catch (error) {
      console.error('Error reporting event to Retraced:', error);
    }
  }
}

// Mock audit log service implementation for testing
export class MockAuditLogService implements AuditLogService {
  private logs: any[] = [];

  async log(options: {
    action: string;
    group: string;
    actor: {
      id: string;
      name?: string;
    };
    target?: {
      id: string;
      name?: string;
      type: string;
    };
    description?: string;
    isAnonymous?: boolean;
    fields?: Record<string, any>;
  }): Promise<void> {
    this.logs.push({
      ...options,
      timestamp: new Date(),
    });

    console.log('Audit log:', options);
  }

  getLogs(): any[] {
    return this.logs;
  }
}

// Factory function to create an audit log service
export function createAuditLogService(
  type: 'retraced' | 'mock' = 'mock',
  options?: {
    endpoint?: string;
    projectId?: string;
    apiKey?: string;
  }
): AuditLogService {
  if (
    type === 'retraced' &&
    options?.endpoint &&
    options?.projectId &&
    options?.apiKey
  ) {
    return new RetracedAuditLogService({
      endpoint: options.endpoint,
      projectId: options.projectId,
      apiKey: options.apiKey,
    });
  }

  return new MockAuditLogService();
}