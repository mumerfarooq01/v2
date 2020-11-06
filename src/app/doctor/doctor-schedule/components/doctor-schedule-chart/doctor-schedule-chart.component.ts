import {
  Component,
  ViewChild,
  OnInit,
  TemplateRef
} from '@angular/core';
import {
  FullCalendarComponent
} from '@fullcalendar/angular';
import {
  EventInput
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  formatDate
} from '@angular/common';
import {
  Calendar
} from '../../../../shared/interfaces/calendar.model';
import {
  MatRadioChange
} from '@angular/material/radio';
import {
  DoctorScheduleFromProcessComponent
} from '../doctor-schedule-from-process/doctor-schedule-from-process.component';
import {
  CalendarService
} from '../../../../admin/doctormangment/services/calendar.service';
import {
  AuthService
} from '../../../../shared/security/auth.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  DoctorScheduleDetailsComponent
} from '../doctor-schedule-details/doctor-schedule-details.component';

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

@Component({
  selector: 'app-doctor-schedule-chart',
  templateUrl: './doctor-schedule-chart.component.html',
  styleUrls: ['./doctor-schedule-chart.component.sass']
})
export class DoctorScheduleChartComponent implements OnInit {

  @ViewChild('calendar', {
    static: false
  })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = "All";
  calendarData: any;

  public filters = [{
      name: 'all',
      value: 'All',
      checked: 'true'
    },
    {
      name: 'work',
      value: 'Work',
      checked: 'false'
    },
    {
      name: 'personal',
      value: 'Personal',
      checked: 'false'
    },
    {
      name: 'important',
      value: 'Important',
      checked: 'false'
    },
    {
      name: 'travel',
      value: 'Travel',
      checked: 'false'
    },
    {
      name: 'friends',
      value: 'Friends',
      checked: 'false'
    }
  ];



  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
  calendarWeekends = true;
  @ViewChild('callAPIDialog', {
    static: false
  }) callAPIDialog: TemplateRef < any > ;
  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  todaysEvents: EventInput[];

  constructor(
    private authservice: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar) {
    this.dialogTitle = 'Add New Event';
    this.calendar = new Calendar({});
    this.addCusForm = this.createContactForm(this.calendar);

  }

  events() {
    return [{
      id: "event1",
      title: "All Day Event",
      start: new Date(year, month, 1, 0, 0),
      end: new Date(year, month, 1, 23, 59),
      className: "fc-event-success",
      groupId: "work",
      details: "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
    }];
  }
  ngOnInit(): void {
    // this.calendarEvents = this.events();
    this.GetEventsList();

  }
  GetEventsList(): void {

    this.calendarService.GetAllSlotsDoctor(this.authservice.getUserId())
      .subscribe(Data => {
        this.calendarEvents = Data;
      }, Error => {});
  }

  createContactForm(calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]
      ],
      DoctorId: [calendar.DoctorId],
      startDate: [calendar.startDate,
        [Validators.required]
      ],
      endDate: [calendar.endDate,
        [Validators.required]
      ],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]
      ],
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  addNewEventcurrent() {

    const calendarnew = new Calendar({});
    calendarnew.startDate = formatDate(new Date(), 'yyyy-MM-dTHH:mm:ss', 'en');
    calendarnew.endDate = formatDate(new Date(), 'yyyy-MM-dTHH:mm:ss', 'en');
    calendarnew.DoctorId = this.authservice.getUserId();

    const dialogRef = this.dialog.open(DoctorScheduleFromProcessComponent, {
      data: {
        calendar: calendarnew,
        action: 'add',
      },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetEventsList();
      if (result === "submit") {
        this.showNotification(
          'snackbar-success',
          'Record added successfully',
          'bottom',
          'center'
        );
      }
    });
  }

  addNewEvent(event) {

    console.log();
    let GivenDate = event.date;
    const CurrentDate = new Date();
    GivenDate = new Date(GivenDate);
    GivenDate.setDate(GivenDate.getDate() + 1);
    if (GivenDate >= CurrentDate) {

      const calendarnew = new Calendar({});
      calendarnew.startDate = GivenDate;
      calendarnew.endDate = GivenDate;
      calendarnew.DoctorId = this.authservice.getUserId();

      const dialogRef = this.dialog.open(DoctorScheduleFromProcessComponent, {
        data: {
          calendar: calendarnew,
          action: 'add',
          givendate: GivenDate,
        },
        width: '800px',
      });


      dialogRef.afterClosed().subscribe((result) => {

        if (result === "submit") {
          this.GetEventsList();
          this.addCusForm.reset();
          this.showNotification(
            'snackbar-success',
            'Record added successfully',
            'bottom',
            'center'
          );
        }
      });
    } else {
      this.showNotification(
        'snackbar-danger',
        'Can not add schedule on a past date',
        'top',
        'right'
      );
    }
  }

  eventClick(row) {


    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      category: row.event.groupId,
      startDate: row.event.start,
      endDate: row.event.end,
      details: row.event.details,
      DoctorName: row.event.DoctorName
    };

    const dialogRef = this.dialog.open(DoctorScheduleDetailsComponent, {
      data: {
        calendar: calendarData
      },
      width: '600px',
    });
    dialogRef.backdropClick().subscribe(() => { 
      // this.GetEventsList();
     });
    dialogRef.afterClosed().subscribe((result) => {
      this.GetEventsList();
      if (result === "delete") {

        this.showNotification(
          'snackbar-success',
          'Record deleted successfully',
          'bottom',
          'center'
        );
      } else if (result === "edit") {
        const dialogRefAdd = this.dialog.open(DoctorScheduleFromProcessComponent, {
          data: {
            calendar: calendarData,
            action: 'edit',
          },
          width: '600px',
        });

        dialogRefAdd.afterClosed().subscribe((resultShow) => {

          if (resultShow === "submit") {
            this.GetEventsList();
            this.addCusForm.reset();
            this.showNotification(
              'snackbar-success',
              'Record added Successfully',
              'bottom',
              'center'
            );
          }
        });
      }
    });
  }

 
}
