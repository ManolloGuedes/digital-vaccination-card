import { db, ObjectId } from '../config/mongo.db.ts';
import { Injectable } from 'https://deno.land/x/alosaur/src/mod.ts';
import { PersonModel } from '../models/person.model.ts';
import { ValidationBodyException } from "../../utils/validate.utils.ts";

@Injectable()
export class PersonService {
  constructor(private collection: any = db.collection('person')){
  }

  async getPeople(): Promise<Array<PersonModel>> {
    return await this.collection.find({})
  }

  async getPerson(id: string) {
    return await this.collection.findOne({ _id: ObjectId(id) });
  }

  async createPerson(person: PersonModel) {
    try {
      return await this.validateAndExecuteQuery(person, () => this.collection.insertOne(person))
    } catch (error) {
      throw error;
    }
  }

  private async updatePerson(person: PersonModel) {
    return await this.collection.updateOne({
      _id: ObjectId(person._id)
    }, { $set: {
        name: person.name,
        birthday: person.birthday,
        email: person.email,
        vaccines: person.vaccines
      }
    });
  }

  async updatePersonAndGetResult(person: PersonModel): Promise<PersonModel | undefined> {
    try {
      let result = await this.updatePerson(person);

      if(result.modifiedCount == 1) {
        return await this.getPerson(person._id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async validateAndExecuteQuery(person: PersonModel, query): Promise<Object> {
    if(person.validate()) {
      return query();
    } else {
      throw new ValidationBodyException();
    }
  }
}