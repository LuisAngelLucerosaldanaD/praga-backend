import { BaseTable } from '../../shared/domain/base-table';
import { CompareHash } from '../../shared/infraestructure/security/security';
import { UserDto } from '../infraestructure/dto/dtos';

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
    failed_attempts: number,
    picture?: string,
    block_date?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date | null,
    is_deleted?: boolean,
    user_creator?: string,
    user_deleter?: string | null,
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
    this.failed_attempts = failed_attempts;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_deleted;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await CompareHash(password, hash);
  }

  public async validatePassword(hash: string) {
    return await CompareHash(this.password, hash);
  }

  public static parseQuery(result: any): User {
    return new User(
      result.id,
      result.name,
      result.lastname,
      result.document,
      result.type_document,
      result.username,
      result.password,
      result.email,
      result.cellphone,
      result.code,
      result.points,
      result.status,
      result.role,
      result.birth_date,
      result.failed_attempts,
      result.picture,
      result.block_date,
      result.created_at,
      result.updated_at,
      result.deleted_at,
      result.is_deleted,
      result.user_creator,
      result.user_deleter,
    );
  }

  public static parseDTO(dto: UserDto): User {
    return new User(
      dto.id,
      dto.name,
      dto.lastname,
      dto.document,
      dto.type_document,
      dto.username,
      dto.password,
      dto.email,
      dto.cellphone,
      dto.code,
      dto.points,
      dto.status,
      dto.role,
      dto.birth_date,
      0,
    );
  }
}
