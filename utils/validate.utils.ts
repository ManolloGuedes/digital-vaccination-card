class ValidationBodyException extends Error {
  constructor(message?: string) {
    if(!message) {
      message = 'Body is invalid';
    }
    super(message);
  }
}

const isEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
}

export { isEmail, ValidationBodyException };