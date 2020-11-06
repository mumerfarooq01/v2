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
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef < DeleteDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _refferservice: RefferService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this._refferservice.deleteRefferer(this.data.refferer).subscribe();
  }
}
