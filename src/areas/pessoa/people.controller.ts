import { Controller, Get, Param, Post, Body, Put } from 'https://deno.land/x/alosaur/src/mod.ts';
import { PeopleService } from '../../services/people.service.ts';
import { PeopleModel } from '../../models/people.model.ts';

@Controller('/people')
export class PeopleController {

  constructor(private service: PeopleService){};

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
    let person = new PeopleModel(body);
    return await this.service.createPerson(person);
  }

  @Put('/:id')
  public async updatePerson(@Body() body, @Param('id') id: string) {
    let person = new PeopleModel({...body, id});

    let personResult: PeopleModel | undefined = await this.service.updatePersonAndGetResult(person);

    if(personResult) {
      return personResult
    }
    return {result: 'error', msg: `There is no recorded person to id: ${id}`}
  }
}