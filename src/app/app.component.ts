import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RemovalAIService } from './service/removal-ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Imgageremover';
  imageUrl: string = "https://file.removal.ai/low_resolution/7aba9b9d-2dcb-4063-8b41-4cd6b707ce56_test-women.png";
  base64image: any;


  constructor(private spinner: NgxSpinnerService, public _BackgroundRemovingService: RemovalAIService) { }
  ngOnInit() {
    // console.log("Converted Image")
    // this._BackgroundRemovingService.getConvertedImage(
    //   "https://file.removal.ai/preview/442f809f-74dc-4996-a38c-e1bf08b7aaed_test-women.png"
    // ).subscribe(
    //   data => {
    //     console.log(data)
    //   }
    // )

    // this._BackgroundRemovingService.getBase64ImageFromURL(this.imageUrl).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     // this is the image as dataUrl
    //     this.base64image = 'data:image/jpg;base64,' + data;
    //   });
  }
}
