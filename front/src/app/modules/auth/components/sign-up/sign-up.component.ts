import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthFacadeService } from '../../../../shared/facades/auth-facade.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.scss' ]
})
export class SignUpComponent implements OnInit, OnDestroy {

  /** отпсичик от всех подписок */
  private uns$: Subject<void> = new Subject<void>();
  passwordsMatcher = new RepeatPasswordEStateMatcher();
  /** Форма входа */
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authFacade: AuthFacadeService) {
  }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  /**
   * Создание формы входа в аккаунт
   */
  createSignUpForm(): void {
    this.signUpForm = this.fb.group({
      login: this.fb.control('', [ Validators.required, Validators.email ]),
      password: this.fb.control('', [ Validators.required,
        Validators.minLength(4) ]),
      repPassword: this.fb.control('', [ Validators.required, Validators.minLength(4) ]),
      username: this.fb.control('', [ Validators.required, Validators.minLength(4) ])
    }, { validators: repeatPasswordValidator });
  }

  signUp(): void {
    this.authFacade
      .signUp(this.signUpForm.get('username')?.value,
        this.signUpForm.get('email')?.value,
        this.signUpForm.get('password')?.value);
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}

// tslint:disable-next-line:typedef
function repeatPasswordValidator(group: FormGroup) {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.repPassword.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true };
}

class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    return (control && control.parent.get('password').value !== control.parent.get('repPassword').value && control.dirty) as boolean;
  }
}
