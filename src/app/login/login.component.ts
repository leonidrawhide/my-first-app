import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LoginService) { }
  name: string | null = ''
  ps: string | null = ''

  form = this.fb.group({
    login: ['', Validators.required],
    passw: ['', Validators.required]
  });

  loginStatus: boolean = this.loginService.loginStatus

  login(): void {
    console.log(this.form.value)
    this.loginService.checkLogin(this.form.value.login, this.form.value.passw)
    this.form.reset();
  }

  userLogout(): void {
    this.loginService.loginStatus = false
    this.loginStatus = false
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.loginStatus = this.loginService.loginStatus
  }
}
