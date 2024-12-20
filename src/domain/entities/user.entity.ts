import { BaseTable } from '../../infrastructure/models/base-table';

export class User extends BaseTable {
  id: string;
  name: string;
  lastname: string;
  document: string;
  type_document: number;
  username: string;
  password: string;
  email: string;
  cellphone: string;
  code: string;
  points: number;
  status: number;
  role: string;
  birth_date: string;
  picture: string;
  block_date: string;

  constructor(
    id: string,
    name: string,
    lastname: string,
    document: string,
    type_document: number,
    username: string,
    password: string,
    email: string,
    cellphone: string,
    code: string,
    points: number,
    status: number,
    role: string,
    birth_date: string,
    picture: string,
    block_date: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.document = document;
    this.type_document = type_document;
    this.username = username;
    this.password = password;
    this.email = email;
    this.cellphone = cellphone;
    this.code = code;
    this.points = points;
    this.status = status;
    this.role = role;
    this.birth_date = birth_date;
    this.picture = picture;
    this.block_date = block_date;
  }
}
