export class EmailInvalidError extends Error {
  constructor(email: string) {
    super(`The email ${email} is invalid`);
  }
}
