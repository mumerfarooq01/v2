export interface Doctor {
  firstname: string;
  lastname: string;
  mobile: string;
  designation: string;
  department: string;
  address: string;
  email: string;
  dob: string;
  education: string;
  profilepic: string;
  doctor_id: number;
  userCreditId: string;
  Name: string;
  msp: string;
  fax: string;
  booking_id: string;
  notification_setting: string;
  appointment_setting: boolean;
  appointment_default_status: string;
  appointment_wcp_status: string;
  appointment_msp_status: string;
}

export interface DoctorAddResponse {
  success: boolean;
  InsertId: number;
}

export interface DoctorList{
  List: Doctor[];
  total_count: number;
}

export interface DoctorUrlResponse{
  Doctor: Doctor;
  Success: boolean;
  StartTime: Date;
  SlotId: number;
}