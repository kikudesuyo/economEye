export class DuplicateItemError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateItemError";
  }
}

export class DbNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataNotFoundError";
  }
}
