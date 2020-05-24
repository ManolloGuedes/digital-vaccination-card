import { Controller, Get, Param, Post, Body, Put } from 'https://deno.land/x/alosaur/src/mod.ts';
import { VaccineModel } from '../../models/vaccine.model.ts';
import { VaccineService } from '../../services/vaccine.service.ts';

@Controller('/vaccine')
export class VaccineController {

  constructor(private service: VaccineService){}

  @Get('/')
  public async getVaccines() {
    return this.service.getVaccines();
  }

  @Get('/:id')
  public async getVaccine(@Param('id') id: string) {
    return this.service.getVaccine(id);
  }

  @Post('/')
  public async createVaccine(@Body() body) {
    let vaccine = new VaccineModel(body);
    
    return this.service.createVaccine(vaccine);
  }

  @Put('/:id')
  public async updateVaccine(@Body() body, @Param('id') id: string) {
    let vaccine = new VaccineModel({...body, id});
    
    let vaccineResult: VaccineModel | {} = await this.service.updateVaccineAndGetResult(vaccine);

    if(vaccineResult) {
      return vaccineResult;
    }
    return {result: 'error', msg: `There is no recorded vaccine to id: ${id}`}
  }
}