
import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AcoountService } from 'src/app/services/acoount.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  errors: string[];

  
  constructor(private fb: FormBuilder, private accountService: AcoountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      patronymic: [null, Validators.required],
      user_type: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, 
        [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
       // [this.validateEmailNotTaken()]
      ],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }

  // validateEmailNotTaken(): AsyncValidatorFn {
  //   return control => {
  //     return timer(500).pipe(
  //       switchMap(() => {
  //         if (!control.value) {
  //           return of(null);
  //         }
  //         return this.accountService.checkEmailExists(control.value).pipe(
  //           map(res => {
  //              return res ? {emailExists: true} : null;
  //           })
  //         );
  //       })
  //     )
  //   }
  // }
 

}
