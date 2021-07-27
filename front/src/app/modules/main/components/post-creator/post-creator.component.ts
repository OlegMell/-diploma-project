import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../../../shared/facades/auth-facade.service';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppFacadeService } from '../../../../shared/facades/app-facade.service';
import { PostsFacadeService } from '../../services/posts-facade.service';
import { Post } from '../../../../shared/models/common.models';
import { WRONG_FILE_EXT } from '../../../../shared/constants/snack-messages.constants';
import { SnackbarService } from '../../../../shared/services/toastr.service';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: [ './post-creator.component.scss' ]
})
export class PostCreatorComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик отвсех подписок
  prevCaretPos = 0; // текущая позиция каретки
  isFocused!: boolean; // флаг фокуса поля для ввода
  emojiBtnClicked!: boolean; // флаг нажатия на кнопку эмо дзи
  postTextField: FormControl = new FormControl(''); // поле ввода текста поста
  file: any; // выбранный файл
  files!: FileList | null; // выбранные картинки
  imgPreview: string[] = []; // массив картинок поста

  constructor(public readonly authFacade: AuthFacadeService,
              public readonly appFacade: AppFacadeService,
              private readonly snackBarService: SnackbarService,
              private readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {
    this.onPostTextFieldValueChanges();
  }

  /**
   * Листенер изминение значения поля для ввод
   */
  onPostTextFieldValueChanges(): void {
    this.postTextField.valueChanges
      .pipe(takeUntil(this.uns$))
      .subscribe(value => {
        console.log(value);
        // if (this.prevCaretPos) {
        //   console.log('here');
        //   this.prevCaretPos = value.length;
        // }
      });
  }

  /**
   * Метод отправки поста
   */
  send(tc: string): void {

    const post: Post = {
      text: tc,
      images: this.files?.length ? [ ...Array.from(this.files as FileList) ] : [],
      voice: '',
      date: Date.now(),
      author: ''
    };

    this.postsFacade.createPost(post);
    // @ts-ignore
    this.imgPreview = [];
    this.files = null;
  }

  /**
   * Листенер клика по body для закрытия панели результатов
   */
  @HostListener('body:click', [])
  onBodyClick(): void {
    this.isFocused = false;
    this.emojiBtnClicked = false;
  }

  /**
   * Листенер клика по компоненту для предотвращения всплытия события
   * @param e объект события
   */
  @HostListener('click', [ '$event' ])
  public onClick(e: Event): void {
    e.stopPropagation();
  }

  /**
   * Листенер выбора эмодзи
   * @param $event событие
   * @param editor поле для воода текста
   */
  onEmojiSelected($event: any, editor: HTMLTextAreaElement): void {
    const textArray = editor.value.split('');
    // tslint:disable-next-line:max-line-length
    // console.log(this.prevCaretPos);
    // console.log(editor.selectionStart);
    // if (this.prevCaretPos && editor.selectionStart < this.prevCaretPos) {
    //   this.prevCaretPos = editor.selectionStart;
    // }

    // if (!this.prevCaretPos) {
    //   this.prevCaretPos = editor.selectionStart;
    // }

    // tslint:disable-next-line:max-line-length
    textArray.splice(this.prevCaretPos === 0 ? editor.selectionStart : this.prevCaretPos, 0, String.fromCodePoint(parseInt($event.emoji.unified, 16)));
    this.prevCaretPos = editor.selectionStart;
    this.postTextField.setValue(textArray.join(''));
  }

  /**
   * Листенер выбора картинок для поста
   * @param e событие
   */
  selectImage(e: any): void {
    const input = (e.target as HTMLInputElement);
    if (input.files && input.files[0]) {

      // @ts-ignore
      this.file = input.files[0];
      this.files = input.files;
      const ext = [ 'png', 'jpg', 'jpeg', 'gif' ];
      const v = ext.includes(this.file.name.substring(this.file.name.indexOf('.') + 1));

      if (!v) {
        this.snackBarService.open(WRONG_FILE_EXT);
        return;
      }

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < input.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (ev: any) => {
          this.imgPreview.push(ev.target.result.toString());
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  }

  /**
   * Удаление картинки из массива
   * @param img выбраная картинка
   */
  removeImg(img: string): void {
    this.imgPreview = this.imgPreview.filter(i => i !== img);
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
