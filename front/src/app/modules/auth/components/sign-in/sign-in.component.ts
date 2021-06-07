import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthFacadeService } from '../../../../shared/facades/auth-facade.service';

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
              private authFacade: AuthFacadeService) {
  }

  ngOnInit(): void {
    this.createSignInForm();
  }

  /**
   * Создание формы входа в аккаунт
   */
  createSignInForm(): void {
    this.signInForm = this.fb.group({
      login: this.fb.control('', [ Validators.required, Validators.email ]),
      password: this.fb.control('', [ Validators.required, Validators.minLength(4) ])
    });
  }

  /** Сабмит листенер формы */
  signIn(): void {
    this.authFacade
      .signIn(this.signInForm.get('login')?.value,
        this.signInForm.get('password')?.value);
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
