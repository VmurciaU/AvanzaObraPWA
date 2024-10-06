export interface IForms {
  id?:         number;
  name:        string;
  description: string;
  state:       number;
  createdAt?:  Date;
  updatedAt?:  Date;
  createdBy?:  any;
  user?:       any;
}
