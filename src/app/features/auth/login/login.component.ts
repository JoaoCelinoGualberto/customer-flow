import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required], 
      empresa_id: [219, Validators.required], 
      loja_id: [1, Validators.required], 
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/customers']); 
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Login falhou. Verifique suas credenciais.';
          console.error('Erro no login:', error); // Log do erro no console
        },
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}