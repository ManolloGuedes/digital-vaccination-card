import { MongoSchema } from './abstracts/mongo.schema.ts';
import { ObjectId } from '../config/mongo.db.ts';

export class VaccineRecordModel  extends MongoSchema {
  _id: ObjectId | undefined;
  vaccineId: ObjectId | undefined;
  date: Date | undefined;
  nextVaccineDate: Date | undefined;

  constructor({ id, vaccineId, date, nextVaccineDate }) {
    super();
    this._id = id ? ObjectId(id) : undefined;
    this.vaccineId = vaccineId ? ObjectId(vaccineId) : undefined;
    this.date = date ? new Date(date) : undefined;
    this.nextVaccineDate = nextVaccineDate ? new Date(nextVaccineDate) : undefined;
  }

  validate(): Boolean {
    if(super.validate()) {
      return !!this.vaccineId &&
      (!this.date || this.date.getTime() < new Date().getTime()) &&
      (!this.nextVaccineDate || this.nextVaccineDate.getTime() > new Date().getTime());
    }
    return false;
  }
}