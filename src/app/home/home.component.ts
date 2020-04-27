import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginModel } from './LoginModel'
import { HttpClient } from '@angular/common/http';
import { UserDetailsModel } from "./UserDetailsModel"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  loginModel: LoginModel = new LoginModel;
  authCode: String;
  accessToken: String;
  userDetailsModel: UserDetailsModel = new UserDetailsModel;
  userdetails: String;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.loginForm = this.formBuilder.group({
      username: 'grandolf49',
      password: 'nsproject'
    });

  }

  ngOnInit(): void {
  }

  onSubmit(userCredentials) {
    this.loginModel.username = userCredentials.username;
    this.loginModel.password = userCredentials.password;

    console.log(this.loginModel.username, this.loginModel.password);

    this.http.post('http://192.168.0.103:8080/login', this.loginModel).subscribe((response) => {

      this.authCode = response['authCode'];
      console.log(response, this.authCode);
      this.userdetails = "got auth code";

      this.getAccessToken();
    })

    this.loginForm.reset();
  }

  getAccessToken() {
    if (this.authCode.length !== 0) {
      this.http.post('http://192.168.0.103:8080/getAccessToken', this.authCode).subscribe((response) => {
        this.accessToken = response['accessToken'];

        console.log(response);
        this.userdetails = "got access token";

        this.getUserDetails();
      })
    } else
      console.log("authcode not received");
  }

  getUserDetails() {
    if (this.accessToken.length !== 0) {
      this.userdetails = "trying to get user details...";

      this.http.post('http://192.168.0.103:8080/getUserDetails', this.accessToken).subscribe((response) => {

        this.userDetailsModel.userName = atob(response['userName']);
        this.userDetailsModel.email = atob(response['email']);
        this.userDetailsModel.mobile = atob(response['mobile']);
        this.userDetailsModel.dateOfBirth = atob(response['dateOfBirth']);
        this.userdetails = "got user details";
      })
    } else
      console.log("accessToken not received");
  }
}
