import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthFacadeService} from '../../../../shared/facades/auth-facade.service';
import {ThemeService} from '../../../../services/theme.service';
import {SnackbarService} from '../../../../shared/services/toastr.service';
import {WRONG_PHONE_NUMBER, WRONG_USERNAME} from '../../../../shared/constants/snack-messages.constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  /** отпсичик от всех подписок */
  private uns$: Subject<void> = new Subject<void>();
  passwordsMatcher = new RepeatPasswordEStateMatcher();
  /** Форма входа */
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authFacade: AuthFacadeService,
              private snackService: SnackbarService,
              public theme: ThemeService) {
  }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  /**
   * Создание формы входа в аккаунт
   */
  createSignUpForm(): void {
    this.signUpForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required,
        Validators.minLength(4)]),
      repPassword: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      username: this.fb.control('', [Validators.required, Validators.minLength(4)])
    }, {validators: repeatPasswordValidator});
  }

  /**
   * Листенер сабмита формы регистрации
   */
  signUp(): void {
    if (!(this.signUpForm.get('username')?.value as string).trim()) {
      this.snackService.open(WRONG_USERNAME, 5000);
    } else if (!(this.signUpForm.get('phone')?.value as string).trim()) {
      this.snackService.open(WRONG_PHONE_NUMBER, 5000);
    } else {
      this.authFacade
        .signUp(this.signUpForm.get('username')?.value,
          this.signUpForm.get('email')?.value,
          this.signUpForm.get('password')?.value,
          this.signUpForm.get('phone')?.value);
    }
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

  return password === passwordConfirmation ? null : {passwordsNotEqual: true};
}

class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    return (control && control.parent.get('password').value !== control.parent.get('repPassword').value && control.dirty) as boolean;
  }
}
