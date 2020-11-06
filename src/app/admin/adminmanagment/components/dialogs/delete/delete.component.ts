import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';
import {
  AdminService
} from '../../../services/admin.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef < DeleteDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _adminservice: AdminService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    console.log(this.data);
    this._adminservice.deleteAdmin(this.data.admin_id).subscribe();
  }
}
