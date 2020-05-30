import { Controller, Get, Param, Post, Body, Put } from 'https://deno.land/x/alosaur/src/mod.ts';
import { VaccineModel } from '../../models/vaccine.model.ts';
import { VaccineService } from '../../services/vaccine.service.ts';
import { ControllerAbstract } from '../abstract/controller.ts';

@Controller('/vaccine')
export class VaccineController extends ControllerAbstract{

  constructor(private service: VaccineService){
    super();
  }

  @Get('/')
  public async getVaccines() {
    return this.mountReturn(await this.service.getVaccines());
  }

  @Get('/:id')
  public async getVaccine(@Param('id') id: string) {
    return this.mountReturn(await this.service.getVaccine(id));
  }

  @Post('/')
  public async createVaccine(@Body() body) {
    let vaccine = new VaccineModel(body);
    try {
      return this.mountReturn(await this.service.createVaccine(vaccine));
    } catch (error) {
      return this.handleError(error, vaccine);
    }
  }

  @Put('/:id')
  public async updateVaccine(@Body() body, @Param('id') id: string) {
    let vaccine = new VaccineModel({...body, id});
    
    try {
      let vaccineResult: VaccineModel = await this.service.updateVaccineAndGetResult(vaccine);

      if(vaccineResult) {
        return this.mountReturn(vaccineResult);
      }
      return this.mountReturn({msg: `There is no recorded vaccine to id: ${id}`}, 500)
    } catch (error) {
      return this.handleError(error, vaccine);
    }
  }
}