import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';
import {
  RefferService
} from '../../../services/reffer.service';

@Component({
  selector: 'app-delete-refferer',
  templateUrl: './delete-refferer.component.html',
  styleUrls: ['./delete-refferer.component.sass']
})
export class DeleteReffererComponent  {

  constructor(
    public dialogRef: MatDialogRef < DeleteReffererComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _refferservice: RefferService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this._refferservice.deleteRefferer(this.data.refferer_id).subscribe();
  }

}
