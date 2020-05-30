import { Validable } from "../../models/interfaces/validable.ts";
import { ValidationBodyException, DocumentDoesnotExist } from "../../../utils/exceptions.utils.ts";
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
    return this.mountReturn(response, 400);
  }

  protected handleError(error: any, element?: Validable) {
    let response: Object;
    let status = 500;

    if (error instanceof ValidationBodyException && element) {
      response = this.handleBodyValidationError(element, error);
      status = 400;
    } else if (error instanceof DocumentDoesnotExist) {
      response = {
        message: error.message
      }
      status = 404;
    } else {
      response = {
        message: error.message
      };
    }

    return this.mountReturn(response, status);
  }

  protected mountReturn(result: Object = 'success', status: number = 202) {
    return Content({result: result}, status);
  }
}