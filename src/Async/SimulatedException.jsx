// @flow
/* eslint-disable max-classes-per-file */

// eslint-disable-next-line no-unused-vars
class CustomError<Message: string, Stack: string> extends Error {

  constructor (error : any) {
    super(error);
    this.message = error.message;
    this.name = error.name;
    this.stack = error.stack;
  }
}

type Message = string;
type Stack = string;

class SimulatedException extends CustomError<Message, Stack> {}

export default SimulatedException;
