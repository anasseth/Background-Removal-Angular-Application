import { FormBuilder, FormGroup } from "@angular/forms";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { RemovalAIService } from '../service/removal-ai.service';
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

  filePath: any = [];
  showDownloadButton: boolean = false;
  downloadUrl: any = [];
  myForm!: FormGroup;
  public show2: boolean = true
  imgData: any = [];
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  ratePerImage: any = 1.2;
  convertingImageCount: number = 0;
  showLoader: boolean = false;

  @ViewChild('myModal') myModal: any;
  private modalRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public show: boolean = true
  constructor(public fb: FormBuilder,
    public _BackgroundRemovingService: RemovalAIService, private modalService: ModalManager, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: (this.imgData.length * this.ratePerImage).toString(),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: (this.imgData.length * this.ratePerImage).toString()
                }
              }
            },
            items: [
              {
                name: 'Background Removal of Images',
                quantity: this.imgData.length,
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: (this.imgData.length * this.ratePerImage).toString(),
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  showing() {
    this.show = !this.show
  }

  imagePreview(e: Event) {
    var file: any = e.target as HTMLInputElement;
    file = file.files[0]
    this.myForm.patchValue({
      img: file
    });
    this.imgData.push(file)

    this.myForm.get('img')?.updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath.push(reader.result as string);
    }
    reader.readAsDataURL(file)

    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
  }

  submit() {
    console.log(this.myForm.value)
  }

  convertImages() {
    this.showLoader = true;
    this.spinner.show()
    if (this.convertingImageCount < this.imgData.length) {
      var imageData = new FormData();
      imageData.append("image_file", this.imgData[this.convertingImageCount], this.filePath[this.convertingImageCount].name);
      imageData.append("image_url", "");
      this._BackgroundRemovingService.convertImageUsingRemovalAI(imageData).subscribe(
        data => {
          console.log("Image Data Showing")
          console.log(data)
          this.downloadUrl.push(data.preview_demo)
        },
        err => {
          alert("Server Error: Conversion Failed !")
        }, () => {
          this.convertingImageCount = this.convertingImageCount + 1;
          this.convertImages();
        }
      )
    }
    else {
      this.showLoader = false;
      this.convertingImageCount = 0;
      this.showDownloadButton = true;
      this.spinner.hide();
    }
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
    this._snackBar.open('Please Upload an Image', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

}
