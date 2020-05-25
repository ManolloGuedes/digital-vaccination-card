import { MongoSchema } from './abstracts/mongo.schema.ts';

export class VaccineRecordModel  extends MongoSchema {
  _id: string;
  vaccineId: string;
  date: Date;
  nextVaccineDate: Date;

  constructor({ id, vaccineId, date, nextVaccineDate }) {
    super();
    this._id = id;
    this.vaccineId = id;
    this.date = date;
    this.nextVaccineDate = date;
  }

  validate(): Boolean {
    if(super.validate()) {
      return this.vaccineId?.length > 0 &&
      this.date?.getTime() < new Date().getTime() &&
      (!this.date || this.date.getTime() > new Date().getTime());
    }
    return false;
  }
}