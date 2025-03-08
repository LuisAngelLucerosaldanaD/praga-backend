export interface ICreateEvent {
  id?: string;
  name: string;
  slogan: string;
  capacity: number;
  start_date: string;
  end_date: string;
  publication_date: string;
  pre_sale_date: string;
  free_list_date: string;
}

export interface IUpdateEvent {
  id: string;
  name: string;
  slogan: string;
  capacity: number;
  start_date: string;
  end_date: string;
  publication_date: string;
  pre_sale_date: string;
  free_list_date: string;
}

export class EventDTO {
  id?: string;
  name: string;
  slogan: string;
  capacity: number;
  start_date: string;
  end_date: string;
  publication_date: string;
  pre_sale_date: string;
  free_list_date: string;
}