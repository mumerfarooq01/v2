export interface Assitant {
  firstname: string;
  lastname: string;
  mobile: string;
  linked_dr: number;
  email: string;
  profilepic: string;
  assitant_id: number;
  userCreditId: string;
  msp: string;
  doctor_id:number;
  DoctorName:string;
  fax:string;
}

export interface AssitantAddResponse {
  success: boolean;
  InsertId: number;
}

export interface AssitantList {
  List: Assitant[];
  total_count: number;
}
