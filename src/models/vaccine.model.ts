import { MongoSchema } from './abstracts/mongo.schema.ts';

export class VaccineModel extends MongoSchema {
  _id: string;
  name: string;

  constructor({id, name}) {
    super();
    this._id = id;
    this.name = name;
  }
}