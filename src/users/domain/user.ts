import { BaseTable } from '../../shared/domain/base-table';
import { CompareHash } from '../../shared/infraestructure/security/security';

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
  picture: string | null;
  block_date: string | null;
  failed_attempts: number;

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
    this.user_creator = 'b7c90251-8f59-4970-ab8e-c1e9a52bdc3f';
  }

  public static async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await CompareHash(password, hash);
  }
}
