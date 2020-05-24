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
  public async createPerson(@Body() body: PeopleModel) {
    return await this.service.createPerson(body);
  }

  @Put('/:id')
  public async updatePerson(@Body() body: PeopleModel, @Param('id') id: string) {
    body._id = id;
    return await this.service.updatePerson(body);
  }
}