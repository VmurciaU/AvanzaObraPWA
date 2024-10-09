export interface IForms {
  id?:         number;
  name:        string;
  description: string;
  image:       string;
  audio:       string;
  idUser:      number;
  idProject:   number;
  idState:     number;
  state:       number;
  createdAt?:  Date;
  updatedAt?:  Date;
  createdBy?:  any;
  client?:     any;
}
