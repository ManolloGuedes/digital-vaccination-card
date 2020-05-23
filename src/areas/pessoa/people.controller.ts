import { Controller, Get, Param, Post, Body, Put } from 'https://deno.land/x/alosaur/src/mod.ts';

@Controller('/people')
export class PeopleController {
  @Get('/:id')
  public async getPerson(@Param('id') id: Number) {
    let json: Object;
    
    json = {
      id: 1,
      name: 'Letícia Queiroz Moreira'
    };
    return json;
  }

  @Get('/')
  public async getPeople() {
    let json: Array<Object>;

    json = [
      {
        id: 1,
        name: 'Letícia Queiroz Moreira'
      }, {
        id: 2,
        name: 'Manollo Guedes'
      }
    ];

    return json;
  }

  @Post('/')
  public async createPerson(@Body() body: any) {
    return body;
  }

  @Put('/:id')
  public async updatePerson(@Body() body: any, @Param('id') id: Number) {
    return {
      id,
      body
    }
  }
}