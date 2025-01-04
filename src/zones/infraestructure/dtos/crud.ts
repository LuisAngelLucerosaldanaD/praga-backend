export interface ICreateZoneDTO {
  id?: string;
  name: string;
  description: string;
  type: number;
  location_id: string;
}

export interface IUpdateZoneDTO {
  id: string;
  name: string;
  description: string;
  type: number;
  location_id: string;
}
