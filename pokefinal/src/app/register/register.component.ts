import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    angForm: FormGroup;
    showErrorMessage: boolean = false;

    constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router, private httpClient : HttpClient, private snackBar: MatSnackBar) {
        this.angForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            name: ['', Validators.required],
        });
    }


    ngOnInit() {}

    postdata(angForm1: { value: { name: any; email: any; password: any; }; })
    {
        if(this.angForm.valid){
            this.httpClient.get<boolean>(`https://pokefinal.000webhostapp.com/backend/api.php?accion=repetido&usuario=${angForm1.value.name}`)
            .subscribe((response: any) => {
                const repetido = response.repetido;
    
                if (repetido === true) {
                    this.snackBar.open('El nombre de usuario ya está en uso!', 'Cerrar', {
                    duration: 4000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                    });
                    
                } else {
                    this.dataService.userregistration(angForm1.value.name, angForm1.value.email, angForm1.value.password)
                    .pipe(first())
                    .subscribe(
                        data => {
                        this.router.navigate(['login']);
                        },
                        error => {
                        // Manejar el error en caso de fallo en la solicitud
                        }
                    );
                }
            });

            this.showErrorMessage = false;
        }
        else
        {
            this.showErrorMessage = true;
        }
    }

    // get email() { return this.angForm.get('email'); }
    // get password() { return this.angForm.get('password'); }
    // get name() { return this.angForm.get('name'); }
}