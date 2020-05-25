import { VaccineRecordModel } from './vaccine-record.model.ts';
import { MongoSchema } from './abstracts/mongo.schema.ts';
import { isEmail } from '../../utils/validate.utils.ts'

export class PersonModel extends MongoSchema {
  _id: string;
  name: string;
  birthday: Date;
  email?: string;
  vaccines?: Array<VaccineRecordModel>;

  constructor({id, name, birthday, email, vaccines}, validate = false) {
    super();
    this._id = id;
    this.name = name;
    this.birthday = birthday;
    this.email = email;
    this.vaccines = vaccines;
  }

  validate(): Boolean {
    if(super.validate()) {
      this.name?.length > 0 &&
      this.birthday?.getTime() > new Date().getTime() &&
      (!this.email || isEmail(this.email)) &&
      (!this.vaccines || this.vaccines.every((vaccine: VaccineRecordModel) => {
        return vaccine.validate();
      }));
    }
    return false;
  }
}