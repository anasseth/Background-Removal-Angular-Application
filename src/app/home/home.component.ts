import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RemovalAIService } from '../service/removal-ai.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageError!: any;
  isImageSaved!: boolean;
  cardImageBase64!: any;

  constructor(
    private router: Router,
    public _BackgroundRemovingService: RemovalAIService
  ) { }


  ngOnInit(): void {
  }

  Gotoprice() {
    this.router.navigate(['/pricing']);
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return false;
      }

      // if (fileInput.target.files[0].typeincludes(allowed_types)) {
      //   this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //   return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs: any) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // console.log("Image Base 64 Path", imgBase64Path)
            // this.previewImagePath = imgBase64Path;
            this._BackgroundRemovingService.convertImageUsingFreeRapidAPI(
              "image_url=https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80&output_format=base64",
            ).subscribe(
              data => {
                console.log(data.response.image_base64)
              }
            )

            return;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      return;
    }
    else {
      return;
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

}



