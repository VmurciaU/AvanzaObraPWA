export interface IForms {
  id?: number,
  name: string,
  typeIdentification: string,
  email: string,
  phoneNumber: string,
  state: number,
  createdAt?:  Date;
  updatedAt?:  Date;
  createdBy?:  any;
}
