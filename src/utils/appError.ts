export class AppError extends Error {
  statusCode: number;
  metadata?: any;

  constructor(message: string, statusCode = 500, metadata?: any) {
    super(message);
    this.statusCode = statusCode;
    this.metadata = metadata;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
