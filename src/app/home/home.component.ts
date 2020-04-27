import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginModel } from './LoginModel'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  loginModel : LoginModel = new LoginModel;
  authCode: String;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });

   }

  ngOnInit(): void {
  }

  onSubmit(userCredentials) {
    this.loginModel.username = userCredentials.username;
    this.loginModel.password = userCredentials.password;

    console.log(this.loginModel.username, this.loginModel.password);

    this.http.post('http://localhost:8080/login', this.loginModel).subscribe((response) => {

      this.authCode = response['authCode'];
      console.log(response, this.authCode);

      

    })

    this.loginForm.reset();
  }



}
