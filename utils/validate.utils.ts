class ValidationBodyException extends Error {
  constructor(message?: string) {
    if(!message) {
      message = 'Body is invalid';
    }
    super(message);
  }
}

class DocumentDoesnotExist extends Error {
  constructor(id: String, message?: string) {
    if(!message) {
      message = `Informed id (${id}) does not exist. Make sure you are using the correct id.`;
    }
    super(message);
  }
}

class GenericError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

const isEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
}

export { isEmail, ValidationBodyException, DocumentDoesnotExist, GenericError };