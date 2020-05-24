import { AppSettings } from 'https://deno.land/x/alosaur/src/mod.ts';
import { RootArea } from './areas/root/root.area.ts';
import { PersonArea } from './areas/pessoa/person.area.ts';
import { VaccineArea } from './areas/vaccine/vaccine.area.ts';

export const settings: AppSettings = {
  areas: [RootArea, PersonArea, VaccineArea],
};