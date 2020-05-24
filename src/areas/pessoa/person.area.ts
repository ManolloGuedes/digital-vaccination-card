import { Area } from 'https://deno.land/x/alosaur/src/mod.ts';
import { PersonController } from "./person.controller.ts";

@Area({
  controllers: [PersonController]
})
export class PersonArea {}