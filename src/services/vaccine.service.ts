import { Injectable } from 'https://deno.land/x/alosaur/src/mod.ts';
import { db, Collection, ObjectId } from '../config/mongo.db.ts';
import { VaccineModel } from '../models/vaccine.model.ts';
import { ValidationBodyException } from '../../utils/validate.utils.ts';

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
    try {
      return await this.validateAndExecuteQuery(vaccine, () => this.collection.insertOne(vaccine))
    } catch (error) {
      throw error;
    }
  }

  private async updateVaccine(vaccine: VaccineModel) {
    return await this.collection.updateOne({
      _id: ObjectId(vaccine._id)
    }, { $set: {
        name: vaccine.name,
        updated_at: new Date()
      }
    });
  }

  async updateVaccineAndGetResult(vaccine: VaccineModel): Promise<VaccineModel | undefined> {
    try {
      let result = await this.validateAndExecuteQuery(vaccine, () => this.updateVaccine(vaccine));

      if(result['modifiedCount'] == 1) {
        return await this.getVaccine(vaccine._id);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async validateAndExecuteQuery(vaccine: VaccineModel, query): Promise<Object> {
    if(vaccine.validate()) {
      return query();
    } else {
      throw new ValidationBodyException();
    }
  }
}