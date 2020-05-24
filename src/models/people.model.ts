import { VaccineRecordModel } from './vaccine-record.model.ts';

export class PeopleModel {
  _id: string;
  name: string;
  birthday: Date;
  email?: string;
  vaccines: Array<VaccineRecordModel>;
}