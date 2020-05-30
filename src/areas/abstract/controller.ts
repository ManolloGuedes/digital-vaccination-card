import { Validable } from "../../models/interfaces/validable.ts";
import { ValidationBodyException } from "../../../utils/validate.utils.ts";
import { Content } from 'https://deno.land/x/alosaur/src/mod.ts';

export class ControllerAbstract {
  protected handleBodyValidationError(element: Validable, error: Error): Object {
    let response: Object;

    if(error instanceof ValidationBodyException) {
      response = {
        message: error.message,
        valid_structure: element.getAcceptableStructure()
      }
    } else {
      response = {
        message: 'Sorry, there is something wrong. Please, try again.'
      }
    }
    return this.mountReturn(response, 500);
  }

  protected handleError(error: any, element?: Validable) {
    let response: Object;

    if (error instanceof ValidationBodyException && element) {
      response = this.handleBodyValidationError(element, error);
    }
    else {
      response = {
        message: error.message
      };
    }

    return this.mountReturn(response, 500);
  }

  protected mountReturn(result: Object, status: number = 202) {
    return Content({result: result}, status);
  }
}