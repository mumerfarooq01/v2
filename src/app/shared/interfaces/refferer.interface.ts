export interface Refferer {
  firstname: string;
  lastname: string;
  Name: string;
  mobile: string;
  address: string;
  email: string;
  dob: string;
  profilepic: string;
  refferer_id: number;
  userCreditId:string;
  msp:string;
  fax:string;
}

export interface ReffererAddResponse {
  success: boolean;
  InsertId: number;
}

export interface ReffererList {
  List: Refferer[];
  total_count: number;
}
