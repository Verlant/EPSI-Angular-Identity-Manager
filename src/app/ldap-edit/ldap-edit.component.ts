import {Component, OnInit} from '@angular/core';
import {LdapDetailsComponent} from "../ldap-details/ldap-details.component";
import {UsersService} from "../service/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css']
})
export class LdapEditComponent extends LdapDetailsComponent implements OnInit {
  constructor(private usersService: UsersService,
              private route : ActivatedRoute,
              fb: FormBuilder,
              router: Router
  )
  {
    super(false, fb, router);
  }

  ngOnInit() {
    super.onInit();
  }

  validateForm(): void {
    console.log('LdapEditComponent - validateForm');
  }

  private getUser(): void {
    const login = this.route.snapshot.paramMap.get('id');

    if (login === null) {
      console.log("getUser = " + login);
      return;
    }

    this.usersService.getUser(login).subscribe(
      user => {
        this.user = user;
        console.log('LdapDetails getUser = ' + user);
      }
    )
  }
}
