import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.scss']
})
export class ImageuploadComponent implements OnInit {

  filePath: any = [];
  myForm!: FormGroup;
  public show: boolean = true
  imgData: any = [];

  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
  }

  ngOnInit(): void {
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

}
