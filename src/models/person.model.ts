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
    this.birthday = new Date(birthday);
    this.email = email;
    this.vaccines = vaccines;
  }

  validate(): Boolean {
    if(super.validate()) {
      return this.name?.length > 0 &&
      this.birthday?.getTime() < new Date().getTime() &&
      (!this.email || isEmail(this.email)) &&
      (!this.vaccines || this.vaccines.every((vaccine: VaccineRecordModel) => {
        return vaccine.validate();
      }));
    }
    return false;
  }

  getAcceptableStructure() {
    return {
      name: {
        required: true,
        type: 'string'
      },
      birthday: {
        required: true,
        type: 'date (mm/dd/yyyy)',
        rules: 'Should not be greater than actual date'
      },
      email: {
        required: false,
        type: 'string',
        rule: 'Needs to be a valid email'
      },
      vaccines: {
        required: false
      }
    }
  }
}