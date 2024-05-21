import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {
  registrationForm!: FormGroup;
  fullName!: string;


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    // this.getUserInfo();
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      fullname: [''],
      mobileno: ['', [Validators.required, Validators.maxLength(11), Validators.pattern("0-9")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      photo: ['', [Validators.required]]
    });
  }


  matchPasswordValidator(control: FormControl): { [key: string]: any } | null {
    if (!this.registrationForm) {
      return null;
    }

    const password = this.registrationForm.get('password')?.value;
    const confirm_password = control.value;

    return password === confirm_password ? null : { mismatchedPasswords: true };
  }
  lstofUsers: any = [];

  backEndUrl: string = "http://localhost:8080/"

  onSubmit(): void {
    console.log(this.lstofUsers)
    this.http.post(this.backEndUrl + "user/add", this.registrationForm.value)
      .subscribe(
        data => {
          alert("User added successfully")
          this.registrationForm.reset();

        },
        error => {
          alert("Error in adding user")
          console.log(error)
        }
      )


    // this.router.navigate(['/login']);

  }

  getUserInfo() {

    this.http.get(this.backEndUrl + "user/show")
      .subscribe(
        data => {
          this.lstofUsers = data;
          console.log(this.lstofUsers)
        },
        error => {
          console.log(error)
          alert("Registration Denied...!")
        }
      )
  }
}

