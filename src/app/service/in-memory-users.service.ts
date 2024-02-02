import { Injectable } from '@angular/core';
import {UserLdap} from "../models/user-ldap";
import {LDAP_USERS} from "../models/ldap-mock-data";
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryUsersService implements InMemoryDbService {

  createDb() {
    console.log('InMemoryUsersService.createDb');
    const users: UserLdap[] = LDAP_USERS;
    return {users};
  }

  // Overrides the genId method to ensure that a user always has an id.
  // If the users array is empty, the method below returns the initial number (4).
  // If the users array is not empty, the method below returns the highest user id + 1.
  genId(users: UserLdap[]): number {
    console.log('InMemoryUsersService.genId');
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 4;
  }

  constructor() { }
}
