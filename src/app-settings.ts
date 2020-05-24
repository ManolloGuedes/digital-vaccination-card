import { AppSettings } from 'https://deno.land/x/alosaur/src/mod.ts';
import { RootArea } from './areas/root/root.area.ts';
import { PeopleArea } from './areas/pessoa/people.area.ts';
import { VaccineArea } from './areas/vaccine/vaccine.area.ts';

export const settings: AppSettings = {
  areas: [RootArea, PeopleArea, VaccineArea],
};