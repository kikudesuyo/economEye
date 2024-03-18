export class InventryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InventryError";
  }
}
