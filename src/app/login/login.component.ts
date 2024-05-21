import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginform = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.email],
    captcha: ['', Validators.required]

  })
  captcha:string ='';
  captchavalue: string = '';


  backendurl = "http://localhost:8080/"


  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.refreshCaptcha();
  }

  refreshCaptcha(): void {
    this.captchavalue = Math.floor(1000 + Math.random() * 9000).toString();
  }

  onSubmit(): void {
    this.http.get(this.backendurl + "user/get/"+this.loginform.value).subscribe(data => {
      console.log(data)
      alert("Login Successfull...!")
    },
      error => {
        alert("Login Denied...!");
      })

    this.router.navigate(['/tender']);
  }

}