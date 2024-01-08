import { Injectable } from '@angular/core';
import {UserLdap} from "../models/user-ldap";
import {LDAP_USERS} from "../models/ldap-mock-data";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  // Liste des utilisateurs
  users: UserLdap[] = LDAP_USERS;

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }

  getUser(login: string): Observable<UserLdap | undefined> {
    return of(this.users.find(user => user.login === login));
  }

  addUser(user: {
    motDePasse: string;
    employeNiveau: number;
    publisherId: number;
    role: string;
    mail: string;
    dateEmbauche: string;
    active: boolean;
    nomComplet: string;
    login: string;
    nom: string;
    prenom: string;
    employeNumero: number
  }): Observable<{
    motDePasse: string;
    employeNiveau: number;
    publisherId: number;
    role: string;
    mail: string;
    dateEmbauche: string;
    active: boolean;
    nomComplet: string;
    login: string;
    nom: string;
    prenom: string;
    employeNumero: number
  }> {
    // Ajout dans la liste
    // @ts-ignore
    this.users.push(user);
    return of(user);
  }

  // addUser(user: UserLdap): Observable<UserLdap> {
  //   // Ajout dans la liste
  //   this.users.push(user);
  //   return of(user);
  // }

  updateUser(userToUpdate: {
    motDePasse: string;
    employeNiveau: number;
    publisherId: number;
    role: string;
    mail: string;
    dateEmbauche: string;
    active: boolean;
    nomComplet: string;
    login: string;
    nom: string;
    prenom: string;
    employeNumero: number
  }): Observable<{
    motDePasse: string;
    employeNiveau: number;
    publisherId: number;
    role: string;
    mail: string;
    dateEmbauche: string;
    active: boolean;
    nomComplet: string;
    login: string;
    nom: string;
    prenom: string;
    employeNumero: number
  }> {
    // Modification de l'utilisateur
    const user = this.users.find(u => u.login === userToUpdate.login);
    if (user) {
      // Modifications
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = user.nom + ' ' + user.prenom;
      user.motDePasse = userToUpdate.motDePasse;

      return of(userToUpdate);
    }
    return throwError( () => new Error('Utilisateur non trouvé !'));
  }

}
