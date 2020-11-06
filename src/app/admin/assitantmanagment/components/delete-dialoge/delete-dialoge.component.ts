import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';
import {
  AssitantService
} from '../../service/assitant.service';

@Component({
  selector: 'app-delete-dialoge',
  templateUrl: './delete-dialoge.component.html',
  styleUrls: ['./delete-dialoge.component.sass']
})
export class DeleteDialogeComponent{
  constructor(
    public dialogRef: MatDialogRef < DeleteDialogeComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _adminservice: AssitantService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
 
    this._adminservice.deleteAssitant(this.data.assitant_id).subscribe();
  }
}
