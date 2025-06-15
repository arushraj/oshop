import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  standalone: false,
  templateUrl: './bs-navbar.html',
  styleUrl: './bs-navbar.css'
})
export class BsNavbar {

  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
