import { Controller, Get } from 'https://deno.land/x/alosaur/src/mod.ts';

@Controller()
export class RootController {
  @Get()
  public async getRoot() {
    return {msg: 'Hello'};
  }
}
