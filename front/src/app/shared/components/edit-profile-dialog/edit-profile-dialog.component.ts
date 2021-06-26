import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthFacadeService } from '../../facades/auth-facade.service';

@Component({
  selector: 'app-edit-prof-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: [ './edit-profile-dialog.component.scss' ]
})
export class EditProfileDialogComponent implements OnInit {

  form!: FormGroup; // форма редактирования
  imgPreview!: string;
  file!: any;

  constructor(private fb: FormBuilder,
              private authFacade: AuthFacadeService) {
    this.createForm();
  }

  /**
   * Создание формы
   */
  createForm(): void {
    this.form = this.fb.group({
      img: [null],
      name: this.fb.control(''),
      username: this.fb.control(''),
      site: this.fb.control(''),
      bio: this.fb.control('')
    });
  }

  ngOnInit(): void {
  }

  selectImage(event: any): void {
    const input = (event.target as HTMLInputElement);
    if (input.files && input.files[0]) {
      // this.form.get('img')?.setValue(file);

      // @ts-ignore
      this.file = input.files[0];

      console.log(this.file);

      // @ts-ignore
      // this.form.get('img').updateValueAndValidity();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imgPreview = e.target.result.toString();
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  save(): void {
    // console.log(this.file);
    const formData = new FormData();
    formData.append('photo', this.file);
    formData.append('username', this.form.get('username')?.value);
    console.log(formData);
    this.authFacade.updateProfileData(formData);
  }
}
