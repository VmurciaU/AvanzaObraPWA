export interface IForms {
  id?:         number;
  name:        string;
  description: string;
  idClient:    number;
  state:       number;
  createdAt?:  Date;
  updatedAt?:  Date;
  createdBy?:  any;
  client?:     any;
}
