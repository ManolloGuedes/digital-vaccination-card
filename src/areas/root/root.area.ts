import { Area } from 'https://deno.land/x/alosaur/src/mod.ts';
import { RootController } from "./root.controller.ts";

@Area({
  controllers: [RootController]
})
export class RootArea {}