export interface Admin {
  firstname: string;
  lastname: string;
  profilepic: string;
  mobile: string;
  email: string;
  admin_id: number;
  userCreditId: string;
  msp: string;
  fax: string;
  default_admin: string;
}

export interface AdminAddResponse {
  success: boolean;
  InsertId: number;
}

export interface AdminList{
  List: Admin[];
  total_count: number;
}