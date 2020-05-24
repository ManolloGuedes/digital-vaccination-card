import { Injectable } from 'https://deno.land/x/alosaur/src/mod.ts';
import { db, Collection, ObjectId } from '../config/mongo.db.ts';
import { VaccineModel } from '../models/vaccine.model.ts';

@Injectable()
export class VaccineService {
  constructor(private collection: Collection = db.collection('vaccine')){}

  async getVaccines(): Promise<Array<VaccineModel>> {
    return await this.collection.find({});
  }

  async getVaccine(id: string):  Promise<VaccineModel> {
    return await this.collection.findOne({ _id: ObjectId(id) })
  }

  async createVaccine(vaccine: VaccineModel) {
    return await this.collection.insertOne(vaccine);
  }

  private async updateVaccine(vaccine: VaccineModel) {
    return await this.collection.updateOne({
      _id: ObjectId(vaccine._id)
    }, { $set: {
        name: vaccine.name,
      }
    });
  }

  async updateVaccineAndGetResult(vaccine: VaccineModel) {
   let result = await this.updateVaccine(vaccine);

    if(result.modifiedCount == 1) {
      return await this.getVaccine(vaccine._id);
    }

    return {}
  }
}