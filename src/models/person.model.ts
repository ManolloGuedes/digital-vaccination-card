import { VaccineRecordModel } from './vaccine-record.model.ts';
import { MongoSchema } from './abstracts/mongo.schema.ts';

export class PersonModel extends MongoSchema {
  _id: string;
  name: string;
  birthday: Date;
  email?: string;
  vaccines: Array<VaccineRecordModel>;

  constructor({id, name, birthday, email, vaccines}) {
    super();
    this._id = id;
    this.name = name;
    this.birthday = birthday;
    this.email = email;
    this.vaccines = vaccines;
  }
}