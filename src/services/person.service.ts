import { db } from '../config/mongo.db.ts';
import { Injectable } from 'https://deno.land/x/alosaur/src/mod.ts';
import { PersonModel } from '../models/person.model.ts';
import { ValidationBodyException, DocumentDoesnotExist } from "../../utils/validate.utils.ts";
import { VaccineRecordModel } from '../models/vaccine-record.model.ts';
import { ObjectId } from 'https://deno.land/x/mongo@v0.7.0/mod.ts';

@Injectable()
export class PersonService {
  constructor(private collection: any = db.collection('person')){
  }

  async getPeople(): Promise<Array<PersonModel>> {
    return await this.collection.find({})
  }

  async getPerson(id: string): Promise<PersonModel> {
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
        vaccines: person.vaccines,
        updated_at: new Date()
      }
    });
  }

  async updatePersonAndGetResult(person: PersonModel): Promise<PersonModel | undefined> {
    try {
      let result = await this.validateAndExecuteQuery(person, () =>  this.updatePerson(person));

      if(result['modifiedCount'] == 1) {
        return await this.getPerson(person._id);
      }
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  private async validateAndExecuteQuery(person: PersonModel, query): Promise<Object> {
    if(person.validate()) {
      return query();
    } else {
      throw new ValidationBodyException();
    }
  }

  async insertVaccine(vaccineRecord: VaccineRecordModel, personId: string): Promise<PersonModel> {
    try {
      if(vaccineRecord.validate()) {
        let result = await this.collection.updateOne({
          _id: ObjectId(personId)
        }, {
          $push: {
            vaccines: vaccineRecord
          }
        });

        if(result['modifiedCount'] == 1) {
          return await this.getPerson(personId);
        } else {
          throw new DocumentDoesnotExist(personId);
        }
      } else {
        throw new ValidationBodyException();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeVaccine(idVaccine: string, idRecord: string, personId: string) {
    try {
      let result = await this.collection.updateOne({
        _id: ObjectId(personId)
      }, {
        $pull: {
          vaccines: {
            vaccineId: ObjectId(idVaccine)
          }
        }
      });

      if(result['matchedCount'] > 0) {
        return await this.getPerson(personId);
      } else {
        throw new DocumentDoesnotExist(personId);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}