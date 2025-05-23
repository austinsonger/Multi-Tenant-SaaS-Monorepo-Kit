// Export application services
export const packageName = "@monorepo/services";

// Service interface
export interface Service<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// Base service implementation
export abstract class BaseService<T extends { id: string }> implements Service<T> {
  protected items: T[] = [];

  async getAll(): Promise<T[]> {
    return this.items;
  }

  async getById(id: string): Promise<T> {
    const item = this.items.find(item => item.id === id);
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    return item;
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const id = Math.random().toString(36).substring(2, 9);
    const newItem = { ...data, id } as T;
    this.items.push(newItem);
    return newItem;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
    this.items[index] = { ...this.items[index], ...data };
    return this.items[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
    this.items.splice(index, 1);
    return true;
  }
}

// Package version
export const version = '0.1.0';
export * from './auth';
export * from './billing';
export * from './notifications';
export * from './settings';
export * from './teams';
