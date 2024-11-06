import { Component } from '@angular/core';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
  isStudent = false;

  constructor(private roleService: RoleService) {
      // Example: Determine role based on the role service
      this.isStudent = this.roleService.hasRole(['Student']);
  }
}
