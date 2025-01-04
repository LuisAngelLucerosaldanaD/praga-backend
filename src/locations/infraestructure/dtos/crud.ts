export interface ICreateLocationDto {
  id?: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  capacity: number;
  email: string;
}

export interface IUpdateLocationDto {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  capacity: number;
  email: string;
}
