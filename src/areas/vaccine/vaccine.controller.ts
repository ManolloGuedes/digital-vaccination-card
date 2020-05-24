import { Controller, Get, Param, Post, Body, Put } from 'https://deno.land/x/alosaur/src/mod.ts';
import { VaccineModel } from '../../models/vaccine.model.ts';

@Controller('/vaccine')
export class VaccineController {
  @Get('/')
  public async getVaccines() {
    return {msg: 'vaccine route was created'}
    //TODO call service to get all recorded vaccines
  }

  @Get('/:id')
  public async getVaccine(@Param('id') id: string) {
    //TODO call service to get vaccine with id = id
  }

  @Post('/')
  public async createVaccine(@Body() body: VaccineModel) {
    //TODO call service to create a new vaccine using body
  }

  @Put('/:id')
  public async updateVaccine(@Body() body: VaccineModel, @Param('id') id: string) {
    //TODO call service to update a vacine
  }
}