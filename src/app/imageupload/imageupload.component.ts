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

  @ViewChild('myModal') myModal: any;

  filePath: any = [];
  showDownloadButton: boolean = false;
  showSuccessMsg: boolean = false;
  downloadUrl: any = [];
  myForm!: FormGroup;
  public show2: boolean = false;
  imgData: any = [];
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;
  ratePerImage: any = 1.2;
  convertingImageCount: number = 0;
  showLoader: boolean = false;
  private modalRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public show: boolean = true

  constructor(
    public fb: FormBuilder,
    public _BackgroundRemovingService: RemovalAIService,
    private modalService: ModalManager,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    // this.payPalConfig = {
    //   clientId: 'AYvU7p49APJ3TWCP7EPq6Z1Sm7LijDirPdDI-G6DjNasJ2tyIVCwb0IZL1v5cKy_tw7qPr_2ybS62gCR',
    //   createOrderOnClient: (data) => <ICreateOrderRequest>{
    //     intent: 'CAPTURE',
    //     purchase_units: [
    //       {
    //         amount: {
    //           currency_code: 'USD',
    //           value: (this.imgData.length * this.ratePerImage).toString(),
    //           breakdown: {
    //             item_total: {
    //               currency_code: 'USD',
    //               value: (this.imgData.length * this.ratePerImage).toString()
    //             }
    //           }
    //         },
    //         items: [
    //           {
    //             name: 'Background Removal of Images',
    //             quantity: this.imgData.length,
    //             category: 'DIGITAL_GOODS',
    //             unit_amount: {
    //               currency_code: 'USD',
    //               value: (this.imgData.length * this.ratePerImage).toString(),
    //             },
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   advanced: {
    //     commit: 'true'
    //   },
    //   style: {
    //     label: 'paypal',
    //     layout: 'vertical'
    //   },
    //   onApprove: (data, actions) => {
    //     console.log('onApprove - transaction was approved, but not authorized', data, actions);
    //     actions.order.get().then((details: any) => {
    //       console.log('onApprove - you can get full order details inside onApprove: ', details);
    //     });
    //   },
    //   onClientAuthorization: (data) => {
    //     console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    //     this.showSuccess = true;
    //   },
    //   onCancel: (data, actions) => {
    //     console.log('OnCancel', data, actions);
    //   },
    //   onError: err => {
    //     console.log('OnError', err);
    //   },
    //   onClick: (data, actions) => {
    //     console.log('onClick', data, actions);
    //   },
    // };
    this.payPalConfig = {
      clientId: "AYvU7p49APJ3TWCP7EPq6Z1Sm7LijDirPdDI-G6DjNasJ2tyIVCwb0IZL1v5cKy_tw7qPr_2ybS62gCR",
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: (this.ratePerImage * this.imgData.length).toString(),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: (this.ratePerImage * this.imgData.length).toString()
                  }
                }
              },
              items: [
                {
                  name: "Background Removal of Image",
                  quantity: this.imgData.length,
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "USD",
                    value: (this.ratePerImage * this.imgData.length).toString()
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: data => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      }
    };
  }

  showing() {
    this.show = !this.show
  }

  imagePreview(e: Event) {
    if (this.imgData.length < 4) {
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
    else {
      this.openSnackBar("You Cannot Upload More Then 3 Images")
    }
  }

  submit() {
    console.log(this.myForm.value)
  }

  convertImages() {
    if (this.imgData.length < 4) {
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

            let downloadURL: any = {
              url: null,
              isURLavailable: false
            }

            this.downloadUrl.url = data.preview_demo
            this.downloadUrl.isURLavailable = true;

            this.downloadUrl.push(downloadURL)
          },
          err => {
            this.openSnackBar("Server Error: Conversion Failed !");
            this.showLoader = false;
            this.spinner.hide();
            this.closeModal();
          }, () => {
            this.convertingImageCount = this.convertingImageCount + 1;
            this.convertImages();
          }
        )
      }
      else {
        this.showLoader = false;
        this.showSuccessMsg = true;
        this.convertingImageCount = 0;
        this.showDownloadButton = true;
        this.spinner.hide();
        this.closeModal();
      }
    }
    else {
      this.openSnackBar("You Cannot Upload More Then 3 Images")
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
    // this.show2 = true
  }

  closeModal() {
    this.modalService.close(this.modalRef);
    this.show2 = false
  }

  showPaymentOption() {
    this.show2 = !this.show2;
    this.show = !this.show;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
      panelClass: ['blue-snackbar']
    });
  }

  removeImage(i: any) {
    this.imgData.splice(i, 1)
    this.filePath.splice(i, 1)
  }

}
