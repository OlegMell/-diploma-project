import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthFacadeService } from '../../../../shared/facades/auth-facade.service';
import { ThemeService } from '../../../../services/theme.service';
import {SnackbarService} from '../../../../shared/services/toastr.service';
import {WRONG_LOGIN} from '../../../../shared/constants/snack-messages.constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [ './sign-in.component.scss' ]
})
export class SignInComponent implements OnInit, OnDestroy {

  /** отпсичик от всех подписок */
  private uns$: Subject<void> = new Subject<void>();

  /** Форма входа */
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authFacade: AuthFacadeService,
              private snackService: SnackbarService,
              public theme: ThemeService) {
  }

  ngOnInit(): void {
    this.createSignInForm();
  }

  /**
   * Создание формы входа в аккаунт
   */
  createSignInForm(): void {
    this.signInForm = this.fb.group({
      login: this.fb.control('', [ Validators.required ]),
      password: this.fb.control('', [ Validators.required, Validators.minLength(4) ])
    });
  }

  /** Сабмит листенер формы */
  signIn(): void {
    if (!(this.signInForm.get('login')?.value as string).trim()) {
      this.snackService.open(WRONG_LOGIN, 5000);
    } else {
      this.authFacade
        .signIn(this.signInForm.get('login')?.value,
          this.signInForm.get('password')?.value);
    }
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
