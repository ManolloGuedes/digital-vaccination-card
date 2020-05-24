import { db, ObjectId } from '../config/mongo.db.ts';
import { Injectable } from 'https://deno.land/x/alosaur/src/mod.ts';
import { PeopleModel } from '../models/people.model.ts';

@Injectable()
export class PeopleService {
  constructor(private collection: any = db.collection('people')){
  }

  async getPeople(): Promise<Array<PeopleModel>> {
    return await this.collection.find({})
  }

  async getPerson(id: string) {
    return await this.collection.findOne({ _id: ObjectId(id) });
  }

  async createPerson(person: PeopleModel) {
    return await this.collection.insertOne(person);
  }

  async updatePerson(person: PeopleModel) {
    return await this.collection.updateOne({
      _id: ObjectId(person._id)
    }, {
      name: person.name,
      birthday: person.birthday,
      email: person.email,
      vaccines: person.vaccines
    });
  }
}