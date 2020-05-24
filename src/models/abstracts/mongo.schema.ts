export class MongoSchema {
  created_at: Date
  updated_at: Date

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}