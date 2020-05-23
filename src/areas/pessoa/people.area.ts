import { Area } from 'https://deno.land/x/alosaur/src/mod.ts';
import { PeopleController } from "./people.controller.ts";

@Area({
  controllers: [PeopleController]
})
export class PeopleArea {}