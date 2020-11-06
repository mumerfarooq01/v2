export interface Appointment {
    appointment_id: number;
    id: number;
    appointment_refferer: number;
    sitelocation: string;
    alternatelocation: string;
    patient_name: string;
    patient_dob: string;
    patient_phone: string;
    reason: string;
    details: string;
    wbc: string;
    CardImage: string;
    Reports: string[];
    docotorId: number;
    slot_id: number;
    slot_date: string;
    slot_time: string;
    ReffererName: string;
    ReffererMsp: string;
    ReffererMobile: string;
    Slot: string;
    DoctorName: string;
    DoctorMsp: string;
    DoctorMobile: string;
    slot_start: string;
    timestamp: string;
    patient_first_name: string;
    patient_last_name: string;
    status: string;
    patient_card: boolean;
    Attachments: Attachments[];
    phn: string;
    location:string;
    DoctorLocation: string;
    DoctorLocationAlter: string;
    cancel_reason: string;
}

export interface AppointmentResponse {
   Detail: Appointment;
   success: boolean;
}

export interface AppointmentList {
    List: Appointment[];
    total_count: number;
}

export interface Attachments  {
    url: string;
}
