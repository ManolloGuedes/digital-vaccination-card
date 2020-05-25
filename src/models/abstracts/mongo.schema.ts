import { Validable } from '../interfaces/validable.ts';
export class MongoSchema implements Validable {
  created_at: Date
  updated_at: Date

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  validate(): Boolean {
    return (!this.created_at || this.created_at.getTime() < new Date().getTime())
    && (!this.updated_at || this.updated_at.getTime() < new Date().getTime());
  }
}