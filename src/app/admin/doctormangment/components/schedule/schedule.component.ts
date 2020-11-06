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
  FormComponent
} from './dialogue/form/form.component';
import {
  DialogueDetailsComponent
} from './dialogue-details/dialogue-details.component';
import {
  CalendarService
} from '../../services/calendar.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';


const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass']
})
export class ScheduleComponent implements OnInit {



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
    this.calendarService.GetAllSlots()
      .subscribe(Data => {
        this.calendarEvents = Data;
      }, Error => {});
  }

  handleEventRender(info) {
    // console.log(info);
    // this.todaysEvents = this.todaysEvents.concat(info);
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

    const dialogRef = this.dialog.open(DialogueDetailsComponent, {
      data: {
        calendar: calendarData
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetEventsList();
      if (result === "delete") {

        this.showNotification(
          'snackbar-success',
          'Record Deleted Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
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
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        calendar: calendarnew,
        action: 'add',
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetEventsList();
      if (result === "submit") {

        // this.showNotification(
        //   'snackbar-success',
        //   'Add Record Successfully...!!!',
        //   'bottom',
        //   'center'
        // );
      }
      console.log();
      if(result === 'alredy'){
        this.showNotification(
          'snackbar-error',
          'Record Already Exists',
          'bottom',
          'center'
        );
      }
    });
  }

  addNewEvent(event) {

    let GivenDate = event.date;
    const CurrentDate = new Date();
    GivenDate = new Date(GivenDate);
    GivenDate.setHours(0,0,0,0);
     CurrentDate.setHours(0,0,0,0);
    console.log(GivenDate);
        console.log(CurrentDate);
    if (GivenDate >= CurrentDate) {

      const calendarnew = new Calendar({});
      calendarnew.startDate = event.date;
      calendarnew.endDate = event.date;
      const dialogRef = this.dialog.open(FormComponent, {
        data: {
          calendar: calendarnew,
          action: 'add',
        },
        width: '600px',
      });

      dialogRef.afterClosed().subscribe((result) => {

        if (result === "submit") {
          this.GetEventsList();
          this.addCusForm.reset();
          // this.showNotification(
          //   'snackbar-success',
          //   'Add Record Successfully...!!!',
          //   'bottom',
          //   'center'
          // );
        }
      });
    } else {
      this.showNotification(
        'snackbar-danger',
        'Can not add Schedule on a Past Date',
        'top',
        'right'
      );
    }
  }

}
