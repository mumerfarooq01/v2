import { formatDate } from '@angular/common';
export class LinkedCal {
    schedule_id: number;
    item_text: string;
    CountApt: number;
    location: string;
    alternativelocation: string;
}

export class Calendar {
    id: number;
    title: string;
    DoctorId: string;
    DoctorName: string;
    ScheduleType: string;
    startDate: string;
    endDate: string;
    details: string;
    category: string;
    location: string;
    DoctorLocation: string;
    alternativelocation: string;
    no_of_patient: number;
    LinkedOnCall: LinkedCal[];
    LinkedOnAvail: LinkedCal[];
    note: string;

    constructor(calendar) {
        {
            this.id = calendar.id || this.getRandomID();
            this.title = calendar.title || '';
            this.ScheduleType = calendar.ScheduleType || '';
            this.DoctorId = calendar.DoctorId || '';
            this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
            this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
            this.details = calendar.details || '';
            this.DoctorName = calendar.DoctorName || '';
            this.location = calendar.location || '';
            this.DoctorLocation = calendar.DoctorLocation || '';
            this.alternativelocation = calendar.alternativelocation || '';
            this.no_of_patient = calendar.no_of_patient || 1;
            this.note = calendar.note || '';
            LinkedOnAvail: calendar.LinkedOnAvail || [];
            LinkedOnCall: calendar.LinkedOnCall || [];
        }
    }
    public getRandomID(): string {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
    }
}
