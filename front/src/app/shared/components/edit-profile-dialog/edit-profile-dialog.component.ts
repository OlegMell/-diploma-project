import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-prof-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: [ './edit-profile-dialog.component.scss' ]
})
export class EditProfileDialogComponent implements OnInit, OnDestroy {

  /** оnписчик оn всех подписок */
  private uns$: Subject<void> = new Subject();

  form!: FormGroup; // форма редактирования
  imgPreview!: string; // превью выбранной картинки
  file!: any; // выбранный файл

  username!: string;
  bio!: string;
  site!: string;
  name!: string;

  constructor(private readonly fb: FormBuilder,
              public readonly authFacade: AuthFacadeService) {
  }


  /**
   * Инициализация компонента
   */
  ngOnInit(): void {
    this.authFacade.username$.pipe(takeUntil(this.uns$)).subscribe(username => this.username = username);
    this.authFacade.bio$.pipe(takeUntil(this.uns$)).subscribe(bio => this.bio = bio);
    this.authFacade.site$.pipe(takeUntil(this.uns$)).subscribe(site => this.site = site);
    this.authFacade.firstname$.pipe(takeUntil(this.uns$)).subscribe(name => this.name = name);

    this.createForm(this.name, this.bio, this.username, this.site); // создание формы
  }

  /**
   * Создание формы
   */
  createForm(name: string, bio: string, username: string, site: string): void {
    this.form = this.fb.group({
      img: [ null ],
      name: this.fb.control(name),
      username: this.fb.control(username),
      site: this.fb.control(site),
      bio: this.fb.control(bio)
    });
  }

  /**
   * Листенер выбора картинки
   * @param event событие выбора
   */
  selectImage(event: any): void {
    const input = (event.target as HTMLInputElement);
    if (input.files && input.files[0]) {

      // @ts-ignore
      this.file = input.files[0];

      // @ts-ignore
      // this.form.get('img').updateValueAndValidity();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imgPreview = e.target.result.toString();
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  /**
   * Сохранение изминений профиля
   */
  save(): void {
    const formData = new FormData();

    if (this.file) {
      formData.append('photo', this.file);
    }

    formData.append('username', this.form.get('username')?.value);
    formData.append('name', this.form.get('name')?.value);
    formData.append('site', this.form.get('site')?.value);
    formData.append('bio', this.form.get('bio')?.value);

    this.authFacade.updateProfileData(formData);
  }


  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}