import { Validable } from "../../models/interfaces/validable.ts";
import { ValidationBodyException } from "../../../utils/validate.utils.ts";

export class ControllerAbstract {
  protected handleBodyValidationError(element: Validable, error: Error): Object {
    let response: Object;

    if(error instanceof ValidationBodyException) {
      response = {
        result: 'error',
        message: error.message,
        valid_structure: element.getAcceptableStructure()
      }
    } else {
      response = {
        result: 'error'
      }
    }
    return response;
  }

  protected handleError(error: any, element: Validable) {
    let response: Object;

    if (error instanceof ValidationBodyException) {
      response = this.handleBodyValidationError(element, error);
    }
    else {
      response = {
        result: 'error',
        message: error.message
      };
    }

    return response;
  }
}