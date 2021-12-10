import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ModalManager } from 'ngb-modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss']
})
export class ImageuploadComponent implements OnInit {
  @ViewChild('myModal') myModal: any;
  private modalRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public show: boolean = true
  constructor(private modalService: ModalManager, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  showing() {
    this.show = !this.show
  }

  openModal() {
    this.modalRef = this.modalService.open(this.myModal, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }
  closeModal() {
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
  }

  openSnackBar() {
    this._snackBar.open('Please upload', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

}
