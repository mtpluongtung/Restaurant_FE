import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_service/Authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModel } from '../../_model/LoginModel';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports :[CommonModule,ButtonModule,FormsModule, Toast],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  constructor(
    private authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService : MessageService
  ) {}
  submitted: boolean = false;
  loginForm: LoginModel = new LoginModel();
  ngOnInit() {
    const user = this.authentication.userValue;
    if (user.flag) {
      this.router.navigate(['/home']);
    }
  }
  onSubmit() {
    this.submitted = true;
    this.authentication
      .login(this.loginForm)
      .pipe(first())
      .subscribe((data) => {
        this.submitted = false;
        if (data.flag) {
          this.router.navigate(['/home']);
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn ca' });
        }
      });
  }

}
