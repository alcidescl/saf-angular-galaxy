import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Sidebar } from "./shared/components/sidebar/sidebar";
import { setTheme } from 'ngx-bootstrap/utils';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  private readonly authService = inject(AuthService);

  isAuthenticated = this.authService.isAuthenticated();

  constructor() {
    setTheme('bs5');
    effect(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
    })
  }
}
