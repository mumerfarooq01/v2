import { Doctor } from './doctor.interface';

export class ApptCount{
    all: number;
    confirm: number;
    pending: number;
    canceled: number;
    free: number;
    new: number;

    constructor(ApptCount) {
        {
            this.all = ApptCount.all || 0;
            this.confirm = ApptCount.confirm || 0;
            this.pending = ApptCount.pending || 0;
            this.canceled = ApptCount.canceled || 0;
            this.new = ApptCount.new || 0;
            this.free = ApptCount.free || 0;
        }
    }
}

export interface NextOnCall {
    start_date: Date;
    end_date: Date;
    location: string;
    alternativelocation: string;
    no_of_patients: number;
    no_of_patient: number;
}

export interface DoctorStat {
    firstname: string;
    lastname: string;
    Pending: number;
    TotalApt: number;
    Confrimed: number;
    Ackn: number;
    Name: string;
    profilepic: string;

}



export interface DoctorDashboard {
    ApptCount: ApptCount;
    NextOnCall: NextOnCall;
    NextShift: NextOnCall[];
    Profile: Doctor;
    DoctorDetail: DoctorStat[];

}



