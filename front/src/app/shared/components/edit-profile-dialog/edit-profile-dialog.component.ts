import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from '../../services/toastr.service';
import { WRONG_FILE_EXT } from '../../constants/snack-messages.constants';

@Component({
  selector: 'app-edit-prof-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: [ './edit-profile-dialog.component.scss' ]
})
export class EditProfileDialogComponent implements OnInit, OnDestroy {

  /** Отписчик оn всех подписок */
  private uns$: Subject<void> = new Subject();

  form!: FormGroup; // форма редактирования
  file!: File; // выбранный файл
  editImgPreview!: string; // превью выбранной картинки

  username!: string; // имя пользователя (никнейм)
  bio!: string; // описание пользователя
  site!: string; // ссылка на сайт пользователя
  name!: string; // ФИО пользователя

  constructor(private readonly fb: FormBuilder,
              private readonly snackBarService: SnackbarService,
              public readonly authFacade: AuthFacadeService) {
  }

  /**
   * Инициализация компонента
   */
  ngOnInit(): void {
    this.getInitDataFromStore();
    this.createForm(this.name, this.bio, this.username, this.site); // создание формы
  }

  /**
   * Получение данных из хранилища состояния для построения формы
   */
  getInitDataFromStore(): void {
    this.authFacade.username$.pipe(takeUntil(this.uns$)).subscribe(username => this.username = username);
    this.authFacade.bio$.pipe(takeUntil(this.uns$)).subscribe(bio => this.bio = bio);
    this.authFacade.site$.pipe(takeUntil(this.uns$)).subscribe(site => this.site = site);
    this.authFacade.firstname$.pipe(takeUntil(this.uns$)).subscribe(name => this.name = name);
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
   * @param event событие выбора картинки
   */
  selectProfileImage(event: any): void {
    event.stopPropagation();
    const input = (event.target as HTMLInputElement);
    if (input.files && input.files[0]) {

      // @ts-ignore
      this.file = input.files[0];
      const ext = ['png', 'jpg', 'jpeg', 'gif'];
      const v = ext.includes(this.file.name.substring(this.file.name.indexOf('.') + 1));

      if (!v) {
        this.snackBarService.open(WRONG_FILE_EXT);
        return;
      }

      // @ts-ignore
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.editImgPreview = e.target.result.toString();
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

    this.authFacade.updateProfileData({ ...this.form.value, file: this.file || '' });
  }

  /**
   * Финализация, отписка
   */
  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
