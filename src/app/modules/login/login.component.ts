import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NbToastrService, NbIconConfig } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router ,private toastrService: NbToastrService) { }

  loginWithGoogle(){
    this.auth.googleLogin().then(res => {
      this.alert('bottom-left', 'success' , `Welcome ${res.additionalUserInfo.profile.name}` ,"Redirecting...")  
      setTimeout(() => {
        this.router.navigate(['/index']);
      }, 1500);
    }
    )
  }

  // loginWithFacebook(){
  //   this.auth.facebookLogin().then(res => {
  //     this.router.navigate(['/index']);
  //   }
  //   )
  // }
  
  alert(position, status, message , title) {
    this.toastrService.show(
      title,
      message,
      { position, status });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.alert('bottom-left', 'primary' ,`Hello User!` ,`To use this app please login!` )  
    }, 1500);
  }

}
