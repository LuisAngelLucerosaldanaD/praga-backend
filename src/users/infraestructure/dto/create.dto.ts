export interface CreateUserDto {
  id: string | null;
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
}
