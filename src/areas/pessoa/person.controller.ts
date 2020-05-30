import { Controller, Get, Param, Post, Body, Put, Delete } from 'https://deno.land/x/alosaur/src/mod.ts';
import { PersonService } from '../../services/person.service.ts';
import { PersonModel } from '../../models/person.model.ts';
import { ControllerAbstract } from '../abstract/controller.ts';
import { VaccineRecordModel } from '../../models/vaccine-record.model.ts';
import { GenericError } from '../../../utils/validate.utils.ts';

@Controller('/person')
export class PersonController extends ControllerAbstract {

  constructor(private service: PersonService){
    super();
  };

  @Get('/')
  public async getPeople() {
    return this.mountReturn(await this.service.getPeople());
  }

  @Get('/:id')
  public async getPerson(@Param('id') id: string) {
    return this.mountReturn(await this.service.getPerson(id));
  }

  @Post('/')
  public async createPerson(@Body() body) {
    let person = new PersonModel(body);
    try {
      return this.mountReturn(await this.service.createPerson(person), 201);
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
        return this.mountReturn(personResult, 200);
      }
      return this.mountReturn({msg: `There is no recorded person to id: ${id}`}, 401);
    } catch (error) {
      return this.handleError(error, person);
    }
  }

  @Delete('/:id')
  public async deletePerson(@Param('id') personId) {
    try {
      let removed = await this.service.removePerson(personId);
      if(removed) {
        return this.mountReturn('success', 204);
      } else {
        return this.handleError(new GenericError('It was not possible to do the remotion, please contact the support.'));
      }
    } catch (error) {
      console.log(error)
      return this.handleError(error);
    }
  }

  @Get('/:id/vaccine')
  public async getVaccines(@Param('id') personId: string) {
    try {
      return this.mountReturn(await this.service.getVaccinesFromPerson(personId));
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Post('/:id/vaccine')
  public async insertVaccine(@Body() body, @Param('id') personId: string) {
    let vaccineRecord = new VaccineRecordModel(body);

    try {
      return this.mountReturn(await this.service.insertVaccine(vaccineRecord, personId), 201);
    } catch (error) {
      return this.handleError(error, vaccineRecord);
    }
  }

  @Delete('/:id/vaccine')
  public async removeVaccine(@Body() { idVaccine, idRecord }, @Param('id') personId: string) {
    try {
      let removed = await this.service.removeVaccine(idVaccine, idRecord, personId);
      if(removed) {
        return this.mountReturn('success', 204);
      } else {
        return this.handleError(new GenericError('It was not possible to do the remotion, please contact the support.'));
      }
    } catch (error) {
      console.log(error)
      return this.handleError(error);
    }
  }
}