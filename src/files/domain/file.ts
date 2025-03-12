import { BaseTable } from '../../shared/domain/base-table';

export class File extends BaseTable {
  id: string;
  name: string;
  path: string;
  format: number;
  hash: string;
  size: number;

  constructor(
    id: string,
    name: string,
    path: string,
    format: number,
    hash: string,
    size: number,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    is_delete?: boolean,
    user_creator?: string,
    user_deleter?: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.path = path;
    this.format = format;
    this.hash = hash;
    this.size = size;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_delete;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static parseQuery(query: any): File {
    return new File(
      query.id,
      query.name,
      query.path,
      query.format,
      query.hash,
      query.size,
      query.created_at,
      query.updated_at,
      query.deleted_at,
      query.is_delete,
      query.user_creator,
      query.user_deleter,
    );
  }
}

export class FileStorage {
  name: string;
  mimetype: string;
  encoding: string;

  constructor(name: string, mimetype: string, encoding: string) {
    this.name = name;
    this.mimetype = mimetype;
    this.encoding = encoding;
  }
}
