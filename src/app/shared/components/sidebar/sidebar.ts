import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HasRole } from '../../directives/has-role';

@Component({
  selector: '[app-sidebar]',
  imports: [RouterLink, RouterLinkActive, HasRole],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

}
