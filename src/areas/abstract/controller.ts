import { Validable } from "../../models/interfaces/validable.ts";
import { ValidationBodyException } from "../../../utils/validate.utils.ts";

export class ControllerAbstract {
  handleBodyValidationError(element: Validable, error: Error): Object {
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
}