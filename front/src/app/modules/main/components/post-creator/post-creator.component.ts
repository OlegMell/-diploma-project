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
import { NgAudioRecorderService } from 'ng-audio-recorder';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';

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
  isRecording!: boolean;
  output: any;
  audio!: File;

  record: any;
  url: any;
  error: any;

  constructor(public readonly authFacade: AuthFacadeService,
              public readonly appFacade: AppFacadeService,
              private readonly audioRecorderService: NgAudioRecorderService,
              private readonly sanitizer: DomSanitizer,
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
        // console.log(value);
        // if (this.prevCaretPos) {
        //   console.log('here');
        //   this.prevCaretPos = value.length;
        // }
      });
  }

  /**
   * Метод отправки поста
   * @param text текст из поля ввода
   */
  send(text: string): void {

    const post: Post = {
      text,
      images: this.files?.length ? [ ...Array.from(this.files as FileList) ] : [],
      voice: this.audio || '',
      date: Date.now(),
      author: ''
    };

    this.postsFacade.createPost(post);
    // @ts-ignore
    this.imgPreview = [];
    this.url = '';
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
      console.log(this.file);
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

  /**
   * Листенер нажатия на кнопку записи
   */
  startRecording(): void {
    this.isRecording = !this.isRecording;

    if (this.isRecording) {
      const media = {
        video: false,
        audio: true
      };

      navigator.mediaDevices
        .getUserMedia(media)
        .then(this.success.bind(this));
    } else {
      this.stopRecording();
    }
  }

  /**
   * Удачное наало записи
   * @param stream поток для записи
   */
  success(stream: any): void {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 2,
      audioBitsPerSecond: 128000,
      frameInterval: 90,
      desiredSampRate: 16000,
      bitrate: 128000,
      bufferSize: 16384,
    };

    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  /**
   * Остановка записи
   */
  stopRecording(): void {
    this.isRecording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  /**
   * Обработка записи
   * @param blob данные записи в Blob формате
   */
  processRecording(blob: Blob): void {
    this.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    this.audio = new File([ blob ], 'test.wav', { lastModified: new Date().getDate() });
    // this.url = f;
    // console.log('url', this.url);
    // const reader = new FileReader();
    //
    // reader.onload = (ev: any) => {
    //   this.url = (ev.target.result.toString());
    // };
    // reader.readAsDataURL(f);
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
