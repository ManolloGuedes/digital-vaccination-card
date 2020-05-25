import { MongoSchema } from './abstracts/mongo.schema.ts';

export class VaccineModel extends MongoSchema {
  _id: string;
  name: string;

  constructor({id, name}) {
    super();
    this._id = id;
    this.name = name;
  }

  validate(): Boolean {
    if(super.validate()) {
      return this.name?.length > 0
    }
    return false;
  }

  getAcceptableStructure() {
    return {
      name: {
        required: true,
        type: 'string'
      }
    }
  }
}