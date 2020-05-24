import { Area } from 'https://deno.land/x/alosaur/src/mod.ts';
import { VaccineController } from './vaccine.controller.ts';

@Area({
  controllers:[VaccineController]
})
export class VaccineArea {}