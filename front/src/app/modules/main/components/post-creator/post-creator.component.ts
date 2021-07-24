import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../../../shared/facades/auth-facade.service';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppFacadeService } from '../../../../shared/facades/app-facade.service';
import { PostsFacadeService } from '../../services/posts-facade.service';
import { Post } from '../../../../shared/models/common.models';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: [ './post-creator.component.scss' ]
})
export class PostCreatorComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик отвсех подписок
  prevCaretPos = 0;
  isFocused!: boolean;
  emojiBtnClicked!: boolean; // флаг нажатия на кнопку эмо дзи
  postTextField: FormControl = new FormControl(''); // поле ввода текста поста

  constructor(public readonly authFacade: AuthFacadeService,
              public readonly appFacade: AppFacadeService,
              private readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {
    this.onPostTextFieldValueChanges();
  }

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
    if (!tc) {
      return;
    }

    const post: Post = {
      text: tc,
      images: [],
      voice: '',
      date: Date.now(),
      author: ''
    };
    console.log(post);
    this.postsFacade.createPost(post);
    // @ts-ignore
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

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
