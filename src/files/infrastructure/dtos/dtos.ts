export class FileDTO {
  name: string;
  encoding: string;

  constructor(name: string, encoding: string) {
    this.name = name;
    this.encoding = encoding;
  }
}
