export class IResponse<T = any> {
  public error: boolean;
  public data: T;
  public message: string;
  public code: number;
  public type: string;

  constructor(
    error: boolean,
    data: T,
    message: string,
    code: number,
    type: string,
  ) {
    this.error = error;
    this.data = data;
    this.message = message;
    this.code = code;
    this.type = type;
  }
}
