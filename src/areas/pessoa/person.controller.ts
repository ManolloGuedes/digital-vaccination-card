import { Controller, Get, Param, Post, Body, Put } from 'https://deno.land/x/alosaur/src/mod.ts';
import { PersonService } from '../../services/person.service.ts';
import { PersonModel } from '../../models/person.model.ts';
import { ValidationBodyException } from '../../../utils/validate.utils.ts';
import { ControllerAbstract } from '../abstract/controller.ts';
import { VaccineRecordModel } from '../../models/vaccine-record.model.ts';

@Controller('/person')
export class PersonController extends ControllerAbstract {

  constructor(private service: PersonService){
    super();
  };

  @Get('/:id')
  public async getPerson(@Param('id') id: string) {
    return await this.service.getPerson(id);
  }

  @Get('/')
  public async getPeople() {
    return await this.service.getPeople();
  }

  @Post('/')
  public async createPerson(@Body() body) {
    let person = new PersonModel(body);
    try {
      return await this.service.createPerson(person);
    } catch (error) {
      return this.handleError(error, person);
    }
  }


  @Put('/:id')
  public async updatePerson(@Body() body, @Param('id') id: string) {
    let person = new PersonModel({...body, id});

    try {
      let personResult: PersonModel | undefined = await this.service.updatePersonAndGetResult(person);

      if(personResult) {
        return personResult
      }
      return {result: 'error', msg: `There is no recorded person to id: ${id}`}
    } catch (error) {
      return this.handleError(error, person);
    }
  }

  @Post('/:id/vaccine')
  public async insertVaccine(@Body() body, @Param('id') personId: string) {
    let vaccineRecord = new VaccineRecordModel(body);

    try {
      return await this.service.insertVaccine(vaccineRecord, personId);
    } catch (error) {
      return this.handleError(error, vaccineRecord);
    }
  }

  @Get('/:id/vaccine')
  public async getVaccines(@Body() body, @Param('id') personId: string) {
    //TODO get vaccines got by person who has _id = id
  }
}